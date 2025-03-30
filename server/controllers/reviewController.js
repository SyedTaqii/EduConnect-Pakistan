const Review = require('../models/Review');
const Session = require('../models/Session');
const Tutor = require('../models/Tutor');

// Submit review
exports.submitReview = async (req, res) => {
    const { sessionId, rating, comment } = req.body;

    try {
        const session = await Session.findById(sessionId);
        if (!session || session.studentId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized or session not found' });
        }

        if (session.status !== 'completed') {
            return res.status(400).json({ message: 'You can only review completed sessions' });
        }

        // Prevent duplicate review
        const existing = await Review.findOne({ sessionId });
        if (existing) {
            return res.status(400).json({ message: 'Review already submitted' });
        }

        const review = await Review.create({
            studentId: req.user.id,
            tutorId: session.tutorId,
            sessionId,
            rating,
            comment
        });

        // Update tutor's average rating
        const allReviews = await Review.find({ tutorId: session.tutorId });
        const avgRating =
            allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

        const tutor = await Tutor.findOne({ userId: session.tutorId });
        if (tutor) {
            tutor.rating = avgRating;
            await tutor.save();
        }

        res.status(201).json({ message: 'Review submitted', review });
    } catch (err) {
        res.status(500).json({ message: 'Failed to submit review' });
    }
};

// Get all reviews for a tutor
exports.getTutorReviews = async (req, res) => {
    const { tutorId } = req.params;

    try {
        const reviews = await Review.find({ tutorId }).populate('studentId', 'name');
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch reviews' });
    }
};
