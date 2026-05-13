const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const authMiddleware = require('./middleware/authMiddleware');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Auth routes
app.use('/api/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('Server Running Successfully');
});

// Protected route
app.get('/profile', authMiddleware, (req, res) => {

    res.json({
        message: 'Protected route accessed',
        user: req.user
    });
});

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {

    console.log('MongoDB Connected');

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

})
.catch((error) => {
    console.log(error);
});