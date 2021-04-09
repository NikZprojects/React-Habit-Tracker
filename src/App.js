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
  const [userID, setUserID] = useState();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
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
  }, []);

  return (
    <div className="App">
      {!userID ? (
        <LogIn setUserID={setUserID} />
      ) : (
        <>
          <Header
            userID={userID}
            setUserID={setUserID}
            monthView={monthView}
            setMonthView={setMonthView}
          />
          <AddHabit habitList={habitList} setHabitList={setHabitList} />
          <DeleteButton habitList={habitList} setHabitList={setHabitList} />
          <HabitTable
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
