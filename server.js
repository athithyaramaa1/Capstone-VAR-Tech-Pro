const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv").config();
const bodyparser = require("body-parser");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");

connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

app.get("/", (req, res) => {
  res.send("Hello!!!");
});

const PORT = process.env.PORT || 5004;
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App started in port ${PORT}`);
});
