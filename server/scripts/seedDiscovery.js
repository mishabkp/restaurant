/**
 * Seed Discovery Data Script
 * Seeds the initial Food Stories and Hidden Gems Gallery data into MongoDB.
 * Run: node scripts/seedDiscovery.js
 */
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const Story = require('../models/Story');
const Gallery = require('../models/Gallery');

const stories = [
    {
        id: 1,
        title: "The Legend of Thalassery Biriyani",
        excerpt: "Discover how a unique blend of Khaima rice and Malabar spices created a culinary icon.",
        author: "Fina",
        date: "Feb 15, 2026",
        image: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "Heritage",
        content: "Thalassery Biriyani is not just a dish; it's a testament to the cultural fusion of the Malabar coast..."
    },
    {
        id: 2,
        title: "Kochi's Street Food Secrets",
        excerpt: "Beyond the cafes of Fort Kochi lies a world of hidden snacks and local favorites.",
        author: "Mishab",
        date: "Feb 10, 2026",
        image: "https://images.pexels.com/photos/604969/pexels-photo-604969.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "Street Food",
        content: "Walking through the narrow lanes of Mattancherry at dusk, the aroma of frying pazham pori..."
    },
    {
        id: 3,
        title: "The Art of Slow-Cooked Sadhya",
        excerpt: "A deep dive into the 24-item vegetarian feast that defines Kerala's festivals.",
        author: "Shareef",
        date: "Feb 05, 2026",
        image: "https://images.pexels.com/photos/674574/pexels-photo-674574.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "Tradition",
        content: "Sadhya is a rhythmic experience. From the placement of the banana leaf to the final payasam..."
    }
];

const galleryItems = [
    { id: 1, name: "Backwater Toddy Shop", location: "Alappuzha", image: "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800", tag: "Authentic" },
    { id: 2, name: "Cliff-side Tea Stall", location: "Varkala", image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800", tag: "Scenic" },
    { id: 3, name: "Highland Spice Hut", location: "Munnar", image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800", tag: "Cozy" },
    { id: 4, name: "Ancient Port Cafe", location: "Muziris", image: "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=800", tag: "Historic" },
    { id: 5, name: "Island Fish Grill", location: "Kumarakom", image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800", tag: "Fresh" },
    { id: 6, name: "Forest Edge Eatery", location: "Wayanad", image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800", tag: "Nature" }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { family: 4 });
        console.log('✅ MongoDB connected');

        // Clear existing data
        await Story.deleteMany({});
        await Gallery.deleteMany({});
        console.log('🗑️ Old discovery data cleared');

        // Insert stories
        await Story.insertMany(stories);
        console.log(`📖 ${stories.length} stories seeded`);

        // Insert gallery items
        await Gallery.insertMany(galleryItems);
        console.log(`🖼️ ${galleryItems.length} gallery items seeded`);

        console.log('✅ Discovery data seeded successfully!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seed error:', err);
        process.exit(1);
    }
}

seed();
