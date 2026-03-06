const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Forced redeploy 17:48 UTC
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/restaurants', require('./routes/restaurants'));
app.use('/api/discovery', require('./routes/discovery'));
app.get('/api/ping', (req, res) => res.json({ msg: 'pong', build: 'BUILD_DEBUG_V6' }));




// Basic Route
app.get('/', (req, res) => {
    res.json({
        msg: 'Restaurant Navigator API is running...',
        version: '1.2.2',
        build_id: 'BUILD_DEBUG_V6',
        deployment_time: new Date().toISOString()
    });
});

// Database Connection
const checkAndSeedData = require('./utils/autoSeed');

mongoose.connect(process.env.MONGODB_URI, { family: 4 })
    .then(() => {
        console.log('✅ MongoDB Connected Ready!');
        checkAndSeedData();
    })
    .catch(err => console.error('❌ MongoDB Connection Error:', err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
