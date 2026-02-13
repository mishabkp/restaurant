require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const Place = require('../models/Place');
const Restaurant = require('../models/Restaurant');

// Malappuram data to seed
const malappuramData = {
    place: {
        id: 6, // Numeric ID required by schema
        name: "Malappuram",
        description: "The Culinary Capital of Kerala",
        image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&h=600&fit=crop",
        coords: [11.0510, 76.0711],
        restaurants: [] // Will be populated after restaurant creation
    },
    restaurants: [
        {
            id: 601,
            name: "Rahmath Hotel",
            cuisine: "Malabar Traditional",
            rating: 4.8,
            isFeatured: true,
            hours: { open: "06:00", close: "23:00" },
            tags: ["Top Rated", "Traditional", "Malabar"],
            image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
            reviews: [
                { user: "Rasheed K.", rating: 5, comment: "Best Malabar Biriyani in the entire district! Authentic taste that keeps me coming back.", date: new Date() },
                { user: "Fathima N.", rating: 5, comment: "The Pathiri and Neychor combo is heavenly. True Malabar experience!", date: new Date() }
            ],
            foodItems: [
                { name: "Malabar Biriyani", category: "Main Course", price: 180, isVeg: false, description: "Fragrant Malabar-style chicken biriyani with Khaima rice", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop" },
                { name: "Pathiri & Chicken Curry", category: "Main Course", price: 150, isVeg: false, description: "Thin rice bread with rich Malabar chicken curry", image: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=400&h=300&fit=crop" },
                { name: "Neychor", category: "Main Course", price: 120, isVeg: false, description: "Ghee rice cooked in traditional Malabar style", image: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=400&h=300&fit=crop" },
                { name: "Beef Ularthiyathu", category: "Main Course", price: 200, isVeg: false, description: "Dry-roasted beef with coconut and spices", image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&h=300&fit=crop" },
                { name: "Malabar Parotta", category: "Main Course", price: 30, isVeg: true, description: "Flaky layered flatbread, crispy outside and soft inside", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop" },
                { name: "Chicken Fry", category: "Starters", price: 160, isVeg: false, description: "Crispy fried chicken Malabar hotel style", image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=300&fit=crop" },
                { name: "Mutton Stew", category: "Main Course", price: 220, isVeg: false, description: "Creamy coconut milk stew with tender mutton pieces", image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop" },
                { name: "Unnakkaya", category: "Snacks", price: 40, isVeg: false, description: "Sweet banana fritter stuffed with egg and nuts", image: "https://images.unsplash.com/photo-1628772182610-2f890948c59c?w=400&h=300&fit=crop" },
                { name: "Sulaimani Tea", category: "Beverages", price: 25, isVeg: true, description: "Aromatic black tea with lemon and spices", image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=400&h=300&fit=crop" },
                { name: "Arikkadukka", category: "Snacks", price: 60, isVeg: false, description: "Stuffed mussels with spiced rice filling", image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop" }
            ],
            coords: [11.0510, 76.0711]
        },
        {
            id: 602,
            name: "Salkara Restaurant",
            cuisine: "Malabar & Mughlai",
            rating: 4.6,
            isFeatured: true,
            hours: { open: "07:00", close: "23:30" },
            tags: ["Top Rated", "Traditional", "Modern"],
            image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
            reviews: [
                { user: "Shafeeq M.", rating: 5, comment: "The Chicken Mandhi is absolutely amazing! Best in Malappuram.", date: new Date() },
                { user: "Aisha R.", rating: 4, comment: "Great ambiance and food quality. The Shawarma is a must-try.", date: new Date() }
            ],
            foodItems: [
                { name: "Chicken Mandhi", category: "Main Course", price: 280, isVeg: false, description: "Arabian style smoked chicken with flavored rice", image: "https://images.unsplash.com/photo-1619221882659-1f1c0b166bad?w=400&h=300&fit=crop" },
                { name: "Shawarma", category: "Snacks", price: 90, isVeg: false, description: "Juicy chicken shawarma wrap with garlic sauce", image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop" },
                { name: "Alfaham Chicken", category: "Main Course", price: 240, isVeg: false, description: "Grilled marinated chicken Arabian style", image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop" },
                { name: "Mutton Biriyani", category: "Main Course", price: 250, isVeg: false, description: "Aromatic mutton biriyani with Malabar spices", image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=400&h=300&fit=crop" },
                { name: "Kuboos & Chicken Curry", category: "Main Course", price: 130, isVeg: false, description: "Soft Arabian bread with spicy Malabar chicken", image: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=400&h=300&fit=crop" },
                { name: "Falooda", category: "Desserts", price: 100, isVeg: true, description: "Rose-flavored milk dessert with vermicelli and ice cream", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop" },
                { name: "Chatti Pathiri", category: "Desserts", price: 80, isVeg: false, description: "Layered pastry with sweet egg filling, Malabar specialty", image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400&h=300&fit=crop" },
                { name: "Thalassery Fish Biriyani", category: "Main Course", price: 220, isVeg: false, description: "Spicy fish biriyani Thalassery style with Khaima rice", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop" },
                { name: "Pepper Chicken", category: "Starters", price: 180, isVeg: false, description: "Crunchy pepper chicken Kerala restaurant style", image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=300&fit=crop" },
                { name: "Kattan Chai", category: "Beverages", price: 20, isVeg: true, description: "Strong black tea without milk, Malabar special", image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=300&fit=crop" }
            ],
            coords: [11.0430, 76.0780]
        },
        {
            id: 603,
            name: "Top Form Restaurant",
            cuisine: "Multi-Cuisine & Malabar",
            rating: 4.5,
            isFeatured: false,
            hours: { open: "08:00", close: "23:00" },
            tags: ["Modern", "Traditional", "Family"],
            image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop",
            reviews: [
                { user: "Ibrahim T.", rating: 4, comment: "Great ambiance and variety. Their fried rice is next level!", date: new Date() },
                { user: "Safiya J.", rating: 5, comment: "Best family restaurant in town. Kids love it here!", date: new Date() }
            ],
            foodItems: [
                { name: "Dragon Chicken", category: "Starters", price: 220, isVeg: false, description: "Spicy Indo-Chinese chicken with peppers", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop" },
                { name: "Egg Biriyani", category: "Main Course", price: 140, isVeg: false, description: "Flavorful egg biriyani with boiled eggs and aromatic rice", image: "https://images.unsplash.com/photo-1633945274309-20314fe78f9f?w=400&h=300&fit=crop" },
                { name: "Chicken Fried Rice", category: "Main Course", price: 180, isVeg: false, description: "Wok-tossed rice with chicken and vegetables", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop" },
                { name: "Paneer Butter Masala", category: "Main Course", price: 190, isVeg: true, description: "Creamy tomato-based paneer curry", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop" },
                { name: "Chilli Chicken", category: "Starters", price: 200, isVeg: false, description: "Crispy chicken tossed in spicy chilli sauce", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop" },
                { name: "Mushroom Manchurian", category: "Starters", price: 170, isVeg: true, description: "Crispy mushroom balls in tangy Manchurian sauce", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=300&fit=crop" },
                { name: "Tandoori Chicken", category: "Starters", price: 280, isVeg: false, description: "Charcoal-grilled marinated chicken", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop" },
                { name: "Veg Noodles", category: "Main Course", price: 130, isVeg: true, description: "Stir-fried Hakka noodles with fresh vegetables", image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop" },
                { name: "Gulab Jamun", category: "Desserts", price: 60, isVeg: true, description: "Soft milk balls soaked in sugar syrup", image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&h=300&fit=crop" },
                { name: "Lime Soda", category: "Beverages", price: 35, isVeg: true, description: "Fresh lime soda sweet or salt", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=300&fit=crop" }
            ],
            coords: [11.0560, 76.0690]
        },
        {
            id: 604,
            name: "Zam Zam Restaurant",
            cuisine: "Malabar & Arabian",
            rating: 4.7,
            isFeatured: true,
            hours: { open: "05:30", close: "23:30" },
            tags: ["Top Rated", "Traditional", "Seafood"],
            image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=400&fit=crop",
            reviews: [
                { user: "Navas P.", rating: 5, comment: "The Kallummakkaya Nirachathu is out of this world! Must visit.", date: new Date() },
                { user: "Sunitha K.", rating: 4, comment: "Authentic Malabar flavors. Their Biriyani is legendary.", date: new Date() }
            ],
            foodItems: [
                { name: "Kallummakkaya Nirachathu", category: "Starters", price: 80, isVeg: false, description: "Stuffed mussels with spiced filling, deep fried", image: "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=400&h=300&fit=crop" },
                { name: "Kozhikkal Biriyani", category: "Main Course", price: 200, isVeg: false, description: "Traditional Malappuram chicken biriyani with dum cooking", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop" },
                { name: "Meen Pollichathu", category: "Main Course", price: 320, isVeg: false, description: "Fish marinated in spices wrapped in banana leaf", image: "https://images.unsplash.com/photo-1580959375944-e7a1a9f9e231?w=400&h=300&fit=crop" },
                { name: "Porotta & Beef Fry", category: "Main Course", price: 160, isVeg: false, description: "Flaky Kerala porotta with spicy beef fry", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop" },
                { name: "Prawn Masala", category: "Main Course", price: 260, isVeg: false, description: "Tiger prawns in rich coconut masala", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop" },
                { name: "Chicken 65", category: "Starters", price: 180, isVeg: false, description: "Deep fried spicy chicken with curry leaves", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop" },
                { name: "Ghee Rice & Chicken Roast", category: "Main Course", price: 190, isVeg: false, description: "Fragrant ghee rice with Kerala chicken roast", image: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=400&h=300&fit=crop" },
                { name: "Fish Curry & Rice", category: "Main Course", price: 150, isVeg: false, description: "Traditional Kerala fish curry with matta rice", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop" },
                { name: "Pazham Pori", category: "Snacks", price: 30, isVeg: true, description: "Sweet banana fritters, classic Kerala snack", image: "https://images.unsplash.com/photo-1628772182610-2f890948c59c?w=400&h=300&fit=crop" },
                { name: "Mango Shake", category: "Beverages", price: 60, isVeg: true, description: "Thick and creamy fresh mango milkshake", image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400&h=300&fit=crop" }
            ],
            coords: [11.0470, 76.0820]
        },
        {
            id: 605,
            name: "Al Buhari Restaurant",
            cuisine: "Arabian & Malabar Fusion",
            rating: 4.4,
            isFeatured: false,
            hours: { open: "06:30", close: "00:00" },
            tags: ["Modern", "Seafood", "Traditional"],
            image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=400&fit=crop",
            reviews: [
                { user: "Anwar S.", rating: 4, comment: "Good food at great prices. The Mandhi is excellent!", date: new Date() },
                { user: "Riya M.", rating: 5, comment: "Love their fusion twist on traditional Malabar dishes.", date: new Date() }
            ],
            foodItems: [
                { name: "Al Faham Grilled Chicken", category: "Main Course", price: 260, isVeg: false, description: "Charcoal grilled whole chicken with Arabian spices", image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop" },
                { name: "Chicken Shawarma Plate", category: "Main Course", price: 160, isVeg: false, description: "Shawarma rice plate with hummus and salad", image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop" },
                { name: "Malabar Chicken Curry", category: "Main Course", price: 160, isVeg: false, description: "Rich coconut-based chicken curry Malabar style", image: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=400&h=300&fit=crop" },
                { name: "Kappa Biriyani", category: "Main Course", price: 170, isVeg: false, description: "Unique tapioca biriyani with chicken, Malabar innovation", image: "https://images.unsplash.com/photo-1633945274309-20314fe78f9f?w=400&h=300&fit=crop" },
                { name: "Beef Cutlet", category: "Snacks", price: 40, isVeg: false, description: "Crispy spiced beef cutlets, tea-time favorite", image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=300&fit=crop" },
                { name: "Squid Fry", category: "Starters", price: 220, isVeg: false, description: "Crispy fried squid rings with Malabar masala", image: "https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=400&h=300&fit=crop" },
                { name: "Puttu & Kadala Curry", category: "Main Course", price: 80, isVeg: true, description: "Steamed rice cake with black chickpea curry", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop" },
                { name: "Appam & Egg Curry", category: "Main Course", price: 90, isVeg: false, description: "Lacy rice pancake with spicy egg curry", image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop" },
                { name: "Chicken Lollipop", category: "Starters", price: 190, isVeg: false, description: "Crispy chicken drumettes with spicy glaze", image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=300&fit=crop" },
                { name: "Fresh Juice Combo", category: "Beverages", price: 70, isVeg: true, description: "Mixed fruit fresh juice with seasonal fruits", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop" }
            ],
            coords: [11.0580, 76.0740]
        }
    ]
};

async function seedMalappuram() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Check if Malappuram already exists
        const existingPlace = await Place.findOne({ name: "Malappuram" });
        if (existingPlace) {
            console.log('⚠️  Malappuram already exists in the database. Deleting old version...');
            // Delete existing restaurants for this place
            await Restaurant.deleteMany({ place: existingPlace._id });
            await Place.deleteOne({ _id: existingPlace._id });
            console.log('🗑️  Old Malappuram data removed');
        }

        // Create the Place
        console.log('📍 Creating Malappuram place...');
        const place = await Place.create(malappuramData.place);
        console.log(`✅ Created place: ${place.name}`);

        // Create all restaurants
        console.log('🍽️  Creating restaurants...');
        const restaurantIds = [];
        for (const restaurantData of malappuramData.restaurants) {
            const restaurant = await Restaurant.create({
                ...restaurantData
            });
            restaurantIds.push(restaurant.id);
            console.log(`  ✅ Created restaurant: ${restaurant.name} (${restaurant.foodItems.length} dishes)`);
        }

        // Update Place with restaurant IDs
        place.restaurants = restaurantIds;
        await place.save();
        console.log(`📝 Updated place with ${restaurantIds.length} restaurant IDs`);

        console.log('\n🎉 Malappuram seeded successfully to MongoDB!');
        console.log(`   Place: ${place.name}`);
        console.log(`   Restaurants: ${malappuramData.restaurants.length}`);
        console.log(`   Total Dishes: ${malappuramData.restaurants.reduce((sum, r) => sum + r.foodItems.length, 0)}`);

        await mongoose.connection.close();
        console.log('\n👋 Database connection closed');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding Malappuram:', error);
        process.exit(1);
    }
}

// Run the seed function
seedMalappuram();
