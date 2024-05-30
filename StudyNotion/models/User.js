const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountType: {
      type: String,
      enum: ["Admin", "Student","Instructor"],
      required: true,
  },

  // additional details
  additionalDetails:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "AdditionalProfile",
    required: true,
  },

  // courses section 
  courses:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  
  // image section
  image:{
      type:String, // url
  }

  // course progress
  courseProgress:{
      type:mongoose.Schema.Types.ObjectId,
      ref: "CourseProgress",
      required: true,
  },

// course completion
//   courseCompletion:{
//     type:mongoose.Schema.Types.ObjectId,
//     ref: "CourseCompletion",
//     required: true,
//   }

// Add more fields as needed
});

const User = mongoose.model("User", userSchema);
