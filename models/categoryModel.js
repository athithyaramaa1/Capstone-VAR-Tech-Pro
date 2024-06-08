const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide the category name"],
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
});

module.exports = mongoose.model("category", categorySchema);