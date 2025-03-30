const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    type: { type: String, enum: ["sessions", "users", "earnings"], required: true },
    data: mongoose.Schema.Types.Mixed, // Stores report data dynamically
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Report", reportSchema);