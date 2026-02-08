// Sample data for Restaurant Location Navigator
const restaurantData = {
    places: [
        {
            id: 1,
            name: "Kochi",
            description: "Queen of the Arabian Sea",
            image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&h=600&fit=crop",
            restaurants: [
                {
                    id: 101,
                    placeId: 1,
                    name: "Oceanos",
                    cuisine: "Seafood & Continental",
                    rating: 4.5,
                    isFeatured: true,
                    tags: ["Top Rated", "Seafood", "Modern"],
                    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",
                    reviews: [
                        { user: "Arjun K.", rating: 5, comment: "Best seafood in Kochi! The Lobster Thermidor is a must-try.", date: "2 days ago" },
                        { user: "Sarah M.", rating: 4, comment: "Beautiful ambiance and fresh fish. Slightly expensive but worth it.", date: "1 week ago" }
                    ],
                    foodItems: [
                        { name: "Prawn Cocktail", category: "Starters", price: "₹280", isVeg: false, description: "Fresh prawns with tangy cocktail sauce", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop" },
                        { name: "Fish Fingers", category: "Starters", price: "₹220", isVeg: false, description: "Crispy golden fried fish strips", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop" },
                        { name: "Grilled Calamari", category: "Starters", price: "₹320", isVeg: false, description: "Tender squid rings with herbs", image: "https://images.unsplash.com/photo-1604909052743-94e838986d24?w=400&h=300&fit=crop" },
                        { name: "Lobster Thermidor", category: "Main Course", price: "₹1200", isVeg: false, description: "Creamy lobster in rich sauce", image: "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=400&h=300&fit=crop" },
                        { name: "Grilled Salmon", category: "Main Course", price: "₹850", isVeg: false, description: "Atlantic salmon with lemon butter", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop" },
                        { name: "Seafood Platter", category: "Main Course", price: "₹950", isVeg: false, description: "Assorted fresh seafood", image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=400&h=300&fit=crop" },
                        { name: "Fish and Chips", category: "Main Course", price: "₹480", isVeg: false, description: "Classic British favorite", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop" },
                        { name: "Tiramisu", category: "Desserts", price: "₹250", isVeg: true, description: "Classic Italian dessert", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop" },
                        { name: "Chocolate Lava Cake", category: "Desserts", price: "₹280", isVeg: true, description: "Warm chocolate with liquid center", image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop" },
                        { name: "Panna Cotta", category: "Desserts", price: "₹220", isVeg: true, description: "Silky Italian cream dessert", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop" }
                    ]
                },
                {
                    id: 102,
                    placeId: 1,
                    name: "Spice Garden",
                    cuisine: "Kerala Traditional",
                    rating: 4.7,
                    isFeatured: true,
                    tags: ["Traditional", "Healthy", "Top Rated"],
                    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
                    reviews: [
                        { user: "Manoj P.", rating: 5, comment: "Authentic Kerala sadya. The Karimeen Pollichathu is exceptional!", date: "3 days ago" },
                        { user: "Deepa V.", rating: 5, comment: "Best place for traditional family dinner.", date: "1 month ago" }
                    ],
                    foodItems: [
                        { name: "Kozhi Ularthiyathu", category: "Starters", price: "₹180", isVeg: false, description: "Spicy Kerala chicken fry", image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=400&h=300&fit=crop" },
                        { name: "Kallummakaya Fry", category: "Starters", price: "₹250", isVeg: false, description: "Crispy mussel fry", image: "https://images.unsplash.com/photo-1615361200098-20a18fcc2409?w=400&h=300&fit=crop" },
                        { name: "Banana Chips", category: "Starters", price: "₹80", isVeg: true, description: "Crispy traditional chips", image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=300&fit=crop" },
                        { name: "Kerala Sadya", category: "Main Course", price: "₹350", isVeg: true, description: "Traditional feast on banana leaf", image: "https://images.unsplash.com/photo-1626074353765-517a65faa902?w=400&h=300&fit=crop" },
                        { name: "Karimeen Pollichathu", category: "Main Course", price: "₹480", isVeg: false, description: "Pearl spot fish in banana leaf", image: "https://images.unsplash.com/photo-1515669097368-22e68427d265?w=400&h=300&fit=crop" },
                        { name: "Beef Fry", category: "Main Course", price: "₹220", isVeg: false, description: "Spicy Kerala style beef", image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop" },
                        { name: "Appam with Stew", category: "Main Course", price: "₹180", isVeg: true, description: "Soft rice pancakes with coconut stew", image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop" },
                        { name: "Payasam", category: "Desserts", price: "₹120", isVeg: true, description: "Sweet rice pudding", image: "https://images.unsplash.com/photo-1663847697988-48c5b34580dd?w=400&h=300&fit=crop" },
                        { name: "Unniyappam", category: "Desserts", price: "₹100", isVeg: true, description: "Sweet rice fritters", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop" },
                        { name: "Ada Pradhaman", category: "Desserts", price: "₹140", isVeg: true, description: "Rice flakes in coconut milk", image: "https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?w=400&h=300&fit=crop" }
                    ]
                },
                {
                    id: 103,
                    placeId: 1,
                    name: "Urban Bistro",
                    cuisine: "Continental & Italian",
                    rating: 4.3,
                    tags: ["Fast Food", "Modern"],
                    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop",
                    foodItems: [
                        { name: "Bruschetta", category: "Starters", price: "₹200", description: "Toasted bread with tomato basil", image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop" },
                        { name: "Caesar Salad", category: "Starters", price: "₹250", description: "Crisp romaine with parmesan", image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop" },
                        { name: "Garlic Bread", category: "Starters", price: "₹150", description: "Buttery herb bread", image: "https://images.unsplash.com/photo-1619985632461-f33748ef8f3e?w=400&h=300&fit=crop" },
                        { name: "Truffle Pasta", category: "Main Course", price: "₹480", description: "Creamy pasta with truffle oil", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop" },
                        { name: "Margherita Pizza", category: "Main Course", price: "₹420", description: "Classic tomato and mozzarella", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop" },
                        { name: "Grilled Chicken", category: "Main Course", price: "₹550", description: "Herb marinated chicken breast", image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop" },
                        { name: "Lasagna", category: "Main Course", price: "₹380", description: "Layered pasta with meat sauce", image: "https://images.unsplash.com/photo-1619895092538-128341789043?w=400&h=300&fit=crop" },
                        { name: "Cheesecake", category: "Desserts", price: "₹280", description: "New York style cheesecake", image: "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=400&h=300&fit=crop" },
                        { name: "Gelato", category: "Desserts", price: "₹180", description: "Italian ice cream trio", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop" },
                        { name: "Brownie Sundae", category: "Desserts", price: "₹240", description: "Warm brownie with ice cream", image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop" }
                    ]
                },
                {
                    id: 104,
                    placeId: 1,
                    name: "Saffron Stories",
                    cuisine: "North Indian",
                    rating: 4.6,
                    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
                    foodItems: [
                        { name: "Paneer Tikka", category: "Starters", price: "₹280", description: "Grilled cottage cheese cubes", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop" },
                        { name: "Tandoori Chicken", category: "Starters", price: "₹320", description: "Spiced chicken from clay oven", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop" },
                        { name: "Samosa Platter", category: "Starters", price: "₹150", description: "Crispy pastry with potato filling", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop" },
                        { name: "Butter Chicken", category: "Main Course", price: "₹380", description: "Creamy tomato chicken curry", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop" },
                        { name: "Dal Makhani", category: "Main Course", price: "₹250", description: "Black lentils in cream", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop" },
                        { name: "Biryani", category: "Main Course", price: "₹350", description: "Fragrant rice with meat", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop" },
                        { name: "Naan Basket", category: "Main Course", price: "₹180", description: "Assorted Indian breads", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop" },
                        { name: "Gulab Jamun", category: "Desserts", price: "₹120", description: "Sweet milk dumplings", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop" },
                        { name: "Rasmalai", category: "Desserts", price: "₹140", description: "Soft cheese in sweet cream", image: "https://images.unsplash.com/photo-1645696329735-dfd9367b1c95?w=400&h=300&fit=crop" },
                        { name: "Kulfi", category: "Desserts", price: "₹100", description: "Traditional Indian ice cream", image: "https://images.unsplash.com/photo-1560900318-b9ce1eebbb24?w=400&h=300&fit=crop" }
                    ]
                },
                {
                    id: 105,
                    placeId: 1,
                    name: "Coastal Curry",
                    cuisine: "Mangalorean",
                    rating: 4.4,
                    image: "https://images.unsplash.com/photo-1515669097368-22e68427d265?w=800&h=600&fit=crop",
                    foodItems: [
                        { name: "Chicken Ghee Roast", category: "Starters", price: "₹320", description: "Spicy chicken in ghee", image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=400&h=300&fit=crop" },
                        { name: "Prawn Gassi", category: "Starters", price: "₹380", description: "Prawns in coconut curry", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop" },
                        { name: "Kori Rotti", category: "Starters", price: "₹280", description: "Chicken curry with crispy rotti", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop" },
                        { name: "Fish Curry Rice", category: "Main Course", price: "₹350", description: "Tangy fish curry with rice", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop" },
                        { name: "Neer Dosa", category: "Main Course", price: "₹180", description: "Thin rice crepes", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&h=300&fit=crop" },
                        { name: "Kane Fry", category: "Main Course", price: "₹420", description: "Crispy ladyfish fry", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop" },
                        { name: "Pulimunchi", category: "Main Course", price: "₹300", description: "Spicy and tangy fish curry", image: "https://images.unsplash.com/photo-1580959375944-0d0c4f45d154?w=400&h=300&fit=crop" },
                        { name: "Patoleo", category: "Desserts", price: "₹100", description: "Sweet rice coconut rolls", image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=400&h=300&fit=crop" },
                        { name: "Halwa", category: "Desserts", price: "₹120", description: "Traditional wheat dessert", image: "https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=400&h=300&fit=crop" },
                        { name: "Banana Halwa", category: "Desserts", price: "₹110", description: "Sweet banana pudding", image: "https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=400&h=300&fit=crop" }
                    ]
                }
            ]
        },
        {
            id: 2,
            name: "Thiruvananthapuram",
            description: "Capital City of Kerala",
            image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&h=600&fit=crop",
            restaurants: [
                {
                    id: 201,
                    placeId: 2,
                    name: "Villa Maya",
                    cuisine: "Fine Dining Kerala",
                    rating: 4.8,
                    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&h=600&fit=crop",
                    foodItems: [
                        { name: "Crab Cakes", category: "Starters", price: "₹420", description: "Pan-seared crab patties", image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop" },
                        { name: "Squid Rings", category: "Starters", price: "₹350", description: "Crispy fried calamari", image: "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=400&h=300&fit=crop" },
                        { name: "Chicken Chettinad", category: "Starters", price: "₹280", description: "Spicy South Indian chicken", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop" },
                        { name: "Duck Roast", category: "Main Course", price: "₹680", description: "Slow roasted duck Kerala style", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop" },
                        { name: "Prawn Moilee", category: "Main Course", price: "₹550", description: "Mild coconut prawn curry", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop" },
                        { name: "Vegetable Stew", category: "Main Course", price: "₹320", description: "Mixed vegetables in coconut milk", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop" },
                        { name: "Fish Mappas", category: "Main Course", price: "₹480", description: "Fish in coconut curry", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop" },
                        { name: "Coconut Tart", category: "Desserts", price: "₹180", description: "Sweet coconut pastry", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop" },
                        { name: "Chocolate Mousse", category: "Desserts", price: "₹220", description: "Rich chocolate cream", image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop" },
                        { name: "Fruit Platter", category: "Desserts", price: "₹250", description: "Seasonal fresh fruits", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop" }
                    ]
                },
                {
                    id: 202,
                    placeId: 2,
                    name: "Zam Zam",
                    cuisine: "Arabian & Malabar",
                    rating: 4.5,
                    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
                    foodItems: [
                        { name: "Shawarma", category: "Starters", price: "₹150", description: "Spiced meat wrap", image: "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=400&h=300&fit=crop" },
                        { name: "Falafel", category: "Starters", price: "₹120", description: "Crispy chickpea balls", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop" },
                        { name: "Hummus with Pita", category: "Starters", price: "₹180", description: "Chickpea dip with bread", image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=400&h=300&fit=crop" },
                        { name: "Mandi Rice", category: "Main Course", price: "₹450", description: "Aromatic rice with tender meat", image: "https://images.unsplash.com/photo-1544618222-8c0fd76032b1?w=400&h=300&fit=crop" },
                        { name: "Grilled Kebabs", category: "Main Course", price: "₹380", description: "Assorted meat skewers", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=300&fit=crop" },
                        { name: "Al Faham", category: "Main Course", price: "₹350", description: "Grilled spiced chicken", image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop" },
                        { name: "Biriyani", category: "Main Course", price: "₹320", description: "Malabar style biryani", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop" },
                        { name: "Baklava", category: "Desserts", price: "₹150", description: "Sweet layered pastry", image: "https://images.unsplash.com/photo-1598110750624-207050c4f28c?w=400&h=300&fit=crop" },
                        { name: "Kunafa", category: "Desserts", price: "₹180", description: "Sweet cheese pastry", image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&h=300&fit=crop" },
                        { name: "Dates Pudding", category: "Desserts", price: "₹140", description: "Rich dates dessert", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop" }
                    ]
                },
                {
                    id: 203,
                    placeId: 2,
                    name: "Café Mojo",
                    cuisine: "Café & Continental",
                    rating: 4.2,
                    image: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=800&h=600&fit=crop",
                    foodItems: [
                        { name: "Nachos", category: "Starters", price: "₹220", description: "Loaded tortilla chips", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop" },
                        { name: "Chicken Wings", category: "Starters", price: "₹280", description: "Spicy buffalo wings", image: "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=400&h=300&fit=crop" },
                        { name: "French Fries", category: "Starters", price: "₹120", description: "Crispy golden fries", image: "https://images.unsplash.com/photo-1630384065922-dbaaefd005c7?w=400&h=300&fit=crop" },
                        { name: "Gourmet Burger", category: "Main Course", price: "₹380", description: "Juicy beef burger", image: "https://images.unsplash.com/photo-1571091718767-18b5c1457bad?w=400&h=300&fit=crop" },
                        { name: "Club Sandwich", category: "Main Course", price: "₹320", description: "Triple decker sandwich", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop" },
                        { name: "Pasta Alfredo", category: "Main Course", price: "₹350", description: "Creamy white sauce pasta", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop" },
                        { name: "Grilled Wrap", category: "Main Course", price: "₹280", description: "Chicken and veggie wrap", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop" },
                        { name: "Waffles", category: "Desserts", price: "₹200", description: "Belgian waffles with toppings", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop" },
                        { name: "Ice Cream Sundae", category: "Desserts", price: "₹180", description: "Classic sundae", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop" },
                        { name: "Apple Pie", category: "Desserts", price: "₹160", description: "Warm pie with ice cream", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop" }
                    ]
                },
                {
                    id: 204,
                    placeId: 2,
                    name: "Ariya Nivaas",
                    cuisine: "South Indian Vegetarian",
                    rating: 4.6,
                    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop",
                    foodItems: [
                        { name: "Masala Dosa", category: "Starters", price: "₹80", description: "Crispy rice crepe with potato", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&h=300&fit=crop" },
                        { name: "Medu Vada", category: "Starters", price: "₹60", description: "Crispy lentil donuts", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop" },
                        { name: "Idli Sambar", category: "Starters", price: "₹70", description: "Steamed rice cakes with lentil curry", image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop" },
                        { name: "Thali Meals", category: "Main Course", price: "₹180", description: "Complete meal platter", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop" },
                        { name: "Rava Dosa", category: "Main Course", price: "₹90", description: "Crispy semolina crepe", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&h=300&fit=crop" },
                        { name: "Pongal", category: "Main Course", price: "₹100", description: "Rice and lentil comfort food", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop" },
                        { name: "Uttapam", category: "Main Course", price: "₹95", description: "Thick rice pancake with toppings", image: "https://images.unsplash.com/photo-1626074353765-517a65faa902?w=400&h=300&fit=crop" },
                        { name: "Kesari", category: "Desserts", price: "₹80", description: "Semolina sweet", image: "https://images.unsplash.com/photo-1580959375944-0d0c4f45d154?w=400&h=300&fit=crop" },
                        { name: "Mysore Pak", category: "Desserts", price: "₹100", description: "Ghee-rich sweet", image: "https://images.unsplash.com/photo-1560900318-b9ce1eebbb24?w=400&h=300&fit=crop" },
                        { name: "Banana Boli", category: "Desserts", price: "₹70", description: "Sweet banana pancake", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop" }
                    ]
                },
                {
                    id: 205,
                    placeId: 2,
                    name: "The Terrace",
                    cuisine: "Multi-Cuisine",
                    rating: 4.4,
                    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
                    foodItems: [
                        { name: "Spring Rolls", category: "Starters", price: "₹180", description: "Crispy vegetable rolls", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop" },
                        { name: "Chicken Satay", category: "Starters", price: "₹280", description: "Grilled chicken skewers", image: "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=400&h=300&fit=crop" },
                        { name: "Soup of the Day", category: "Starters", price: "₹120", description: "Chef's special soup", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop" },
                        { name: "Thai Curry", category: "Main Course", price: "₹420", description: "Coconut curry with rice", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop" },
                        { name: "Stir Fry Noodles", category: "Main Course", price: "₹320", description: "Asian style noodles", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop" },
                        { name: "Grilled Fish", category: "Main Course", price: "₹550", description: "Fresh fish with herbs", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop" },
                        { name: "Fried Rice", category: "Main Course", price: "₹280", description: "Vegetable fried rice", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop" },
                        { name: "Mango Sticky Rice", category: "Desserts", price: "₹180", description: "Thai sweet dessert", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop" },
                        { name: "Chocolate Pudding", category: "Desserts", price: "₹150", description: "Rich chocolate dessert", image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop" },
                        { name: "Fresh Fruit Salad", category: "Desserts", price: "₹140", description: "Mixed tropical fruits", image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop" }
                    ]
                }
            ]
        },
        {
            id: 3,
            name: "Kozhikode",
            description: "City of Spices",
            image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800&h=600&fit=crop",
            restaurants: [
                {
                    id: 301,
                    placeId: 3,
                    name: "Paragon",
                    cuisine: "Malabar Cuisine",
                    rating: 4.7,
                    isFeatured: true,
                    tags: ["Famous", "Authentic", "Must Visit"],
                    image: "https://images.unsplash.com/photo-1515669097368-22e68427d265?w=800&h=600&fit=crop",
                    reviews: [
                        { user: "Siddharth R.", rating: 5, comment: "The legendary Malabar Biryani! Worth the travel to Kozhikode.", date: "4 days ago" },
                        { user: "Anjali S.", rating: 4, comment: "Great food, but always crowded. Reservation recommended.", date: "2 weeks ago" }
                    ],
                    foodItems: [
                        { name: "Chicken Fry", category: "Starters", price: "₹200", description: "Spicy Kerala chicken", image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=400&h=300&fit=crop" },
                        { name: "Fish Fry", category: "Starters", price: "₹180", description: "Crispy masala fish", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop" },
                        { name: "Prawns Fry", category: "Starters", price: "₹320", description: "Spicy fried prawns", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop" },
                        { name: "Biryani", category: "Main Course", price: "₹280", description: "Famous Malabar biryani", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop" },
                        { name: "Porotta with Beef", category: "Main Course", price: "₹180", description: "Layered bread with spicy beef", image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop" },
                        { name: "Fish Curry Meals", category: "Main Course", price: "₹250", description: "Traditional meal with fish", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop" },
                        { name: "Chicken Curry", category: "Main Course", price: "₹220", description: "Spicy chicken gravy", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop" },
                        { name: "Kulfi Falooda", category: "Desserts", price: "₹120", description: "Ice cream with vermicelli", image: "https://jalojog.com/wp-content/uploads/2024/04/Faluda_Ice_cream.jpg" },
                        { name: "Pazhampori", category: "Desserts", price: "₹60", description: "Banana fritters", image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=300&fit=crop" },
                        { name: "Elaneer Pudding", category: "Desserts", price: "₹100", description: "Tender coconut dessert", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop" }
                    ]
                },
                {
                    id: 302,
                    placeId: 3,
                    name: "Sagar Restaurant",
                    cuisine: "South Indian",
                    rating: 4.3,
                    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",
                    foodItems: [
                        { name: "Ghee Roast Dosa", category: "Starters", price: "₹110", description: "Crispy dosa with ghee", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&h=300&fit=crop" },
                        { name: "Mysore Bonda", category: "Starters", price: "₹50", description: "Spicy lentil fritters", image: "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=400&h=300&fit=crop" },
                        { name: "Onion Pakoda", category: "Starters", price: "₹70", description: "Crispy onion fritters", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop" },
                        { name: "Meals", category: "Main Course", price: "₹150", description: "Unlimited South Indian meals", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop" },
                        { name: "Ghee Podi Dosa", category: "Main Course", price: "₹95", description: "Dosa with spice powder and ghee", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&h=300&fit=crop" },
                        { name: "Pulissery Rice", category: "Main Course", price: "₹120", description: "Rice with yogurt curry", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop" },
                        { name: "Chicken Biryani", category: "Main Course", price: "₹220", description: "Coconut-based biryani", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop" },
                        { name: "Banana Payasam", category: "Desserts", price: "₹80", description: "Sweet banana pudding", image: "https://images.unsplash.com/photo-1663847697988-48c5b34580dd?w=400&h=300&fit=crop" },
                        { name: "Jaggery Payasam", category: "Desserts", price: "₹90", description: "Rice pudding with jaggery", image: "https://images.unsplash.com/photo-1663847697988-48c5b34580dd?w=400&h=300&fit=crop" },
                        { name: "Halwa", category: "Desserts", price: "₹70", description: "Sweet coconut halwa", image: "https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=400&h=300&fit=crop" }
                    ]
                },
                {
                    id: 303,
                    placeId: 3,
                    name: "Bombay Hotel",
                    cuisine: "Traditional Malabar",
                    rating: 4.5,
                    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
                    foodItems: [
                        { name: "Pathiri", category: "Starters", price: "₹40", description: "Rice flour flatbread", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop" },
                        { name: "Kallummakaya", category: "Starters", price: "₹250", description: "Mussel masala", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop" },
                        { name: "Erachi Varutharachathu", category: "Starters", price: "₹180", description: "Spicy meat fry", image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop" },
                        { name: "Thalassery Biryani", category: "Main Course", price: "₹300", description: "Famous Thalassery style", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop" },
                        { name: "Irachi Puttu", category: "Main Course", price: "₹150", description: "Steamed rice cake with meat", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop" },
                        { name: "Meen Curry", category: "Main Course", price: "₹200", description: "Traditional fish curry", image: "https://images.unsplash.com/photo-1580959375944-0d0c4f45d154?w=400&h=300&fit=crop" },
                        { name: "Kozhikodan Halwa", category: "Desserts", price: "₹180", description: "Famous sweet", image: "https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=400&h=300&fit=crop" },
                        { name: "Ada", category: "Desserts", price: "₹60", description: "Rice flour sweet", image: "https://images.unsplash.com/photo-1580959375944-0d0c4f45d154?w=400&h=300&fit=crop" },
                        { name: "Sweet Bonda", category: "Desserts", price: "₹50", description: "Sweet fried balls", image: "https://images.unsplash.com/photo-1560900318-b9ce1eebbb24?w=400&h=300&fit=crop" },
                        { name: "Banana Chips", category: "Desserts", price: "₹80", description: "Kerala style chips", image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=300&fit=crop" }
                    ]
                },
                {
                    id: 304,
                    placeId: 3,
                    name: "Mezban",
                    cuisine: "Arabian",
                    rating: 4.4,
                    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop",
                    foodItems: [
                        { name: "Shawarma Roll", category: "Starters", price: "₹140", description: "Chicken shawarma wrap", image: "https://images.unsplash.com/photo-1529006557-6b175d50339a?w=400&h=300&fit=crop" },
                        { name: "Cheese Kuboos", category: "Starters", price: "₹100", description: "Cheese stuffed bread", image: "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=400&h=300&fit=crop" },
                        { name: "Grilled Chicken", category: "Starters", price: "₹280", description: "Charcoal grilled chicken", image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop" },
                        { name: "Alfaham Full", category: "Main Course", price: "₹480", description: "Whole grilled chicken", image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&h=300&fit=crop" },
                        { name: "Mandhi", category: "Main Course", price: "₹420", description: "Aromatic rice with meat", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop" },
                        { name: "Majboos", category: "Main Course", price: "₹380", description: "Spiced rice dish", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop" },
                        { name: "Grilled Fish", category: "Main Course", price: "₹550", description: "Fresh grilled fish", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop" },
                        { name: "Umm Ali", category: "Desserts", price: "₹120", description: "Egyptian bread pudding", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop" },
                        { name: "Basbousa", category: "Desserts", price: "₹100", description: "Semolina cake", image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop" },
                        { name: "Luqaimat", category: "Desserts", price: "₹90", description: "Sweet dumplings", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop" }
                    ]
                },
                {
                    id: 305,
                    placeId: 3,
                    name: "The Raviz",
                    cuisine: "Fine Dining",
                    rating: 4.8,
                    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",
                    foodItems: [
                        { name: "Seafood Platter", category: "Starters", price: "₹650", description: "Assorted seafood selection", image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=400&h=300&fit=crop" },
                        { name: "Sushi Platter", category: "Starters", price: "₹580", description: "Japanese sushi selection", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop" },
                        { name: "Soup Trio", category: "Starters", price: "₹220", description: "Three soup varieties", image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop" },
                        { name: "Lobster Thermidor", category: "Main Course", price: "₹1500", description: "Premium lobster dish", image: "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=400&h=300&fit=crop" },
                        { name: "Tenderloin Steak", category: "Main Course", price: "₹1200", description: "Grilled beef steak", image: "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=400&h=300&fit=crop" },
                        { name: "Risotto", category: "Main Course", price: "₹480", description: "Creamy Italian rice", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop" },
                        { name: "Pan Seared Fish", category: "Main Course", price: "₹850", description: "Fresh fish with sauce", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop" },
                        { name: "Crème Brûlée", category: "Desserts", price: "₹280", description: "Classic French dessert", image: "https://images.unsplash.com/photo-1580959375944-0d0c4f45d154?w=400&h=300&fit=crop" },
                        { name: "Opera Cake", category: "Desserts", price: "₹320", description: "Layered almond cake", image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop" },
                        { name: "Sorbet Trio", category: "Desserts", price: "₹250", description: "Three fruit sorbets", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop" }
                    ]
                }
            ]
        },
        {
            id: 4,
            name: "Thrissur",
            description: "Cultural Capital of Kerala",
            image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&h=600&fit=crop",
            restaurants: [
                {
                    id: 401,
                    placeId: 4,
                    name: "Pathans",
                    cuisine: "Multi-Cuisine",
                    rating: 4.5,
                    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
                    foodItems: [
                        { name: "Chicken 65", category: "Starters", price: "₹220", description: "Spicy fried chicken", image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=400&h=300&fit=crop" },
                        { name: "Paneer Chilli", category: "Starters", price: "₹200", description: "Indo-Chinese paneer", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop" },
                        { name: "Gobi Manchurian", category: "Starters", price: "₹180", description: "Crispy cauliflower", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop" },
                        { name: "Chicken Biryani", category: "Main Course", price: "₹260", description: "Flavorful rice with chicken", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop" },
                        { name: "Butter Naan", category: "Main Course", price: "₹50", description: "Soft buttery bread", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop" },
                        { name: "Paneer Butter Masala", category: "Main Course", price: "₹280", description: "Cottage cheese in gravy", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop" },
                        { name: "Fried Rice", category: "Main Course", price: "₹200", description: "Mixed fried rice", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop" },
                        { name: "Gulab Jamun", category: "Desserts", price: "₹80", description: "Sweet fried dumplings", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop" },
                        { name: "Ice Cream", category: "Desserts", price: "₹100", description: "Assorted flavors", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop" },
                        { name: "Kheer", category: "Desserts", price: "₹90", description: "Rice pudding", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop" }
                    ]
                },
                {
                    id: 402,
                    placeId: 4,
                    name: "Ming Palace",
                    cuisine: "Chinese",
                    rating: 4.2,
                    image: "https://images.unsplash.com/photo-1515669097368-22e68427d265?w=800&h=600&fit=crop",
                    foodItems: [
                        { name: "Spring Rolls", category: "Starters", price: "₹160", description: "Crispy vegetable rolls", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop" },
                        { name: "Honey Chilli Potato", category: "Starters", price: "₹180", description: "Sweet and spicy potatoes", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop" },
                        { name: "Chicken Lollipop", category: "Starters", price: "₹240", description: "Fried chicken winglets", image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop" },
                        { name: "Hakka Noodles", category: "Main Course", price: "₹220", description: "Stir-fried noodles", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop" },
                        { name: "Manchurian Fried Rice", category: "Main Course", price: "₹240", description: "Rice with manchurian balls", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop" },
                        { name: "Szechuan Chicken", category: "Main Course", price: "₹350", description: "Spicy Szechuan sauce", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop" },
                        { name: "Sweet Corn Soup", category: "Main Course", price: "₹120", description: "Creamy corn soup", image: "https://images.unsplash.com/photo-1626074353765-517a65faa902?w=400&h=300&fit=crop" },
                        { name: "Date Pancake", category: "Desserts", price: "₹150", description: "Sweet Chinese pancake", image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop" },
                        { name: "Fried Ice Cream", category: "Desserts", price: "₹180", description: "Crispy coated ice cream", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop" },
                        { name: "Fortune Cookie", category: "Desserts", price: "₹60", description: "Traditional cookie", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop" }
                    ]
                },
                {
                    id: 403,
                    placeId: 4,
                    name: "Hotel Bharath",
                    cuisine: "South Indian",
                    rating: 4.4,
                    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",
                    foodItems: [
                        { name: "Paper Dosa", category: "Starters", price: "₹100", description: "Extra thin crispy dosa", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&h=300&fit=crop" },
                        { name: "Vada", category: "Starters", price: "₹50", description: "Crispy lentil donuts", image: "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=400&h=300&fit=crop" },
                        { name: "Idiyappam", category: "Starters", price: "₹70", description: "String hoppers", image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop" },
                        { name: "Sadya", category: "Main Course", price: "₹200", description: "Traditional Kerala feast", image: "https://images.unsplash.com/photo-1626074353765-517a65faa902?w=400&h=300&fit=crop" },
                        { name: "Puttu Kadala", category: "Main Course", price: "₹80", description: "Steamed rice cake with curry", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop" },
                        { name: "Fish Curry Meals", category: "Main Course", price: "₹180", description: "Fish with rice", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop" },
                        { name: "Sambar Rice", category: "Main Course", price: "₹120", description: "Rice with lentil curry", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop" },
                        { name: "Palada Payasam", category: "Desserts", price: "₹100", description: "Milk and rice flakes", image: "https://images.unsplash.com/photo-1663847697988-48c5b34580dd?w=400&h=300&fit=crop" },
                        { name: "Pazham Pori", category: "Desserts", price: "₹50", description: "Banana fritters", image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop" },
                        { name: "Unniappam", category: "Desserts", price: "₹70", description: "Sweet rice balls", image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop" }
                    ]
                },
                {
                    id: 404,
                    placeId: 4,
                    name: "Grill Inn",
                    cuisine: "Barbeque & Grills",
                    rating: 4.6,
                    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
                    foodItems: [
                        { name: "BBQ Wings", category: "Starters", price: "₹280", description: "Smoky grilled wings", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop" },
                        { name: "Tandoori Platter", category: "Starters", price: "₹480", description: "Mixed tandoori items", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop" },
                        { name: "Grilled Fish", category: "Starters", price: "₹320", description: "Charcoal grilled fish", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop" },
                        { name: "Grilled Chicken", category: "Main Course", price: "₹450", description: "Full grilled chicken", image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop" },
                        { name: "BBQ Ribs", category: "Main Course", price: "₹550", description: "Tender pork ribs", image: "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=400&h=300&fit=crop" },
                        { name: "Steak", category: "Main Course", price: "₹680", description: "Juicy beef steak", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop" },
                        { name: "Grilled Prawns", category: "Main Course", price: "₹580", description: "Marinated prawns", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop" },
                        { name: "Brownie with Ice Cream", category: "Desserts", price: "₹180", description: "Warm brownie", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop" },
                        { name: "Grilled Pineapple", category: "Desserts", price: "₹120", description: "Caramelized pineapple", image: "https://images.unsplash.com/photo-1560900318-b9ce1eebbb24?w=400&h=300&fit=crop" },
                        { name: "Vanilla Pudding", category: "Desserts", price: "₹140", description: "Creamy pudding", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop" }
                    ]
                },
                {
                    id: 405,
                    placeId: 4,
                    name: "Café Coffee Day",
                    cuisine: "Café",
                    rating: 4.1,
                    image: "https://images.unsplash.com/photo-1577659733926-0b8c9c8b9f5b?w=800&h=600&fit=crop",
                    foodItems: [
                        { name: "Sandwiches", category: "Starters", price: "₹150", description: "Grilled sandwiches", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop" },
                        { name: "Garlic Bread", category: "Starters", price: "₹120", description: "Cheesy garlic bread", image: "https://images.unsplash.com/photo-1619985632461-f33748ef8f3e?w=400&h=300&fit=crop" },
                        { name: "Nachos", category: "Starters", price: "₹180", description: "Loaded nachos", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop" },
                        { name: "Pasta", category: "Main Course", price: "₹220", description: "Creamy pasta", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop" },
                        { name: "Pizza", category: "Main Course", price: "₹280", description: "Personal pizza", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop" },
                        { name: "Burger", category: "Main Course", price: "₹200", description: "Veg/Chicken burger", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop" },
                        { name: "Wrap", category: "Main Course", price: "₹180", description: "Tortilla wrap", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop" },
                        { name: "Chocolate Cake", category: "Desserts", price: "₹150", description: "Rich chocolate cake", image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop" },
                        { name: "Cheesecake", category: "Desserts", price: "₹160", description: "Creamy cheesecake", image: "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=400&h=300&fit=crop" },
                        { name: "Coffee Frappe", category: "Desserts", price: "₹140", description: "Iced coffee drink", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop" }
                    ]
                }
            ]
        },
        {
            id: 5,
            name: "Kannur",
            description: "Land of Looms and Lores",
            image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop",
            restaurants: [
                {
                    id: 501,
                    placeId: 5,
                    name: "Odhens Hotel",
                    cuisine: "Malabar",
                    rating: 4.6,
                    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop",
                    foodItems: [
                        { name: "Kallummakaya Nirachathu", category: "Starters", price: "₹280", description: "Stuffed mussels", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop" },
                        { name: "Chicken Varutharachathu", category: "Starters", price: "₹200", description: "Roasted chicken", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop" },
                        { name: "Prawn Fry", category: "Starters", price: "₹320", description: "Spicy prawn fry", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop" },
                        { name: "Biryani", category: "Main Course", price: "₹280", description: "Kannur style biryani", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop" },
                        { name: "Pathiri with Chicken", category: "Main Course", price: "₹180", description: "Rice bread with curry", image: "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=400&h=300&fit=crop" },
                        { name: "Meen Pollichathu", category: "Main Course", price: "₹350", description: "Fish in banana leaf", image: "https://images.unsplash.com/photo-1580959375944-0d0c4f45d154?w=400&h=300&fit=crop" },
                        { name: "Erachi Curry", category: "Main Course", price: "₹220", description: "Spicy meat curry", image: "https://images.unsplash.com/photo-1626074353765-517a65faa902?w=400&h=300&fit=crop" },
                        { name: "Mutta Mala", category: "Desserts", price: "₹120", description: "Egg garland sweet", image: "https://images.unsplash.com/photo-1580959375944-0d0c4f45d154?w=400&h=300&fit=crop" },
                        { name: "Sukhiyan", category: "Desserts", price: "₹80", description: "Sweet lentil fritters", image: "https://images.unsplash.com/photo-1560900318-b9ce1eebbb24?w=400&h=300&fit=crop" },
                        { name: "Kozhikkodan Halwa", category: "Desserts", price: "₹150", description: "Famous halwa", image: "https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=400&h=300&fit=crop" }
                    ]
                },
                {
                    id: 502,
                    placeId: 5,
                    name: "Raandhal",
                    cuisine: "Kerala Traditional",
                    rating: 4.4,
                    image: "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=800&h=600&fit=crop",
                    foodItems: [
                        { name: "Kappa Biriyani", category: "Starters", price: "₹180", description: "Tapioca biryani", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop" },
                        { name: "Chemeen Ularthiyathu", category: "Starters", price: "₹300", description: "Prawn stir fry", image: "https://images.unsplash.com/photo-1580959375944-0d0c4f45d154?w=400&h=300&fit=crop" },
                        { name: "Kallumakaya", category: "Starters", price: "₹250", description: "Mussel roast", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop" },
                        { name: "Kappa with Fish Curry", category: "Main Course", price: "₹220", description: "Tapioca with curry", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop" },
                        { name: "Meen Molly", category: "Main Course", price: "₹280", description: "Fish in coconut milk", image: "https://images.unsplash.com/photo-1580959375944-0d0c4f45d154?w=400&h=300&fit=crop" },
                        { name: "Thalassery Biryani", category: "Main Course", price: "₹320", description: "Special biryani", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop" },
                        { name: "Nei Choru", category: "Main Course", price: "₹150", description: "Ghee rice", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop" },
                        { name: "Parippu Payasam", category: "Desserts", price: "₹100", description: "Lentil pudding", image: "https://images.unsplash.com/photo-1663847697988-48c5b34580dd?w=400&h=300&fit=crop" },
                        { name: "Elaneer Payasam", category: "Desserts", price: "₹120", description: "Tender coconut pudding", image: "https://images.unsplash.com/photo-1663847697988-48c5b34580dd?w=400&h=300&fit=crop" },
                        { name: "Ada Pradhaman", category: "Desserts", price: "₹110", description: "Rice flakes dessert", image: "https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?w=400&h=300&fit=crop" }
                    ]
                },
                {
                    id: 503,
                    placeId: 5,
                    name: "MVK Restaurant",
                    cuisine: "Multi-Cuisine",
                    rating: 4.3,
                    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
                    foodItems: [
                        { name: "Chicken Tikka", category: "Starters", price: "₹250", description: "Tandoori chicken pieces", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop" },
                        { name: "Fish Tikka", category: "Starters", price: "₹280", description: "Spiced fish chunks", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop" },
                        { name: "Paneer Tikka", category: "Starters", price: "₹220", description: "Grilled cottage cheese", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop" },
                        { name: "Butter Chicken", category: "Main Course", price: "₹350", description: "Creamy tomato curry", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop" },
                        { name: "Kadai Chicken", category: "Main Course", price: "₹320", description: "Spicy kadai masala", image: "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=400&h=300&fit=crop" },
                        { name: "Veg Biryani", category: "Main Course", price: "₹200", description: "Vegetable biryani", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop" },
                        { name: "Rotis", category: "Main Course", price: "₹140", description: "Assorted Indian breads", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop" },
                        { name: "Ras Malai", category: "Desserts", price: "₹120", description: "Sweet cream cheese", image: "https://images.unsplash.com/photo-1580959375944-0d0c4f45d154?w=400&h=300&fit=crop" },
                        { name: "Kulfi", category: "Desserts", price: "₹80", description: "Indian ice cream", image: "https://images.unsplash.com/photo-1560900318-b9ce1eebbb24?w=400&h=300&fit=crop" },
                        { name: "Jalebi", category: "Desserts", price: "₹90", description: "Sweet spiral", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop" }
                    ]
                },
                {
                    id: 504,
                    placeId: 5,
                    name: "Dhe Puttu",
                    cuisine: "Puttu Specialty",
                    rating: 4.7,
                    image: "https://images.unsplash.com/photo-1515669097368-22e68427d265?w=800&h=600&fit=crop",
                    foodItems: [
                        { name: "Chakka Puttu", category: "Starters", price: "₹120", description: "Jackfruit puttu", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop" },
                        { name: "Mutta Puttu", category: "Starters", price: "₹100", description: "Egg scrambled puttu", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop" },
                        { name: "Pacha Puttu", category: "Starters", price: "₹80", description: "Green gram puttu", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop" },
                        { name: "Beef Puttu", category: "Main Course", price: "₹180", description: "Puttu with spicy beef", image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop" },
                        { name: "Kadala Curry Puttu", category: "Main Course", price: "₹100", description: "Puttu with chickpea curry", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop" },
                        { name: "Chicken Puttu", category: "Main Course", price: "₹160", description: "Puttu with chicken curry", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop" },
                        { name: "Fish Puttu", category: "Main Course", price: "₹150", description: "Puttu with fish curry", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop" },
                        { name: "Pazham Puttu", category: "Desserts", price: "₹90", description: "Banana puttu", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop" },
                        { name: "Chocolate Puttu", category: "Desserts", price: "₹110", description: "Chocolate flavored", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop" },
                        { name: "Coconut Puttu", category: "Desserts", price: "₹80", description: "Sweet coconut puttu", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop" }
                    ]
                },
                {
                    id: 505,
                    placeId: 5,
                    name: "Sea Queen",
                    cuisine: "Seafood",
                    rating: 4.5,
                    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",
                    foodItems: [
                        { name: "Crab Masala", category: "Starters", price: "₹450", description: "Spicy crab preparation", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop" },
                        { name: "Squid Fry", category: "Starters", price: "₹320", description: "Crispy calamari", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop" },
                        { name: "Prawn Pepper Fry", category: "Starters", price: "₹380", description: "Pepper crusted prawns", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop" },
                        { name: "Fish Curry Rice", category: "Main Course", price: "₹280", description: "Seer fish curry with rice", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop" },
                        { name: "Lobster Thermidor", category: "Main Course", price: "₹1400", description: "Premium lobster dish", image: "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=400&h=300&fit=crop" },
                        { name: "Prawn Biriyani", category: "Main Course", price: "₹420", description: "Prawn biryani", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop" },
                        { name: "Crab Roast", category: "Main Course", price: "₹550", description: "Roasted crab", image: "https://images.unsplash.com/photo-1626074353765-517a65faa902?w=400&h=300&fit=crop" },
                        { name: "Coconut Ice Cream", category: "Desserts", price: "₹100", description: "Homemade ice cream", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop" },
                        { name: "Fish Halwa", category: "Desserts", price: "₹180", description: "Unique fish sweet", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop" },
                        { name: "Fruit Custard", category: "Desserts", price: "₹120", description: "Mixed fruit dessert", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop" }
                    ]
                }
            ]
        }
    ]
};
