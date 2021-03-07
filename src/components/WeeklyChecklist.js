import React from "react";

const week = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const habitCheckbox = (habitList) => {
  var checkboxes = [];
  for (let habit = 0; checkboxes.length < habitList.length; habit++) {
    checkboxes.push(
      <td key={habit.id}>
        <input type="checkbox"></input>
      </td>
    );
  }
  return checkboxes;
};

export const WeeklyChecklist = ({ habitList }) => {
  const createChecklist = () => {
    var checklist = [];
    for (let day = 0; checklist.length < week.length; day++) {
      checklist.push(
        <tr key={day}>
          <td>{week[day]}</td>
          {habitCheckbox(habitList)}
        </tr>
      );
    }
    return checklist;
  };
  return <>{createChecklist()}</>;
};
