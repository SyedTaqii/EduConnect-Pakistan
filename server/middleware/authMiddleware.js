const jwt = require("jsonwebtoken");
const User = require("../models/users_schema");

// Auth middleware
async function authenticate(req, res, next) {
    try {
        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        const token = authHeader.replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) return res.status(401).json({ message: "User not found" });

        req.user = user;
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        }
        res.status(401).json({ message: "Invalid token" });
    }
}

// Role checkers
function authorizeStudent(req, res, next) {
    if (req.user.role !== "student") {
        return res.status(403).json({ message: "Permission denied. Students only." });
    }
    next();
}

function authorizeTutor(req, res, next) {
    if (req.user.role !== "tutor") {
        return res.status(403).json({ message: "Permission denied. Tutors only." });
    }
    next();
}

function authorizeAdmin(req, res, next) {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Permission denied. Admins only." });
    }
    next();
}

module.exports = {
    authenticate,
    authorizeStudent,
    authorizeTutor,
    authorizeAdmin
};
