const express = require("express");
const app = express();
const router = express.Router();
const morgan = require("morgan");
const cors = require("cors");
const transactions = require("./controllers/transactionsController");
const uuid = require("uuid");
console.log(`Here is a test v1 uuid: ${uuid.v1()}`);
console.log(`Here is a test v4 uuid: ${uuid.v4()}`);

app.use((req, res, next) => {
  console.log("This code runs for every request!");
  next();
});

const id = uuid.v4();
// const transactionsPlusId = transactions
// .map((transaction) => ({
//   id,
//   ...transaction,
// }));
// console.log(transactionsPlusId);

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
