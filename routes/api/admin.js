const express = require("express");
const authMiddleware = require("../../middleware/authmiddleware");
const adminmiddleware = require("../../middleware/adminmiddleware");
const router = express.Router();
router.get("/admindashbaord", authMiddleware, adminmiddleware, (req, res) => {
  res
    .status(200)
    .json({
      success: true,
      message: `welcome to admin dashboard ${req.userInfo.firstName} `,
    });
});

module.exports = router;
