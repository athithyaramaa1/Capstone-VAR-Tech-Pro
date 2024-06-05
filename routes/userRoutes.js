const express = require("express");
const {
  registerUser,
  loginUser,
  testController,
} = require("../controllers/userController");
const {
  validateToken,
  isAdmin,
} = require("../middlewares/validateTokenHandler");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/test", validateToken, isAdmin, testController);
module.exports = router;
