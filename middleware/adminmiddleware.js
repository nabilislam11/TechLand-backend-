function adminmiddleware(req, res, next) {
  console.log("Admin middleware");
  console.log(req.userInfo.role);
  if (req.userInfo.role !== "admin") {
    return res
      .status(401)
      .json({ success: false, message: "Access Denied.Only admin can access" });
  }
  next();
}
module.exports = adminmiddleware;
