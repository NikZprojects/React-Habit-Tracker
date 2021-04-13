import React from "react";
import { HabitList } from "./HabitList";
import { MonthChecklist } from "./MonthChecklist";

export const HabitTable = ({ user, monthView, habitList, setHabitList }) => (
  <div>
    <table>
      <thead>
        <tr>
          <th className="inactiveCells"></th>
          <HabitList
            user={user}
            habitList={habitList}
            setHabitList={setHabitList}
          />
          <th className="inactiveCells">Total</th>
        </tr>
      </thead>
      <tbody>
        <MonthChecklist
          user={user}
          monthView={monthView}
          habitList={habitList}
          setHabitList={setHabitList}
        />
      </tbody>
    </table>
    <div className="padding"></div>
  </div>
);
