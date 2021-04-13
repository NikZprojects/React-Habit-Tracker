import React from "react";
const keys = require("../oauth2keys.json");

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

const signOut = () => {
  const params = {
    client_id: keys.web.client_id,
  };
  window.gapi.auth2.init(params).then((GoogleAuth) => {
    GoogleAuth.signOut();
  });
};

export const Header = ({ user, setUser, monthView, setMonthView }) => (
  <>
    <div className="gridContainer">
      <div></div>
      <div></div>
      <button
        className="buttonLink"
        onClick={() => {
          signOut();
          window.location.reload();
        }}
      >
        Sign out
      </button>
    </div>
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
  </>
);
