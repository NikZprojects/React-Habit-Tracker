import React, { useState } from "react";
import "./App.css";
import data from "./data.json";
import { AddHabit } from "./components/AddHabit";
import { HabitList } from "./components/HabitList";

function App() {
  const [habitList, setHabitList] = useState(data);

  const handleToggle = (id) => {
    setHabitList(
      habitList.map((habit) => {
        if (habit.id.toString() === id) {
          return { ...habit, complete: !habit.complete };
        } else {
          return { ...habit };
        }
      })
    );
  };

  const handleDelete = () => {
    if (habitList.length > 0) {
      setHabitList(
        habitList.filter((habit) => {
          return !habit.complete ? { habit } : "";
        })
      );
    } else {
      setHabitList(
        data.map((habit) => {
          return !habit.complete ? { ...habit } : { ...habit, complete: false };
        })
      );
    }
  };

  return (
    <div className="App">
      <h1>Habit Tracker</h1>
      <h2>Add Habit:</h2>
      <AddHabit habitList={habitList} setHabitList={setHabitList} />
      <h2>Current Habits:</h2>
      <button onClick={handleDelete}>Delete completed habits</button>
      <div>{`\n`}</div>
      <HabitList habitList={habitList} handleToggle={handleToggle} />
    </div>
  );
}

export default App;
