const router = require("express").Router();
let Habit = require("../models/habit.model");

router.route("/").get((req, res) => {
  Habit.find()
    .then((habits) => res.json(habits))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const deleteHabit = false;
  const completionData = [];

  const newHabit = new Habit({
    name,
    deleteHabit,
    completionData,
  });

  newHabit
    .save()
    .then(() =>
      Habit.find()
        .then((habits) => res.json(habits))
        .catch((err) => res.status(400).json("Error: " + err))
    )
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Habit.findById(req.params.id)
    .then((habit) => res.json(habit))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Habit.findByIdAndDelete(req.params.id)
    .then(() => res.json("Habit deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Habit.findById(req.params.id)
    .then((habit) => {
      habit.name = req.body.name || habit.name;
      if (typeof req.body.deleteHabit === "boolean") {
        habit.deleteHabit = req.body.deleteHabit;
      }
      var updated = false;
      if (req.body.newData) {
        if (
          !habit.completionData.find(
            (data) => data.date === req.body.newData.date
          )
        ) {
          habit.completionData.push(req.body.newData);
        } else {
          habit.completionData = habit.completionData.map((data) => {
            return data.date === req.body.newData.date
              ? req.body.newData
              : data;
          });
        }
      } else {
        habit.completionData = habit.completionData;
      }
      habit.save();
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
