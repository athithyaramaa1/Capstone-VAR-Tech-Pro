const express = require("express");
const {
  registerUser,
  loginUser,
  testController,
  forgotPasswordController
} = require("../controllers/userController");
const {
  validateToken,
  isAdmin,
} = require("../middlewares/validateTokenHandler");
const router = express.Router();
import apiLimiter from '../middlewares/rateLimiter';

router.post("/register",apiLimiter, registerUser);
router.post("/login",apiLimiter, loginUser);
router.post("/test", validateToken, isAdmin, testController);
router.post("/forgot-password", forgotPasswordController);

router.get("/user-auth", validateToken, (req, res) => {
  res.status(200).send({ user: true });
});

router.get("/admin-auth", validateToken, isAdmin, (req, res) => {
  res.status(200).send({ admin: true });
});

module.exports = router;
