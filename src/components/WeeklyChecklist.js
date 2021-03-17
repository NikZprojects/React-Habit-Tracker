import React, { useState } from "react";

const handleChange = (monthView, id, day, habitList, setHabitList) => {
  const year = monthView.getFullYear();
  const month = monthView.getMonth();
  setHabitList(
    habitList.map((habit) => {
      if (habit.id.toString() === id) {
        let completeStatus = habit.data[year][month][day].complete;
        switch (completeStatus) {
          case "":
            completeStatus = "complete";
            break;
          case "complete":
            completeStatus = "skipped";
            break;
          case "skipped":
            completeStatus = "missed";
            break;
          case "missed":
            completeStatus = "";
            break;
        }
        habit.data[year][month][day].complete = completeStatus;
        return { ...habit };
      } else {
        return { ...habit };
      }
    })
  );
};

const listCheckboxes = (monthView, habitList, setHabitList, day) => {
  const year = monthView.getFullYear();
  const month = monthView.getMonth();
  const chooseSymbol = (completeStatus) => {
    let completeSymbol = "";
    switch (completeStatus) {
      case "":
        break;
      case "complete":
        completeSymbol = "✓";
        break;
      case "skipped":
        completeSymbol = "–";
        break;
      case "missed":
        completeSymbol = "✕";
        break;
    }
    return completeSymbol;
  };

  let checkboxes = habitList.map((habit) => (
    <td
      className={`${habit.data[year][month][day].complete} + hoverable`}
      key={habit.id + "." + day}
      onClick={() =>
        handleChange(monthView, habit.id, day, habitList, setHabitList)
      }
    >
      {chooseSymbol(habit.data[year][month][day].complete)}
    </td>
  ));
  return checkboxes;
};

const calcTotals = (monthView, habitList, days, togglePercent) => {
  const year = monthView.getFullYear();
  const month = monthView.getMonth();

  const dayTotalArray = [];
  const weekLengthArray = [];
  var weekLength = 0;
  var weekTotal = 0;
  const weekTotalArray = [];
  var monthTotal = 0;

  for (let day = 0; day < days; day++) {
    let dayTotal = 0;
    for (let habit = 0; habit < habitList.length; habit++) {
      weekLength++;
      if (habitList[habit].data[year][month][day].complete === "complete") {
        dayTotal++;
        weekTotal++;
        monthTotal++;
      }
    }
    if (new Date(year, month, day + 1).getDay() === 0) {
      // Handle weekend-only weeks:
      if (weekLength / habitList.length <= 2) {
        togglePercent ? (weekTotal += 1 * habitList.length) : (weekTotal += 0);
        weekLength = 1;
      } else {
        weekLength = weekLength / habitList.length - 2;
      }
      weekTotalArray.push(weekTotal);
      weekLengthArray.push(weekLength);
      weekTotal = 0;
      weekLength = 0;
    }
    dayTotalArray.push(dayTotal);
  }
  return {
    dayTotalArray: dayTotalArray,
    weekTotalArray: weekTotalArray,
    weekLengthArray: weekLengthArray,
    monthTotal: monthTotal,
  };
};

const formatTotal = (total, maximum, type, togglePercent, setTogglePercent) => {
  let defaultColor = type === "day" ? "#222b35" : "#333f4f";
  let percent = (total * 100) / maximum;

  const formatValue = (total, percent, type, togglePercent) => {
    if (type === "day") {
      return total;
    } else {
      return togglePercent ? Number(percent.toFixed(0)) + "%" : total;
    }
  };

  return (
    <td
      className={type !== "day" ? "hoverable + togglePercent" : ""}
      style={
        total === 0
          ? { backgroundColor: `${defaultColor}` }
          : { backgroundColor: `rgb(0,156,57,${total / maximum}` }
      }
      onClick={() =>
        type !== "day" ? setTogglePercent((togglePercent = !togglePercent)) : ""
      }
    >
      {formatValue(total, percent, type, togglePercent)}
    </td>
  );
};

export const WeeklyChecklist = ({ monthView, habitList, setHabitList }) => {
  const year = monthView.getFullYear();
  const month = monthView.getMonth();
  const days = 32 - new Date(year, month, 32).getDate();
  const daysArray = [...Array(days).keys()];

  const [togglePercent, setTogglePercent] = useState();
  const [weekCount, setWeekCount] = useState(0);
  const totals = calcTotals(monthView, habitList, days, togglePercent);
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  var week = 0;
  return daysArray.map((day) => {
    day += 1;
    return (
      <>
        <tr key={day.toString()}>
          <td className="inactiveCells">
            {day} - {dayNames[new Date(year, month, day - 1).getDay()]}
          </td>
          {listCheckboxes(monthView, habitList, setHabitList, day - 1)}
          {formatTotal(totals.dayTotalArray[day - 1], habitList.length, "day")}
        </tr>

        {new Date(year, month, day).getDay() === 0 ? (
          <tr>
            <td className="inactiveCells" colSpan={habitList.length + 1}>
              Week {(week += 1)} Total:
            </td>
            {formatTotal(
              totals.weekTotalArray[week - 1],
              habitList.length * totals.weekLengthArray[week - 1],
              "week",
              togglePercent,
              setTogglePercent
            )}
          </tr>
        ) : null}

        {day === daysArray.length ? (
          <tr>
            <td className="inactiveCells" colSpan={habitList.length + 1}>
              Month Total:
            </td>
            {formatTotal(
              totals.monthTotal,
              habitList.length * day,
              "month",
              togglePercent,
              setTogglePercent
            )}
          </tr>
        ) : null}
      </>
    );
  });
};
