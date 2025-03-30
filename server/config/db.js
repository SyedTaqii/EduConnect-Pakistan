const mongoose = require('mongoose');

// const url = "mongodb://localhost:27017/EduConnect";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}EduConnect?retryWrites=true&w=majority`)
            .then(() => {
                console.log('MongoDB connected');
            });
        // await mongoose.connect(`${process.env.MONGO_URI}EduConnect?retryWrites=true&w=majority`)
        //     .then(() => {
        //         console.log('MongoDB connected');
        //     });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

module.exports = connectDB;