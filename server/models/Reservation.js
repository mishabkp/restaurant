const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    restaurantId: {
        type: Number,
        required: true
    },
    restaurantName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Table', 'Room'],
        required: true
    },
    guests: {
        type: String,
        required: true
    },
    // For both Tables and Rooms (check-in date for rooms, reservation date for tables)
    date: {
        type: String,
        required: true
    },
    // Specific to Rooms
    checkoutDate: {
        type: String
    },
    roomType: {
        type: String
    },
    price: {
        type: String
    },
    // Specific to Tables
    time: {
        type: String
    },
    status: {
        type: String,
        enum: ['Confirmed', 'Cancelled'],
        default: 'Confirmed'
    },
    reservationId: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);
