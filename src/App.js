import React, { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { AddHabit } from "./components/AddHabit";
import { DeleteButton } from "./components/DeleteButton";
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

  return (
    <div className="App">
      <div>
        <Header monthView={monthView} setMonthView={setMonthView} />
        <AddHabit habitList={habitList} setHabitList={setHabitList} />
        <DeleteButton habitList={habitList} setHabitList={setHabitList} />

        <table>
          <thead>
            <tr>
              <th className="inactiveCells"></th>
              <HabitList habitList={habitList} setHabitList={setHabitList} />
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
