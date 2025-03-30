const Verification = require('../models/Verification');
const User = require('../models/User');

// Get all verification requests
exports.getAllRequests = async (req, res) => {
    try {
        const requests = await Verification.find()
            .populate('tutorId', 'name email')
            .sort({ requestedAt: -1 });
        res.json(requests);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch requests' });
    }
};

// Approve or reject a request
exports.updateVerificationStatus = async (req, res) => {
    const { id } = req.params;
    const { status, comment } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    try {
        const request = await Verification.findById(id);
        if (!request) return res.status(404).json({ message: 'Request not found' });

        request.status = status;
        request.comment = comment;
        await request.save();

        // Update user verification status
        if (status === 'approved') {
            await User.findByIdAndUpdate(request.tutorId, { isVerified: true });
        }

        res.json({ message: `Tutor ${status}`, request });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update status' });
    }
};

// Get verification stats
exports.getVerificationStats = async (req, res) => {
    try {
        const stats = {
            total: await Verification.countDocuments(),
            approved: await Verification.countDocuments({ status: 'approved' }),
            pending: await Verification.countDocuments({ status: 'pending' }),
            rejected: await Verification.countDocuments({ status: 'rejected' })
        };
        res.json(stats);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch stats' });
    }
};
