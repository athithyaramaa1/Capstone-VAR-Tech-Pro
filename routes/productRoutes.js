
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
  searchProductController,
  similarProducts 
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

router.get("/related-product/:pid/:cid", similarProducts);


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

//search Products
router.get("/search/:keyword", searchProductController);

module.exports = router;
