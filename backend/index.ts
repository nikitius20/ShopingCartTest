const express = require("express");
const mongoose = require("mongoose");

const app = express();

//mongoose.connect();

app.use(express.json());

app.listen(3001, () => {
  console.log("server is running");
});
