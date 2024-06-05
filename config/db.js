const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      colors.bgGreen.black("MongoDB connected successfully!"),
      colors.green(connect.connection.host),
      colors.green(connect.connection.name)
    );
  } catch (err) {
    console.log(colors.red("Error in connecting"), err);
    process.exit(1);
  }
};

module.exports = connectDB;
