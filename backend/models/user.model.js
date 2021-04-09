const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userid: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  picture: { type: String, required: false },
  habitData: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
