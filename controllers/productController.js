const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const Product = require("../models/productModel");
const fs = require("fs");

const createProductController = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    console.log("fields:", {
      name,
      description,
      price,
      category,
      quantity,
      shipping,
    });

    if (!name || !description || !price || !category || !quantity) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }

    if (photo && photo.size > 1000000) {
      return res.status(400).json({
        message: "Photo size should be less than 1MB",
      });
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
    console.log("Fetching products...");
    const products = await Product.find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });

    console.log("Products fetched:", products);

    if (!products || products.length === 0) {
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
  try {
    const products = await Product.find({});
    if (products) {
      res.status(200).json({ message: "Wow" });
    }
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
