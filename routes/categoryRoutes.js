const express = require("express");
const {
  isAdmin,
  validateToken,
} = require("../middlewares/validateTokenHandler");
const { loginUser } = require("../controllers/userController");
const {
  createCategoryController,
  updateCategoryController,
  getCategoriesController,
  getCategoryController,
  deleteCategoryController,
} = require("../controllers/categoryController");

const router = express.Router();
//create category
router.post(
  "/create-category",
  validateToken,
  isAdmin,
  createCategoryController
);

//update category
router.put(
  "/update-category/:id",
  validateToken,
  isAdmin,
  updateCategoryController
);

//get all categories
router.get("/categories", getCategoriesController);

//get individual categories
router.get("/get-category/:slug", getCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  validateToken,
  isAdmin,
  deleteCategoryController
);
module.exports = router;
