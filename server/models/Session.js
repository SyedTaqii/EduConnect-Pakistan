const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tutorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    type: { type: String, enum: ['online', 'in-person'], required: true },
    status: { type: String, enum: ['booked', 'completed', 'cancelled'], default: 'booked' },
    paymentStatus: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    tutorResponse: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Session', sessionSchema);
