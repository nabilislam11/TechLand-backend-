const express = require("express");
const authMiddleware = require("../../middleware/authmiddleware");
const router = express.Router();
router.get("/welcome", authMiddleware, (req, res) => {
  const { userid, firstName, email, role } = req.userInfo;
  return res.status(201).json({
    success: true,
    message: "welcom to user dashboard",
    data: { _id: userid, firstName: firstName, email: email, role: role },
  });
});

module.exports = router;
