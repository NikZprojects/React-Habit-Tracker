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

const calcTotals = (monthView, habitList, days) => {
  const year = monthView.getFullYear();
  const month = monthView.getMonth();

  const dayTotalArray = [];
  var weekTotal = 0;
  const weekTotalArray = [];
  var monthTotal = 0;

  for (let day = 0; day < days.length; day++) {
    let dayTotal = 0;
    for (let habit = 0; habit < habitList.length; habit++) {
      if (habitList[habit].data[year][month][day].complete === "complete") {
        dayTotal++;
        weekTotal++;
        monthTotal++;
      }
    }
    if ((day + 1) % 7 === 0) {
      weekTotalArray.push(weekTotal);
      weekTotal = 0;
    }
    dayTotalArray.push(dayTotal);
  }

  return {
    dayTotalArray: dayTotalArray,
    weekTotalArray: weekTotalArray,
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
  const days = [...Array(31).keys()];
  const totals = calcTotals(monthView, habitList, days);
  const [togglePercent, setTogglePercent] = useState();
  return days.map((day) => {
    day += 1;
    return (
      <>
        <tr key={day.toString()}>
          <td className="inactiveCells">{day}</td>
          {listCheckboxes(monthView, habitList, setHabitList, day - 1)}
          {formatTotal(totals.dayTotalArray[day - 1], habitList.length, "day")}
        </tr>

        {day % 7 === 0 ? (
          <tr>
            <td className="inactiveCells" colSpan={habitList.length + 1}>
              Week {day / 7} Total:
            </td>
            {formatTotal(
              totals.weekTotalArray[day / 7 - 1],
              habitList.length * 5,
              "week",
              togglePercent,
              setTogglePercent
            )}
          </tr>
        ) : null}

        {day === days.length ? (
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
