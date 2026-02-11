const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const Order = require('../models/Order');

async function updateStatus() {
    const args = process.argv.slice(2);
    const orderId = args[0];
    const newStatus = args[1];

    const validStatuses = ['Pending', 'Confirmed', 'Order Placed', 'Preparing', 'Shipped', 'Delivery', 'Out for Delivery', 'Arrived', 'Delivered'];

    if (!orderId || !newStatus) {
        console.log('Usage: node server/scripts/update-status.js <ORDER_ID> <STATUS>');
        console.log('Valid Statuses:', validStatuses.join(', '));
        process.exit(1);
    }

    if (!validStatuses.includes(newStatus)) {
        console.error('❌ Error: Invalid status.');
        console.log('Use one of:', validStatuses.join(', '));
        process.exit(1);
    }

    try {
        console.log(`Connecting to database...`);
        await mongoose.connect(process.env.MONGODB_URI, { family: 4 });

        const order = await Order.findOneAndUpdate({ orderId }, { status: newStatus }, { new: true });

        if (!order) {
            console.log(`❌ Error: Order with ID ${orderId} not found.`);
        } else {
            console.log(`✅ Success! Order ${orderId} status updated to: ${newStatus}`);
        }
        process.exit(0);
    } catch (err) {
        console.error('❌ Database Error:', err);
        process.exit(1);
    }
}

updateStatus();
