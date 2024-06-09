const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const Product = require("../models/productModel");
const fs = require("fs");

const validateProductFields = ({
  name,
  description,
  price,
  category,
  quantity,
}) => {
  return name && description && price && category && quantity;
};

const createProductController = asyncHandler(async (req, res) => {
  const { name, description, price, category, quantity, shipping } = req.fields;
  const { photo } = req.files;

  if (!validateProductFields(req.fields)) {
    return res.status(400).json({ message: "All fields are mandatory" });
  }

  if (photo && photo.size > 1000000) {
    return res
      .status(400)
      .json({ message: "Photo size should be less than 1MB" });
  }

  const slug = slugify(name, { lower: true });

  const product = new Product({
    name,
    slug,
    description,
    price,
    category,
    quantity,
    shipping,
  });

  if (photo) {
    try {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    } catch (error) {
      console.error("Error reading photo file:", error);
      return res.status(500).json({ error: "Error reading photo file" });
    }
  }

  try {
    await product.save();
    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Error in creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const getProductsController = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });

    if (!products.length) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json({
      message: "All products",
      totalProducts: products.length,
      products,
    });
  } catch (err) {
    console.error("Error in fetching products:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const getProductController = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Single product fetched",
      product,
    });
  } catch (err) {
    console.error("Error in fetching product:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const productPhotoController = asyncHandler(async (req, res) => {
  console.log(
    "Controller hit: productPhotoController with PID:",
    req.params.pid
  );

  try {
    const product = await Product.findById(req.params.pid).select("photo");

    if (!product) {
      console.log("Product not found with ID:", req.params.pid);
      return res.status(404).json({ error: "Product not found" });
    }

    if (!product.photo || !product.photo.data) {
      console.log("Photo not found for product with ID:", req.params.pid);
      return res.status(404).json({ error: "Photo not found" });
    }

    console.log("Photo found for product with ID:", req.params.pid);

    res.set("Content-Type", product.photo.contentType);
    return res.status(200).send(product.photo.data);
  } catch (err) {
    console.error("Error in fetching product photo:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {
  createProductController,
  getProductsController,
  getProductController,
  productPhotoController,
};
