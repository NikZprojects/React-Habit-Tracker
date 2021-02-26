import React from "react";

export const Habit = ({ habit, handleToggle }) => {
  const handleClick = (e) => {
    e.preventDefault();
    handleToggle(e.target.id);
  };

  return (
    <div>
      <div
        onClick={handleClick}
        id={habit.id}
        key={habit.id}
        style={{ habit }}
        className={habit.complete ? "habit + strike" : "habit"}
      >
        {habit.name}
      </div>
    </div>
  );
};
