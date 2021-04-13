import React, { useEffect, useState } from "react";
import "./App.css";
import { LogIn } from "./components/LogIn";
import { Header } from "./components/Header";
import { AddHabit } from "./components/AddHabit";
import { DeleteButton } from "./components/DeleteButton";
import { HabitTable } from "./components/HabitTable";
const axios = require("axios");

function App() {
  const [habitList, setHabitList] = useState([]);
  const [monthView, setMonthView] = useState(new Date());
  const [user, setUser] = useState();

  useEffect(() => {
    let mounted = true;
    if (mounted && user && user !== "guest") {
      axios
        .get("https://localhost:5000/habits/" + user.habitDataID)
        .then((response) => {
          setHabitList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (mounted && !user) {
      axios
        .get("https://localhost:5000/habits/")
        .then((response) => {
          setHabitList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return () => (mounted = false);
  }, [user]);

  return (
    <div className="App">
      {!user ? (
        <LogIn setUser={setUser} />
      ) : (
        <>
          <Header
            user={user}
            setUser={setUser}
            monthView={monthView}
            setMonthView={setMonthView}
          />
          <AddHabit
            user={user}
            habitList={habitList}
            setHabitList={setHabitList}
          />
          <DeleteButton
            user={user}
            habitList={habitList}
            setHabitList={setHabitList}
          />
          <HabitTable
            user={user}
            monthView={monthView}
            habitList={habitList}
            setHabitList={setHabitList}
          />
        </>
      )}
    </div>
  );
}
export default App;
