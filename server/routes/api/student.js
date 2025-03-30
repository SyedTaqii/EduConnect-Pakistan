const express = require('express');
const router = express.Router();
const { searchTutors } = require('../../controllers/studentController');
const { protect, authorize } = require('../../middleware/authMiddleware');
const { bookSession, getMySessions, updateSession, deleteSession } = require('../../controllers/sessionController');
const { submitReview, getTutorReviews } = require('../../controllers/reviewController');
const {
    getWishlist,
    addToWishlist,
    removeFromWishlist
} = require('../../controllers/wishlistController');

router.get('/tutors', protect, authorize(['student']), searchTutors);

router.post('/book-session', protect, authorize(['student']), bookSession);

router.get('/my-sessions', protect, authorize(['student']), getMySessions);
router.put('/my-sessions/:id', protect, authorize(['student']), updateSession);
router.delete('/my-sessions/:id', protect, authorize(['student']), deleteSession);

router.post('/submit-review', protect, authorize(['student']), submitReview);
router.get('/tutor-reviews/:tutorId', getTutorReviews);


router.get('/wishlist', protect, authorize(['student']), getWishlist);
router.post('/wishlist/add', protect, authorize(['student']), addToWishlist);
router.post('/wishlist/remove', protect, authorize(['student']), removeFromWishlist);


module.exports = router;
