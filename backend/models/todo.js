const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creates schema
const TodoSchema = new Schema({
  action: {
    type: String,
    required: [true, "The todo field is required"],
  },
});

// Creates model
const Todo = mongoose.model("todo", TodoSchema);

module.exports = Todo;
