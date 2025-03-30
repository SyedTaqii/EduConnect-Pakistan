const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../middleware/authMiddleware');
const {
    getMyProfile,
    createOrUpdateProfile,
    getTutorSessions,
    respondToSession,
    markSessionCompleted,
    getEarningsSummary
} = require('../../controllers/tutorController');

router.get('/profile', protect, authorize(['tutor']), getMyProfile);
router.post('/profile', protect, authorize(['tutor']), createOrUpdateProfile);

router.get('/sessions', protect, authorize(['tutor']), getTutorSessions);
router.put('/sessions/:id/respond', protect, authorize(['tutor']), respondToSession);
router.put('/sessions/:id/complete', protect, authorize(['tutor']), markSessionCompleted);
router.get('/earnings', protect, authorize(['tutor']), getEarningsSummary);


module.exports = router;
