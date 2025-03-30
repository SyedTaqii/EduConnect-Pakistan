const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    tutors: [{ type: mongoose.Schema.Types.ObjectId, ref: "tutors" }]
}, { timestamps: true });

module.exports = mongoose.model("Wishlist", wishlistSchema);