const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tutor = require('../models/Tutor');
const User = require('../models/User');
const connectDB = require('../config/db');

dotenv.config();
connectDB();

const seedTutors = async () => {
    const student = await User.findOne({ role: 'student' });
    const tutorUser = await User.findOne({ role: 'tutor' });

    const tutors = [
        {
            userId: tutorUser._id,
            subjects: ['Math', 'Physics'],
            city: 'Lahore',
            rate: 1500,
            availability: [
                { day: 'Monday', times: ['10:00 AM', '2:00 PM'] },
                { day: 'Wednesday', times: ['3:00 PM'] }
            ],
            mode: 'both',
            rating: 4.5,
            bio: 'Experienced tutor in Math and Physics.'
        },
        // add more tutors...
    ];

    try {
        await Tutor.deleteMany();
        await Tutor.insertMany(tutors);
        console.log('Tutors seeded!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedTutors();
