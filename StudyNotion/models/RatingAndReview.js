const mongoose = require("mongoose");

const RatingAndReview = new mongoose.Schema({
 user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
 }
 rating:{
    type: Number,
    required: true,
 }
 review:{
     type: String,
     required: true,
 }
  //   Add more fields as needed
});

const User = mongoose.model("RatingAndReview", RatingAndReview);
