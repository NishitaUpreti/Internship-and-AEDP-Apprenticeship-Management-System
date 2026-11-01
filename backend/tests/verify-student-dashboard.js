const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const { generateToken } = require('../utils/jwt');
const { User } = require('../models');
const http = require('http');

async function testBhaskar() {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const student = await User.findOne({ email: 'bhaskarvanjarapu207@gmail.com' });
    if (!student) {
        console.error('Bhaskar not found!');
        process.exit(1);
    }
    console.log(`Testing dashboard with student: ${student.name} (${student.email})`);

    const token = generateToken({ id: student._id.toString(), role: student.role });

    const req = http.request(
        {
            hostname: 'localhost',
            port: 5000,
            path: '/api/student/dashboard',
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        },
        (res) => {
            let body = '';
            res.on('data', (c) => (body += c));
            res.on('end', () => {
                console.log(`HTTP Status: ${res.statusCode}`);
                try {
                    const parsed = JSON.parse(body);
                    console.log('Greeting:', parsed.data.greeting);
                    console.log('Stats:', parsed.data.stats);
                    console.log('Recent Opportunities:', parsed.data.recentOpportunities);
                    console.log('Deadlines:', parsed.data.upcomingDeadlines);
                } catch (e) {
                    console.log('Raw body:', body);
                }
                mongoose.disconnect();
            });
        }
    );

    req.on('error', (err) => {
        console.error('Request error:', err);
        mongoose.disconnect();
    });

    req.end();
}

testBhaskar();
