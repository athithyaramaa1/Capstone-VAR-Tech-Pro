const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const slugify = require("slugify");

const createCategoryController = asyncHandler(async (req, res) => {
  const { name } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(409).json({ message: "Category already exists" });
    }

    const category = await Category.create({
      name,
      slug: slugify(name),
    });

    res.status(201).json({ message: "New category created", category });
  } catch (error) {
    console.error("Error in creating category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const updateCategoryController = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Category updated successfully", category });
  } catch (error) {
    console.error("Error in updating category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const getCategoriesController = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({});
    res
      .status(200)
      .json({ message: "All categories retrieved successfully", categories });
  } catch (error) {
    console.error("Error in getting categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const getCategoryController = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.findOne({ slug: req.params.slug });
    res.status(200).json({
      message: "Category requested retrieved successfully",
      categories,
    });
  } catch (error) {
    console.error("Error in getting category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const deleteCategoryController = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error in getting category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = {
  createCategoryController,
  updateCategoryController,
  getCategoriesController,
  getCategoryController,
  deleteCategoryController,
};
