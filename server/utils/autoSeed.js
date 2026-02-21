const mongoose = require('mongoose');
const Story = require('../models/Story');
const Gallery = require('../models/Gallery');
const Place = require('../models/Place');
const Restaurant = require('../models/Restaurant');

const stories = [
    {
        id: 1,
        title: "The Legend of the Sadya",
        excerpt: "A deep dive into the 24-item vegetarian feast that defines Kerala's festivals.",
        content: "Sadhya is a rhythmic experience. From the placement of the banana leaf to the final payasam...",
        author: "Shareef",
        category: "Tradition",
        image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800",
        date: "Feb 10, 2026"
    },
    {
        id: 2,
        title: "Kochi's Street Food Secrets",
        excerpt: "Beyond the cafes of Fort Kochi lies a world of hidden snacks and local favorites.",
        author: "Mishab",
        date: "Feb 10, 2026",
        image: "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "Street Food",
        content: "Walking through the narrow lanes of Mattancherry at dusk, the aroma of frying pazham pori..."
    },
    {
        id: 3,
        title: "Karimeen Pollichathu: The Pearl of Backwaters",
        excerpt: "Explore the art of marinating pearl spot fish in spicy masalas and slow-cooking it inside a banana leaf.",
        author: "Ashwin",
        date: "Feb 05, 2026",
        image: "https://image.pollinations.ai/prompt/karimeen_pollichathu_pearl_spot_fish_wrapped_in_burned_banana_leaf_served_on_traditional_plate_kerala_backwater_background_hyper_realistic_food_photography?width=800&height=500&nologo=true",
        category: "Seafood",
        content: "Karimeen Pollichathu is the crown jewel of Kerala's backwater cuisine. The pearl spot fish is marinated in a rich paste of ginger, garlic, and locally sourced spices, then wrapped tightly in a fresh banana leaf and pan-fried to perfection. The leaf infuses the fish with a unique smoky aroma, making it a must-try for every food lover visiting Kerala."
    }
];

