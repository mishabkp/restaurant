require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const fs = require('fs');

const Restaurant = require('../models/Restaurant');
const Place = require('../models/Place');

// Parse js/data.js
const dataJsPath = require('path').join(__dirname, '../../js/data.js');
const dataJs = fs.readFileSync(dataJsPath, 'utf-8');

// evaluate the js file to get the data
// We can strip 'window.restaurantData = ' and run JSON.parse or eval
const jsonStr = dataJs.replace('window.restaurantData = ', '').trim().replace(/;$/, '');
let data;
try {
    // eval safely-ish
    eval('data = ' + jsonStr + ';');
} catch (e) {
    console.error('Error parsing data.js', e);
    process.exit(1);
}

async function syncCoords() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { family: 4 });
        console.log('Connected to DB');

        for (const place of data.places) {
            if (place.coords && place.coords.length === 2) {
                await Place.updateOne({ id: place.id }, { $set: { coords: place.coords } });
                console.log(`Updated Place: ${place.name} coords to ${place.coords}`);
            }

            for (const rest of place.restaurants) {
                if (rest.coords && rest.coords.length === 2) {
                    await Restaurant.updateOne({ id: rest.id }, { $set: { coords: rest.coords } });
                    console.log(`Updated Restaurant: ${rest.name} coords to ${rest.coords}`);
                }
            }
        }

        console.log('Sync complete');
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.disconnect();
    }
}

syncCoords();
