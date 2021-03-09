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
      <h3>
        Add a habit:
        <AddHabit habitList={habitList} setHabitList={setHabitList} />
      </h3>
      {habitList.some((habit) => habit.complete) ? (
        <div>
          <button onClick={handleDelete}>Delete habit?</button>
        </div>
      ) : (
        ""
      )}
      <table>
        <thead>
          <tr>
            <th></th>
            <HabitList habitList={habitList} handleToggle={handleToggle} />
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <WeeklyChecklist habitList={habitList} setHabitList={setHabitList} />
        </tbody>
      </table>
    </div>
  );
}

export default App;
