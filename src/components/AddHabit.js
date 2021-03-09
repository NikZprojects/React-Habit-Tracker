import React, { useState } from "react";
import { v4 as uuid } from "uuid";

export const AddHabit = ({ habitList, setHabitList }) => {
  const [userInput, setUserInput] = useState("");

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const days = [...Array(31).keys()];
    const month = days.map((day) => ({
      day: day,
      complete: "",
    }));

    let newHabit = {
      id: uuid(),
      name: userInput,
      complete: false,
      month: month,
    };
    console.log(newHabit);
    setHabitList([...habitList, newHabit]);
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
      </form>
    </div>
  );
};
