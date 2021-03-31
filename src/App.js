import React, { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { AddHabit } from "./components/AddHabit";
import { HabitList } from "./components/HabitList";
import { WeeklyChecklist } from "./components/WeeklyChecklist";
const axios = require("axios");

function App() {
  const [habitList, setHabitList] = useState([]);
  const [monthView, setMonthView] = useState(new Date());
  const [loaded, setLoaded] = useState();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      axios
        .get("http://localhost:5000/habits/")
        .then((response) => {
          setHabitList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return () => (mounted = false);
  }, []);

  const handleToggle = (id) => {
    setHabitList(
      habitList.map((habit) => {
        if (habit._id.toString() === id) {
          habit = { ...habit, deleteHabit: !habit.deleteHabit };
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
        if (!habit.deleteHabit) {
          return { ...habit };
        } else {
          axios
            .delete("http://localhost:5000/habits/" + habit._id)
            .then((response) => {
              console.log(response.data);
            });
          return null;
        }
      })
    );
  };

  return (
    <div className="App">
      <div>
        <Header monthView={monthView} setMonthView={setMonthView} />

        <h3>
          Add a habit:
          <AddHabit habitList={habitList} setHabitList={setHabitList} />
        </h3>

        {habitList.some((habit) => habit.deleteHabit) ? (
          <div>
            <button className="deleteButton" onClick={handleDelete}>
              Delete habit?
            </button>
          </div>
        ) : (
          ""
        )}

        <table>
          <thead>
            <tr>
              <th className="inactiveCells"></th>
              <HabitList habitList={habitList} handleToggle={handleToggle} />
              <th className="inactiveCells">Total</th>
            </tr>
          </thead>
          <tbody>
            <WeeklyChecklist
              monthView={monthView}
              habitList={habitList}
              setHabitList={setHabitList}
            />
          </tbody>
        </table>
        <div className="padding"></div>
      </div>
    </div>
  );
}
export default App;
