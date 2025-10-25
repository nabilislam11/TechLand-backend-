const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const emailVelidation = require("../helpers/emailValidation");
const userSchema = require("../model/userSchema");

async function loginController(req, res) {
  console.log(req, res);
  const { email, password } = req.body;
  if (!email) {
    return res.status(404).json({ message: "Email is required" });
  } else if (!emailVelidation(email)) {
    return res.status(404).json({ message: "Email is not valid" });
  }
  if (!password) {
    return res.status(404).json({ message: "Password is required" });
  }
  try {
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "This user is not registered with us" });
    }
    if (!user.verified) {
      return res
        .status(404)
        .json({ message: "Email is not verified.Please verify your email" });
    }
    const isMatch = bcrypt.compare(password, user.password);

    const accessToken = jwt.sign(
      {
        userid: user._id,
        firstName: user.firstName,
        email: user.email,
        role: user.role,
      },
      "techlandapi",
      { expiresIn: "10min" }
    );
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    } else {
      res.status(200).json({
        messege: "Login successful",

        accessToken: accessToken,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
}
module.exports = loginController;
