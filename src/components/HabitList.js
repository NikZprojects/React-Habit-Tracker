import React from "react";
import { Habit } from "./Habit";

export const HabitList = ({ habitList, handleToggle }) => {
  return (
    <>
      {habitList.map((habit) => {
        return (
          <Habit key={habit._id} handleToggle={handleToggle} habit={habit} />
        );
      })}
    </>
  );
};
