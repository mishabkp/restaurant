const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// @route   GET /api/reviews/:restaurantId
// @desc    Get all reviews for a restaurant
router.get('/:restaurantId', async (req, res) => {
    try {
        const reviews = await Review.find({ restaurantId: req.params.restaurantId }).sort({ date: -1 });
        res.json(reviews);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/reviews
// @desc    Add a review
router.post('/', async (req, res) => {
    const { restaurantId, userName, rating, comment } = req.body;

    try {
        const newReview = new Review({
            restaurantId,
            userName,
            rating,
            comment
        });

        const review = await newReview.save();
        res.json(review);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
