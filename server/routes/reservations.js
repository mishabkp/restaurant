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
        res.status(500).json({ error: 'Server error while creating reservation', details: err ? err.toString() : 'Unknown Error' });
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

// @route   PUT /api/reservations/:id/status
// @desc    Update reservation status (Admin)
// @access  Public (should be protected in prod)
router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        if (!['Pending', 'Confirmed', 'Cancelled'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const reservation = await Reservation.findOneAndUpdate(
            { reservationId: req.params.id },
            { status },
            { new: true }
        );

        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        res.status(200).json(reservation);
    } catch (err) {
        console.error('Update Reservation Status Error:', err);
        res.status(500).json({ error: 'Server error while updating reservation status' });
    }
});

// @route   GET /api/reservations/user/:userId
// @desc    Get reservations for a specific user
// @access  Public (should be protected in prod)
router.get('/user/:userId', async (req, res) => {
    try {
        const reservations = await Reservation.find({ user: req.params.userId })
            .sort({ createdAt: -1 });
        res.status(200).json(reservations);
    } catch (err) {
        console.error('Fetch User Reservations Error:', err);
        res.status(500).json({ error: 'Server error while fetching user reservations' });
    }
});

module.exports = router;
