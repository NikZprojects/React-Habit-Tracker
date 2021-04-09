const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userHabitSchema = new Schema({
  userid: { type: String, required: true },
  habits: { type: Array, required: true },
});

const UserHabit = mongoose.model("UserHabit", userHabitSchema);

module.exports = UserHabit;
