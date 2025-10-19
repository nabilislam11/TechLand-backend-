const express = require("express");
const registrationController = require("../../controller/registrationController");
const { sentOtp, verifyOtp } = require("../../controller/otpController");
const router = express.Router();
router.post("/registration", registrationController);
router.post("/sent-otp", sentOtp);
router.post("/verify-otp", verifyOtp);
module.exports = router;
