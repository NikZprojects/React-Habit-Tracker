import React, { useState } from "react";
import { v4 as uuid } from "uuid";

export const HabitTracker = () => {
  const [habit, addHabit] = React.useState("");

  const handleChange = (e) => {
    addHabit(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addHabit(habit);
    addHabit("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={habit}
          type="text"
          placeholder="Add a habit..."
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Add Habit</button>
      </form>
    </div>
  );
};
