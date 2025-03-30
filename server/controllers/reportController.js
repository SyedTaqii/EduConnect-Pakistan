const Tutor = require('../models/Tutor');
const Session = require('../models/Session');
const User = require('../models/User');

exports.popularSubjects = async (req, res) => {
    try {
        const tutors = await Tutor.find();
        const subjectCount = {};

        tutors.forEach(t => {
            t.subjects.forEach(sub => {
                subjectCount[sub] = (subjectCount[sub] || 0) + 1;
            });
        });

        const data = Object.entries(subjectCount).map(([subject, count]) => ({ subject, count }));
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch subjects' });
    }
};

exports.sessionStats = async (req, res) => {
    try {
        const total = await Session.countDocuments();
        const completed = await Session.countDocuments({ status: 'completed' });
        const cancelled = await Session.countDocuments({ status: 'cancelled' });

        res.json({
            total,
            completed,
            cancelled,
            completionRate: ((completed / total) * 100).toFixed(1) + '%'
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch session stats' });
    }
};

exports.cityDistribution = async (req, res) => {
    try {
        const tutors = await Tutor.find();
        const cities = {};

        tutors.forEach(t => {
            cities[t.city] = (cities[t.city] || 0) + 1;
        });

        const data = Object.entries(cities).map(([city, count]) => ({ city, count }));
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch city data' });
    }
};

exports.userGrowth = async (req, res) => {
    try {
        const users = await User.aggregate([
            {
                $group: {
                    _id: { $substr: ['$createdAt', 0, 10] }, // group by date
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json(users.map(u => ({ date: u._id, count: u.count })));
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch user growth' });
    }
};
