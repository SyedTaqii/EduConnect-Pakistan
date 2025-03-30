const Tutor = require('../models/tutor_schema');
const Report = require('../models/reports_schema');
const User = require('../models/users_schema');
const Session = require('../models/sessions_schema');
const VerificationRequest = require('../models/verify_req_schema');

// Get Pending Tutor Verifications
async function getPendingVerifications(req, res) {
    try {
        const pendingVerifications = await VerificationRequest
            .find({ status: 'pending' })
            .populate("tutor", "name subjects hourlyRate");
        res.json(pendingVerifications);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
}

// Get Tutor Details for Verification
async function getTutorDetails(req, res) {
    try {
        const { tutorId } = req.params;
        const tutor = await Tutor.findById(tutorId);
        if (!tutor) return res.status(404).json({ error: 'Tutor not found' });

        res.json(tutor);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
}

// Approve Tutor
async function approveTutor(req, res) {
    try {
        const { tutorId } = req.params;
        const verification = await VerificationRequest.findOne({ tutor: tutorId, status: 'pending' });

        if (!verification) {
            return res.status(404).json({ error: 'No pending verification found for this tutor' });
        }

        await VerificationRequest.findByIdAndUpdate(verification._id, { status: 'approved' });

        res.json({ message: 'Tutor approved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
}

// Reject Tutor with Comments
async function rejectTutor(req, res) {
    try {
        const { tutorId } = req.params;
        const { comments } = req.body;

        const verification = await VerificationRequest.findOne({ tutor: tutorId, status: 'pending' });

        if (!verification) {
            return res.status(404).json({ error: 'No pending verification found for this tutor' });
        }

        await VerificationRequest.findByIdAndUpdate(verification._id, {
            status: 'rejected',
            comments
        });

        res.json({ message: 'Tutor rejected successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
}

// Get Tutor Verification Statistics
async function getTutorStats(req, res) {
    try {
        const totalVerifications = await VerificationRequest.countDocuments();
        const pendingVerifications = await VerificationRequest.countDocuments({ status: 'pending' });
        const approvedVerifications = await VerificationRequest.countDocuments({ status: 'approved' });
        const rejectedVerifications = await VerificationRequest.countDocuments({ status: 'rejected' });

        res.json({
            totalVerifications,
            pendingVerifications,
            approvedVerifications,
            rejectedVerifications
        });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
}

// Generate Reports
async function getReports(req, res) {
    try {
        // Popular Subjects
        const popularSubjects = await Session.aggregate([
            { $group: { _id: '$subject', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);

        // Session Completion Rate
        const totalSessions = await Session.countDocuments();
        const completedSessions = await Session.countDocuments({ status: 'completed' });
        const completionRate = totalSessions ? (completedSessions / totalSessions) * 100 : 0;

        // Platform Usage by City
        const platformUsageByCity = await User.aggregate([
            { $group: { _id: '$city', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        // User Growth Over Time
        const userGrowth = await User.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m", date: "$createdAt" }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json({ popularSubjects, completionRate, platformUsageByCity, userGrowth });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
}

// Export Report Data as JSON
async function exportReport(req, res) {
    try {
        const reports = await Report.find({});
        res.setHeader('Content-Disposition', 'attachment; filename="reports.json"');
        res.setHeader('Content-Type', 'application/json');
        res.json(reports);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
}

module.exports = {
    getPendingVerifications,
    getTutorDetails,
    approveTutor,
    rejectTutor,
    getTutorStats,
    getReports,
    exportReport
};