const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    tutor: { type: mongoose.Schema.Types.ObjectId, ref: "tutors", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);