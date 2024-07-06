const User = require("../Model/User");
const mailSender = require("../Util/MailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

exports.resetPasswordToken = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({
        success: false,
        message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
      });
    }

    // generate TOKEN
    // const token = crypto.randomBytes(20).toString("hex");
    const token = crypto.randomUUID();

    const updatedDetails = await User.findOneAndUpdate(
      { email: email }, // criteria of search
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000, // 5 min
      },
      { new: true } // updated document return in response
    );
    console.log("DETAILS", updatedDetails);

    const url = `http://localhost:3000/update-password/${token}`; //frontend link, token passed as parameter
    // const url = `https://studynotion-edtech-project.vercel.app/update-password/${token}`;

    // send mail with url
    await mailSender(
      email,
      "Password Reset",
      `Your Link for email verification is ${url}. Please click this url to reset your password.`
    );

    res.json({
      success: true,
      message:
        "Email Sent Successfully, Please Check Your Email to Continue Further",
    });
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: `Some Error in Sending the Reset Message`,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body; // req from frontend -  BODY

    if (confirmPassword !== password) {
      return res.json({
        success: false,
        message: "Password and Confirm Password Does not Match",
      });
    }

    // get userDetails from DB using TOKEN
    const userDetails = await User.findOne({ token: token }); // from DB
    if (!userDetails) {
      return res.json({
        success: false,
        message: "Token is Invalid",
      });
    }

    // token time-check
    if (!(userDetails.resetPasswordExpires > Date.now())) {
      return res.status(403).json({
        success: false,
        message: `Token is Expired, Please Regenerate Your Token`,
      });
    }

    // hash Password
    const encryptedPassword = await bcrypt.hash(password, 10);
    // update Password
    await User.findOneAndUpdate(
      { token: token }, // searching criteria
      { password: encryptedPassword }, // what to update
      { new: true } // what to return
    );
    res.json({
      success: true,
      message: `Password Reset Successful`,
    });
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: `Some Error in Updating the Password`,
    });
  }
};
