const express = require("express");
const {
  registerUser,
  loginUser,
  testController,
} = require("../controllers/userController");
const { validateToken } = require('../middlewares/validateTokenHandler')
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/test", validateToken, testController);
module.exports = router;
