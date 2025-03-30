const Session = require('../models/Session');

// Book a new session
exports.bookSession = async (req, res) => {
    const { tutorId, subject, date, time, type } = req.body;

    try {
        // Prevent double booking
        const exists = await Session.findOne({ tutorId, date, time });
        if (exists) {
            return res.status(400).json({ message: 'This time slot is already booked' });
        }

        const session = await Session.create({
            studentId: req.user.id,
            tutorId,
            subject,
            date,
            time,
            type
        });

        res.status(201).json(session);
    } catch (err) {
        res.status(500).json({ message: 'Failed to book session' });
    }
};

exports.getMySessions = async (req, res) => {
    try {
        const sessions = await Session.find({ studentId: req.user.id })
            .populate('tutorId', 'name email')
            .sort({ date: 1 });
        res.json(sessions);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch sessions' });
    }
};

exports.updateSession = async (req, res) => {
    const { id } = req.params;
    const { date, time } = req.body;

    try {
        const session = await Session.findById(id);
        if (!session) return res.status(404).json({ message: 'Session not found' });
        if (session.studentId.toString() !== req.user.id)
            return res.status(403).json({ message: 'Unauthorized' });

        // Optional: prevent rescheduling to an already booked time
        const clash = await Session.findOne({ tutorId: session.tutorId, date, time });
        if (clash && clash._id.toString() !== id) {
            return res.status(400).json({ message: 'This time is already booked' });
        }

        session.date = date;
        session.time = time;
        await session.save();

        res.json({ message: 'Session rescheduled', session });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update session' });
    }
};

exports.deleteSession = async (req, res) => {
    const { id } = req.params;

    try {
        const session = await Session.findById(id);
        if (!session) return res.status(404).json({ message: 'Session not found' });
        if (session.studentId.toString() !== req.user.id)
            return res.status(403).json({ message: 'Unauthorized' });

        await session.deleteOne();
        res.json({ message: 'Session cancelled' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete session' });
    }
};
