import React from "react";
import { Habit } from "./Habit";

export const HabitList = ({ user, habitList, setHabitList }) => {
  return (
    <>
      {habitList.map((habit) => {
        return (
          <Habit
            key={habit._id}
            user={user}
            habit={habit}
            habitList={habitList}
            setHabitList={setHabitList}
          />
        );
      })}
    </>
  );
};
