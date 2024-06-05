const express = require("express");
const colors = require("colors");
const cors = require("cors");
const dotenv = require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello!!!");
});
app.listen(PORT, () => {
  console.log(`App started in port ${PORT}`);
});
