const mongoose = require("mongoose");

const OTP = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 5 * 60, // 5 minutes
  },
  //   Add more fields as needed
});

// function -> to send emails
async sendVerificationEmail(email, otp) => {
  try{
    const mailResponse = await mailSender(email,"Verification Email from StudyNotion",`Your OTP is ${otp}`);
    console.log("mail send successfully ",mailResponse);
  }
  catch(error){
    console.log("error occurred while sending mail");
    throw error;
  }
}

OTPSchema.pre("save", async function (next) {
  
}

const User = mongoose.model("OTP", OTP);
