const mongoose = require("mongoose");

const tutorSchema = new mongoose.Schema({
    tutor_user_Id: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    name: { type: String, required: true },
    bio: { type: String },
    subjects: { type: [String], required: true },
    hourlyRate: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    availability: { type: [{ day: String, times: [String] }], required: true },
    teachingType: { type: String, enum: ["online", "in-person", "both"], required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    pricePerSession: { type: Number, default: 0, required: true },
    totalEarnings: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("tutors", tutorSchema);