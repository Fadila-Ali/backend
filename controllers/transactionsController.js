const express = require("express");
const transactions = express.Router();
const transactionsArray = require("../models/transactions");
const validateURL = require("../models/validations");

// TRANSACTIONS GET ALL DATA ROUTE
transactions.get("/", (req, res) => {
  res.status(200).json(transactionsArray);
});

// TRANSACTIONS GET ONE OBJECT ROUTE
transactions.get("/:index", (req, res) => {
  const { index } = req.params;
  if (transactionsArray[index]) {
    res.status(200).json(transactionsArray[index]);
  } else {
    res.redirect("/*");
  }
});

// TRANSACTIONS POST TO ADD NEW OBJECT ROUTE
transactions.post("/", validateURL, (req, res) => {
  transactionsArray.push(req.body);
  res.json(transactionsArray[transactionsArray.length - 1]);
});

// TRANSACTIONS PUT TO EDIT DATA ROUTE
transactions.put("/:index", validateURL, (req, res) => {
  if (transactionsArray[req.params.index]) {
    transactionsArray[req.params.index] = req.body;
    res.status(200).json(transactionsArray[req.params.index]);
  } else {
    res.status(404).json({ error: "Not Found" });
  }
});

// TRANSACTIONS DELETE INDEX DATA ROUTE
transactions.delete("/:id", (req, res) => {
  transactionsArray.pop(req.body);
  res.json(transactionsArray.at(0));
});

module.exports = transactions;
