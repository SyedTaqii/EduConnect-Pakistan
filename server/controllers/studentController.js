const Tutor = require('../models/Tutor');
const User = require('../models/User');

// Search and filter tutors
exports.searchTutors = async (req, res) => {
    const { subject, city, minRate, maxRate, minRating, day, time, mode } = req.query;

    let filter = {};

    if (subject) filter.subjects = { $regex: subject, $options: 'i' };
    if (city && city !== 'online') filter.city = city;
    if (mode) filter.mode = mode;
    if (minRate || maxRate) filter.rate = { $gte: minRate || 0, $lte: maxRate || 9999 };
    if (minRating) filter.rating = { $gte: minRating };

    if (day && time) {
        filter['availability'] = {
            $elemMatch: {
                day,
                times: time
            }
        };
    }

    try {
        const tutors = await Tutor.find(filter).populate('userId', 'name');
        res.json(tutors);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch tutors' });
    }
};
