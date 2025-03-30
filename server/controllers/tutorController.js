const Tutor = require('../models/Tutor');
const Session = require('../models/Session');

exports.getMyProfile = async (req, res) => {
    try {
        const profile = await Tutor.findOne({ userId: req.user.id });
        if (!profile) return res.status(404).json({ message: 'Profile not found' });
        res.json(profile);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch profile' });
    }
};

exports.createOrUpdateProfile = async (req, res) => {
    const {
        subjects,
        city,
        rate,
        availability,
        mode,
        bio,
        profilePicture
    } = req.body;

    try {
        let profile = await Tutor.findOne({ userId: req.user.id });

        if (!profile) {
            profile = await Tutor.create({
                userId: req.user.id,
                subjects,
                city,
                rate,
                availability,
                mode,
                bio,
                profilePicture
            });
        } else {
            profile.subjects = subjects;
            profile.city = city;
            profile.rate = rate;
            profile.availability = availability;
            profile.mode = mode;
            profile.bio = bio;
            profile.profilePicture = profilePicture;
            await profile.save();
        }

        res.json({ message: 'Profile saved', profile });
    } catch (err) {
        res.status(500).json({ message: 'Failed to save profile' });
    }
};

exports.getTutorSessions = async (req, res) => {
    try {
        const sessions = await Session.find({ tutorId: req.user.id })
            .populate('studentId', 'name email')
            .sort({ date: 1 });
        res.json(sessions);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch sessions' });
    }
};

exports.respondToSession = async (req, res) => {
    const { id } = req.params;
    const { response } = req.body;

    if (!['accepted', 'declined'].includes(response)) {
        return res.status(400).json({ message: 'Invalid response' });
    }

    try {
        const session = await Session.findById(id);
        if (!session || session.tutorId.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Session not found' });
        }

        session.tutorResponse = response;
        if (response === 'declined') session.status = 'cancelled';
        await session.save();

        res.json({ message: `Session ${response}` });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update session' });
    }
};

exports.markSessionCompleted = async (req, res) => {
    const { id } = req.params;

    try {
        const session = await Session.findById(id);
        if (!session || session.tutorId.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Session not found' });
        }

        session.status = 'completed';
        session.paymentStatus = 'completed';
        await session.save();

        res.json({ message: 'Session marked as completed' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to complete session' });
    }
};

exports.getEarningsSummary = async (req, res) => {
    try {
        const sessions = await Session.find({
            tutorId: req.user.id,
            status: 'completed',
            paymentStatus: 'completed'
        });

        const earnings = sessions.reduce((total, session) => total + session.rate || 0, 0);

        // Optionally, group by week/month later
        res.json({ totalEarnings: earnings, completedSessions: sessions.length });
    } catch (err) {
        res.status(500).json({ message: 'Failed to calculate earnings' });
    }
};
