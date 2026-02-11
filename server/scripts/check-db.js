const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from the server directory
dotenv.config({ path: path.join(__dirname, '../.env') });

const User = require('../models/User');
const Review = require('../models/Review');
const Order = require('../models/Order');

async function checkDatabase() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI, { family: 4 });
        console.log('✅ Connected!\n');

        console.log('--- USERS ---');
        const users = await User.find({});
        if (users.length === 0) console.log('No users found.');
        users.forEach(u => console.log(`- ${u.name} (${u.email}) [ID: ${u._id}]`));

        console.log('\n--- REVIEWS ---');
        const reviews = await Review.find({});
        if (reviews.length === 0) console.log('No reviews found.');
        reviews.forEach(r => console.log(`- ${r.userName} rated ${r.rating} stars: "${r.comment}"`));

        console.log('\n--- ORDERS ---');
        const orders = await Order.find({});
        if (orders.length === 0) console.log('No orders found.');
        orders.forEach(o => console.log(`- Order #${o.orderId}: ₹${o.totalAmount} by user ${o.user} [Status: ${o.status}]`));

        console.log('\n--- End of Data ---');
        process.exit(0);
    } catch (err) {
        console.error('Error fetching data:', err);
        process.exit(1);
    }
}

checkDatabase();
