const mongoose = require('mongoose');

const FoodItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String }, // New field for dish category
    price: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    isVeg: { type: Boolean, default: false }
});

const RestaurantSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    cuisine: { type: String },
    rating: { type: Number, default: 0 },
    deliveryTime: { type: String },
    priceForTwo: { type: String },
    image: { type: String },
    featured: { type: Boolean, default: false },
    coords: { type: [Number] }, // [lat, lng]
    hours: {
        open: { type: String },
        close: { type: String }
    },
    address: { type: String },
    foodItems: [FoodItemSchema]
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
