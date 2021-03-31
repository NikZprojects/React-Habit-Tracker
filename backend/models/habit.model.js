const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const habitSchema = new Schema({
  name: { type: String, required: true },
  deleteHabit: { type: Boolean, required: false },
  completionData: [
    {
      date: { type: String, required: false },
      complete: { type: String, required: false },
    },
  ],
});

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;
