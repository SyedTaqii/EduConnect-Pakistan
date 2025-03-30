const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('EduConnect API is running...');
});

const userAuthRoutes = require('./routes/api/userAuth');

app.use('/api/auth', userAuthRoutes);

const studentRoutes = require('./routes/api/student');
app.use('/api/student', studentRoutes);

const tutorRoutes = require('./routes/api/tutor');
app.use('/api/tutor', tutorRoutes);

const adminRoutes = require('./routes/api/admin');
app.use('/api/admin', adminRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
