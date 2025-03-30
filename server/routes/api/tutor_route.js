const express = require('express');
const router = express.Router();
const tutorController = require('../../controllers/tutor_controller');
const { authenticate, authorizeTutor } = require('../../middleware/authMiddleware');

const tutorAuth = [authenticate, authorizeTutor];

// Update tutor profile
router.put('/profile', tutorAuth, tutorController.updateProfile);

// Get tutor sessions
router.get('/sessions', tutorAuth, tutorController.getSessions);

// Accept session
router.put('/sessions/accept/:id', tutorAuth, tutorController.acceptSession);

// Reject session
router.put('/sessions/reject/:id', tutorAuth, tutorController.rejectSession);

// Complete session
router.put('/sessions/complete/:sessionId', tutorAuth, tutorController.markSessionCompleted);

// Get tutor earnings
router.get('/earnings', tutorAuth, tutorController.getEarnings);

module.exports = router;
