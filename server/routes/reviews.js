const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/reviews/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

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
router.post('/', upload.single('image'), async (req, res) => {
    const { restaurantId, userName, rating, comment } = req.body;
    const image = req.file ? req.file.path : null;

    try {
        const newReview = new Review({
            restaurantId,
            userName,
            rating,
            comment,
            image
        });

        const review = await newReview.save();
        res.json(review);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
