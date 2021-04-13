import React from "react";

const handleToggle = (id, habitList, setHabitList) => {
  setHabitList(
    habitList.map((habit) => {
      if (habit._id.toString() === id) {
        habit = { ...habit, deleteHabit: !habit.deleteHabit };
        return habit;
      } else {
        return { ...habit };
      }
    })
  );
};

export const Habit = ({ user, habit, habitList, setHabitList }) => {
  const handleClick = (e) => {
    e.preventDefault();
    handleToggle(e.target.id, habitList, setHabitList);
  };

  return (
    <th
      onClick={handleClick}
      id={habit._id}
      key={habit._id}
      style={{ habit }}
      className={
        habit.deleteHabit
          ? "inactiveCells + habit + strike"
          : "inactiveCells + habit"
      }
    >
      {habit.name}
    </th>
  );
};
