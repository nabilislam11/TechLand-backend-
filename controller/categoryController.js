const categorySchema = require("../model/categorySchema");

function categoryCotroller(req, res) {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Category name is required",
    });
  }
  try {
    const category = new categorySchema({
      name,
      description,
    });
    category.save();
    return res.status(200).json({
      success: true,
      message: "Create category",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({ message: "Can't create category" });
  }
}
async function getAllCategoryController(req, res) {
  try {
    const getcategory = await categorySchema.find();
    return res.status(200).json({
      success: true,
      message: "Successfully get all catogories  ",
      data: getcategory,
    });
  } catch (error) {
    return res.status(500).json({ message: "Can't find category" });
  }
}
async function getSingleCategoryCongtroller(req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(401).json({
      message: "id is required",
    });
  }
  try {
    const singlecategory = await categorySchema.findById(id);
    return res.status(200).json({
      success: true,
      message: "Successfully get all catogories  ",
      data: singlecategory,
    });
  } catch (error) {
    return res.status(500).json({ message: "Can't find single category" });
  }
}
async function updateCategoryController(req, res) {
  const { id } = req.params;
  const { name, description } = req.body;

  if (!id) {
    return res.status(401).json({
      message: "id is required",
    });
  }
  if (!name) {
    return res.status(401).json({
      message: "name is required",
    });
  }
  if (!description) {
    return res.status(401).json({
      message: "description is required",
    });
  }
  try {
    const updatecategory = await categorySchema.findByIdAndUpdate(
      id,
      { $set: { name, description } },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Successfully update catogories  ",
      data: updatecategory,
    });
  } catch (error) {
    return res.status(500).json({ message: "Can't update category" });
  }
}
async function deleteCategoryController(req, res) {
  const { id } = req.params;
  try {
    const deletecategory = await categorySchema.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Successfully get all catogories  ",
      data: deletecategory,
    });
  } catch (error) {
    return res.status(500).json({ message: "Can't delete category" });
  }
}
module.exports = {
  categoryCotroller,
  getAllCategoryController,
  getSingleCategoryCongtroller,
  updateCategoryController,
  deleteCategoryController,
};
