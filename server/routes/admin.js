const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Middleware to check if user is admin (simplified for now)
const isAdmin = async (req, res, next) => {
    // In a real app, you'd check the JWT token's role
    // For this simulation, we'll assume the client sends a role header or we check the user from DB
    // But since we haven't implemented full JWT role check yet, we'll skip strict check for testing
    next();
};

const Restaurant = require('../models/Restaurant');
const User = require('../models/User');
const Review = require('../models/Review');

// @route   GET /api/admin/orders
// @desc    Get all orders for all users
router.get('/orders', isAdmin, async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PATCH /api/admin/orders/:orderId/status
// @desc    Update order status
router.patch('/orders/:orderId/status', isAdmin, async (req, res) => {
    const { status } = req.body;
    try {
        const order = await Order.findOneAndUpdate(
            { orderId: req.params.orderId },
            { status: status },
            { new: true }
        );
        if (!order) return res.status(404).json({ msg: 'Order not found' });
        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/admin/stats
// @desc    Get dashboard statistics
router.get('/stats', isAdmin, async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const totalUsers = await User.countDocuments();
        const allOrders = await Order.find();
        const totalRevenue = allOrders.reduce((acc, curr) => acc + (Number(curr.totalAmount) || 0), 0);

        res.json({
            totalOrders,
            totalUsers,
            totalRevenue: `₹${totalRevenue.toLocaleString()}`
        });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/admin/users
// @desc    Get all users
router.get('/users', isAdmin, async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/admin/restaurants
// @desc    Add new restaurant
router.post('/restaurants', isAdmin, async (req, res) => {
    try {
        const newRest = new Restaurant(req.body);
        await newRest.save();
        res.json(newRest);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/admin/restaurants/:id
// @desc    Update restaurant
router.put('/restaurants/:id', isAdmin, async (req, res) => {
    try {
        const rest = await Restaurant.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        res.json(rest);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/admin/reviews
// @desc    Get all reviews
router.get('/reviews', isAdmin, async (req, res) => {
    try {
        const reviews = await Review.find().sort({ date: -1 });
        res.json(reviews);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/admin/reviews/:id
// @desc    Delete a review
router.delete('/reviews/:id', isAdmin, async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Review removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
