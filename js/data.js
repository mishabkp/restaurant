// Sample data for Restaurant Location Navigator
window.restaurantData = {
    "places": [
        {
            "id": 1,
            "name": "Kochi",
            "description": "Queen of the Arabian Sea",
            "image": "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&h=600&fit=crop",
            "restaurants": [
                {
                    "id": 101,
                    "placeId": 1,
                    "name": "Oceanos",
                    "cuisine": "Seafood & Continental",
                    "rating": 4.5,
                    "isFeatured": true,
                    "hours": {
                        "open": "11:00",
                        "close": "23:00"
                    },
                    "tags": [
                        "Top Rated",
                        "Seafood",
                        "Modern"
                    ],
                    "class": "Luxury",
                    "rooms": [
                        {
                            "type": "Luxury Suite",
                            "price": "₹8500",
                            "amenities": [
                                "Ocean View",
                                "Mini Bar",
                                "WiFi"
                            ],
                            "image": "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "type": "Sea Side Deluxe",
                            "price": "₹5500",
                            "amenities": [
                                "WiFi",
                                "Balcony",
                                "AC"
                            ],
                            "image": "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "reviews": [
                        {
                            "user": "Arjun K.",
                            "rating": 5,
                            "comment": "Best seafood in Kochi! The Lobster Thermidor is a must-try.",
                            "date": "2 days ago"
                        },
                        {
                            "user": "Sarah M.",
                            "rating": 4,
                            "comment": "Beautiful ambiance and fresh fish. Slightly expensive but worth it.",
                            "date": "1 week ago"
                        }
                    ],
                    "foodItems": [
                        {
                            "name": "Prawn Cocktail",
                            "category": "Starters",
                            "price": "₹280",
                            "isVeg": false,
                            "description": "Fresh prawns with tangy cocktail sauce",
                            "image": "https://images.pexels.com/photos/566345/pexels-photo-566345.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Fish Fingers",
                            "category": "Starters",
                            "price": "₹220",
                            "isVeg": false,
                            "description": "Crispy golden fried fish strips",
                            "image": "https://images.pexels.com/photos/1015568/pexels-photo-1015568.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Grilled Calamari",
                            "category": "Starters",
                            "price": "₹320",
                            "isVeg": false,
                            "description": "Tender squid rings with herbs",
                            "image": "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Lobster Thermidor",
                            "category": "Main Course",
                            "price": "₹1200",
                            "isVeg": false,
                            "description": "Creamy lobster in rich sauce",
                            "image": "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Grilled Salmon",
                            "category": "Main Course",
                            "price": "₹850",
                            "isVeg": false,
                            "description": "Atlantic salmon with lemon butter",
                            "image": "https://images.pexels.com/photos/3763847/pexels-photo-3763847.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Seafood Platter",
                            "category": "Main Course",
                            "price": "₹950",
                            "isVeg": false,
                            "description": "Assorted fresh seafood",
                            "image": "https://images.pexels.com/photos/1015568/pexels-photo-1015568.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Fish and Chips",
                            "category": "Main Course",
                            "price": "₹480",
                            "isVeg": false,
                            "description": "Classic British favorite",
                            "image": "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Tiramisu",
                            "category": "Desserts",
                            "price": "₹250",
                            "isVeg": true,
                            "description": "Classic Italian dessert",
                            "image": "https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Chocolate Lava Cake",
                            "category": "Desserts",
                            "price": "₹280",
                            "isVeg": true,
                            "description": "Warm chocolate with liquid center",
                            "image": "https://images.pexels.com/photos/45202/brownie-dessert-cake-sweet-45202.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Panna Cotta",
                            "category": "Desserts",
                            "price": "₹220",
                            "isVeg": true,
                            "description": "Silky Italian cream dessert",
                            "image": "https://images.pexels.com/photos/1174399/pexels-photo-1174399.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "coords": [
                        9.9658,
                        76.2421
                    ]
                },
                {
                    "id": 102,
                    "placeId": 1,
                    "name": "Spice Garden",
                    "cuisine": "Kerala Traditional",
                    "rating": 4.7,
                    "isFeatured": true,
                    "tags": [
                        "Traditional",
                        "Healthy",
                        "Top Rated"
                    ],
                    "image": "https://media-cdn.tripadvisor.com/media/photo-p/11/ce/26/45/spice-garden-restaurant.jpg",
                    "rooms": [
                        {
                            "type": "Heritage Garden Villa",
                            "price": "₹6500",
                            "amenities": [
                                "Private Garden",
                                "Luxury Tub",
                                "Traditional Decor"
                            ],
                            "image": "https://images.pexels.com/photos/2034330/pexels-photo-2034330.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "type": "Nadan Deluxe",
                            "price": "₹4000",
                            "amenities": [
                                "AC",
                                "WiFi",
                                "Kerala Style"
                            ],
                            "image": "https://images.pexels.com/photos/210532/pexels-photo-210532.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "reviews": [
                        {
                            "user": "Manoj P.",
                            "rating": 5,
                            "comment": "Authentic Kerala sadya. The Karimeen Pollichathu is exceptional!",
                            "date": "3 days ago"
                        },
                        {
                            "user": "Deepa V.",
                            "rating": 5,
                            "comment": "Best place for traditional family dinner.",
                            "date": "1 month ago"
                        }
                    ],
                    "foodItems": [
                        {
                            "name": "Kozhi Ularthiyathu",
                            "category": "Starters",
                            "price": "₹180",
                            "isVeg": false,
                            "description": "Spicy Kerala chicken fry",
                            "image": "https://images.pexels.com/photos/2611917/pexels-photo-2611917.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Kallummakaya Fry",
                            "category": "Starters",
                            "price": "₹250",
                            "isVeg": false,
                            "description": "Crispy mussel fry",
                            "image": "https://images.pexels.com/photos/2290070/pexels-photo-2290070.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Banana Chips",
                            "category": "Starters",
                            "price": "₹80",
                            "isVeg": true,
                            "description": "Crispy traditional chips",
                            "image": "https://images.pexels.com/photos/566345/pexels-photo-566345.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Kerala Sadya",
                            "category": "Main Course",
                            "price": "₹350",
                            "isVeg": true,
                            "description": "Traditional feast on banana leaf",
                            "image": "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Karimeen Pollichathu",
                            "category": "Main Course",
                            "price": "₹480",
                            "isVeg": false,
                            "description": "Pearl spot fish in banana leaf",
                            "image": "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Beef Fry",
                            "category": "Main Course",
                            "price": "₹220",
                            "isVeg": false,
                            "description": "Spicy Kerala style beef",
                            "image": "https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Appam with Stew",
                            "category": "Main Course",
                            "price": "₹180",
                            "isVeg": true,
                            "description": "Soft rice pancakes with coconut stew",
                            "image": "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Payasam",
                            "category": "Desserts",
                            "price": "₹120",
                            "isVeg": true,
                            "description": "Sweet rice pudding",
                            "image": "https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Unniyappam",
                            "category": "Desserts",
                            "price": "₹100",
                            "isVeg": true,
                            "description": "Sweet rice fritters",
                            "image": "https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Ada Pradhaman",
                            "category": "Desserts",
                            "price": "₹140",
                            "isVeg": true,
                            "description": "Rice flakes in coconut milk",
                            "image": "https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "coords": [
                        9.9631,
                        76.2458
                    ]
                },
                {
                    "id": 103,
                    "placeId": 1,
                    "name": "Urban Bistro",
                    "cuisine": "Continental & Italian",
                    "rating": 4.3,
                    "tags": [
                        "Fast Food",
                        "Modern"
                    ],
                    "class": "Budget",
                    "image": "https://images.pexels.com/photos/1015568/pexels-photo-1015568.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
                    "foodItems": [
                        {
                            "name": "Bruschetta",
                            "category": "Starters",
                            "price": "₹200",
                            "description": "Toasted bread with tomato basil",
                            "image": "https://images.pexels.com/photos/566345/pexels-photo-566345.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Caesar Salad",
                            "category": "Starters",
                            "price": "₹250",
                            "description": "Crisp romaine with parmesan",
                            "image": "https://images.pexels.com/photos/406152/pexels-photo-406152.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Garlic Bread",
                            "category": "Starters",
                            "price": "₹150",
                            "description": "Buttery herb bread",
                            "image": "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Truffle Pasta",
                            "category": "Main Course",
                            "price": "₹480",
                            "description": "Creamy pasta with truffle oil",
                            "image": "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Margherita Pizza",
                            "category": "Main Course",
                            "price": "₹420",
                            "description": "Classic tomato and mozzarella",
                            "image": "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Grilled Chicken",
                            "category": "Main Course",
                            "price": "₹550",
                            "description": "Herb marinated chicken breast",
                            "image": "https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Lasagna",
                            "category": "Main Course",
                            "price": "₹380",
                            "description": "Layered pasta with meat sauce",
                            "image": "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Cheesecake",
                            "category": "Desserts",
                            "price": "₹280",
                            "description": "New York style cheesecake",
                            "image": "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Gelato",
                            "category": "Desserts",
                            "price": "₹180",
                            "description": "Italian ice cream trio",
                            "image": "https://images.pexels.com/photos/1352243/pexels-photo-1352243.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Brownie Sundae",
                            "category": "Desserts",
                            "price": "₹240",
                            "description": "Warm brownie with ice cream",
                            "image": "https://images.pexels.com/photos/45202/brownie-dessert-cake-sweet-45202.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "coords": [
                        10.008,
                        76.315
                    ]
                },
                {
                    "id": 104,
                    "placeId": 1,
                    "name": "Saffron Stories",
                    "cuisine": "North Indian",
                    "rating": 4.6,
                    "image": "https://upload.wikimedia.org/wikipedia/commons/5/53/Restaurant_interior.jpg",
                    "foodItems": [
                        {
                            "name": "Paneer Tikka",
                            "category": "Starters",
                            "price": "₹280",
                            "description": "Grilled cottage cheese cubes",
                            "image": "https://images.pexels.com/photos/3928854/pexels-photo-3928854.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Tandoori Chicken",
                            "category": "Starters",
                            "price": "₹320",
                            "description": "Spiced chicken from clay oven",
                            "image": "https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Samosa Platter",
                            "category": "Starters",
                            "price": "₹150",
                            "description": "Crispy pastry with potato filling",
                            "image": "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Butter Chicken",
                            "category": "Main Course",
                            "price": "₹380",
                            "description": "Creamy tomato chicken curry",
                            "image": "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Dal Makhani",
                            "category": "Main Course",
                            "price": "₹250",
                            "description": "Black lentils in cream",
                            "image": "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Biryani",
                            "category": "Main Course",
                            "price": "₹350",
                            "description": "Fragrant rice with meat",
                            "image": "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Naan Basket",
                            "category": "Main Course",
                            "price": "₹180",
                            "description": "Assorted Indian breads",
                            "image": "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Gulab Jamun",
                            "category": "Desserts",
                            "price": "₹120",
                            "description": "Sweet milk dumplings",
                            "image": "https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Rasmalai",
                            "category": "Desserts",
                            "price": "₹140",
                            "description": "Soft cheese in sweet cream",
                            "image": "https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Kulfi",
                            "category": "Desserts",
                            "price": "₹100",
                            "description": "Traditional Indian ice cream",
                            "image": "https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "coords": [
                        9.9925,
                        76.299
                    ]
                },
                {
                    "id": 105,
                    "placeId": 1,
                    "name": "Coastal Curry",
                    "cuisine": "Mangalorean",
                    "rating": 4.4,
                    "image": "https://images.unsplash.com/photo-1515669097368-22e68427d265?w=800&h=600&fit=crop",
                    "foodItems": [
                        {
                            "name": "Chicken Ghee Roast",
                            "category": "Starters",
                            "price": "₹320",
                            "description": "Spicy chicken in ghee",
                            "image": "https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Prawn Gassi",
                            "category": "Starters",
                            "price": "₹380",
                            "description": "Prawns in coconut curry",
                            "image": "https://images.pexels.com/photos/566345/pexels-photo-566345.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Kori Rotti",
                            "category": "Starters",
                            "price": "₹280",
                            "description": "Chicken curry with crispy rotti",
                            "image": "https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Fish Curry Rice",
                            "category": "Main Course",
                            "price": "₹350",
                            "description": "Tangy fish curry with rice",
                            "image": "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Neer Dosa",
                            "category": "Main Course",
                            "price": "₹180",
                            "description": "Thin rice crepes",
                            "image": "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Kane Fry",
                            "category": "Main Course",
                            "price": "₹420",
                            "description": "Crispy ladyfish fry",
                            "image": "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Pulimunchi",
                            "category": "Main Course",
                            "price": "₹300",
                            "description": "Spicy and tangy fish curry",
                            "image": "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Patoleo",
                            "category": "Desserts",
                            "price": "₹100",
                            "description": "Sweet rice coconut rolls",
                            "image": "https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Halwa",
                            "category": "Desserts",
                            "price": "₹120",
                            "description": "Traditional wheat dessert",
                            "image": "https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Banana Halwa",
                            "category": "Desserts",
                            "price": "₹110",
                            "description": "Sweet banana pudding",
                            "image": "https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "coords": [
                        9.9385,
                        76.2605
                    ]
                }
            ],
            "coords": [
                9.9312,
                76.2673
            ]
        },
        {
            "id": 2,
            "name": "Thiruvananthapuram",
            "description": "Capital City of Kerala",
            "image": "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&h=600&fit=crop",
            "restaurants": [
                {
                    "id": 201,
                    "placeId": 2,
                    "name": "Villa Maya",
                    "cuisine": "Fine Dining Kerala",
                    "rating": 4.8,
                    "image": "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&h=600&fit=crop",
                    "rooms": [
                        {
                            "type": "Royal Heritage Suite",
                            "price": "₹14000",
                            "amenities": [
                                "Antique Furniture",
                                "Private Courtyard",
                                "Butler Service",
                                "WiFi"
                            ],
                            "image": "https://images.pexels.com/photos/2034330/pexels-photo-2034330.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "type": "Classic Deluxe",
                            "price": "₹8000",
                            "amenities": [
                                "Garden View",
                                "AC",
                                "Breakfast",
                                "WiFi"
                            ],
                            "image": "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "type": "Standard Comfort",
                            "price": "₹4500",
                            "amenities": [
                                "AC",
                                "WiFi",
                                "TV"
                            ],
                            "image": "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "foodItems": [
                        {
                            "name": "Crab Cakes",
                            "category": "Starters",
                            "price": "₹420",
                            "description": "Pan-seared crab patties",
                            "image": "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Squid Rings",
                            "category": "Starters",
                            "price": "₹350",
                            "description": "Crispy fried calamari",
                            "image": "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Chicken Chettinad",
                            "category": "Starters",
                            "price": "₹280",
                            "description": "Spicy South Indian chicken",
                            "image": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Duck Roast",
                            "category": "Main Course",
                            "price": "₹680",
                            "description": "Slow roasted duck Kerala style",
                            "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Prawn Moilee",
                            "category": "Main Course",
                            "price": "₹550",
                            "description": "Mild coconut prawn curry",
                            "image": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Vegetable Stew",
                            "category": "Main Course",
                            "price": "₹320",
                            "description": "Mixed vegetables in coconut milk",
                            "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Fish Mappas",
                            "category": "Main Course",
                            "price": "₹480",
                            "description": "Fish in coconut curry",
                            "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Coconut Tart",
                            "category": "Desserts",
                            "price": "₹180",
                            "description": "Sweet coconut pastry",
                            "image": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Chocolate Mousse",
                            "category": "Desserts",
                            "price": "₹220",
                            "description": "Rich chocolate cream",
                            "image": "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Fruit Platter",
                            "category": "Desserts",
                            "price": "₹250",
                            "description": "Seasonal fresh fruits",
                            "image": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop"
                        }
                    ],
                    "coords": [
                        8.487,
                        76.935
                    ]
                },
                {
                    "id": 202,
                    "placeId": 2,
                    "name": "Zam Zam",
                    "cuisine": "Arabian & Malabar",
                    "rating": 4.5,
                    "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
                    "foodItems": [
                        {
                            "name": "Shawarma",
                            "category": "Starters",
                            "price": "₹150",
                            "description": "Spiced meat wrap",
                            "image": "https://upload.wikimedia.org/wikipedia/commons/c/c5/Shawarma.jpg"
                        },
                        {
                            "name": "Falafel",
                            "category": "Starters",
                            "price": "₹120",
                            "description": "Crispy chickpea balls",
                            "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Hummus with Pita",
                            "category": "Starters",
                            "price": "₹180",
                            "description": "Chickpea dip with bread",
                            "image": "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Mandi Rice",
                            "category": "Main Course",
                            "price": "₹450",
                            "description": "Aromatic rice with tender meat",
                            "image": "https://images.unsplash.com/photo-1544618222-8c0fd76032b1?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Grilled Kebabs",
                            "category": "Main Course",
                            "price": "₹380",
                            "description": "Assorted meat skewers",
                            "image": "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Al Faham",
                            "category": "Main Course",
                            "price": "₹350",
                            "description": "Grilled spiced chicken",
                            "image": "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Biriyani",
                            "category": "Main Course",
                            "price": "₹320",
                            "description": "Malabar style biryani",
                            "image": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Malabar_biriyani.jpg"
                        },
                        {
                            "name": "Baklava",
                            "category": "Desserts",
                            "price": "₹150",
                            "description": "Sweet layered pastry",
                            "image": "https://images.unsplash.com/photo-1598110750624-207050c4f28c?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Kunafa",
                            "category": "Desserts",
                            "price": "₹180",
                            "description": "Sweet cheese pastry",
                            "image": "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Dates Pudding",
                            "category": "Desserts",
                            "price": "₹140",
                            "description": "Rich dates dessert",
                            "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop"
                        }
                    ],
                    "coords": [
                        8.506,
                        76.945
                    ]
                },
                {
                    "id": 203,
                    "placeId": 2,
                    "name": "Café Mojo",
                    "cuisine": "Café & Continental",
                    "rating": 4.2,
                    "image": "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=800&h=600&fit=crop",
                    "foodItems": [
                        {
                            "name": "Nachos",
                            "category": "Starters",
                            "price": "₹220",
                            "description": "Loaded tortilla chips",
                            "image": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Chicken Wings",
                            "category": "Starters",
                            "price": "₹280",
                            "description": "Spicy buffalo wings",
                            "image": "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "French Fries",
                            "category": "Starters",
                            "price": "₹120",
                            "description": "Crispy golden fries",
                            "image": "https://images.unsplash.com/photo-1630384065922-dbaaefd005c7?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Gourmet Burger",
                            "category": "Main Course",
                            "price": "₹380",
                            "description": "Juicy beef burger",
                            "image": "https://images.unsplash.com/photo-1571091718767-18b5c1457bad?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Club Sandwich",
                            "category": "Main Course",
                            "price": "₹320",
                            "description": "Triple decker sandwich",
                            "image": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Pasta Alfredo",
                            "category": "Main Course",
                            "price": "₹350",
                            "description": "Creamy white sauce pasta",
                            "image": "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Grilled Wrap",
                            "category": "Main Course",
                            "price": "₹280",
                            "description": "Chicken and veggie wrap",
                            "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Waffles",
                            "category": "Desserts",
                            "price": "₹200",
                            "description": "Belgian waffles with toppings",
                            "image": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Ice Cream Sundae",
                            "category": "Desserts",
                            "price": "₹180",
                            "description": "Classic sundae",
                            "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Apple Pie",
                            "category": "Desserts",
                            "price": "₹160",
                            "description": "Warm pie with ice cream",
                            "image": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop"
                        }
                    ],
                    "coords": [
                        8.52,
                        76.955
                    ]
                },
                {
                    "id": 204,
                    "placeId": 2,
                    "name": "Ariya Nivaas",
                    "cuisine": "South Indian Vegetarian",
                    "rating": 4.6,
                    "image": "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop",
                    "foodItems": [
                        {
                            "name": "Masala Dosa",
                            "category": "Starters",
                            "price": "₹80",
                            "description": "Crispy rice crepe with potato",
                            "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Medu Vada",
                            "category": "Starters",
                            "price": "₹60",
                            "description": "Crispy lentil donuts",
                            "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Idli Sambar",
                            "category": "Starters",
                            "price": "₹70",
                            "description": "Steamed rice cakes with lentil curry",
                            "image": "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Thali Meals",
                            "category": "Main Course",
                            "price": "₹180",
                            "description": "Complete meal platter",
                            "image": "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Rava Dosa",
                            "category": "Main Course",
                            "price": "₹90",
                            "description": "Crispy semolina crepe",
                            "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Pongal",
                            "category": "Main Course",
                            "price": "₹100",
                            "description": "Rice and lentil comfort food",
                            "image": "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Uttapam",
                            "category": "Main Course",
                            "price": "₹95",
                            "description": "Thick rice pancake with toppings",
                            "image": "https://images.unsplash.com/photo-1626074353765-517a65faa902?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Kesari",
                            "category": "Desserts",
                            "price": "₹80",
                            "description": "Semolina sweet",
                            "image": "https://images.unsplash.com/photo-1580959375944-0d0c4f45d154?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Mysore Pak",
                            "category": "Desserts",
                            "price": "₹100",
                            "description": "Ghee-rich sweet",
                            "image": "https://images.unsplash.com/photo-1560900318-b9ce1eebbb24?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Banana Boli",
                            "category": "Desserts",
                            "price": "₹70",
                            "description": "Sweet banana pancake",
                            "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop"
                        }
                    ],
                    "coords": [
                        8.488,
                        76.948
                    ]
                },
                {
                    "id": 205,
                    "placeId": 2,
                    "name": "The Terrace",
                    "cuisine": "Multi-Cuisine",
                    "rating": 4.4,
                    "image": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
                    "rooms": [
                        {
                            "type": "Skyline Penthouse",
                            "price": "₹11000",
                            "amenities": [
                                "Rooftop Access",
                                "Jacuzzi",
                                "City View",
                                "Mini Bar"
                            ],
                            "image": "https://images.pexels.com/photos/2034330/pexels-photo-2034330.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "type": "Premium Room",
                            "price": "₹6500",
                            "amenities": [
                                "AC",
                                "WiFi",
                                "Balcony"
                            ],
                            "image": "https://images.pexels.com/photos/210532/pexels-photo-210532.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "foodItems": [
                        {
                            "name": "Spring Rolls",
                            "category": "Starters",
                            "price": "₹180",
                            "description": "Crispy vegetable rolls",
                            "image": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Chicken Satay",
                            "category": "Starters",
                            "price": "₹280",
                            "description": "Grilled chicken skewers",
                            "image": "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Soup of the Day",
                            "category": "Starters",
                            "price": "₹120",
                            "description": "Chef's special soup",
                            "image": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Thai Curry",
                            "category": "Main Course",
                            "price": "₹420",
                            "description": "Coconut curry with rice",
                            "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Stir Fry Noodles",
                            "category": "Main Course",
                            "price": "₹320",
                            "description": "Asian style noodles",
                            "image": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Grilled Fish",
                            "category": "Main Course",
                            "price": "₹550",
                            "description": "Fresh fish with herbs",
                            "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Fried Rice",
                            "category": "Main Course",
                            "price": "₹280",
                            "description": "Vegetable fried rice",
                            "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Mango Sticky Rice",
                            "category": "Desserts",
                            "price": "₹180",
                            "description": "Thai sweet dessert",
                            "image": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Chocolate Pudding",
                            "category": "Desserts",
                            "price": "₹150",
                            "description": "Rich chocolate dessert",
                            "image": "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Fresh Fruit Salad",
                            "category": "Desserts",
                            "price": "₹140",
                            "description": "Mixed tropical fruits",
                            "image": "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop"
                        }
                    ],
                    "coords": [
                        8.558,
                        76.88
                    ]
                }
            ],
            "coords": [
                8.5241,
                76.9366
            ]
        },
        {
            "id": 3,
            "name": "Kozhikode",
            "description": "City of Spices",
            "image": "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800&h=600&fit=crop",
            "restaurants": [
                {
                    "id": 301,
                    "placeId": 3,
                    "name": "Paragon",
                    "cuisine": "Malabar Cuisine",
                    "rating": 4.7,
                    "isFeatured": true,
                    "tags": [
                        "Famous",
                        "Authentic",
                        "Must Visit"
                    ],
                    "image": "https://upload.wikimedia.org/wikipedia/commons/5/53/Restaurant_interior.jpg",
                    "rooms": [
                        {
                            "type": "Malabar Royal Suite",
                            "price": "₹10000",
                            "amenities": [
                                "Sea View",
                                "Traditional Decor",
                                "Complimentary Dinner",
                                "WiFi"
                            ],
                            "image": "https://images.pexels.com/photos/2034330/pexels-photo-2034330.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "type": "Spice Trail Room",
                            "price": "₹5500",
                            "amenities": [
                                "AC",
                                "Breakfast",
                                "WiFi"
                            ],
                            "image": "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "reviews": [
                        {
                            "user": "Siddharth R.",
                            "rating": 5,
                            "comment": "The legendary Malabar Biryani! Worth the travel to Kozhikode.",
                            "date": "4 days ago"
                        },
                        {
                            "user": "Anjali S.",
                            "rating": 4,
                            "comment": "Great food, but always crowded. Reservation recommended.",
                            "date": "2 weeks ago"
                        }
                    ],
                    "foodItems": [
                        {
                            "name": "Chicken Fry",
                            "category": "Starters",
                            "price": "₹200",
                            "description": "Spicy Kerala chicken",
                            "image": "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Fish Fry",
                            "category": "Starters",
                            "price": "₹180",
                            "description": "Crispy masala fish",
                            "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Prawns Fry",
                            "category": "Starters",
                            "price": "₹320",
                            "description": "Spicy fried prawns",
                            "image": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Biryani",
                            "category": "Main Course",
                            "price": "₹280",
                            "description": "Famous Malabar biryani",
                            "image": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Malabar_biriyani.jpg"
                        },
                        {
                            "name": "Porotta with Beef",
                            "category": "Main Course",
                            "price": "₹180",
                            "description": "Layered bread with spicy beef",
                            "image": "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Fish Curry Meals",
                            "category": "Main Course",
                            "price": "₹250",
                            "description": "Traditional meal with fish",
                            "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Chicken Curry",
                            "category": "Main Course",
                            "price": "₹220",
                            "description": "Spicy chicken gravy",
                            "image": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Kulfi Falooda",
                            "category": "Desserts",
                            "price": "₹120",
                            "description": "Ice cream with vermicelli",
                            "image": "https://jalojog.com/wp-content/uploads/2024/04/Faluda_Ice_cream.jpg"
                        },
                        {
                            "name": "Pazham Pori",
                            "category": "Desserts",
                            "price": "₹60",
                            "description": "Banana fritters",
                            "image": "https://upload.wikimedia.org/wikipedia/commons/e/ec/Pazhampori.jpg"
                        },
                        {
                            "name": "Elaneer Pudding",
                            "category": "Desserts",
                            "price": "₹100",
                            "description": "Tender coconut dessert",
                            "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop"
                        }
                    ],
                    "coords": [
                        11.255,
                        75.775
                    ]
                },
                {
                    "id": 302,
                    "placeId": 3,
                    "name": "Sagar Restaurant",
                    "cuisine": "South Indian",
                    "rating": 4.3,
                    "image": "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",
                    "foodItems": [
                        {
                            "name": "Ghee Roast Dosa",
                            "category": "Starters",
                            "price": "₹110",
                            "description": "Crispy dosa with ghee",
                            "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Mysore Bonda",
                            "category": "Starters",
                            "price": "₹50",
                            "description": "Spicy lentil fritters",
                            "image": "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Onion Pakoda",
                            "category": "Starters",
                            "price": "₹70",
                            "description": "Crispy onion fritters",
                            "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Meals",
                            "category": "Main Course",
                            "price": "₹150",
                            "description": "Unlimited South Indian meals",
                            "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Ghee Podi Dosa",
                            "category": "Main Course",
                            "price": "₹95",
                            "description": "Dosa with spice powder and ghee",
                            "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Pulissery Rice",
                            "category": "Main Course",
                            "price": "₹120",
                            "description": "Rice with yogurt curry",
                            "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Chicken Biryani",
                            "category": "Main Course",
                            "price": "₹220",
                            "description": "Coconut-based biryani",
                            "image": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Banana Payasam",
                            "category": "Desserts",
                            "price": "₹80",
                            "description": "Sweet banana pudding",
                            "image": "https://images.unsplash.com/photo-1663847697988-48c5b34580dd?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Jaggery Payasam",
                            "category": "Desserts",
                            "price": "₹90",
                            "description": "Rice pudding with jaggery",
                            "image": "https://images.unsplash.com/photo-1663847697988-48c5b34580dd?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Halwa",
                            "category": "Desserts",
                            "price": "₹70",
                            "description": "Sweet coconut halwa",
                            "image": "https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=400&h=300&fit=crop"
                        }
                    ],
                    "coords": [
                        11.25,
                        75.785
                    ]
                },
                {
                    "id": 303,
                    "placeId": 3,
                    "name": "Bombay Hotel",
                    "cuisine": "Traditional Malabar",
                    "rating": 4.5,
                    "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
                    "foodItems": [
                        {
                            "name": "Pathiri",
                            "category": "Starters",
                            "price": "₹40",
                            "description": "Rice flour flatbread",
                            "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Kallummakaya",
                            "category": "Starters",
                            "price": "₹250",
                            "description": "Mussel masala",
                            "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Erachi Varutharachathu",
                            "category": "Starters",
                            "price": "₹180",
                            "description": "Spicy meat fry",
                            "image": "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Thalassery Biryani",
                            "category": "Main Course",
                            "price": "₹300",
                            "description": "Famous Thalassery style",
                            "image": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Irachi Puttu",
                            "category": "Main Course",
                            "price": "₹150",
                            "description": "Steamed rice cake with meat",
                            "image": "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Meen Curry",
                            "category": "Main Course",
                            "price": "₹200",
                            "description": "Traditional fish curry",
                            "image": "https://images.unsplash.com/photo-1580959375944-0d0c4f45d154?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Kozhikodan Halwa",
                            "category": "Desserts",
                            "price": "₹180",
                            "description": "Famous sweet",
                            "image": "https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Ada",
                            "category": "Desserts",
                            "price": "₹60",
                            "description": "Rice flour sweet",
                            "image": "https://images.unsplash.com/photo-1580959375944-0d0c4f45d154?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Sweet Bonda",
                            "category": "Desserts",
                            "price": "₹50",
                            "description": "Sweet fried balls",
                            "image": "https://images.unsplash.com/photo-1560900318-b9ce1eebbb24?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Banana Chips",
                            "category": "Desserts",
                            "price": "₹80",
                            "description": "Kerala style chips",
                            "image": "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=300&fit=crop"
                        }
                    ],
                    "coords": [
                        11.248,
                        75.772
                    ]
                },
                {
                    "id": 304,
                    "placeId": 3,
                    "name": "Mezban",
                    "cuisine": "Arabian",
                    "rating": 4.4,
                    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Mezban_Restaurant_in_Kozhikode.jpg/800px-Mezban_Restaurant_in_Kozhikode.jpg",
                    "foodItems": [
                        {
                            "name": "Shawarma Roll",
                            "category": "Starters",
                            "price": "₹140",
                            "description": "Chicken shawarma wrap",
                            "image": "https://images.unsplash.com/photo-1529006557-6b175d50339a?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Cheese Kuboos",
                            "category": "Starters",
                            "price": "₹100",
                            "description": "Cheese stuffed bread",
                            "image": "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Grilled Chicken",
                            "category": "Starters",
                            "price": "₹280",
                            "description": "Charcoal grilled chicken",
                            "image": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Alfaham Full",
                            "category": "Main Course",
                            "price": "₹480",
                            "description": "Whole grilled chicken",
                            "image": "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Mandhi",
                            "category": "Main Course",
                            "price": "₹420",
                            "description": "Aromatic rice with tender meat",
                            "image": "https://upload.wikimedia.org/wikipedia/commons/3/3d/Mandi_Rice.JPG"
                        },
                        {
                            "name": "Majboos",
                            "category": "Main Course",
                            "price": "₹380",
                            "description": "Spiced rice dish",
                            "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Grilled Fish",
                            "category": "Main Course",
                            "price": "₹550",
                            "description": "Fresh grilled fish",
                            "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Umm Ali",
                            "category": "Desserts",
                            "price": "₹120",
                            "description": "Egyptian bread pudding",
                            "image": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Basbousa",
                            "category": "Desserts",
                            "price": "₹100",
                            "description": "Semolina cake",
                            "image": "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Luqaimat",
                            "category": "Desserts",
                            "price": "₹90",
                            "description": "Sweet dumplings",
                            "image": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop"
                        }
                    ],
                    "coords": [
                        11.265,
                        75.792
                    ]
                },
                {
                    "id": 305,
                    "placeId": 3,
                    "name": "The Raviz",
                    "cuisine": "Fine Dining",
                    "rating": 4.8,
                    "image": "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",
                    "foodItems": [
                        {
                            "name": "Seafood Platter",
                            "category": "Starters",
                            "price": "₹650",
                            "description": "Assorted seafood selection",
                            "image": "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Sushi Platter",
                            "category": "Starters",
                            "price": "₹580",
                            "description": "Japanese sushi selection",
                            "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Soup Trio",
                            "category": "Starters",
                            "price": "₹220",
                            "description": "Three soup varieties",
                            "image": "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Lobster Thermidor",
                            "category": "Main Course",
                            "price": "₹1500",
                            "description": "Premium lobster dish",
                            "image": "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Tenderloin Steak",
                            "category": "Main Course",
                            "price": "₹1200",
                            "description": "Grilled beef steak",
                            "image": "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Risotto",
                            "category": "Main Course",
                            "price": "₹480",
                            "description": "Creamy Italian rice",
                            "image": "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Pan Seared Fish",
                            "category": "Main Course",
                            "price": "₹850",
                            "description": "Fresh fish with sauce",
                            "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Crème Brûlée",
                            "category": "Desserts",
                            "price": "₹280",
                            "description": "Classic French dessert",
                            "image": "https://images.unsplash.com/photo-1580959375944-0d0c4f45d154?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Opera Cake",
                            "category": "Desserts",
                            "price": "₹320",
                            "description": "Layered almond cake",
                            "image": "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Sorbet Trio",
                            "category": "Desserts",
                            "price": "₹250",
                            "description": "Three fruit sorbets",
                            "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop"
                        }
                    ],
                    "coords": [
                        11.295,
                        75.775
                    ]
                }
            ],
            "coords": [
                11.2588,
                75.7804
            ]
        },
        {
            "id": 4,
            "name": "Thrissur",
            "description": "Cultural Capital of Kerala",
            "image": "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&h=600&fit=crop",
            "restaurants": [
                {
                    "id": 401,
                    "placeId": 4,
                    "name": "Pathans",
                    "cuisine": "Multi-Cuisine",
                    "rating": 4.5,
                    "image": "https://upload.wikimedia.org/wikipedia/commons/5/53/Restaurant_interior.jpg",
                    "rooms": [
                        {
                            "type": "Panoramic Suite",
                            "price": "₹7500",
                            "amenities": [
                                "Temple View",
                                "Spa Access",
                                "WiFi",
                                "Butler"
                            ],
                            "image": "https://images.pexels.com/photos/2034330/pexels-photo-2034330.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "type": "Executive Room",
                            "price": "₹4000",
                            "amenities": [
                                "AC",
                                "WiFi",
                                "Breakfast"
                            ],
                            "image": "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "foodItems": [
                        {
                            "name": "Chicken 65",
                            "category": "Starters",
                            "price": "₹220",
                            "description": "Spicy fried chicken",
                            "image": "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Paneer Chilli",
                            "category": "Starters",
                            "price": "₹200",
                            "description": "Indo-Chinese paneer",
                            "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Gobi Manchurian",
                            "category": "Starters",
                            "price": "₹180",
                            "description": "Crispy cauliflower",
                            "image": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Chicken Biryani",
                            "category": "Main Course",
                            "price": "₹260",
                            "description": "Flavorful rice with chicken",
                            "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Butter Naan",
                            "category": "Main Course",
                            "price": "₹50",
                            "description": "Soft buttery bread",
                            "image": "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Paneer Butter Masala",
                            "category": "Main Course",
                            "price": "₹280",
                            "description": "Cottage cheese in gravy",
                            "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Fried Rice",
                            "category": "Main Course",
                            "price": "₹200",
                            "description": "Mixed fried rice",
                            "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Gulab Jamun",
                            "category": "Desserts",
                            "price": "₹80",
                            "description": "Sweet fried dumplings",
                            "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Ice Cream",
                            "category": "Desserts",
                            "price": "₹100",
                            "description": "Assorted flavors",
                            "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Kheer",
                            "category": "Desserts",
                            "price": "₹90",
                            "description": "Rice pudding",
                            "image": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop"
                        }
                    ],
                    "coords": [
                        10.525,
                        76.215
                    ]
                },
                {
                    "id": 402,
                    "placeId": 4,
                    "name": "Ming Palace",
                    "cuisine": "Chinese",
                    "rating": 4.2,
                    "image": "https://upload.wikimedia.org/wikipedia/commons/5/53/Restaurant_interior.jpg",
                    "foodItems": [
                        {
                            "name": "Spring Rolls",
                            "category": "Starters",
                            "price": "₹160",
                            "description": "Crispy vegetable rolls",
                            "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Honey Chilli Potato",
                            "category": "Starters",
                            "price": "₹180",
                            "description": "Sweet and spicy potatoes",
                            "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Chicken Lollipop",
                            "category": "Starters",
                            "price": "₹240",
                            "description": "Fried chicken winglets",
                            "image": "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Hakka Noodles",
                            "category": "Main Course",
                            "price": "₹220",
                            "description": "Stir-fried noodles",
                            "image": "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Manchurian Fried Rice",
                            "category": "Main Course",
                            "price": "₹240",
                            "description": "Rice with manchurian balls",
                            "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Szechuan Chicken",
                            "category": "Main Course",
                            "price": "₹350",
                            "description": "Spicy Szechuan sauce",
                            "image": "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Sweet Corn Soup",
                            "category": "Main Course",
                            "price": "₹120",
                            "description": "Creamy corn soup",
                            "image": "https://images.unsplash.com/photo-1626074353765-517a65faa902?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Date Pancake",
                            "category": "Desserts",
                            "price": "₹150",
                            "description": "Sweet Chinese pancake",
                            "image": "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Fried Ice Cream",
                            "category": "Desserts",
                            "price": "₹180",
                            "description": "Crispy coated ice cream",
                            "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Fortune Cookie",
                            "category": "Desserts",
                            "price": "₹60",
                            "description": "Traditional cookie",
                            "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop"
                        }
                    ],
                    "coords": [
                        10.53,
                        76.21
                    ]
                },
                {
                    "id": 403,
                    "placeId": 4,
                    "name": "Hotel Bharath",
                    "cuisine": "South Indian",
                    "rating": 4.4,
                    "image": "https://upload.wikimedia.org/wikipedia/commons/5/53/Restaurant_interior.jpg",
                    "foodItems": [
                        {
                            "name": "Paper Dosa",
                            "category": "Starters",
                            "price": "₹100",
                            "description": "Extra thin crispy dosa",
                            "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Vada",
                            "category": "Starters",
                            "price": "₹50",
                            "description": "Crispy lentil donuts",
                            "image": "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Idiyappam",
                            "category": "Starters",
                            "price": "₹70",
                            "description": "String hoppers",
                            "image": "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Sadya",
                            "category": "Main Course",
                            "price": "₹200",
                            "description": "Traditional Kerala feast",
                            "image": "https://upload.wikimedia.org/wikipedia/commons/8/87/Sadya_2019.jpg"
                        },
                        {
                            "name": "Puttu Kadala",
                            "category": "Main Course",
                            "price": "₹80",
                            "description": "Steamed rice cake with curry",
                            "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Fish Curry Meals",
                            "category": "Main Course",
                            "price": "₹180",
                            "description": "Fish with rice",
                            "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Sambar Rice",
                            "category": "Main Course",
                            "price": "₹120",
                            "description": "Rice with lentil curry",
                            "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Palada Payasam",
                            "category": "Desserts",
                            "price": "₹100",
                            "description": "Milk and rice flakes",
                            "image": "https://images.unsplash.com/photo-1663847697988-48c5b34580dd?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Pazham Pori",
                            "category": "Desserts",
                            "price": "₹50",
                            "description": "Banana fritters",
                            "image": "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Unniappam",
                            "category": "Desserts",
                            "price": "₹70",
                            "description": "Sweet rice balls",
                            "image": "https://upload.wikimedia.org/wikipedia/commons/3/3d/Unniyappam.jpg"
                        }
                    ],
                    "coords": [
                        10.528,
                        76.218
                    ]
                },
                {
                    "id": 404,
                    "placeId": 4,
                    "name": "Grill Inn",
                    "cuisine": "Barbeque & Grills",
                    "rating": 4.6,
                    "image": "https://upload.wikimedia.org/wikipedia/commons/5/53/Restaurant_interior.jpg",
                    "rooms": [
                        {
                            "type": "BBQ Loft Suite",
                            "price": "₹8500",
                            "amenities": [
                                "Private Rooftop",
                                "Grill Setup",
                                "AC",
                                "WiFi"
                            ],
                            "image": "https://images.pexels.com/photos/2034330/pexels-photo-2034330.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "type": "Comfort Stay",
                            "price": "₹3500",
                            "amenities": [
                                "AC",
                                "WiFi",
                                "TV"
                            ],
                            "image": "https://images.pexels.com/photos/210532/pexels-photo-210532.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "foodItems": [
                        {
                            "name": "BBQ Wings",
                            "category": "Starters",
                            "price": "₹280",
                            "description": "Smoky grilled wings",
                            "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Tandoori Platter",
                            "category": "Starters",
                            "price": "₹480",
                            "description": "Mixed tandoori items",
                            "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Grilled Fish",
                            "category": "Starters",
                            "price": "₹320",
                            "description": "Charcoal grilled fish",
                            "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Grilled Chicken",
                            "category": "Main Course",
                            "price": "₹450",
                            "description": "Full grilled chicken",
                            "image": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "BBQ Ribs",
                            "category": "Main Course",
                            "price": "₹550",
                            "description": "Tender pork ribs",
                            "image": "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Steak",
                            "category": "Main Course",
                            "price": "₹680",
                            "description": "Juicy beef steak",
                            "image": "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Grilled Prawns",
                            "category": "Main Course",
                            "price": "₹580",
                            "description": "Marinated prawns",
                            "image": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Brownie with Ice Cream",
                            "category": "Desserts",
                            "price": "₹180",
                            "description": "Warm brownie",
                            "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Grilled Pineapple",
                            "category": "Desserts",
                            "price": "₹120",
                            "description": "Caramelized pineapple",
                            "image": "https://images.unsplash.com/photo-1560900318-b9ce1eebbb24?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Vanilla Pudding",
                            "category": "Desserts",
                            "price": "₹140",
                            "description": "Creamy pudding",
                            "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop"
                        }
                    ],
                    "coords": [
                        10.535,
                        76.225
                    ]
                },
                {
                    "id": 405,
                    "placeId": 4,
                    "name": "Café Coffee Day",
                    "cuisine": "Café",
                    "rating": 4.1,
                    "image": "https://images.unsplash.com/photo-1577659733926-0b8c9c8b9f5b?w=800&h=600&fit=crop",
                    "foodItems": [
                        {
                            "name": "Sandwiches",
                            "category": "Starters",
                            "price": "₹150",
                            "description": "Grilled sandwiches",
                            "image": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Garlic Bread",
                            "category": "Starters",
                            "price": "₹120",
                            "description": "Cheesy garlic bread",
                            "image": "https://images.unsplash.com/photo-1619985632461-f33748ef8f3e?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Nachos",
                            "category": "Starters",
                            "price": "₹180",
                            "description": "Loaded nachos",
                            "image": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Pasta",
                            "category": "Main Course",
                            "price": "₹220",
                            "description": "Creamy pasta",
                            "image": "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Pizza",
                            "category": "Main Course",
                            "price": "₹280",
                            "description": "Personal pizza",
                            "image": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Burger",
                            "category": "Main Course",
                            "price": "₹200",
                            "description": "Veg/Chicken burger",
                            "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Wrap",
                            "category": "Main Course",
                            "price": "₹180",
                            "description": "Tortilla wrap",
                            "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Chocolate Cake",
                            "category": "Desserts",
                            "price": "₹150",
                            "description": "Rich chocolate cake",
                            "image": "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Cheesecake",
                            "category": "Desserts",
                            "price": "₹160",
                            "description": "Creamy cheesecake",
                            "image": "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Coffee Frappe",
                            "category": "Desserts",
                            "price": "₹140",
                            "description": "Iced coffee drink",
                            "image": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop"
                        }
                    ],
                    "coords": [
                        10.54,
                        76.23
                    ]
                }
            ],
            "coords": [
                10.5276,
                76.2144
            ]
        },
        {
            "id": 5,
            "name": "Kannur",
            "description": "Land of Looms and Lores",
            "image": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop",
            "restaurants": [
                {
                    "id": 501,
                    "placeId": 5,
                    "name": "Odhens Hotel",
                    "cuisine": "Malabar",
                    "rating": 4.6,
                    "image": "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop",
                    "foodItems": [
                        {
                            "name": "Kallummakaya Nirachathu",
                            "category": "Starters",
                            "price": "₹280",
                            "description": "Stuffed mussels",
                            "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Chicken Varutharachathu",
                            "category": "Starters",
                            "price": "₹200",
                            "description": "Roasted chicken",
                            "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Prawn Fry",
                            "category": "Starters",
                            "price": "₹320",
                            "description": "Spicy prawn fry",
                            "image": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Biryani",
                            "category": "Main Course",
                            "price": "₹280",
                            "description": "Kannur style biryani",
                            "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Pathiri with Chicken",
                            "category": "Main Course",
                            "price": "₹180",
                            "description": "Rice bread with curry",
                            "image": "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Meen Pollichathu",
                            "category": "Main Course",
                            "price": "₹350",
                            "description": "Fish in banana leaf",
                            "image": "https://images.unsplash.com/photo-1580959375944-0d0c4f45d154?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Erachi Curry",
                            "category": "Main Course",
                            "price": "₹220",
                            "description": "Spicy meat curry",
                            "image": "https://images.unsplash.com/photo-1626074353765-517a65faa902?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Mutta Mala",
                            "category": "Desserts",
                            "price": "₹120",
                            "description": "Egg garland sweet",
                            "image": "https://images.unsplash.com/photo-1580959375944-0d0c4f45d154?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Sukhiyan",
                            "category": "Desserts",
                            "price": "₹80",
                            "description": "Sweet lentil fritters",
                            "image": "https://images.unsplash.com/photo-1560900318-b9ce1eebbb24?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Kozhikkodan Halwa",
                            "category": "Desserts",
                            "price": "₹150",
                            "description": "Famous halwa",
                            "image": "https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=400&h=300&fit=crop"
                        }
                    ],
                    "coords": [
                        11.87,
                        75.375
                    ]
                },
                {
                    "id": 502,
                    "placeId": 5,
                    "name": "Raandhal",
                    "cuisine": "Kerala Traditional",
                    "rating": 4.4,
                    "image": "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=800&h=600&fit=crop",
                    "foodItems": [
                        {
                            "name": "Kappa Biriyani",
                            "category": "Starters",
                            "price": "₹180",
                            "description": "Tapioca biryani",
                            "image": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Chemeen Ularthiyathu",
                            "category": "Starters",
                            "price": "₹300",
                            "description": "Prawn stir fry",
                            "image": "https://images.unsplash.com/photo-1580959375944-0d0c4f45d154?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Kallumakaya",
                            "category": "Starters",
                            "price": "₹250",
                            "description": "Mussel roast",
                            "image": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Kappa with Fish Curry",
                            "category": "Main Course",
                            "price": "₹220",
                            "description": "Tapioca with curry",
                            "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Meen Molly",
                            "category": "Main Course",
                            "price": "₹280",
                            "description": "Fish in coconut milk",
                            "image": "https://images.unsplash.com/photo-1580959375944-0d0c4f45d154?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Thalassery Biryani",
                            "category": "Main Course",
                            "price": "₹320",
                            "description": "Special biryani",
                            "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Nei Choru",
                            "category": "Main Course",
                            "price": "₹150",
                            "description": "Ghee rice",
                            "image": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Parippu Payasam",
                            "category": "Desserts",
                            "price": "₹100",
                            "description": "Lentil pudding",
                            "image": "https://images.unsplash.com/photo-1663847697988-48c5b34580dd?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Elaneer Payasam",
                            "category": "Desserts",
                            "price": "₹120",
                            "description": "Tender coconut pudding",
                            "image": "https://images.unsplash.com/photo-1663847697988-48c5b34580dd?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Ada Pradhaman",
                            "category": "Desserts",
                            "price": "₹110",
                            "description": "Rice flakes dessert",
                            "image": "https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?w=400&h=300&fit=crop"
                        }
                    ],
                    "coords": [
                        11.875,
                        75.385
                    ]
                },
                {
                    "id": 503,
                    "placeId": 5,
                    "name": "MVK Restaurant",
                    "cuisine": "Multi-Cuisine",
                    "rating": 4.3,
                    "image": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
                    "foodItems": [
                        {
                            "name": "Chicken Tikka",
                            "category": "Starters",
                            "price": "₹250",
                            "description": "Tandoori chicken pieces",
                            "image": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Fish Tikka",
                            "category": "Starters",
                            "price": "₹280",
                            "description": "Spiced fish chunks",
                            "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Paneer Tikka",
                            "category": "Starters",
                            "price": "₹220",
                            "description": "Grilled cottage cheese",
                            "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Butter Chicken",
                            "category": "Main Course",
                            "price": "₹350",
                            "description": "Creamy tomato curry",
                            "image": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Kadai Chicken",
                            "category": "Main Course",
                            "price": "₹320",
                            "description": "Spicy kadai masala",
                            "image": "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Veg Biryani",
                            "category": "Main Course",
                            "price": "₹200",
                            "description": "Vegetable biryani",
                            "image": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Rotis",
                            "category": "Main Course",
                            "price": "₹140",
                            "description": "Assorted Indian breads",
                            "image": "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Ras Malai",
                            "category": "Desserts",
                            "price": "₹120",
                            "description": "Sweet cream cheese",
                            "image": "https://images.unsplash.com/photo-1580959375944-0d0c4f45d154?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Kulfi",
                            "category": "Desserts",
                            "price": "₹80",
                            "description": "Indian ice cream",
                            "image": "https://images.unsplash.com/photo-1560900318-b9ce1eebbb24?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Jalebi",
                            "category": "Desserts",
                            "price": "₹90",
                            "description": "Sweet spiral",
                            "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop"
                        }
                    ],
                    "coords": [
                        11.88,
                        75.365
                    ]
                },
                {
                    "id": 504,
                    "placeId": 5,
                    "name": "Dhe Puttu",
                    "cuisine": "Puttu Specialty",
                    "rating": 4.7,
                    "image": "https://images.unsplash.com/photo-1515669097368-22e68427d265?w=800&h=600&fit=crop",
                    "foodItems": [
                        {
                            "name": "Chakka Puttu",
                            "category": "Starters",
                            "price": "₹120",
                            "description": "Jackfruit puttu",
                            "image": "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Mutta Puttu",
                            "category": "Starters",
                            "price": "₹100",
                            "description": "Egg scrambled puttu",
                            "image": "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Pacha Puttu",
                            "category": "Starters",
                            "price": "₹80",
                            "description": "Green gram puttu",
                            "image": "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Beef Puttu",
                            "category": "Main Course",
                            "price": "₹180",
                            "description": "Puttu with spicy beef",
                            "image": "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Kadala Curry Puttu",
                            "category": "Main Course",
                            "price": "₹100",
                            "description": "Puttu with chickpea curry",
                            "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Chicken Puttu",
                            "category": "Main Course",
                            "price": "₹160",
                            "description": "Puttu with chicken curry",
                            "image": "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Fish Puttu",
                            "category": "Main Course",
                            "price": "₹150",
                            "description": "Puttu with fish curry",
                            "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Pazham Puttu",
                            "category": "Desserts",
                            "price": "₹90",
                            "description": "Banana puttu",
                            "image": "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Chocolate Puttu",
                            "category": "Desserts",
                            "price": "₹110",
                            "description": "Chocolate flavored",
                            "image": "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Coconut Puttu",
                            "category": "Desserts",
                            "price": "₹80",
                            "description": "Sweet coconut puttu",
                            "image": "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop"
                        }
                    ],
                    "coords": [
                        11.865,
                        75.36
                    ]
                },
                {
                    "id": 505,
                    "placeId": 5,
                    "name": "Sea Queen",
                    "cuisine": "Seafood",
                    "rating": 4.5,
                    "image": "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",
                    "foodItems": [
                        {
                            "name": "Crab Masala",
                            "category": "Starters",
                            "price": "₹450",
                            "description": "Spicy crab preparation",
                            "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Squid Fry",
                            "category": "Starters",
                            "price": "₹320",
                            "description": "Crispy calamari",
                            "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Prawn Pepper Fry",
                            "category": "Starters",
                            "price": "₹380",
                            "description": "Pepper crusted prawns",
                            "image": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Fish Curry Rice",
                            "category": "Main Course",
                            "price": "₹280",
                            "description": "Seer fish curry with rice",
                            "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Lobster Thermidor",
                            "category": "Main Course",
                            "price": "₹1400",
                            "description": "Premium lobster dish",
                            "image": "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Prawn Biriyani",
                            "category": "Main Course",
                            "price": "₹420",
                            "description": "Prawn biryani",
                            "image": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Crab Roast",
                            "category": "Main Course",
                            "price": "₹550",
                            "description": "Roasted crab",
                            "image": "https://images.unsplash.com/photo-1626074353765-517a65faa902?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Coconut Ice Cream",
                            "category": "Desserts",
                            "price": "₹100",
                            "description": "Homemade ice cream",
                            "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Fish Halwa",
                            "category": "Desserts",
                            "price": "₹180",
                            "description": "Unique fish sweet",
                            "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Fruit Custard",
                            "category": "Desserts",
                            "price": "₹120",
                            "description": "Mixed fruit dessert",
                            "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop"
                        }
                    ],
                    "coords": [
                        11.85,
                        75.37
                    ]
                }
            ],
            "coords": [
                11.8745,
                75.3704
            ]
        },
        {
            "id": 6,
            "name": "Malappuram",
            "description": "The Culinary Capital of Kerala",
            "image": "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&h=600&fit=crop",
            "restaurants": [
                {
                    "id": 601,
                    "placeId": 6,
                    "name": "Rahmath Hotel",
                    "cuisine": "Malabar Traditional",
                    "rating": 4.8,
                    "isFeatured": true,
                    "hours": {
                        "open": "06:00",
                        "close": "23:00"
                    },
                    "tags": [
                        "Top Rated",
                        "Traditional",
                        "Malabar"
                    ],
                    "image": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
                    "rooms": [
                        {
                            "type": "Malabar Heritage Room",
                            "price": "₹6000",
                            "amenities": [
                                "Traditional Decor",
                                "Breakfast",
                                "AC",
                                "WiFi"
                            ],
                            "image": "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "type": "Budget Twin",
                            "price": "₹2500",
                            "amenities": [
                                "AC",
                                "WiFi"
                            ],
                            "image": "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "reviews": [
                        {
                            "user": "Rasheed K.",
                            "rating": 5,
                            "comment": "Best Malabar Biriyani in the entire district! Authentic taste that keeps me coming back.",
                            "date": "1 day ago"
                        },
                        {
                            "user": "Fathima N.",
                            "rating": 5,
                            "comment": "The Pathiri and Neychor combo is heavenly. True Malabar experience!",
                            "date": "3 days ago"
                        }
                    ],
                    "foodItems": [
                        {
                            "name": "Malabar Biriyani",
                            "category": "Main Course",
                            "price": "₹180",
                            "isVeg": false,
                            "description": "Fragrant Malabar-style chicken biriyani with Khaima rice",
                            "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Pathiri & Chicken Curry",
                            "category": "Main Course",
                            "price": "₹150",
                            "isVeg": false,
                            "description": "Thin rice bread with rich Malabar chicken curry",
                            "image": "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Neychor",
                            "category": "Main Course",
                            "price": "₹120",
                            "isVeg": false,
                            "description": "Ghee rice cooked in traditional Malabar style",
                            "image": "https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Beef Ularthiy athu",
                            "category": "Main Course",
                            "price": "₹200",
                            "isVeg": false,
                            "description": "Dry-roasted beef with coconut and spices",
                            "image": "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Malabar Parotta",
                            "category": "Main Course",
                            "price": "₹30",
                            "isVeg": true,
                            "description": "Flaky layered flatbread, crispy outside and soft inside",
                            "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Chicken Fry",
                            "category": "Starters",
                            "price": "₹160",
                            "isVeg": false,
                            "description": "Crispy fried chicken Malabar hotel style",
                            "image": "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Mutton Stew",
                            "category": "Main Course",
                            "price": "₹220",
                            "isVeg": false,
                            "description": "Creamy coconut milk stew with tender mutton pieces",
                            "image": "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Unnakkaya",
                            "category": "Snacks",
                            "price": "₹40",
                            "isVeg": false,
                            "description": "Sweet banana fritter stuffed with egg and nuts",
                            "image": "https://images.unsplash.com/photo-1628772182610-2f890948c59c?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Sulaimani Tea",
                            "category": "Beverages",
                            "price": "₹25",
                            "isVeg": true,
                            "description": "Aromatic black tea with lemon and spices",
                            "image": "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Arikkadukka",
                            "category": "Snacks",
                            "price": "₹60",
                            "isVeg": false,
                            "description": "Stuffed mussels with spiced rice filling",
                            "image": "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop"
                        }
                    ],
                    "coords": [
                        11.051,
                        76.0711
                    ]
                },
                {
                    "id": 602,
                    "placeId": 6,
                    "name": "Salkara Restaurant",
                    "cuisine": "Malabar & Mughlai",
                    "rating": 4.6,
                    "isFeatured": true,
                    "hours": {
                        "open": "07:00",
                        "close": "23:30"
                    },
                    "tags": [
                        "Top Rated",
                        "Traditional",
                        "Modern"
                    ],
                    "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
                    "reviews": [
                        {
                            "user": "Shafeeq M.",
                            "rating": 5,
                            "comment": "The Chicken Mandhi is absolutely amazing! Best in Malappuram.",
                            "date": "2 days ago"
                        },
                        {
                            "user": "Aisha R.",
                            "rating": 4,
                            "comment": "Great ambiance and food quality. The Shawarma is a must-try.",
                            "date": "1 week ago"
                        }
                    ],
                    "foodItems": [
                        {
                            "name": "Chicken Mandhi",
                            "category": "Main Course",
                            "price": "₹280",
                            "isVeg": false,
                            "description": "Arabian style smoked chicken with flavored rice",
                            "image": "https://images.unsplash.com/photo-1619221882659-1f1c0b166bad?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Shawarma",
                            "category": "Snacks",
                            "price": "₹90",
                            "isVeg": false,
                            "description": "Juicy chicken shawarma wrap with garlic sauce",
                            "image": "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Alfaham Chicken",
                            "category": "Main Course",
                            "price": "₹240",
                            "isVeg": false,
                            "description": "Grilled marinated chicken Arabian style",
                            "image": "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Mutton Biriyani",
                            "category": "Main Course",
                            "price": "₹250",
                            "isVeg": false,
                            "description": "Aromatic mutton biriyani with Malabar spices",
                            "image": "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Kuboos & Chicken Curry",
                            "category": "Main Course",
                            "price": "₹130",
                            "isVeg": false,
                            "description": "Soft Arabian bread with spicy Malabar chicken",
                            "image": "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Falooda",
                            "category": "Desserts",
                            "price": "₹100",
                            "isVeg": true,
                            "description": "Rose-flavored milk dessert with vermicelli and ice cream",
                            "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Chatti Pathiri",
                            "category": "Desserts",
                            "price": "₹80",
                            "isVeg": false,
                            "description": "Layered pastry with sweet egg filling, Malabar specialty",
                            "image": "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Thalassery Fish Biriyani",
                            "category": "Main Course",
                            "price": "₹220",
                            "isVeg": false,
                            "description": "Spicy fish biriyani Thalassery style with Khaima rice",
                            "image": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Pepper Chicken",
                            "category": "Starters",
                            "price": "₹180",
                            "isVeg": false,
                            "description": "Crunchy pepper chicken Kerala restaurant style",
                            "image": "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Kattan Chai",
                            "category": "Beverages",
                            "price": "₹20",
                            "isVeg": true,
                            "description": "Strong black tea without milk, Malabar special",
                            "image": "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=300&fit=crop"
                        }
                    ],
                    "coords": [
                        11.043,
                        76.078
                    ]
                },
                {
                    "id": 603,
                    "placeId": 6,
                    "name": "Top Form Restaurant",
                    "cuisine": "Multi-Cuisine & Malabar",
                    "rating": 4.5,
                    "isFeatured": false,
                    "hours": {
                        "open": "08:00",
                        "close": "23:00"
                    },
                    "tags": [
                        "Modern",
                        "Traditional",
                        "Family"
                    ],
                    "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop",
                    "reviews": [
                        {
                            "user": "Ibrahim T.",
                            "rating": 4,
                            "comment": "Great ambiance and variety. Their fried rice is next level!",
                            "date": "5 days ago"
                        },
                        {
                            "user": "Safiya J.",
                            "rating": 5,
                            "comment": "Best family restaurant in town. Kids love it here!",
                            "date": "2 weeks ago"
                        }
                    ],
                    "foodItems": [
                        {
                            "name": "Dragon Chicken",
                            "category": "Starters",
                            "price": "₹220",
                            "isVeg": false,
                            "description": "Spicy Indo-Chinese chicken with peppers",
                            "image": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Egg Biriyani",
                            "category": "Main Course",
                            "price": "₹140",
                            "isVeg": false,
                            "description": "Flavorful egg biriyani with boiled eggs and aromatic rice",
                            "image": "https://images.unsplash.com/photo-1633945274309-20314fe78f9f?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Chicken Fried Rice",
                            "category": "Main Course",
                            "price": "₹180",
                            "isVeg": false,
                            "description": "Wok-tossed rice with chicken and vegetables",
                            "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Paneer Butter Masala",
                            "category": "Main Course",
                            "price": "₹190",
                            "isVeg": true,
                            "description": "Creamy tomato-based paneer curry",
                            "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Chilli Chicken",
                            "category": "Starters",
                            "price": "₹200",
                            "isVeg": false,
                            "description": "Crispy chicken tossed in spicy chilli sauce",
                            "image": "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Mushroom Manchurian",
                            "category": "Starters",
                            "price": "₹170",
                            "isVeg": true,
                            "description": "Crispy mushroom balls in tangy Manchurian sauce",
                            "image": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Tandoori Chicken",
                            "category": "Starters",
                            "price": "₹280",
                            "isVeg": false,
                            "description": "Charcoal-grilled marinated chicken",
                            "image": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Veg Noodles",
                            "category": "Main Course",
                            "price": "₹130",
                            "isVeg": true,
                            "description": "Stir-fried Hakka noodles with fresh vegetables",
                            "image": "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Gulab Jamun",
                            "category": "Desserts",
                            "price": "₹60",
                            "isVeg": true,
                            "description": "Soft milk balls soaked in sugar syrup",
                            "image": "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Lime Soda",
                            "category": "Beverages",
                            "price": "₹35",
                            "isVeg": true,
                            "description": "Fresh lime soda sweet or salt",
                            "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=300&fit=crop"
                        }
                    ],
                    "coords": [
                        11.056,
                        76.069
                    ]
                },
                {
                    "id": 604,
                    "placeId": 6,
                    "name": "Zam Zam Restaurant",
                    "cuisine": "Malabar & Arabian",
                    "rating": 4.7,
                    "isFeatured": true,
                    "hours": {
                        "open": "05:30",
                        "close": "23:30"
                    },
                    "tags": [
                        "Top Rated",
                        "Traditional",
                        "Seafood"
                    ],
                    "image": "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=400&fit=crop",
                    "reviews": [
                        {
                            "user": "Navas P.",
                            "rating": 5,
                            "comment": "The Kallummakkaya Nirachathu is out of this world! Must visit.",
                            "date": "4 days ago"
                        },
                        {
                            "user": "Sunitha K.",
                            "rating": 4,
                            "comment": "Authentic Malabar flavors. Their Biriyani is legendary.",
                            "date": "2 weeks ago"
                        }
                    ],
                    "foodItems": [
                        {
                            "name": "Kallummakkaya Nirachathu",
                            "category": "Starters",
                            "price": "₹80",
                            "isVeg": false,
                            "description": "Stuffed mussels with spiced filling, deep fried",
                            "image": "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Kozhikkal Biriyani",
                            "category": "Main Course",
                            "price": "₹200",
                            "isVeg": false,
                            "description": "Traditional Malappuram chicken biriyani with dum cooking",
                            "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Meen Pollichathu",
                            "category": "Main Course",
                            "price": "₹320",
                            "isVeg": false,
                            "description": "Fish marinated in spices wrapped in banana leaf",
                            "image": "https://images.unsplash.com/photo-1580959375944-e7a1a9f9e231?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Porotta & Beef Fry",
                            "category": "Main Course",
                            "price": "₹160",
                            "isVeg": false,
                            "description": "Flaky Kerala porotta with spicy beef fry",
                            "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Prawn Masala",
                            "category": "Main Course",
                            "price": "₹260",
                            "isVeg": false,
                            "description": "Tiger prawns in rich coconut masala",
                            "image": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Chicken 65",
                            "category": "Starters",
                            "price": "₹180",
                            "isVeg": false,
                            "description": "Deep fried spicy chicken with curry leaves",
                            "image": "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Ghee Rice & Chicken Roast",
                            "category": "Main Course",
                            "price": "₹190",
                            "isVeg": false,
                            "description": "Fragrant ghee rice with Kerala chicken roast",
                            "image": "https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Fish Curry & Rice",
                            "category": "Main Course",
                            "price": "₹150",
                            "isVeg": false,
                            "description": "Traditional Kerala fish curry with matta rice",
                            "image": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Pazham Pori",
                            "category": "Snacks",
                            "price": "₹30",
                            "isVeg": true,
                            "description": "Sweet banana fritters, classic Kerala snack",
                            "image": "https://images.unsplash.com/photo-1628772182610-2f890948c59c?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Mango Shake",
                            "category": "Beverages",
                            "price": "₹60",
                            "isVeg": true,
                            "description": "Thick and creamy fresh mango milkshake",
                            "image": "https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400&h=300&fit=crop"
                        }
                    ],
                    "coords": [
                        11.047,
                        76.082
                    ]
                },
                {
                    "id": 605,
                    "placeId": 6,
                    "name": "Al Buhari Restaurant",
                    "cuisine": "Arabian & Malabar Fusion",
                    "rating": 4.4,
                    "isFeatured": false,
                    "hours": {
                        "open": "06:30",
                        "close": "00:00"
                    },
                    "tags": [
                        "Modern",
                        "Seafood",
                        "Traditional"
                    ],
                    "image": "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=400&fit=crop",
                    "reviews": [
                        {
                            "user": "Anwar S.",
                            "rating": 4,
                            "comment": "Good food at great prices. The Mandhi is excellent!",
                            "date": "1 week ago"
                        },
                        {
                            "user": "Riya M.",
                            "rating": 5,
                            "comment": "Love their fusion twist on traditional Malabar dishes.",
                            "date": "3 days ago"
                        }
                    ],
                    "foodItems": [
                        {
                            "name": "Al Faham Grilled Chicken",
                            "category": "Main Course",
                            "price": "₹260",
                            "isVeg": false,
                            "description": "Charcoal grilled whole chicken with Arabian spices",
                            "image": "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Chicken Shawarma Plate",
                            "category": "Main Course",
                            "price": "₹160",
                            "isVeg": false,
                            "description": "Shawarma rice plate with hummus and salad",
                            "image": "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Malabar Chicken Curry",
                            "category": "Main Course",
                            "price": "₹160",
                            "isVeg": false,
                            "description": "Rich coconut-based chicken curry Malabar style",
                            "image": "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Kappa Biriyani",
                            "category": "Main Course",
                            "price": "₹170",
                            "isVeg": false,
                            "description": "Unique tapioca biriyani with chicken, Malabar innovation",
                            "image": "https://images.unsplash.com/photo-1633945274309-20314fe78f9f?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Beef Cutlet",
                            "category": "Snacks",
                            "price": "₹40",
                            "isVeg": false,
                            "description": "Crispy spiced beef cutlets, tea-time favorite",
                            "image": "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Squid Fry",
                            "category": "Starters",
                            "price": "₹220",
                            "isVeg": false,
                            "description": "Crispy fried squid rings with Malabar masala",
                            "image": "https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Puttu & Kadala Curry",
                            "category": "Main Course",
                            "price": "₹80",
                            "isVeg": true,
                            "description": "Steamed rice cake with black chickpea curry",
                            "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Appam & Egg Curry",
                            "category": "Main Course",
                            "price": "₹90",
                            "isVeg": false,
                            "description": "Lacy rice pancake with spicy egg curry",
                            "image": "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Chicken Lollipop",
                            "category": "Starters",
                            "price": "₹190",
                            "isVeg": false,
                            "description": "Crispy chicken drumettes with spicy glaze",
                            "image": "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=300&fit=crop"
                        },
                        {
                            "name": "Fresh Juice Combo",
                            "category": "Beverages",
                            "price": "₹70",
                            "isVeg": true,
                            "description": "Mixed fruit fresh juice with seasonal fruits",
                            "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop"
                        }
                    ],
                    "coords": [
                        11.058,
                        76.074
                    ]
                }
            ],
            "coords": [
                11.051,
                76.0711
            ]
        },
        {
            "id": 7,
            "name": "Alappuzha",
            "description": "Venice of the East",
            "image": "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop",
            "restaurants": [
                {
                    "id": 701,
                    "placeId": 7,
                    "name": "Backwater Heritage",
                    "cuisine": "Kuttanadan",
                    "class": "Luxury",
                    "rating": 4.8,
                    "image": "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800",
                    "rooms": [
                        {
                            "type": "Luxury Houseboat Room",
                            "price": "₹12000",
                            "amenities": [
                                "Backwater View",
                                "Private Deck",
                                "AC"
                            ],
                            "image": "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "type": "Lake Front Suite",
                            "price": "₹7500",
                            "amenities": [
                                "Infinity Pool Access",
                                "WiFi",
                                "Minibar"
                            ],
                            "image": "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "foodItems": [
                        {
                            "name": "Duck Mappas",
                            "price": "₹550",
                            "category": "Main Course",
                            "isVeg": false,
                            "description": "Authentic Kuttanadan duck curry with thick coconut milk",
                            "image": "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Toddy Shop Fish Curry",
                            "price": "₹320",
                            "category": "Main Course",
                            "isVeg": false,
                            "description": "Famous spicy fish curry served in toddy shops",
                            "image": "https://images.pexels.com/photos/1015568/pexels-photo-1015568.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "coords": [
                        9.4981,
                        76.3329
                    ]
                },
                {
                    "id": 3001,
                    "placeId": 7,
                    "name": "Alappuzha Grand Retreat 2",
                    "cuisine": "Kerala & Multicuisine",
                    "class": "Luxury",
                    "rating": 4.657044876892391,
                    "image": "https://images.pexels.com/photos/2034330/pexels-photo-2034330.jpeg?auto=compress&cs=tinysrgb&w=800",
                    "rooms": [
                        {
                            "type": "Premium Suite",
                            "price": "₹7022",
                            "amenities": [
                                "WiFi",
                                "AC",
                                "Breakfast",
                                "Alappuzha View"
                            ],
                            "image": "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "foodItems": [
                        {
                            "name": "Special Alappuzha Fish Curry",
                            "price": "₹350",
                            "category": "Main Course",
                            "isVeg": false,
                            "description": "Local specialty fish curry",
                            "image": "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Alappuzha Veg Meals",
                            "price": "₹180",
                            "category": "Main Course",
                            "isVeg": true,
                            "description": "Authentic vegetarian meals",
                            "image": "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "coords": [
                        10.96707949925417,
                        76.1415516009686
                    ]
                },
                {
                    "id": 3002,
                    "placeId": 7,
                    "name": "Alappuzha Grand Retreat 3",
                    "cuisine": "Kerala & Multicuisine",
                    "class": "Luxury",
                    "rating": 4.89428047439685,
                    "image": "https://images.pexels.com/photos/2034330/pexels-photo-2034330.jpeg?auto=compress&cs=tinysrgb&w=800",
                    "rooms": [
                        {
                            "type": "Premium Suite",
                            "price": "₹9152",
                            "amenities": [
                                "WiFi",
                                "AC",
                                "Breakfast",
                                "Alappuzha View"
                            ],
                            "image": "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "foodItems": [
                        {
                            "name": "Special Alappuzha Fish Curry",
                            "price": "₹350",
                            "category": "Main Course",
                            "isVeg": false,
                            "description": "Local specialty fish curry",
                            "image": "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Alappuzha Veg Meals",
                            "price": "₹180",
                            "category": "Main Course",
                            "isVeg": true,
                            "description": "Authentic vegetarian meals",
                            "image": "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "coords": [
                        11.641944339899151,
                        76.10153522159945
                    ]
                }
            ],
            "coords": [
                9.4981,
                76.3329
            ]
        },
        {
            "id": 8,
            "name": "Idukki",
            "description": "Highland Paradise & Munnar Hills",
            "image": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&h=600&fit=crop",
            "restaurants": [
                {
                    "id": 801,
                    "placeId": 8,
                    "name": "Munnar Tea Garden",
                    "cuisine": "Continental & Nadan",
                    "class": "Luxury",
                    "rating": 4.6,
                    "image": "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
                    "rooms": [
                        {
                            "type": "Mist Haven Suite",
                            "price": "₹9500",
                            "amenities": [
                                "Mountain View",
                                "Fireplace",
                                "Breakfast"
                            ],
                            "image": "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "type": "Valley View Deluxe",
                            "price": "₹6000",
                            "amenities": [
                                "WiFi",
                                "Balcony",
                                "Tea Maker"
                            ],
                            "image": "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "foodItems": [
                        {
                            "name": "Appam with Vegetable Stew",
                            "price": "₹180",
                            "category": "Breakfast",
                            "isVeg": true,
                            "description": "Soft rice pancakes with creamy vegetable curry",
                            "image": "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Munnar Special Tea",
                            "price": "₹60",
                            "category": "Beverages",
                            "isVeg": true,
                            "description": "Freshly brewed tea from the gardens of Munnar",
                            "image": "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "coords": [
                        10.0889,
                        77.0595
                    ]
                },
                {
                    "id": 3003,
                    "placeId": 8,
                    "name": "Idukki Grand Retreat 2",
                    "cuisine": "Kerala & Multicuisine",
                    "class": "Luxury",
                    "rating": 4.646543080997287,
                    "image": "https://images.pexels.com/photos/2034330/pexels-photo-2034330.jpeg?auto=compress&cs=tinysrgb&w=800",
                    "rooms": [
                        {
                            "type": "Premium Suite",
                            "price": "₹7208",
                            "amenities": [
                                "WiFi",
                                "AC",
                                "Breakfast",
                                "Idukki View"
                            ],
                            "image": "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "foodItems": [
                        {
                            "name": "Special Idukki Fish Curry",
                            "price": "₹350",
                            "category": "Main Course",
                            "isVeg": false,
                            "description": "Local specialty fish curry",
                            "image": "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Idukki Veg Meals",
                            "price": "₹180",
                            "category": "Main Course",
                            "isVeg": true,
                            "description": "Authentic vegetarian meals",
                            "image": "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "coords": [
                        10.126406984510595,
                        76.13797643145416
                    ]
                },
                {
                    "id": 3004,
                    "placeId": 8,
                    "name": "Idukki Grand Retreat 3",
                    "cuisine": "Kerala & Multicuisine",
                    "class": "Luxury",
                    "rating": 4.824161862770463,
                    "image": "https://images.pexels.com/photos/2034330/pexels-photo-2034330.jpeg?auto=compress&cs=tinysrgb&w=800",
                    "rooms": [
                        {
                            "type": "Premium Suite",
                            "price": "₹9200",
                            "amenities": [
                                "WiFi",
                                "AC",
                                "Breakfast",
                                "Idukki View"
                            ],
                            "image": "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "foodItems": [
                        {
                            "name": "Special Idukki Fish Curry",
                            "price": "₹350",
                            "category": "Main Course",
                            "isVeg": false,
                            "description": "Local specialty fish curry",
                            "image": "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Idukki Veg Meals",
                            "price": "₹180",
                            "category": "Main Course",
                            "isVeg": true,
                            "description": "Authentic vegetarian meals",
                            "image": "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "coords": [
                        11.138322782880753,
                        76.79754754028623
                    ]
                }
            ],
            "coords": [
                10.0889,
                77.0595
            ]
        },
        {
            "id": 9,
            "name": "Wayanad",
            "description": "Green Paradise",
            "image": "https://images.unsplash.com/photo-1599933310631-f920dfbc98ee?w=800&h=600&fit=crop",
            "restaurants": [
                {
                    "id": 901,
                    "placeId": 9,
                    "name": "Wayanad Forest Edge",
                    "cuisine": "Nadan Special",
                    "class": "Standard",
                    "rating": 4.5,
                    "image": "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800",
                    "rooms": [
                        {
                            "type": "Treehouse Cabin",
                            "price": "₹7000",
                            "amenities": [
                                "Forest View",
                                "Campfire Access",
                                "Nature Walk",
                                "WiFi"
                            ],
                            "image": "https://images.pexels.com/photos/2034330/pexels-photo-2034330.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "type": "Jungle Cottage",
                            "price": "₹4500",
                            "amenities": [
                                "Private Garden",
                                "AC",
                                "Breakfast"
                            ],
                            "image": "https://images.pexels.com/photos/210532/pexels-photo-210532.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "foodItems": [
                        {
                            "name": "Bamboo Rice Payasam",
                            "price": "₹120",
                            "category": "Desserts",
                            "isVeg": true,
                            "description": "Unique payasam made with nutritious bamboo rice",
                            "image": "https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "coords": [
                        11.605,
                        76.083
                    ]
                },
                {
                    "id": 3005,
                    "placeId": 9,
                    "name": "Wayanad Grand Retreat 2",
                    "cuisine": "Kerala & Multicuisine",
                    "class": "Luxury",
                    "rating": 4.710160761186427,
                    "image": "https://images.pexels.com/photos/2034330/pexels-photo-2034330.jpeg?auto=compress&cs=tinysrgb&w=800",
                    "rooms": [
                        {
                            "type": "Premium Suite",
                            "price": "₹7775",
                            "amenities": [
                                "WiFi",
                                "AC",
                                "Breakfast",
                                "Wayanad View"
                            ],
                            "image": "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "foodItems": [
                        {
                            "name": "Special Wayanad Fish Curry",
                            "price": "₹350",
                            "category": "Main Course",
                            "isVeg": false,
                            "description": "Local specialty fish curry",
                            "image": "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Wayanad Veg Meals",
                            "price": "₹180",
                            "category": "Main Course",
                            "isVeg": true,
                            "description": "Authentic vegetarian meals",
                            "image": "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "coords": [
                        11.559515848519943,
                        76.41654398984507
                    ]
                },
                {
                    "id": 3006,
                    "placeId": 9,
                    "name": "Wayanad Grand Retreat 3",
                    "cuisine": "Kerala & Multicuisine",
                    "class": "Luxury",
                    "rating": 4.735653928346561,
                    "image": "https://images.pexels.com/photos/2034330/pexels-photo-2034330.jpeg?auto=compress&cs=tinysrgb&w=800",
                    "rooms": [
                        {
                            "type": "Premium Suite",
                            "price": "₹7177",
                            "amenities": [
                                "WiFi",
                                "AC",
                                "Breakfast",
                                "Wayanad View"
                            ],
                            "image": "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "foodItems": [
                        {
                            "name": "Special Wayanad Fish Curry",
                            "price": "₹350",
                            "category": "Main Course",
                            "isVeg": false,
                            "description": "Local specialty fish curry",
                            "image": "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Wayanad Veg Meals",
                            "price": "₹180",
                            "category": "Main Course",
                            "isVeg": true,
                            "description": "Authentic vegetarian meals",
                            "image": "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "coords": [
                        11.487900417379011,
                        76.7232227339003
                    ]
                }
            ],
            "coords": [
                11.605,
                76.083
            ]
        },
        {
            "id": 10,
            "name": "Kasaragod",
            "description": "Northern Gateway of Kerala",
            "image": "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800",
            "restaurants": [
                {
                    "id": 1001,
                    "placeId": 10,
                    "name": "Kasaragod Castle",
                    "cuisine": "Tuluva & Malabar",
                    "class": "Luxury",
                    "rating": 4.7,
                    "image": "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=800",
                    "rooms": [
                        {
                            "type": "Fort View Suite",
                            "price": "₹8500",
                            "amenities": [
                                "Historical View",
                                "AC",
                                "Spa Access",
                                "WiFi"
                            ],
                            "image": "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "type": "Heritage Deluxe",
                            "price": "₹5000",
                            "amenities": [
                                "Traditional Decor",
                                "WiFi",
                                "Breakfast"
                            ],
                            "image": "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "foodItems": [
                        {
                            "name": "Kasaragod Chicken Curry",
                            "price": "₹280",
                            "category": "Main Course",
                            "isVeg": false,
                            "description": "Spicy chicken curry with roasted coconut and regional spices",
                            "image": "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Mangalore Buns",
                            "price": "₹80",
                            "category": "Breakfast",
                            "isVeg": true,
                            "description": "Sweet fried banana bread, a regional favorite",
                            "image": "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "coords": [
                        12.4996,
                        74.9869
                    ]
                },
                {
                    "id": 1002,
                    "placeId": 10,
                    "name": "Coastal Spice",
                    "cuisine": "Konkan Seafood",
                    "rating": 4.4,
                    "image": "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800",
                    "foodItems": [
                        {
                            "name": "Kane Rava Fry",
                            "price": "₹420",
                            "category": "Starters",
                            "isVeg": false,
                            "description": "Lady fish marinated in spices and semolina fried",
                            "image": "https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "coords": [
                        12.5101,
                        74.985
                    ]
                },
                {
                    "id": 3007,
                    "placeId": 10,
                    "name": "Kasaragod Grand Retreat 3",
                    "cuisine": "Kerala & Multicuisine",
                    "class": "Luxury",
                    "rating": 4.6540300701907285,
                    "image": "https://images.pexels.com/photos/2034330/pexels-photo-2034330.jpeg?auto=compress&cs=tinysrgb&w=800",
                    "rooms": [
                        {
                            "type": "Premium Suite",
                            "price": "₹8545",
                            "amenities": [
                                "WiFi",
                                "AC",
                                "Breakfast",
                                "Kasaragod View"
                            ],
                            "image": "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "foodItems": [
                        {
                            "name": "Special Kasaragod Fish Curry",
                            "price": "₹350",
                            "category": "Main Course",
                            "isVeg": false,
                            "description": "Local specialty fish curry",
                            "image": "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Kasaragod Veg Meals",
                            "price": "₹180",
                            "category": "Main Course",
                            "isVeg": true,
                            "description": "Authentic vegetarian meals",
                            "image": "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "coords": [
                        11.619202232116074,
                        76.96702523413644
                    ]
                }
            ],
            "coords": [
                12.4996,
                74.9869
            ]
        },
        {
            "id": 11,
            "name": "Palakkad",
            "description": "The Rice Bowl of Kerala",
            "image": "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
            "restaurants": [
                {
                    "id": 1101,
                    "placeId": 11,
                    "name": "Palakkad Heritage Inn",
                    "cuisine": "Palakkadan Brahmin",
                    "class": "Luxury",
                    "rating": 4.6,
                    "image": "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800",
                    "rooms": [
                        {
                            "type": "Agraharam Suite",
                            "price": "₹6500",
                            "amenities": [
                                "Traditional Ambience",
                                "Pure Veg Dining",
                                "WiFi",
                                "AC"
                            ],
                            "image": "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "foodItems": [
                        {
                            "name": "Palakkadan Matta Rice & Sambhar",
                            "price": "₹120",
                            "category": "Main Course",
                            "isVeg": true,
                            "description": "Authentic Palakkadan sambhar with premium matta rice",
                            "image": "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "coords": [
                        10.7867,
                        76.6547
                    ]
                },
                {
                    "id": 1102,
                    "placeId": 11,
                    "name": "The Paddy Field",
                    "cuisine": "Nadan & Continental",
                    "rating": 4.3,
                    "image": "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800",
                    "foodItems": [
                        {
                            "name": "Kozhi Pidi",
                            "price": "₹240",
                            "category": "Main Course",
                            "isVeg": false,
                            "description": "Steamed rice dumplings in spicy chicken gravy",
                            "image": "https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "coords": [
                        10.79,
                        76.66
                    ]
                },
                {
                    "id": 3008,
                    "placeId": 11,
                    "name": "Palakkad Grand Retreat 3",
                    "cuisine": "Kerala & Multicuisine",
                    "class": "Luxury",
                    "rating": 4.610115508830403,
                    "image": "https://images.pexels.com/photos/2034330/pexels-photo-2034330.jpeg?auto=compress&cs=tinysrgb&w=800",
                    "rooms": [
                        {
                            "type": "Premium Suite",
                            "price": "₹8471",
                            "amenities": [
                                "WiFi",
                                "AC",
                                "Breakfast",
                                "Palakkad View"
                            ],
                            "image": "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "foodItems": [
                        {
                            "name": "Special Palakkad Fish Curry",
                            "price": "₹350",
                            "category": "Main Course",
                            "isVeg": false,
                            "description": "Local specialty fish curry",
                            "image": "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Palakkad Veg Meals",
                            "price": "₹180",
                            "category": "Main Course",
                            "isVeg": true,
                            "description": "Authentic vegetarian meals",
                            "image": "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "coords": [
                        11.858220681352353,
                        76.97374340676524
                    ]
                }
            ],
            "coords": [
                10.7867,
                76.6547
            ]
        },
        {
            "id": 12,
            "name": "Kottayam",
            "description": "Land of Letters, Latex and Lakes",
            "image": "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800",
            "restaurants": [
                {
                    "id": 1201,
                    "placeId": 12,
                    "name": "Syrian Heritage Resort",
                    "cuisine": "Syrian Christian",
                    "class": "Luxury",
                    "rating": 4.9,
                    "image": "https://images.pexels.com/photos/2034330/pexels-photo-2034330.jpeg?auto=compress&cs=tinysrgb&w=800",
                    "rooms": [
                        {
                            "type": "Lake View Villa",
                            "price": "₹15000",
                            "amenities": [
                                "Private Pool",
                                "Lake View",
                                "Butler Service"
                            ],
                            "image": "https://images.pexels.com/photos/210532/pexels-photo-210532.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "foodItems": [
                        {
                            "name": "Beef Ularthiyathu",
                            "price": "₹350",
                            "category": "Main Course",
                            "isVeg": false,
                            "description": "Kottayam style slow-roasted beef with coconut chunks",
                            "image": "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Meen Vevichathu",
                            "price": "₹420",
                            "category": "Main Course",
                            "isVeg": false,
                            "description": "Fiery red fish curry cooked in clay pot",
                            "image": "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "coords": [
                        9.5916,
                        76.5222
                    ]
                },
                {
                    "id": 1202,
                    "placeId": 12,
                    "name": "Rubber Valley Grill",
                    "cuisine": "Continental",
                    "rating": 4.5,
                    "image": "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800",
                    "foodItems": [
                        {
                            "name": "Grilled Pork Ribs",
                            "price": "₹550",
                            "category": "Main Course",
                            "isVeg": false,
                            "description": "Honey glazed pork ribs with mashed potatoes",
                            "image": "https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "coords": [
                        9.595,
                        76.53
                    ]
                },
                {
                    "id": 3009,
                    "placeId": 12,
                    "name": "Kottayam Grand Retreat 3",
                    "cuisine": "Kerala & Multicuisine",
                    "class": "Luxury",
                    "rating": 4.700310625027173,
                    "image": "https://images.pexels.com/photos/2034330/pexels-photo-2034330.jpeg?auto=compress&cs=tinysrgb&w=800",
                    "rooms": [
                        {
                            "type": "Premium Suite",
                            "price": "₹5314",
                            "amenities": [
                                "WiFi",
                                "AC",
                                "Breakfast",
                                "Kottayam View"
                            ],
                            "image": "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "foodItems": [
                        {
                            "name": "Special Kottayam Fish Curry",
                            "price": "₹350",
                            "category": "Main Course",
                            "isVeg": false,
                            "description": "Local specialty fish curry",
                            "image": "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Kottayam Veg Meals",
                            "price": "₹180",
                            "category": "Main Course",
                            "isVeg": true,
                            "description": "Authentic vegetarian meals",
                            "image": "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "coords": [
                        11.958570144096864,
                        76.24174497347059
                    ]
                }
            ],
            "coords": [
                9.5916,
                76.5222
            ]
        },
        {
            "id": 13,
            "name": "Pathanamthitta",
            "description": "Pilgrim Capital of Kerala",
            "image": "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800",
            "restaurants": [
                {
                    "id": 1301,
                    "placeId": 13,
                    "name": "Aranmula Heritage",
                    "cuisine": "Traditional Sadya",
                    "class": "Luxury",
                    "rating": 4.5,
                    "image": "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
                    "rooms": [
                        {
                            "type": "Heritage Palace Suite",
                            "price": "₹7000",
                            "amenities": [
                                "Traditional Vibe",
                                "Pampa River View",
                                "WiFi"
                            ],
                            "image": "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "foodItems": [
                        {
                            "name": "Aranmula Valla Sadya",
                            "price": "₹450",
                            "category": "Main Course",
                            "isVeg": true,
                            "description": "Authentic ceremonial feast with 60+ items on request",
                            "image": "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "coords": [
                        9.33,
                        76.68
                    ]
                },
                {
                    "id": 1302,
                    "placeId": 13,
                    "name": "Pampa Breeze",
                    "cuisine": "Nadan",
                    "rating": 4.2,
                    "image": "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800",
                    "foodItems": [
                        {
                            "name": "Karimeen Mappas",
                            "price": "₹380",
                            "category": "Main Course",
                            "isVeg": false,
                            "description": "Pearl spot fish in creamy coconut milk gravy",
                            "image": "https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "coords": [
                        9.2644,
                        76.787
                    ]
                },
                {
                    "id": 3010,
                    "placeId": 13,
                    "name": "Pathanamthitta Grand Retreat 3",
                    "cuisine": "Kerala & Multicuisine",
                    "class": "Luxury",
                    "rating": 4.729612017290995,
                    "image": "https://images.pexels.com/photos/2034330/pexels-photo-2034330.jpeg?auto=compress&cs=tinysrgb&w=800",
                    "rooms": [
                        {
                            "type": "Premium Suite",
                            "price": "₹5104",
                            "amenities": [
                                "WiFi",
                                "AC",
                                "Breakfast",
                                "Pathanamthitta View"
                            ],
                            "image": "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "foodItems": [
                        {
                            "name": "Special Pathanamthitta Fish Curry",
                            "price": "₹350",
                            "category": "Main Course",
                            "isVeg": false,
                            "description": "Local specialty fish curry",
                            "image": "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Pathanamthitta Veg Meals",
                            "price": "₹180",
                            "category": "Main Course",
                            "isVeg": true,
                            "description": "Authentic vegetarian meals",
                            "image": "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "coords": [
                        11.469643494306041,
                        76.0197604684746
                    ]
                }
            ],
            "coords": [
                9.2644,
                76.787
            ]
        },
        {
            "id": 14,
            "name": "Kollam",
            "description": "Prince of Arabian Sea",
            "image": "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800",
            "restaurants": [
                {
                    "id": 1401,
                    "placeId": 14,
                    "name": "Quilon Port Grill",
                    "cuisine": "Seafood & Grill",
                    "class": "Luxury",
                    "rating": 4.7,
                    "image": "https://images.pexels.com/photos/2034330/pexels-photo-2034330.jpeg?auto=compress&cs=tinysrgb&w=800",
                    "rooms": [
                        {
                            "type": "Sea Facing Executive",
                            "price": "₹9000",
                            "amenities": [
                                "Direct Beach Access",
                                "Private Balcony",
                                "AC"
                            ],
                            "image": "https://images.pexels.com/photos/210532/pexels-photo-210532.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "foodItems": [
                        {
                            "name": "Kollam Fish Curry",
                            "price": "₹290",
                            "category": "Main Course",
                            "isVeg": false,
                            "description": "Famous spicy fish curry with gambooge",
                            "image": "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "coords": [
                        8.8932,
                        76.6141
                    ]
                },
                {
                    "id": 1402,
                    "placeId": 14,
                    "name": "Ashtamudi Flavours",
                    "cuisine": "Backwater Traditional",
                    "rating": 4.5,
                    "image": "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800",
                    "foodItems": [
                        {
                            "name": "Chemmeen Ularthiyathu",
                            "price": "₹340",
                            "category": "Main Course",
                            "isVeg": false,
                            "description": "Pan-roasted prawns with coconut slices and curry leaves",
                            "image": "https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "coords": [
                        8.89,
                        76.61
                    ]
                },
                {
                    "id": 3011,
                    "placeId": 14,
                    "name": "Kollam Grand Retreat 3",
                    "cuisine": "Kerala & Multicuisine",
                    "class": "Luxury",
                    "rating": 4.8223144440934,
                    "image": "https://images.pexels.com/photos/2034330/pexels-photo-2034330.jpeg?auto=compress&cs=tinysrgb&w=800",
                    "rooms": [
                        {
                            "type": "Premium Suite",
                            "price": "₹5959",
                            "amenities": [
                                "WiFi",
                                "AC",
                                "Breakfast",
                                "Kollam View"
                            ],
                            "image": "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "foodItems": [
                        {
                            "name": "Special Kollam Fish Curry",
                            "price": "₹350",
                            "category": "Main Course",
                            "isVeg": false,
                            "description": "Local specialty fish curry",
                            "image": "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=800"
                        },
                        {
                            "name": "Kollam Veg Meals",
                            "price": "₹180",
                            "category": "Main Course",
                            "isVeg": true,
                            "description": "Authentic vegetarian meals",
                            "image": "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
                        }
                    ],
                    "coords": [
                        10.943065581932967,
                        76.28192840376306
                    ]
                }
            ],
            "coords": [
                8.8932,
                76.6141
            ]
        }
    ],
    "foodStories": [
        {
            "id": 1,
            "title": "The Legend of Thalassery Biriyani",
            "excerpt": "Discover how a unique blend of Khaima rice and Malabar spices created a culinary icon.",
            "author": "Fina",
            "date": "Feb 15, 2026",
            "image": "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=800",
            "category": "Heritage",
            "content": "Thalassery Biriyani is not just a dish; it's a testament to the cultural fusion of the Malabar coast..."
        },
        {
            "id": 2,
            "title": "Kochi's Street Food Secrets",
            "excerpt": "Beyond the cafes of Fort Kochi lies a world of hidden snacks and local favorites.",
            "author": "Mishab",
            "date": "Feb 10, 2026",
            "image": "https://images.pexels.com/photos/604969/pexels-photo-604969.jpeg?auto=compress&cs=tinysrgb&w=800",
            "category": "Street Food",
            "content": "Walking through the narrow lanes of Mattancherry at dusk, the aroma of frying pazham pori..."
        },
        {
            "id": 3,
            "title": "Karimeen Pollichathu: The Pearl of Backwaters",
            "excerpt": "Explore the art of marinating pearl spot fish in spicy masalas and slow-cooking it inside a banana leaf.",
            "author": "Ashwin",
            "date": "Feb 05, 2026",
            "image": "https://image.pollinations.ai/prompt/karimeen_pollichathu_pearl_spot_fish_wrapped_in_burned_banana_leaf_served_on_traditional_plate_kerala_backwater_background_hyper_realistic_food_photography?width=800&height=500&nologo=true",
            "category": "Seafood",
            "content": "Karimeen Pollichathu is the crown jewel of Kerala's backwater cuisine. The pearl spot fish is marinated in a rich paste of ginger, garlic, and locally sourced spices, then wrapped tightly in a fresh banana leaf and pan-fried to perfection. The leaf infuses the fish with a unique smoky aroma, making it a must-try for every food lover visiting Kerala."
        }
    ],
    "hiddenGems": [
        {
            "id": 1,
            "name": "Backwater Toddy Shop",
            "location": "Alappuzha",
            "image": "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800",
            "tag": "Authentic"
        },
        {
            "id": 2,
            "name": "Cliff-side Tea Stall",
            "location": "Varkala",
            "image": "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800",
            "tag": "Scenic"
        },
        {
            "id": 3,
            "name": "Highland Spice Hut",
            "location": "Munnar",
            "image": "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
            "tag": "Cozy"
        },
        {
            "id": 4,
            "name": "Ancient Port Cafe",
            "location": "Muziris",
            "image": "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=800",
            "tag": "Historic"
        },
        {
            "id": 5,
            "name": "Island Fish Grill",
            "location": "Kumarakom",
            "image": "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800",
            "tag": "Fresh"
        },
        {
            "id": 6,
            "name": "Forest Edge Eatery",
            "location": "Wayanad",
            "image": "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800",
            "tag": "Nature"
        }
    ]
};
