import React, { useEffect, useState } from "react";
import "./App.css";
import { getData, setData } from "./components/GetData";
import { AddHabit } from "./components/AddHabit";
import { HabitList } from "./components/HabitList";
import { WeeklyChecklist } from "./components/WeeklyChecklist";

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
          habit = { ...habit, delete: !habit.delete };
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
        return !habit.delete ? { ...habit } : null;
      })
    );
  };

  const handleMonthChange = async (action) => {
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

    const newYear = newDate.getFullYear();
    const newMonth = newDate.getMonth();
    const newDays = 32 - new Date(newYear, newMonth, 32).getDate();

    const generateMonthData = () => {
      const daysArray = [...Array(newDays).keys()];
      const monthData = daysArray.map((day) => ({
        day: day + 1,
        complete: "",
      }));
      return monthData;
    };

    for (let habit = 0; habit < habitList.length; habit++) {
      if (!habitList[habit].data[newYear]) {
        await setHabitList(
          habitList.map((habit) => {
            habit.data[newYear] = { [newMonth]: generateMonthData() };
            return { ...habit };
          })
        );
      } else if (!habitList[habit].data[newYear][newMonth]) {
        await setHabitList(
          habitList.map((habit) => {
            habit.data[newYear][newMonth] = generateMonthData();
            return { ...habit };
          })
        );
      }
    }
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
          <AddHabit
            monthView={monthView}
            habitList={habitList}
            setHabitList={setHabitList}
          />
        </h3>
        {habitList.some((habit) => habit.delete) ? (
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
