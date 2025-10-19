const express = require("express");
const router = express.Router();
const authRoute = require("./auth");

router.use("/authentication", authRoute);
module.exports = router;
