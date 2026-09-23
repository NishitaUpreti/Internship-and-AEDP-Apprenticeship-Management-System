const express = require('express');
const router = express.Router();

// Test API endpoint for frontend communication
router.get('/test', (req, res) => {
    res.status(200).json({ message: 'Frontend-Backend communication successful!' });
});

module.exports = router;
