const express = require("express");
const colors = require("colors");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");

connectDB();
const app = express();

app.get("/", (req, res) => {
  res.send("Hello!!!");
});

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  console.log(`App started in port ${PORT}`);
});
