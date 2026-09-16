require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// Basic health endpoint
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Backend is running successfully.' });
});

// Test API endpoint for frontend communication
app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'Frontend-Backend communication successful!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
