const router = require("express").Router();
const { v4: uuid } = require("uuid");

let Habit = require("../models/habit.model");
let UserHabits = require("../models/userHabits.model");

async function getUserData(habitDataID) {
  const userData = await UserHabits.findById(habitDataID);
  return userData;
}

router.route("/").get((req, res) => {
  res.json([
    {
      _id: "001",
      name: "Example habit",
      deleteHabit: false,
      completionData: [],
    },
  ]);
});

router.route("/:habitDataID").get(async (req, res) => {
  try {
    const habitData = await UserHabits.findById(req.params.habitDataID);
    res.json(habitData.habits);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.route("/:habitDataID/add").post(async (req, res) => {
  const name = req.body.name;
  const deleteHabit = false;
  const completionData = [];
  newHabit = new Habit({ name, deleteHabit, completionData });

  try {
    const habitData = await UserHabits.findById(req.params.habitDataID);
    habitData.habits.push(newHabit);
    habitData
      .save()
      .then((userData) => res.json(userData.habits))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.route("/:habitDataID/:id").get(async (req, res) => {
  try {
    const habitData = await UserHabits.findById(req.params.habitDataID);
    const habit = habitData.habits.id(req.params.id);
    res.json(habit);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.route("/:habitDataID/delete").post(async (req, res) => {
  const deleteHabitIDs = await req.body.deleteHabitIDs;
  try {
    let habitData = await UserHabits.findById(req.params.habitDataID);
    let newHabitData = [];
    for (let ID = 0; ID < deleteHabitIDs.length; ID++) {
      habitData.habits.id(deleteHabitIDs[ID]).remove();
    }

    habitData
      .save()
      .then((userData) => res.json(userData.habits))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.route("/:habitDataID/update/:id").post(async (req, res) => {
  try {
    let habitData = await UserHabits.findById(req.params.habitDataID);
    let habit = await habitData.habits.id(req.params.id);
    habit.name = req.body.name || habit.name;
    if (typeof req.body.deleteHabit === "boolean") {
      habit.deleteHabit = req.body.deleteHabit;
    }

    if (req.body.newData) {
      if (
        habit.completionData.find((data) => data.date === req.body.newData.date)
      ) {
        habit.completionData = habit.completionData.map((data) => {
          return data.date === req.body.newData.date ? req.body.newData : data;
        });
      } else {
        habit.completionData.push(req.body.newData);
      }
    } else {
      habit.completionData = habit.completionData;
    }
    habitData.habits.id(req.params.id).set(habit);
    habitData
      .save()
      .then((userData) => res.json(userData.habits))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

module.exports = router;
