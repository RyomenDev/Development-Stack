const express = require("express");
const router = express.Router();

const {
  login,
  signup,
  sendOtp,
  changePassword,
} = require("../Controller/Auth");
const {
  resetPasswordToken,
  resetPassword,
} = require("../Controller/ResetPassword");

const { auth } = require("../Middleware/Auth");

router.post("/login", login);

router.post("/signup", signup);

router.post("/sendOtp", sendOtp);

router.post("/changePassword", auth, changePassword);

router.post("/reset-password-token", resetPasswordToken);

router.post("/reset-password", resetPassword);

module.exports = router;
