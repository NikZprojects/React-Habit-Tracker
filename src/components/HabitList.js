import React from "react";
import { Habit } from "./Habit";

export const HabitList = ({ habitList, setHabitList }) => {
  return (
    <>
      {habitList.map((habit) => {
        return (
          <Habit
            key={habit._id}
            habit={habit}
            habitList={habitList}
            setHabitList={setHabitList}
          />
        );
      })}
    </>
  );
};
