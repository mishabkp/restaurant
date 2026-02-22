const mongoose = require('mongoose');

const FoodItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String }, // New field for dish category
    price: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    isVeg: { type: Boolean, default: false }
});

const RoomSchema = new mongoose.Schema({
    type: { type: String, required: true },
    price: { type: String, required: true },
    amenities: { type: [String] },
    image: { type: String }
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
    class: { type: String, default: 'Standard' }, // e.g., 'Luxury', '5-Star', 'Budget'
    hours: {
        open: { type: String },
        close: { type: String }
    },
    address: { type: String },
    rooms: [RoomSchema],
    foodItems: [FoodItemSchema]
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
