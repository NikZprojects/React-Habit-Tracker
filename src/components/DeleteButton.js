import React from "react";
const axios = require("axios");

const handleDelete = (habitList, setHabitList) => {
  setHabitList(
    habitList.filter((habit) => {
      if (!habit.deleteHabit) {
        return { ...habit };
      } else {
        axios.delete("https://localhost:5000/habits/" + habit._id);
        return null;
      }
    })
  );
};

export const DeleteButton = ({ habitList, setHabitList }) => {
  if (habitList.some((habit) => habit.deleteHabit)) {
    return (
      <div>
        <button
          className="deleteButton"
          onClick={() => handleDelete(habitList, setHabitList)}
        >
          Delete habit?
        </button>
      </div>
    );
  } else {
    return "";
  }
};
