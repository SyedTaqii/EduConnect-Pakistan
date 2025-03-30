const mongoose = require("mongoose");

const verificationRequestSchema = new mongoose.Schema({
    tutor: { type: mongoose.Schema.Types.ObjectId, ref: "tutors", required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    comments: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("VerificationRequest", verificationRequestSchema);