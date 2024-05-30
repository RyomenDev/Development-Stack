/*
schema
description of data that will be stored in database

*/

const mongoose = require("mongoose");

// creating schema for todo
const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    maxLength: 50,
    required: true,
  },
  description: {
    type: String,
    maxLength: 50,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});


// exporting as mode;
module.exports = mongoose.model("Todo", TodoSchema); // (name,schema) exporting todoSchema as Todo
