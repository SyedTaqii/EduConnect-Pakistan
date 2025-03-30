const Wishlist = require('../models/Wishlist');
const User = require('../models/User');
const Tutor = require('../models/Tutor');

// Get student's wishlist
exports.getWishlist = async (req, res) => {
    try {
        let wishlist = await Wishlist.findOne({ studentId: req.user.id }).populate('tutors', 'name email');
        if (!wishlist) wishlist = await Wishlist.create({ studentId: req.user.id, tutors: [] });

        res.json(wishlist);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch wishlist' });
    }
};

// Add tutor to wishlist
exports.addToWishlist = async (req, res) => {
    const { tutorId } = req.body;

    try {
        let wishlist = await Wishlist.findOne({ studentId: req.user.id });
        if (!wishlist) wishlist = await Wishlist.create({ studentId: req.user.id, tutors: [] });

        if (!wishlist.tutors.includes(tutorId)) {
            wishlist.tutors.push(tutorId);
            await wishlist.save();
        }

        res.json({ message: 'Tutor added to wishlist' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to add to wishlist' });
    }
};

// Remove tutor from wishlist
exports.removeFromWishlist = async (req, res) => {
    const { tutorId } = req.body;

    try {
        const wishlist = await Wishlist.findOne({ studentId: req.user.id });
        if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });

        wishlist.tutors = wishlist.tutors.filter((id) => id.toString() !== tutorId);
        await wishlist.save();

        res.json({ message: 'Tutor removed from wishlist' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to remove from wishlist' });
    }
};
