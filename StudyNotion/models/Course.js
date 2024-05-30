const mongoose = require("mongoose");

const Course = new mongoose.Schema({
  courseName: {
    type: String,
    trim: true,
  },

  courseDescription: {
    type: String,
    trim: true,
  },

  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  whatYouWillLearn: {
    type: String,
    trim: true,
  },

  courseContent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
  ],

  courseContent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingAndReview",
    },
  ],

  price: {
      type: Number,
  }

  thumbnail:{
    type: String,
  }

  tag:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "Tag",
  }

  studentsEnrolled:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
  ]
  //   Add more fields as needed
});

const User = mongoose.model("Course", Course);
