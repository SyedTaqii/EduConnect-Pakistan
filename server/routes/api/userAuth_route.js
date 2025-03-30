const express = require("express");
const router = express.Router();
const userAuthController = require("../../controllers/userAuth_controller");
const { authenticate } = require("../../middleware/authMiddleware");

// Register (Student/Tutor/Admin)
router.post("/register", userAuthController.register);

// Login
router.post("/login", userAuthController.login);

// Logout
router.post("/logout", authenticate, userAuthController.logout);

module.exports = router;
