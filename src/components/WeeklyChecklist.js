import React from "react";

const handleChange = (id, day, habitList, setHabitList) => {
  setHabitList(
    habitList.map((habit) => {
      if (habit.id.toString() === id) {
        habit.month[day].complete = !habit.month[day].complete;
        return { ...habit };
      } else {
        return { ...habit };
      }
    })
  );
};

const listCheckboxes = (habitList, setHabitList, day) => {
  let checkboxes = habitList.map((habit) => (
    <td key={habit.id}>
      <input
        key={habit.id}
        id={habit.id + "." + day}
        type="checkbox"
        onChange={() => handleChange(habit.id, day, habitList, setHabitList)}
        checked={habit.month[day].complete}
      ></input>
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
