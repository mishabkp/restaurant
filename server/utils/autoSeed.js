const mongoose = require('mongoose');
const Story = require('../models/Story');
const Gallery = require('../models/Gallery');

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
        title: "The Art of Slow-Cooked Sadhya",
        excerpt: "A deep dive into the 24-item vegetarian feast that defines Kerala's festivals.",
        author: "Shareef",
        date: "Feb 05, 2026",
        image: "https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg?auto=compress&cs=tinysrgb&w=800",
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
    } catch (err) {
        console.error('❌ Auto-seeding error:', err);
    }
};

module.exports = checkAndSeedData;
