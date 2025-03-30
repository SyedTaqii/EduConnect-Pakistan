const Tutor = require('../models/tutor_schema');
const Session = require('../models/sessions_schema');
const User = require('../models/users_schema');

// Profile Management
async function updateProfile(req, res) {
    try {
        const { tutorId, name, bio, subjects, hourlyRate, availability, teachingType, pricePerSession } = req.body;

        const tutor = await Tutor.findByIdAndUpdate(
            tutorId,
            { name, bio, subjects, hourlyRate, availability, teachingType, pricePerSession },
            { new: true, runValidators: true }
        );

        if (!tutor) {
            return res.status(404).json({ error: 'Tutor not found' });
        }

        const user = await User.findByIdAndUpdate(
            tutor.user,
            { name },
            { new: true }
        );

        res.json({ tutor, user });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Server Error' });
    }
}

// Get Tutor Sessions
async function getSessions(req, res) {
    try {
        const { _id } = req.user;
        const tutor = await Tutor.findOne({ user: _id });

        if (!tutor) return res.status(404).json({ error: "Tutor profile not found" });

        const sessions = await Session.find({ tutor: tutor._id });
        res.json(sessions);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
}

// Accept Session
async function acceptSession(req, res) {
    try {
        const session = await Session.findOneAndUpdate(
            { _id: req.params.id, status: "pending" },
            { status: "scheduled" },
            { new: true }
        );

        if (!session) {
            return res.status(404).json({ message: "Session not found or already accepted" });
        }

        res.json({ message: "Session accepted", session });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Reject Session
async function rejectSession(req, res) {
    try {
        const session = await Session.findOneAndUpdate(
            { _id: req.params.id, status: "pending" },
            { status: "cancelled" },
            { new: true }
        );

        if (!session) {
            return res.status(404).json({ message: "Session not found or already rejected" });
        }

        res.json({ message: "Session cancelled", session });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Mark Session as Completed
async function markSessionCompleted(req, res) {
    try {
        const { sessionId } = req.params;

        const session = await Session.findOneAndUpdate(
            { _id: sessionId, status: 'scheduled' },
            { status: 'completed' },
            { new: true }
        );

        if (!session) {
            return res.status(404).json({ error: 'Session not found or not in accepted status' });
        }

        const tutor = await Tutor.findById(session.tutor);
        if (!tutor) {
            return res.status(404).json({ error: 'Tutor not found' });
        }

        const updatedTutor = await Tutor.findByIdAndUpdate(
            tutor._id,
            { $inc: { totalEarnings: tutor.pricePerSession } },
            { new: true }
        );

        res.json({ message: 'Session marked as completed', session, tutor: updatedTutor });
    } catch (error) {
        console.error('Error marking session as completed:', error);
        res.status(500).json({ error: 'Server Error' });
    }
}

// Get Tutor Earnings
async function getEarnings(req, res) {
    try {
        const { _id } = req.user;
        const tutor = await Tutor.findOne({ user: _id });
        if (!tutor) return res.status(404).json({ error: "Tutor not found" });

        res.json({
            totalEarnings: tutor.totalEarnings,
            pricePerSession: tutor.pricePerSession
        });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
}

module.exports = {
    updateProfile,
    getSessions,
    acceptSession,
    rejectSession,
    markSessionCompleted,
    getEarnings
};
