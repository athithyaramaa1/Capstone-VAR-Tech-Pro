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
router.post("/forgot-password", forgotPasswordController);

router.get("/user-auth", validateToken, (req, res) => {
  res.status(200).send({ user: true });
});

module.exports = router;
