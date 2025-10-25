const express = require("express");
const {
  categoryCotroller,
  getAllCategoryController,
  getSingleCategoryCongtroller,
  updateCategoryController,
  deleteCategoryController,
} = require("../../controller/categoryController");
const router = express.Router();

router.post("/create-category", categoryCotroller);
router.get("/get-allcategory", getAllCategoryController);
router.get("/get-singlecategory/:id", getSingleCategoryCongtroller);
router.patch("/update-category/:id", updateCategoryController);
router.delete("/delete-category/:id", deleteCategoryController);

module.exports = router;
