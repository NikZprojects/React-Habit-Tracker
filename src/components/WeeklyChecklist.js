import React from "react";

const handleChange = (id, day, habitList, setHabitList) => {
  setHabitList(
    habitList.map((habit) => {
      if (habit.id.toString() === id) {
        let completeStatus = habit.month[day].complete;
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
        habit.month[day].complete = completeStatus;
        return { ...habit };
      } else {
        return { ...habit };
      }
    })
  );
};

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

const listCheckboxes = (habitList, setHabitList, day) => {
  let checkboxes = habitList.map((habit) => (
    <td
      className={`${habit.month[day].complete} + hoverable`}
      key={habit.id + "." + day}
      onClick={() => handleChange(habit.id, day, habitList, setHabitList)}
    >
      {chooseSymbol(habit.month[day].complete)}
    </td>
  ));
  return checkboxes;
};

const calcDayTotal = (habitList, days) => {
  const dayTotalArray = [];
  const brightnessArray = [];
  for (let day = 0; day < days.length; day++) {
    let dayTotal = 0;
    for (let habit = 0; habit < habitList.length; habit++) {
      if (habitList[habit].month[day].complete === "complete") {
        dayTotal++;
      }
    }
    dayTotalArray.push(dayTotal);
    brightnessArray.push(dayTotal / habitList.length);
  }
  return { dayTotal: dayTotalArray, brightness: brightnessArray };
};

const weeklyTotal = (habits, day, dayTotalArray) => {
  day += 1;
  if ((day > 0 && day % 7 === 0) || day === dayTotalArray.length) {
    let weekTotal = 0;
    let monthTotal = 0;
    if (day === dayTotalArray.length) {
      for (let count = day - (day % 7); count < day; count++) {
        weekTotal += dayTotalArray[count];
      }
      for (let count = 0; count < day; count++) {
        monthTotal += dayTotalArray[count];
      }
    } else {
      for (let count = day - 7; count < day; count++) {
        weekTotal += dayTotalArray[count];
      }
    }

    return (
      <>
        {day !== dayTotalArray.length ? (
          <tr>
            <td className="inactiveCells" colSpan={habits + 1}>
              Week {day / 7} Total:
            </td>
            <td
              style={
                weekTotal === 0
                  ? { backgroundColor: "#333f4f" }
                  : {
                      backgroundColor: `rgb(0,156,57,${
                        weekTotal / (habits * 5)
                      }`,
                    }
              }
            >
              {weekTotal}
            </td>
          </tr>
        ) : (
          <>
            <tr>
              <td className="inactiveCells" colSpan={habits + 1}>
                Final Week Total:
              </td>
              <td
                style={
                  weekTotal === 0
                    ? { backgroundColor: "#333f4f" }
                    : {
                        backgroundColor: `rgb(0,156,57,${
                          weekTotal / (habits * 5)
                        }`,
                      }
                }
              >
                {weekTotal}
              </td>
            </tr>
            <tr>
              <td className="inactiveCells" colSpan={habits + 1}>
                Month Total:
              </td>
              <td
                style={
                  monthTotal === 0
                    ? { backgroundColor: "#333f4f" }
                    : {
                        backgroundColor: `rgb(0,156,57,${
                          monthTotal / (habits * 5 * (dayTotalArray.length / 7))
                        }`,
                      }
                }
              >
                {monthTotal}
              </td>
            </tr>
          </>
        )}
      </>
    );
  }
};

export const WeeklyChecklist = ({ habitList, setHabitList }) => {
  const days = [...Array(31).keys()];
  const dayTotalArray = calcDayTotal(habitList, days).dayTotal;
  const listDays = days.map((day) => (
    <>
      <tr key={(day + 1).toString()} value={day + 1}>
        <td className="inactiveCells">{day + 1}</td>
        {listCheckboxes(habitList, setHabitList, day)}
        <td
          style={{
            backgroundColor: `rgb(0,156,57,${
              calcDayTotal(habitList, days).brightness[day]
            }`,
          }}
        >
          {dayTotalArray[day]}
        </td>
      </tr>
      {weeklyTotal(habitList.length, day, dayTotalArray)}
    </>
  ));
  return <>{listDays}</>;
};
