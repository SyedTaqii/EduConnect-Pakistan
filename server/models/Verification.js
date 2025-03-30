const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
    tutorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    credentials: { type: String, required: true },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    comment: { type: String },
    requestedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Verification', verificationSchema);
