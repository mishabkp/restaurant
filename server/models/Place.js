const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    image: { type: String },
    coords: { type: [Number] }, // [lat, lng]
    description: { type: String },
    restaurants: [{ type: Number }] // Array of restaurant IDs
});

module.exports = mongoose.model('Place', PlaceSchema);
