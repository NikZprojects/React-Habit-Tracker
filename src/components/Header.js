import React from "react";

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

const handleMonthChange = (action, monthView, setMonthView) => {
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

export const Header = ({ monthView, setMonthView }) => (
  <div className="gridContainer">
    <button
      className="setPrevMonth"
      onClick={() => handleMonthChange("previous", monthView, setMonthView)}
    >
      ❮
    </button>
    <h1>{months[monthView.getMonth()] + " " + monthView.getFullYear()}</h1>
    <button
      className="setNextMonth"
      onClick={() => handleMonthChange("next", monthView, setMonthView)}
    >
      ❯
    </button>
  </div>
);
