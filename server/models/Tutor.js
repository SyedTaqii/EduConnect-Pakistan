const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subjects: [{ type: String, required: true }],
    city: { type: String, required: true },
    rate: { type: Number, required: true },
    availability: [
        {
            day: String,
            times: [String] // ["10:00 AM", "2:00 PM"]
        }
    ],
    mode: {
        type: String,
        enum: ['online', 'in-person', 'both'],
        required: true
    },
    rating: { type: Number, default: 0 },
    profilePicture: { type: String, default: '' },
    bio: { type: String, default: '' }
});

module.exports = mongoose.model('Tutor', tutorSchema);
