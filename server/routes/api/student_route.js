const express = require('express');
const router = express.Router();
const studentController = require('../../controllers/student_controller');
const { authenticate, authorizeStudent } = require('../../middleware/authMiddleware');

const requireStudent = [authenticate, authorizeStudent];

// Profile
router.put('/profile', requireStudent, studentController.updateStudentProfile);

// Tutor Search
router.get('/search-tutors', requireStudent, studentController.searchTutors);

// Session Management
router.post('/sessions/book', requireStudent, studentController.bookSession);
router.put('/sessions/reschedule/:sessionId', requireStudent, studentController.rescheduleSession);
router.delete('/sessions/:sessionId', requireStudent, studentController.deleteSession);

// Review
router.post('/reviews', requireStudent, studentController.submitReview);

// Wishlist
router.post('/wishlist', requireStudent, studentController.addToWishlist);
router.get('/wishlist', requireStudent, async (req, res) => {
    try {
        const wishlist = await require('../../models/wishlist_schema')
            .findOne({ student: req.user._id })
            .populate('tutors');
        if (!wishlist) return res.json({ tutors: [] });
        res.json({ tutors: wishlist.tutors });
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;
