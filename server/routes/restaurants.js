const express = require('express');
const router = express.Router();
const Place = require('../models/Place');
const Restaurant = require('../models/Restaurant');

// @route   GET /api/restaurants/places
// @desc    Get all places with nested restaurants
router.get('/places', async (req, res) => {
    try {
        const places = await Place.find().lean();
        const allRestaurants = await Restaurant.find().lean();

        // Nest restaurants into their respective places
        const nestedPlaces = places.map(place => {
            return {
                ...place,
                restaurants: allRestaurants.filter(rest => place.restaurants.includes(rest.id))
            };
        });

        res.json(nestedPlaces);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/restaurants/:id
// @desc    Get specific restaurant details
router.get('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findOne({ id: req.params.id });
        if (!restaurant) return res.status(404).json({ msg: 'Restaurant not found' });
        res.json(restaurant);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/restaurants/place/:placeId
// @desc    Get all restaurants in a place
router.get('/place/:placeId', async (req, res) => {
    try {
        const place = await Place.findOne({ id: req.params.placeId });
        if (!place) return res.status(404).json({ msg: 'Place not found' });

        const restaurants = await Restaurant.find({ id: { $in: place.restaurants } });
        res.json(restaurants);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
