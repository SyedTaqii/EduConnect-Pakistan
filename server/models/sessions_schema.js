const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    tutor: { type: mongoose.Schema.Types.ObjectId, ref: "tutors", required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: { type: String, enum: ["pending", "scheduled", "completed", "cancelled"], default: "pending" },
    subject: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("Session", sessionSchema);