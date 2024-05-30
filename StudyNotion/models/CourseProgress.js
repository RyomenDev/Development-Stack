const mongoose = require("mongoose");

const CourseProgress = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  completedVideos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSection",
    },
  ],
  //   Add more fields as needed
});

const User = mongoose.model("CourseProgress", CourseProgress);
