import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { setData } from "./GetData"

export const AddHabit = ({ habitList, setHabitList }) => {
  const [userInput, setUserInput] = useState("");

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newHabit = { id: uuid(), name: userInput, complete: false }
    setData(newHabit);
    setHabitList([...habitList, newHabit])
    setUserInput("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={userInput}
          type="text"
          placeholder="Add a habit..."
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Add Habit</button>
      </form>
    </div>
  );
};
