const emailVelidation = require("../helpers/emailValidation");
const userSchema = require("../model/userSchema");
const bcrypt = require("bcrypt");
async function registrationController(req, res) {
  console.log(req.body);
  const { firstName, email, role, password } = req.body;
  if (!firstName) {
    return res.json("FirstName is required");
  }
  if (!email) {
    return res.json("Email is required");
  }
  if (!emailVelidation(email)) {
    return res.json("Email is not valid");
  }
  if (!password) {
    return res.json("Password is required");
  }
  try {
    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res.status(404).json({
        message: "This user already registered",
      });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const user = new userSchema({
      firstName: firstName,
      email: email,
      password: hashpassword,
      role: role || "user",
    });
    await user.save();
    res.status(201).json({
      message: "Registration successful",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Registered failed",
    });
  }
}
module.exports = registrationController;
