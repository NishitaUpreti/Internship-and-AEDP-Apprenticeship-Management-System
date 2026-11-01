const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const studentRoutes = require('./studentRoutes');
const employerRoutes = require('./employerRoutes');
const opportunityRoutes = require('./opportunityRoutes');
const applicationRoutes = require('./applicationRoutes');

// Mount Authentication & Authorization routes
router.use('/auth', authRoutes);

// Mount Student routes
router.use('/student', studentRoutes);

// Mount Employer routes (Module 1)
router.use('/employers', employerRoutes);

// Mount Opportunity routes (Module 1)
router.use('/opportunities', opportunityRoutes);

// Mount Application routes (Module 2)
router.use('/applications', applicationRoutes);

// Test API endpoint for frontend communication
router.get('/test', (req, res) => {
    res.status(200).json({ message: 'Frontend-Backend communication successful!' });
});

module.exports = router;
