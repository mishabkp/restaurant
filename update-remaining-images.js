const fs = require('fs');
const path = 'C:/Users/kpmiz/Desktop/restaurant-navigator/js/data.js';
let content = fs.readFileSync(path, 'utf8');

console.log('🚀 Starting place and restaurant image update...');

// Mapping for places
const placeImages = {
    "Kochi": "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&h=600&fit=crop",
    "Thiruvananthapuram": "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&h=600&fit=crop",
    "Kozhikode": "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800&h=600&fit=crop",
    "Kannur": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop",
    "Alappuzha": "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop"
};

// Common restaurant images to avoid repetitive patterns
const restaurantImages = [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1515669097368-22e68427d265?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop"
];

let resIdx = 0;

// Update Places
for (const [name, url] of Object.entries(placeImages)) {
    const placeRegex = new RegExp(`name: "${name}",\\s+description: ".*?",\\s+image: "linear-gradient\\(.*?\\)"`, 'g');
    const matches = content.match(placeRegex);
    if (matches) {
        matches.forEach(match => {
            const updated = match.replace(/image: "linear-gradient\(.*?\)"/, `image: "${url}"`);
            content = content.replace(match, updated);
            console.log(`✅ Updated Place: ${name}`);
        });
    }
}

// Update Restaurants that still have gradients
const resRegex = /name: ".*?",\s+cuisine: ".*?",\s+rating: .*?,\s+image: "linear-gradient\(.*?\)"/g;
const resMatches = content.match(resRegex);
if (resMatches) {
    resMatches.forEach(match => {
        const resUrl = restaurantImages[resIdx % restaurantImages.length];
        const updated = match.replace(/image: "linear-gradient\(.*?\)"/, `image: "${resUrl}"`);
        content = content.replace(match, updated);
        const nameMatch = match.match(/name: "(.*?)"/);
        console.log(`✅ Updated Restaurant: ${nameMatch ? nameMatch[1] : 'Unknown'}`);
        resIdx++;
    });
}

fs.writeFileSync(path, content, 'utf8');
console.log('\n✨ All gradients replaced with real images!');
