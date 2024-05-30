const mongoose = require("mongoose");

const Section = new mongoose.Schema({
  sectionName: {
    type: String,
  },

  SubSection: [
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "SubSection",
  ],

  //   Add more fields as needed
});

const User = mongoose.model("Section", Section);
