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
      className={habit.month[day].complete}
      key={habit.id + "." + day}
      onClick={() => handleChange(habit.id, day, habitList, setHabitList)}
    >
      {chooseSymbol(habit.month[day].complete)}
    </td>
  ));
  return checkboxes;
};

export const WeeklyChecklist = ({ habitList, setHabitList }) => {
  const days = [...Array(31).keys()];
  const listDays = days.map((day) => (
    <tr key={(day + 1).toString()} value={day + 1}>
      <td>{day + 1}</td>
      {listCheckboxes(habitList, setHabitList, day)}
    </tr>
  ));
  //console.log(habitList[0].status.listStatus[0].complete);
  return <>{listDays}</>;
};
