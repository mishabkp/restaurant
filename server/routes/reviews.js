const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Use absolute path to ensure uploads work correctly across environments
        const uploadDir = path.join(__dirname, '..', 'uploads', 'reviews');
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
        const restaurantId = parseInt(req.params.restaurantId);
        if (isNaN(restaurantId)) {
            return res.status(400).json({ msg: 'Invalid restaurant ID' });
        }
        const reviews = await Review.find({ restaurantId }).sort({ date: -1 });
        res.json(reviews);
    } catch (err) {
        console.error('Fetch Reviews Error:', err.message);
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
});

// @route   POST /api/reviews
// @desc    Add a review
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { restaurantId, userName, rating, comment } = req.body;

        // Explicitly cast to Number to pass Mongoose schema validation
        const rid = parseInt(restaurantId);
        const rtg = parseInt(rating);

        if (isNaN(rid) || isNaN(rtg)) {
            return res.status(400).json({ msg: 'Invalid restaurantId or rating values' });
        }

        let imagePath = null;
        if (req.file) {
            // Normalize path to use forward slashes for frontend compatibility
            imagePath = req.file.path.replace(/\\/g, '/');
            // Extract the relative path that the static middleware expects
            const parts = imagePath.split('uploads/');
            if (parts.length > 1) {
                imagePath = 'uploads/' + parts[1];
            }
        }

        const newReview = new Review({
            restaurantId: rid,
            userName,
            rating: rtg,
            comment,
            image: imagePath
        });

        const review = await newReview.save();
        res.json(review);
    } catch (err) {
        console.error('Submit Review Error:', err.message);
        res.status(400).json({ msg: 'Validation Failed or Database Error', error: err.message });
    }
});

module.exports = router;
