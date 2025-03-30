const User = require('../models/users_schema');
const Tutor = require('../models/tutor_schema');
const Session = require('../models/sessions_schema');
const Review = require('../models/reviews_schema');
const Wishlist = require('../models/wishlist_schema');

// Update Student Profile
async function updateStudentProfile(req, res) {
    try {
        const { studentId, name, email, city } = req.body;

        const updatedStudent = await User.findByIdAndUpdate(
            studentId,
            { name, email, city },
            { new: true, runValidators: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json({ message: 'Profile updated successfully', student: updatedStudent });
    } catch (error) {
        console.error('Error updating student profile:', error);
        res.status(500).json({ error: 'Server Error' });
    }
}

// Search Tutors
async function searchTutors(req, res) {
    try {
        const {
            subject, priceMin, priceMax, rating,
            availability, teachingType, pricePerSession
        } = req.query;

        const query = {};

        if (subject) query.subjects = subject;
        if (priceMin || priceMax) {
            query.hourlyRate = {
                ...(priceMin && { $gte: Number(priceMin) }),
                ...(priceMax && { $lte: Number(priceMax) })
            };
        }
        if (rating) query.rating = { $gte: Number(rating) };
        if (availability) query.availability = availability;
        if (teachingType) query.teachingType = teachingType;
        if (pricePerSession) query.pricePerSession = { $lte: Number(pricePerSession) };

        const tutors = await Tutor.find(query);
        res.json(tutors);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
}

// Book a Session
async function bookSession(req, res) {
    try {
        const { tutorId, studentId, date, time, subject } = req.body;

        const existing = await Session.findOne({
            tutor: tutorId,
            date,
            time,
            status: { $ne: 'cancelled' }
        });

        if (existing) {
            return res.status(400).json({ error: 'Time slot already booked' });
        }

        const session = new Session({
            tutor: tutorId,
            student: studentId,
            date,
            time,
            subject,
            status: 'pending'
        });

        await session.save();
        res.json({ message: 'Session booked successfully', session });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
}

// Reschedule Session
async function rescheduleSession(req, res) {
    try {
        const { sessionId } = req.params;
        const { newDate, newTime } = req.body;

        const session = await Session.findOneAndUpdate(
            { _id: sessionId, status: 'cancelled' },
            { date: newDate, time: newTime, status: 'pending' },
            { new: true }
        );

        if (!session) {
            return res.status(404).json({ error: 'Cancelled session not found' });
        }

        res.json({ message: 'Session rescheduled', session });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
}

// Delete Session
async function deleteSession(req, res) {
    try {
        const { sessionId } = req.params;
        const session = await Session.findByIdAndDelete(sessionId);

        if (!session) return res.status(404).json({ error: 'Session not found' });

        res.json({ message: 'Session deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
}

// Submit Review
async function submitReview(req, res) {
    try {
        const { tutorId, studentId, rating, comment } = req.body;

        const session = await Session.findOne({
            tutor: tutorId,
            student: studentId,
            status: 'completed'
        });

        if (!session) {
            return res.status(400).json({ error: 'You can only review completed sessions.' });
        }

        const existingReview = await Review.findOne({ tutor: tutorId, student: studentId });
        if (existingReview) {
            return res.status(400).json({ error: 'You have already reviewed this tutor.' });
        }

        const newReview = new Review({
            tutor: tutorId,
            student: studentId,
            rating,
            comment
        });

        await newReview.save();
        res.json({ message: 'Review submitted', review: newReview });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
}

// Add to Wishlist
async function addToWishlist(req, res) {
    try {
        const { studentId, tutorId } = req.body;

        let wishlist = await Wishlist.findOne({ student: studentId });

        if (!wishlist) {
            wishlist = new Wishlist({ student: studentId, tutors: [tutorId] });
        } else {
            if (!wishlist.tutors.includes(tutorId)) {
                wishlist.tutors.push(tutorId);
            }
        }

        await wishlist.save();
        res.json({ message: 'Tutor added to wishlist', wishlist });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
}

module.exports = {
    updateStudentProfile,
    searchTutors,
    bookSession,
    rescheduleSession,
    deleteSession,
    submitReview,
    addToWishlist
};
