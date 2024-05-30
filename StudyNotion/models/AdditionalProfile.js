const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  dateOfBirth: {
    type: Date,
  },

  gender: {
    type: String,
  },

  phoneNumber: {
    type: Number,
    trim: true,
  },

  about: {
    type: String,
    trim: true,
  },

  //   Add more fields as needed
});

const User = mongoose.model("AdditionalProfile", profileSchema);
