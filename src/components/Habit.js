import React from "react";

export const Habit = ({ habit, handleToggle }) => {
  const handleClick = (e) => {
    e.preventDefault();
    handleToggle(e.target.id);
  };

  return (
    <th
      onClick={handleClick}
      id={habit.id}
      key={habit.id}
      style={{ habit }}
      className={
        habit.delete
          ? "inactiveCells + habit + strike"
          : "inactiveCells + habit"
      }
    >
      {habit.name}
    </th>
  );
};
