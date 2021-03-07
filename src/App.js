import React, { useEffect, useState } from "react";
import "./App.css";
import { getData, setData } from "./components/GetData";
import { AddHabit } from "./components/AddHabit";
import { HabitList } from "./components/HabitList";
import { WeeklyChecklist } from "./components/WeeklyChecklist";

function App() {
  const [habitList, setHabitList] = useState([]);

  useEffect(() => {
    if (habitList.length > 0) {
      setData(habitList);
    } else {
      let mounted = true;
      getData().then((data) => {
        if (mounted) {
          setHabitList(data);
        }
      });
      return () => (mounted = false);
    }
  }, [habitList]);

  const handleToggle = (id) => {
    setHabitList(
      habitList.map((habit) => {
        if (habit.id.toString() === id) {
          habit = { ...habit, complete: !habit.complete };
          return habit;
        } else {
          return { ...habit };
        }
      })
    );
  };

  const handleDelete = () => {
    setHabitList(
      habitList.filter((habit) => {
        return !habit.complete ? { habit } : "";
      })
    );
  };

  return (
    <div className="App">
      <h1>March 2021</h1>
      <div>{`\n`}</div>
      <h3>
        Add a habit:
        <AddHabit habitList={habitList} setHabitList={setHabitList} />
      </h3>
      <table>
        <thead>
          <tr>
            <th></th>
            <HabitList habitList={habitList} handleToggle={handleToggle} />
          </tr>
        </thead>
        <tbody>
          <WeeklyChecklist habitList={habitList} setHabitList={setHabitList} />
        </tbody>
      </table>
      <button onClick={handleDelete}>Delete crossed off habits</button>
    </div>
  );
}

export default App;
