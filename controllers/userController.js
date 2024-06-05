const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, address, question } = req.body;
  if (!name || !email || !password || !phone || !address || !question) {
    return res.status(400).json({ error: "All fields are mandatory!" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "Password must be at least 8 characters long" });
  }

  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ error: "Invalid phone number format" });
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    return res
      .status(400)
      .json({ error: "User is already registered. Please Login" });
  }

  const hashedPassword = await hashPassword(password);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    phone,
    address,
    question,
  });

  try {
    const savedUser = await user.save();
    console.log(`User created: ${savedUser}`);
    res.status(201).json({
      message: "User created successfully",
      _id: savedUser.id,
      email: savedUser.email,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are mandatory!!" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ error: "User not registered. Please sign up to continue" });
  }

  const match = await comparePassword(password, user.password);
  if (!match) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.status(200).json({
    message: "User Login successful",
    user: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
    },
    token,
  });
});
