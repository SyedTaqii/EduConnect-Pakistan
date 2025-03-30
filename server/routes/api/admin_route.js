const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin_controller');
const { authenticate, authorizeAdmin } = require('../../middleware/authMiddleware');

// Apply authentication + admin check to all admin routes
router.use(authenticate, authorizeAdmin);

// Get pending tutor verifications
router.get('/tutors/pending-verifications', adminController.getPendingVerifications);

// Get tutor details for verification
router.get('/tutors/:tutorId', adminController.getTutorDetails);

// Approve tutor
router.put('/tutors/:tutorId/approve', adminController.approveTutor);

// Reject tutor
router.put('/tutors/:tutorId/reject', adminController.rejectTutor);

// Tutor verification stats
router.get('/tutors/stats', adminController.getTutorStats);

// Generate reports
router.get('/reports', adminController.getReports);

// Export reports as JSON
router.get('/reports/export', adminController.exportReport);

module.exports = router;
