const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            name: { type: String, required: true },
            price: { type: String, required: true },
            quantity: { type: Number, required: true },
            restaurantId: { type: Number, required: true }
        }
    ],
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Preparing', 'Shipped', 'Delivery', 'Out for Delivery', 'Arrived', 'Delivered'],
        default: 'Pending'
    },
    deliveryAddress: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true }
    },
    paymentMethod: { type: String, required: true },
    orderId: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
