const User = require("../models/users_schema");
const Tutor = require("../models/tutor_schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
async function register(req, res) {
    try {
        const { name, email, password, city, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed password:', hashedPassword);
        const isMatch = await bcrypt.compare(password, hashedPassword);
        console.log('Password match:', isMatch);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        if (role === "student" || role === "admin") {
            const user = new User({ name, email, password: hashedPassword, city, role });
            await user.save();
            return res.status(201).json({ message: "User registered successfully" });
        } else if (role === "tutor") {
            const { subjects, hourlyRate, availability, teachingType, pricePerSession } = req.body;

            const user = new User({ name, email, password: hashedPassword, city, role });
            await user.save();

            const tutor = new Tutor({
                user: user._id,
                name,
                subjects,
                hourlyRate,
                availability,
                teachingType,
                pricePerSession
            });

            await tutor.save();
            return res.status(201).json({ message: "Tutor registered successfully" });
        } else {
            return res.status(400).json({ message: "Invalid role specified" });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Login
async function login(req, res) {
    try {
        const { email, password } = req.body;
        // console.log('Received email:', email);
        // console.log('Received password:', password);

        const user = await User.findOne({ email });
        // console.log('Found user:', user);
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        console.log('User Hashed Password:', user.password);
        const isMatch = await bcrypt.compare(password, user.password);
        // console.log('Password match:', isMatch);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Logout (Client-side only for JWT)
async function logout(req, res) {
    res.json({ message: "User logged out" });
}

module.exports = {
    register,
    login,
    logout,
};
