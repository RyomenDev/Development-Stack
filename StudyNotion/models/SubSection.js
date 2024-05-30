const mongoose = require("mongoose");

const SubSection = new mongoose.Schema({
  title:{
    type: String,
  },
  timeDuration:{
      type: string,
  },
  description:{
      type: String,
  }
  videoUrl:{
      type: String,
  }
  //   Add more fields as needed
});

const User = mongoose.model("SubSection", SubSection);
