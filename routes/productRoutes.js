const express = require("express");
const formidable = require("express-formidable");

const {
  validateToken,
  isAdmin,
} = require("../middlewares/validateTokenHandler");
const {
  createProductController,
  getProductsController,
  getProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
  productFiltersController,
  productCountController,
  productListController,
} = require("../controllers/productController");

const router = express.Router();

router.post(
  "/create-product",
  validateToken,
  isAdmin,
  formidable(),
  createProductController
);

router.get("/get-products", getProductsController);

router.get("/product-photo/:pid", productPhotoController);

router.get("/get-product/:slug", getProductController);

router.delete(
  "/delete-product/:id",
  isAdmin,
  validateToken,
  deleteProductController
);

router.put(
  "/update-product/:id",
  validateToken,
  isAdmin,
  formidable(),
  updateProductController
);

router.post("/product-filters", productFiltersController);

router.get("/product-count", productCountController);

router.get(`/product-lists/:page`, productListController);

module.exports = router;
