const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// @route   POST /api/orders
// @desc    Place a new order
router.post('/', async (req, res) => {
    const { user, items, totalAmount, deliveryAddress, paymentMethod, orderId } = req.body;

    try {
        const newOrder = new Order({
            user,
            items,
            totalAmount,
            deliveryAddress,
            paymentMethod,
            orderId
        });

        const order = await newOrder.save();
        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/orders/:userId
// @desc    Get order history for a user
router.get('/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/orders/track/:orderId
// @desc    Get tracking status for a specific order
router.get('/track/:orderId', async (req, res) => {
    try {
        const order = await Order.findOne({ orderId: req.params.orderId });
        if (!order) return res.status(404).json({ msg: 'Order not found' });
        res.json({ status: order.status });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
