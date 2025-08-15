const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: String,
  number: Number,
  category: String,
  url: String,
});

module.exports = mongoose.model("Song", songSchema);