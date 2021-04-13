const fs = require("fs");
const express = require("express");
//const https = require("https");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const cert = fs.readFileSync("../localhost.pem");
const key = fs.readFileSync("../localhost-key.pem");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.HABIT_DB;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const tokenSignInRouter = require("./routes/tokensignin");
const habitsRouter = require("./routes/habits");

app.use("/tokensignin", tokenSignInRouter);
app.use("/habits", habitsRouter);

// for https in development:
// const server = https.createServer({ key: key, cert: cert }, app);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
