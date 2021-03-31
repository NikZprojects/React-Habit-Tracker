import React from "react";

export const Habit = ({ habit, handleToggle }) => {
  const handleClick = (e) => {
    e.preventDefault();
    handleToggle(e.target.id);
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
