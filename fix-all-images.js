const fs = require('fs');

// Read the data file
const dataPath = 'C:/Users/kpmiz/Desktop/restaurant-navigator/js/data.js';
let content = fs.readFileSync(dataPath, 'utf8');

console.log('🔍 Starting comprehensive food image correction...\n');

// Comprehensive food name to image URL mapping
const imageMapping = {
    // BIRYANI & RICE DISHES
    'biryani': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop',
    'biriyani': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop',
    'mandi rice': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop',
    'fried rice': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',

    // CHICKEN DISHES
    'butter chicken': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop',
    'tandoori chicken': 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop',
    'chicken tikka': 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop',
    'grilled chicken': 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop',
    'chicken 65': 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=400&h=300&fit=crop',
    'chicken ghee roast': 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=400&h=300&fit=crop',
    'chicken curry': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop',
    'chicken fry': 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=400&h=300&fit=crop',
    'al faham': 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop',
    'kozhi ularthiyathu': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop',

    // SEAFOOD & FISH
    'fish': 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop',
    'prawn': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop',
    'salmon': 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
    'lobster': 'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=400&h=300&fit=crop',
    'calamari': 'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=400&h=300&fit=crop',
    'seafood': 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=400&h=300&fit=crop',
    'fish and chips': 'https://images.unsplash.com/photo-1579208575657-c595a05383b7?w=400&h=300&fit=crop',
    'karimeen': 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop',
    'meen': 'https://images.unsplash.com/photo-1580959375944-0d0c4f45d154?w=400&h=300&fit=crop',

    // BEEF & MEAT
    'beef': 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop',
    'porotta': 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop',
    'kebab': 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=300&fit=crop',

    // PANEER & VEGETARIAN
    'paneer': 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop',
    'dal': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
    'kadala': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',

    // PASTA & PIZZA
    'pasta': 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop',
    'pizza': 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
    'lasagna': 'https://images.unsplash.com/photo-1619895092538-128341789043?w=400&h=300&fit=crop',

    // BREADS
    'naan': 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop',
    'roti': 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop',
    'bread': 'https://images.unsplash.com/photo-1619985632461-f33748ef8f3e?w=400&h=300&fit=crop',
    'pita': 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop',

    // KERALA SPECIALS
    'sadya': 'https://images.unsplash.com/photo-1626074353765-517a65faa902?w=400&h=300&fit=crop',
    'appam': 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop',
    'puttu': 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop',
    'dosa': 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&h=300&fit=crop',

    // STARTERS & SNACKS
    'samosa': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
    'pakoda': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
    'chips': 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=300&fit=crop',
    'falafel': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
    'shawarma': 'https://images.unsplash.com/photo-1529006557-6b175d50339a?w=400&h=300&fit=crop',
    'hummus': 'https://images.unsplash.com/photo-1571300680833-d3e0ce81e64f?w=400&h=300&fit=crop',
    'bruschetta': 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop',
    'salad': 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',

    // DESSERTS
    'kulfi': 'https://images.unsplash.com/photo-1560900318-b9ce1eebbb24?w=400&h=300&fit=crop',
    'ice cream': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop',
    'gelato': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop',
    'payasam': 'https://images.unsplash.com/photo-1663847697988-48c5b34580dd?w=400&h=300&fit=crop',
    'pradhaman': 'https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?w=400&h=300&fit=crop',
    'gulab jamun': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop',
    'jalebi': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop',
    'rasmalai': 'https://images.unsplash.com/photo-1645696329735-dfd9367b1c95?w=400&h=300&fit=crop',
    'halwa': 'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=400&h=300&fit=crop',
    'tiramisu': 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop',
    'cheesecake': 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=400&h=300&fit=crop',
    'brownie': 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop',
    'cake': 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop',
    'panna cotta': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop',
    'baklava': 'https://images.unsplash.com/photo-1598110750624-207050c4f28c?w=400&h=300&fit=crop',
    'kunafa': 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&h=300&fit=crop',
    'pazhampori': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
    'unniyappam': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop'
};

// Find and replace images based on food name matching
let fixedCount = 0;
let totalItems = 0;

// Pattern to match food items with images
const pattern = /\{ name: "(.*?)", category: "(.*?)", price: "(.*?)", description: "(.*?)", image: ".*?" \}/g;
const matches = content.match(pattern);

if (matches) {
    totalItems = matches.length;
    console.log(`Found ${totalItems} food items\n`);

    matches.forEach(match => {
        const nameMatch = match.match(/name: "(.*?)"/);
        if (!nameMatch) return;

        const foodName = nameMatch[1].toLowerCase();

        // Find matching image URL based on keywords in food name
        let matchedImage = null;
        for (const [keyword, imageUrl] of Object.entries(imageMapping)) {
            if (foodName.includes(keyword.toLowerCase())) {
                matchedImage = imageUrl;
                break;
            }
        }

        if (matchedImage) {
            // Replace the image URL in this food item
            const newMatch = match.replace(/image: ".*?"/, `image: "${matchedImage}"`);
            content = content.replace(match, newMatch);
            fixedCount++;
            console.log(`✓ Fixed: ${nameMatch[1]}`);
        }
    });
}

// Save the updated file
fs.writeFileSync(dataPath, content, 'utf8');

console.log(`\n✅ Complete!`);
console.log(`Fixed ${fixedCount} out of ${totalItems} food items`);
console.log(`\nRefresh your browser with Ctrl+Shift+R to see the changes!`);
