import React, { useEffect, useState } from "react";
import "./App.css";
import { AddHabit } from "./components/AddHabit";
import { HabitList } from "./components/HabitList";
import { WeeklyChecklist } from "./components/WeeklyChecklist";
const axios = require("axios");

function App() {
  const [habitList, setHabitList] = useState([]);
  const [monthView, setMonthView] = useState(new Date());
  const [loaded, setLoaded] = useState();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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

  const handleMonthChange = (action) => {
    const year = monthView.getFullYear();
    const month = monthView.getMonth();

    var newDate;

    if (action === "next") {
      if (monthView.getMonth() === 11) {
        newDate = new Date(year + 1, 0, 1);
      } else {
        newDate = new Date(year, month + 1, 1);
      }
    } else {
      if (monthView.getMonth() === 0) {
        newDate = new Date(year - 1, 11, 1);
      } else {
        newDate = new Date(year, month - 1, 1);
      }
    }
    setMonthView(newDate);
  };

  return (
    <div className="App">
      <div>
        <div className="gridContainer">
          <button
            className="setPrevMonth"
            onClick={() => handleMonthChange("previous")}
          >
            ❮
          </button>
          <h1>
            {months[monthView.getMonth()] + " " + monthView.getFullYear()}
          </h1>
          <button
            className="setNextMonth"
            onClick={() => handleMonthChange("next")}
          >
            ❯
          </button>
        </div>
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
