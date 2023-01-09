const express = require("express");
const app = express();
const router = express.Router();
const morgan = require("morgan");
const cors = require("cors");
const transactions = require("./controllers/transactionsController");

app.use((req, res, next) => {
  console.log("This code runs for every request!");
  next();
});

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use("/transactions", transactions);

// Home
app.get("/", (req, res) => {
  res.send("Welcome to your Budget App!");
});

// 404 ERROR PAGE
app.get("*", (req, res) => {
  res.status(404).json({ error: "Page not found" });
});

module.exports = app;
