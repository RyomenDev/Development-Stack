const mongoose = require("mongoose");

const Tags = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },

  //   Add more fields as needed
});

const User = mongoose.model("Tags", Tags);
