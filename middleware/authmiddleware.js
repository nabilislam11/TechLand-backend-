const jwt = require("jsonwebtoken");
async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token, "token");
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access Denied.Token is required" });
  }
  try {
    const decodedToken = await jwt.verify(token, "techlandapi");
    req.userInfo = decodedToken;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
module.exports = authMiddleware;
