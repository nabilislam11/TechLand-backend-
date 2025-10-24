const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  firstName: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
    trim: true,
  },
  rule: {
    type: String,
  },
  verified: {
    default: false,
    type: Boolean,
  },
  otp: {
    type: String,
  },
  otpExpire: {
    type: Date,
  },
  otpAttempts: {
    type: Number,
    default: 0,
  },
  lockUntill: {
    type: Date,
  },
  lastOtp: {
    type: Date,
  },
});
module.exports = mongoose.model("userList", userSchema);
