const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const studentRoutes = require('./studentRoutes');

// Mount Authentication & Authorization routes (Issue 1, 2, 3)
router.use('/auth', authRoutes);

// Mount Student routes
router.use('/student', studentRoutes);

// Test API endpoint for frontend communication
router.get('/test', (req, res) => {
    res.status(200).json({ message: 'Frontend-Backend communication successful!' });
});

module.exports = router;
