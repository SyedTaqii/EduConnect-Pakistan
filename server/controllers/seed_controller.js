const bcrypt = require("bcryptjs");
const User = require("../models/users_schema");
const Tutor = require("../models/tutor_schema");

console.log('Seeding data...');
async function seedData(req, res) {
    console.log('Seeding data...');

    try {
        const userCount = await User.countDocuments({});
        const tutorCount = await Tutor.countDocuments({});

        if (userCount > 0 || tutorCount > 0) {
            // If data already exists, prevent seeding and return a message
            return res.status(400).json({ message: "Database is already seeded." });
        }

        // Clear old data (optional)
        await User.deleteMany({});
        await Tutor.deleteMany({});

        // Create Admin
        const admin = new User({
            name: "admin",
            email: "admin@gmail.com",
            password: await bcrypt.hash("admin123", 10),
            city: "Lahore",
            role: "admin",
        });
        console.log('Seeding Admin data...');

        // Create Student
        const student = new User({
            name: "taqi",
            email: "taqi@gmail.com",
            password: await bcrypt.hash("taqi123", 10),
            city: "Karachi",
            role: "student",
        });
        console.log('Seeding Student data...');

        // Create Tutor (User + Tutor)
        const tutorUser = new User({
            name: "John",
            email: "john@gmail.com",
            password: await bcrypt.hash("john123", 10),
            city: "Islamabad",
            role: "tutor",
        });

        // Save users
        await admin.save();
        await student.save();
        await tutorUser.save();

        // Create Tutor details
        const tutor = new Tutor({
            tutor_user_Id: tutorUser._id,
            name: tutorUser.name,
            subjects: ["Math", "Physics"],
            hourlyRate: 1500,
            availability: [{ day: "Monday", times: ["10:00", "14:00"] }],
            teachingType: "online",
            pricePerSession: 1200,
        });

        // Save tutor details
        await tutor.save();
        console.log('Seeding Tutor data...');

        // Send success response
        res.json({
            message: "Seed data inserted successfully",
            users: [admin, student, tutorUser],
            tutor
        });

    } catch (err) {
        console.error("Seed Error:", err);
        res.status(500).json({ error: "Failed to seed database" });
    }
}

console.log('Seeding data...');

module.exports = { seedData };