const galleryItems = [
    { id: 6, name: "Forest Edge Eatery", location: "Wayanad", image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800", tag: "Nature" }
];

const placesData = [
    {
        id: 1,
        name: "Kochi",
        description: "Queen of the Arabian Sea",
        image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&h=600&fit=crop",
        restaurants: [101, 102, 103]
    },
    {
        id: 2,
        name: "Thiruvananthapuram",
        description: "Capital City of Kerala",
        image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&h=600&fit=crop",
        restaurants: [201, 202]
    },
    {
        id: 3,
        name: "Alappuzha",
        description: "Venice of the East",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop",
        restaurants: [301, 302]
    },
    {
        id: 4,
        name: "Idukki",
        description: "Highland Paradise & Munnar Hills",
        image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&h=600&fit=crop",
        restaurants: [401]
    },
    {
        id: 5,
        name: "Kozhikode",
        description: "City of Spices & Malabar Flavors",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop",
        restaurants: [501]
    },
    {
        id: 6,
        name: "Kannur",
        description: "Land of Looms and Lores",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop",
        restaurants: [601]
    },
    {
        id: 7,
        name: "Malappuram",
        description: "The Hill-top City of Kerala",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop",
        restaurants: [701]
    },
    {
        id: 8,
        name: "Wayanad",
        description: "The Green Paradise",
        image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&h=600&fit=crop",
        restaurants: [801]
    },
    {
        id: 9,
        name: "Thrissur",
        description: "Cultural Capital of Kerala",
        image: "https://images.unsplash.com/photo-1600139314959-548c081e69b5?w=800&h=600&fit=crop",
        restaurants: [901]
    },
    {
        id: 10,
        name: "Kasaragod",
        description: "Northern Gateway of Kerala",
        image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800",
        restaurants: [1001, 1002]
    },
    {
        id: 11,
        name: "Palakkad",
        description: "The Rice Bowl of Kerala",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
        restaurants: [1101, 1102]
    },
    {
        id: 12,
        name: "Kottayam",
        description: "Land of Letters, Latex and Lakes",
        image: "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800",
        restaurants: [1201, 1202]
    },
    {
        id: 13,
        name: "Pathanamthitta",
        description: "Pilgrim Capital of Kerala",
        image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800",
        restaurants: [1301, 1302]
    },
    {
        id: 14,
        name: "Kollam",
        description: "Prince of Arabian Sea",
        image: "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800",
        restaurants: [1401, 1402]
    }
];

const restaurantsData = [
    {
        id: 101,
        name: "Oceanos",
        cuisine: "Seafood & Continental",
        class: "Luxury",
        rating: 4.5,
        image: "https://media.allaboutpeloponnisos.com/uploads/images/500/0/businneses/corinth/loutraki_1/oceanos_restaurant/r.jpg",
        foodItems: [
            { name: "Prawn Cocktail", price: "₹280", category: "Starters", isVeg: false },
            { name: "Lobster Thermidor", price: "₹1200", category: "Main Course", isVeg: false }
        ]
    },
    {
        id: 102,
        name: "Spice Garden",
        cuisine: "Kerala Traditional",
        class: "5-Star",
        rating: 4.7,
        image: "https://media-cdn.tripadvisor.com/media/photo-p/11/ce/26/45/spice-garden-restaurant.jpg",
        foodItems: [
            { name: "Karimeen Pollichathu", price: "₹480", category: "Main Course", isVeg: false },
            { name: "Kerala Sadya", price: "₹350", category: "Main Course", isVeg: true }
        ]
    },
    {
        id: 103,
        name: "Street Bites",
        cuisine: "Street Food",
        class: "Budget",
        rating: 4.2,
        image: "https://images.pexels.com/photos/210661/pexels-photo-210661.jpeg?auto=compress&cs=tinysrgb&w=800",
        foodItems: [
            { name: "Beef Fry", price: "₹180", category: "Main Course", isVeg: false },
            { name: "Pazham Pori", price: "₹40", category: "Snacks", isVeg: true }
        ]
    },
    {
        id: 301,
        name: "Backwater Heritage",
        cuisine: "Kuttanadan",
        class: "Luxury",
        rating: 4.8,
        image: "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800",
        foodItems: [
            { name: "Duck Mappas", price: "₹550", category: "Main Course", isVeg: false },
            { name: "Toddy Shop Fish Curry", price: "₹320", category: "Main Course", isVeg: false }
        ]
    },
    {
        id: 401,
        name: "Munnar Tea Garden",
        cuisine: "Continental & Nadan",
        class: "Luxury",
        rating: 4.6,
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
        foodItems: [
            { name: "Appam with Vegetable Stew", price: "₹180", category: "Breakfast", isVeg: true },
            { name: "Munnar Special Tea", price: "₹60", category: "Beverages", isVeg: true }
        ]
    },
    {
        id: 501,
        name: "Paragon Legacy",
        cuisine: "Malabar Traditional",
        class: "5-Star",
        rating: 4.9,
        image: "https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=800",
        foodItems: [
            { name: "Kozhikode Chicken Biriyani", price: "₹220", category: "Main Course", isVeg: false },
            { name: "Malabar Parotta & Beef Curry", price: "₹180", category: "Main Course", isVeg: false }
        ]
    },
    {
        id: 601,
        name: "Kannur Kitchen",
        cuisine: "Thalassery Specialties",
        class: "Luxury",
        rating: 4.7,
        image: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=800",
        foodItems: [
            { name: "Thalassery Biriyani", price: "₹240", category: "Main Course", isVeg: false },
            { name: "Kannur Unnakkaya", price: "₹80", category: "Snacks", isVeg: true }
        ]
    },
    {
        id: 701,
        name: "Malabar Plaza",
        cuisine: "Authentic Malabari",
        class: "Luxury",
        rating: 4.6,
        image: "https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=800",
        foodItems: [
            { name: "Erachi Pathiri", price: "₹120", category: "Snacks", isVeg: false },
            { name: "Ghee Rice & Mutton Curry", price: "₹380", category: "Main Course", isVeg: false }
        ]
    },
    {
        id: 801,
        name: "Wayanad Wild",
        cuisine: "Tribal & Ethnic",
        class: "Luxury",
        rating: 4.8,
        image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800",
        foodItems: [
            { name: "Bamboo Biriyani", price: "₹450", category: "Main Course", isVeg: false },
            { name: "Mulayari Payasam", price: "₹120", category: "Desserts", isVeg: true }
        ]
    },
    {
        id: 901,
        name: "Thrissur Heritage",
        cuisine: "Pure Veg & Kerala",
        class: "5-Star",
        rating: 4.7,
        image: "https://images.pexels.com/photos/1055058/pexels-photo-1055058.jpeg?auto=compress&cs=tinysrgb&w=800",
        foodItems: [
            { name: "Olan & Avial", price: "₹180", category: "Main Course", isVeg: true },
            { name: "Thrissur Pooram Special Sadya", price: "₹300", category: "Main Course", isVeg: true }
        ]
    },
    {
        id: 1001,
        name: "Kasaragod Castle",
        cuisine: "Tuluva & Malabar",
        class: "Luxury",
        rating: 4.7,
        image: "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=800",
        rooms: [
            { type: "Fort View Suite", price: "₹8500", amenities: ["Historical View", "AC", "Spa Access", "WiFi"], image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800" }
        ],
        foodItems: [
            { name: "Kasaragod Chicken Curry", price: "₹280", category: "Main Course", isVeg: false }
        ]
    },
    {
        id: 1101,
        name: "Palakkad Heritage Inn",
        cuisine: "Palakkadan Brahmin",
        class: "Luxury",
        rating: 4.6,
        image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800",
        rooms: [
            { type: "Agraharam Suite", price: "₹6500", amenities: ["Traditional Ambience", "Pure Veg Dining", "WiFi", "AC"], image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800" }
        ],
        foodItems: [
            { name: "Palakkadan Matta Rice & Sambhar", price: "₹120", category: "Main Course", isVeg: true }
        ]
    },
    {
        id: 1201,
        name: "Syrian Heritage Resort",
        cuisine: "Syrian Christian",
        class: "Luxury",
        rating: 4.9,
        image: "https://images.pexels.com/photos/2034330/pexels-photo-2034330.jpeg?auto=compress&cs=tinysrgb&w=800",
        rooms: [
            { type: "Lake View Villa", price: "₹15000", amenities: ["Private Pool", "Lake View", "Butler Service"], image: "https://images.pexels.com/photos/210532/pexels-photo-210532.jpeg?auto=compress&cs=tinysrgb&w=800" }
        ],
        foodItems: [
            { name: "Beef Ularthiyathu", price: "₹350", category: "Main Course", isVeg: false }
        ]
    },
    {
        id: 1301,
        name: "Aranmula Heritage",
        cuisine: "Traditional Sadya",
        class: "Luxury",
        rating: 4.5,
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
        rooms: [
            { type: "Heritage Palace Suite", price: "₹7000", amenities: ["Traditional Vibe", "Pampa River View", "WiFi"], image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800" }
        ],
        foodItems: [
            { name: "Aranmula Valla Sadya", price: "₹450", category: "Main Course", isVeg: true }
        ]
    },
    {
        id: 1401,
        name: "Quilon Port Grill",
        cuisine: "Seafood & Grill",
        class: "Luxury",
        rating: 4.7,
        image: "https://images.pexels.com/photos/2034330/pexels-photo-2034330.jpeg?auto=compress&cs=tinysrgb&w=800",
        rooms: [
            { type: "Sea Facing Executive", price: "₹9000", amenities: ["Direct Beach Access", "Private Balcony", "AC"], image: "https://images.pexels.com/photos/210532/pexels-photo-210532.jpeg?auto=compress&cs=tinysrgb&w=800" }
        ],
        foodItems: [
            { name: "Kollam Fish Curry", price: "₹290", category: "Main Course", isVeg: false }
        ]
    }
];

const checkAndSeedData = async () => {
    try {
        const storyCount = await Story.countDocuments();
        const galleryCount = await Gallery.countDocuments();

        if (storyCount === 0) {
            console.log('🌱 Seeding initial Stories...');
            await Story.insertMany(stories);
            console.log('✅ Stories seeded!');
        }

        if (galleryCount === 0) {
            console.log('🌱 Seeding initial Gallery items...');
            await Gallery.insertMany(galleryItems);
            console.log('✅ Gallery items seeded!');
        }

        const placeCount = await Place.countDocuments();
        if (placeCount === 0) {
            console.log('🌱 Seeding initial Places...');
            await Place.insertMany(placesData);
            console.log('✅ Places seeded!');
        }

        const restaurantCount = await Restaurant.countDocuments();
        if (restaurantCount === 0) {
            console.log('🌱 Seeding initial Restaurants...');
            await Restaurant.insertMany(restaurantsData);
            console.log('✅ Restaurants seeded!');
        }
    } catch (err) {
        console.error('❌ Auto-seeding error:', err);
    }
};

module.exports = checkAndSeedData;
