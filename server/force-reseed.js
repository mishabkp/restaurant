require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const Place = require('./models/Place');
const Restaurant = require('./models/Restaurant');
const Story = require('./models/Story');
const Gallery = require('./models/Gallery');
const autoSeed = require('./utils/autoSeed');

async function forceReseed() {
    try {
        console.log('Connecting to remote MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected.');

        console.log('Clearing old Places and Restaurants...');
        await Place.deleteMany({});
        await Restaurant.deleteMany({});

        console.log('Running autoSeed...');
        await autoSeed();

        console.log('Reseed complete!');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

forceReseed();
