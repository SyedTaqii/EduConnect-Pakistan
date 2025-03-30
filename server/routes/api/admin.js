const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../middleware/authMiddleware');
const {
    getAllRequests,
    updateVerificationStatus,
    getVerificationStats
} = require('../../controllers/adminController');

const {
    popularSubjects,
    sessionStats,
    cityDistribution,
    userGrowth
} = require('../../controllers/reportController');

router.get('/verifications', protect, authorize(['admin']), getAllRequests);
router.put('/verifications/:id', protect, authorize(['admin']), updateVerificationStatus);
router.get('/verification-stats', protect, authorize(['admin']), getVerificationStats);

router.get('/reports/subjects', protect, authorize(['admin']), popularSubjects);
router.get('/reports/sessions', protect, authorize(['admin']), sessionStats);
router.get('/reports/cities', protect, authorize(['admin']), cityDistribution);
router.get('/reports/users', protect, authorize(['admin']), userGrowth);


module.exports = router;
