const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// @route   POST /api/reservations
// @desc    Create a new reservation (Table or Room)
// @access  Public
router.post('/', async (req, res) => {
    try {
        const {
            user, userName, userEmail,
            restaurantId, restaurantName,
            type, guests, date, checkoutDate,
            roomType, price, time, reservationId
        } = req.body;

        const newReservation = new Reservation({
            user: user || undefined,
            userName,
            userEmail,
            restaurantId,
            restaurantName,
            type,
            guests,
            date,
            checkoutDate,
            roomType,
            price,
            time,
            reservationId
        });

        const savedReservation = await newReservation.save();
        res.status(201).json(savedReservation);
    } catch (err) {
        console.error('Create Reservation Error:', err);
        res.status(500).json({ error: 'Server error while creating reservation', details: err.message });
    }
});

// @route   GET /api/reservations
// @desc    Get all reservations (for Admin)
// @access  Public
router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.find()
            .populate('user', 'name email phone')
            .sort({ createdAt: -1 });
        res.status(200).json(reservations);
    } catch (err) {
        console.error('Fetch Reservations Error:', err);
        res.status(500).json({ error: 'Server error while fetching reservations' });
    }
});

module.exports = router;
