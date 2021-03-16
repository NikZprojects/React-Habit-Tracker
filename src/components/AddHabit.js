import React, { useState } from "react";
import { v4 as uuid } from "uuid";

export const AddHabit = ({ monthView, habitList, setHabitList }) => {
  const [userInput, setUserInput] = useState("");

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const year = monthView.getFullYear();
    const month = monthView.getMonth();
    const days = [...Array(31).keys()];
    const monthData = days.map((day) => ({
      day: day,
      complete: "",
    }));
    const data = { [year]: { [month]: monthData } };

    let newHabit = {
      id: uuid(),
      name: userInput,
      delete: false,
      data: data,
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
          placeholder=""
          onChange={handleChange}
        />
      </form>
    </div>
  );
};
