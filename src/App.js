import React, { useEffect, useState } from "react";
import "./App.css";
import { getData } from "./components/GetData"
import { AddHabit } from "./components/AddHabit";
import { HabitList } from "./components/HabitList";

function App() {
  const [habitList, setHabitList] = useState([]);

  useEffect(() => {
    let mounted = true
    getData()
      .then(data => {
        if (mounted) {
          setHabitList(data)
        }
      })
      return () => mounted = false;
  }, [])

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
        habitList.map((habit) => {
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
