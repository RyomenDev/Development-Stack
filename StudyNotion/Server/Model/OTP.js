const mongoose = require("mongoose");
const mailSender = require("../Util/MailSender");
const emailTemplate = require("../Mail/Template/EmailVerification");

const OTPSchema = new mongoose.Schema({
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
    expires: 60 * 5, // 5 min
  },
});

// email verification before DB entry
async function sendVerificationEmail(email, otp) {
  try {
    // (email,title,otpToSend)
    await mailSender(email, "Verification Email", emailTemplate(otp));
  } catch (error) {
    console.log("error occurred while sending mail", error);
    throw error;
  }
}

// before saving document
OTPSchema.pre("save", async function (next) {
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;
