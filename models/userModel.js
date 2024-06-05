const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the username"],
    },
    email: {
      type: String,
      required: [true, "Please provide the user email"],
      unique: [true, "Email address already exists"],
    },
    password: {
      type: String,
      required: [true, "Please add user password"],
    },
    phone: {
      type: String,
      required: [true, "Please add user phone number"],
    },
    address: {
      type: String,
      required: [true, "Please add user address"],
    },
    question: {
      type: String,
      required: [true, "Please answer the question"],
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);
