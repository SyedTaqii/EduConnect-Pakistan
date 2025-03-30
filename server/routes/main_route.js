const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");

const studentRoutes = require("./api/student_route");
const tutorRoutes = require("./api/tutor_route");
const adminRoutes = require("./api/admin_route");
const userAuthRoutes = require("./api/userAuth_route");
const seedRoutes = require("./api/seed_route");


// router.use("/seed", seedRoutes);

// Home Test Route
router.get("/", (req, res) => {
    res.json({ message: "EduConnect API is running" });
});

// Public Auth Routes
router.use("/auth", userAuthRoutes);

// Student Routes
router.use("/student", authenticate, studentRoutes);

// Tutor Routes
router.use("/tutor", authenticate, tutorRoutes);

// Admin Routes
router.use("/admin", authenticate, adminRoutes);

// [Optional] Test Dashboards for Postman
router.get("/student/dashboard", authenticate, (req, res) => {
    res.json({ role: "student", user: req.user });
});
router.get("/admin/dashboard", authenticate, (req, res) => {
    res.json({ role: "admin", user: req.user });
});
router.get("/tutor/dashboard", authenticate, (req, res) => {
    res.json({ role: "tutor", user: req.user });
});

module.exports = router;
