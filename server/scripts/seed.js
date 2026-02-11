const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const Restaurant = require('../models/Restaurant');
const Place = require('../models/Place');

dotenv.config({ path: path.join(__dirname, '../.env') });

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { family: 4 });
        console.log("Connected to MongoDB for seeding...");

        // Read data.js
        const dataPath = path.join(__dirname, '../../js/data.js');
        const fileContent = fs.readFileSync(dataPath, 'utf8');

        // Extract JSON object from 'const restaurantData = { ... };'
        const startIndex = fileContent.indexOf('{');
        const endIndex = fileContent.lastIndexOf('}');
        const jsonStr = fileContent.substring(startIndex, endIndex + 1);

        // Fix potential trailing commas or minor syntax issues in JS object string
        // (Though usually valid JS is valid JSON if quoted correctly)
        // Since it's a JS file, some keys might not be quoted. 
        // We'll use a trick or just be careful.
        // Actually, let's just use eval in a safe-ish way since it's our own data file.
        let restaurantData;
        try {
            restaurantData = JSON.parse(jsonStr);
        } catch (e) {
            console.log("JSON.parse failed, attempting eval-based extraction...");
            // If it's a JS object literal, JSON.parse might fail
            const evalStr = `(${jsonStr})`;
            restaurantData = eval(evalStr);
        }

        if (!restaurantData || !restaurantData.places) {
            throw new Error("Could not extract valid restaurant data.");
        }

        // Clear existing data
        await Restaurant.deleteMany({});
        await Place.deleteMany({});

        let totalRestaurants = 0;

        for (const place of restaurantData.places) {
            const restaurantIds = [];

            for (const rest of place.restaurants || []) {
                // Prepare data (ensure ID is a number)
                const restData = { ...rest };
                delete restData.reviews; // Reviews handled separately

                const newRest = new Restaurant(restData);
                await newRest.save();
                restaurantIds.push(rest.id);
                totalRestaurants++;
            }

            const newPlace = new Place({
                id: place.id,
                name: place.name,
                image: place.image,
                coords: place.coords,
                description: place.description,
                restaurants: restaurantIds
            });
            await newPlace.save();
        }

        console.log(`✅ Database seeded successfully!`);
        console.log(`Places: ${restaurantData.places.length}`);
        console.log(`Restaurants: ${totalRestaurants}`);
        process.exit();
    } catch (err) {
        console.error("Seeding Error:", err);
        process.exit(1);
    }
};

seedDB();
