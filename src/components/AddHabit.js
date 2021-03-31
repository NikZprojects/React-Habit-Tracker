import React, { useState } from "react";
const axios = require("axios");

export const AddHabit = ({ habitList, setHabitList }) => {
  const [userInput, setUserInput] = useState("");

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newHabit = {
      name: userInput,
      deleteHabit: false,
      completionData: [],
    };

    axios
      .post("http://localhost:5000/habits/add", newHabit)
      .then((res) => setHabitList(res.data));
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
