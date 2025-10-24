const mongoose = require("mongoose");
const emailVerification = require("../helpers/emailVarification");
const userSchema = require("../model/userSchema");
const crypto = require("crypto");
async function sentOtp(req, res) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      error: "Email is required",
    });
  }
  try {
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "This user is not register with us" });
    }
    if (user.verified) {
      return res
        .status(404)
        .json({ message: "This account is already verified" });
    }
    if (user.lockUntill && user.lockUntill > new Date()) {
      return res
        .status(404)
        .json({ message: "Your account is locked.Please wait a minute" });
    }
    if (user.lastOtp && user.lastOtp.getTime() > Date.now() - 60000) {
      return res.status(404).json({
        message: `1 minutes cool down ${(
          60 -
          (Date.now() - user.lastOtp.getTime()) / 1000
        ).toFixed(1)} second`,
      });
    }
    const otp = crypto.randomInt(10000, 99999).toString();
    await userSchema.findOneAndUpdate(
      { email },
      {
        otp,
        otpExpire: new Date(Date.now() + 2 * 1000 * 60),
        lastOtp: new Date(),
        lockUntill: null,
      },
      { new: true }
    );
    await emailVerification(email, otp);
    return res.status(200).json({ message: "Otp sent successfull" });
  } catch (error) {
    return res.status(500).json({
      error: "Server error",
      error: error.message,
    });
  }
}
async function verifyOtp(req, res) {
  const { email, otp } = req.body;
  console.log(email, otp);
  if (!email || !otp) {
    return res.status(404).json({
      message: "Email & otp is required",
    });
  }
  try {
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(204).json({ message: "User not find" });
    }
    if (user.verified) {
      return res.status(400).json({ message: "This user is already verified" });
    }
    if (user.lockUntill && user.lockUntill > new Date()) {
      return res
        .status(404)
        .json({ message: "Your account is locked.You must waot" });
    }
    if (!user.otp || !user.otpExpire) {
      return res.status(404).json({
        message:
          "Req new OTP cause in DB these fields(otp , otpExpire) not exist",
      });
    }
    if (user.otpExpire < Date.now()) {
      return res.status(404).json({ message: "Your otp is expired" });
    }
    const isMatch = user.otp === otp; //chaiking otp match
    if (!isMatch) {
      user.otpAttempts += 1;
      if (user.otpAttempts >= 3) {
        user.lockUntill = new Date(Date.now() + 10 * 60 * 1000);
        //lock for 10 minutes
      }
      await user.save();
      return res.status(404).json({ message: "Invalid otp" });
    }
    await userSchema.findOneAndUpdate(
      { email },
      {
        $set: { verified: true, otpAttempts: 0 },
        $unset: { otp: "", otpExpire: "", lockUntill: "", lastOtp: "" },
      },
      { new: true }
    );
    res.json({
      messege: "user verified",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
}
module.exports = { sentOtp, verifyOtp };
