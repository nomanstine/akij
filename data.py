"""Shop catalogs and sample user queries for multi-shop testing."""

from __future__ import annotations


SHOPS = [
    {
        "id": "fashion_hub_bd",
        "name": "Fashion Hub BD",
        "platform": "facebook",
        "owner": "Rahi Khan",
        "tone": "friendly",
        "products": [
            {
                "id": "f_001",
                "name": "Black T-Shirt",
                "price": 450,
                "stock": 25,
                "description": "Premium cotton black t-shirt",
                "sizes": ["S", "M", "L", "XL"],
            },
            {
                "id": "f_002",
                "name": "Blue Jeans",
                "price": 1200,
                "stock": 15,
                "description": "Slim fit blue jeans",
                "sizes": ["28", "30", "32", "34", "36"],
            },
            {
                "id": "f_003",
                "name": "White Sneakers",
                "price": 1800,
                "stock": 12,
                "description": "Comfortable white canvas sneakers",
                "sizes": ["6", "7", "8", "9", "10", "11"],
            },
        ],
    },
    {
        "id": "gadget_gear_bd",
        "name": "Gadget Gear BD",
        "platform": "instagram",
        "owner": "Nabil Ahmed",
        "tone": "formal",
        "products": [
            {
                "id": "g_001",
                "name": "Wireless Earbuds",
                "price": 2200,
                "stock": 20,
                "description": "Bluetooth 5.3 earbuds with charging case",
                "sizes": ["Standard"],
            },
            {
                "id": "g_002",
                "name": "Smart Watch X2",
                "price": 3500,
                "stock": 9,
                "description": "Fitness tracking smart watch",
                "sizes": ["42mm", "46mm"],
            },
            {
                "id": "g_003",
                "name": "Portable Speaker Mini",
                "price": 1600,
                "stock": 18,
                "description": "Water-resistant compact speaker",
                "sizes": ["One Size"],
            },
        ],
    },
    {
        "id": "home_haven_bd",
        "name": "Home Haven BD",
        "platform": "whatsapp",
        "owner": "Sumaiya Rahman",
        "tone": "friendly",
        "products": [
            {
                "id": "h_001",
                "name": "Ceramic Dinner Set",
                "price": 2800,
                "stock": 10,
                "description": "12-piece ceramic dinner set",
                "sizes": ["12 pcs"],
            },
            {
                "id": "h_002",
                "name": "Cotton Bedsheet Queen",
                "price": 1450,
                "stock": 22,
                "description": "Soft cotton queen-size bedsheet",
                "sizes": ["Queen"],
            },
            {
                "id": "h_003",
                "name": "Storage Basket Set",
                "price": 990,
                "stock": 16,
                "description": "3-piece woven storage baskets",
                "sizes": ["3 pcs"],
            },
        ],
    },
]


SHOP_QUERIES = {
    "fashion_hub_bd": [
        "Assalamu alaikum, black t-shirt M size ase?",
        "Blue jeans er price koto?",
        "I want to order 2 white sneakers, size 9.",
        "Black t-shirt available ache?",
    ],
    "gadget_gear_bd": [
        "Wireless earbuds er dam koto?",
        "Smart watch X2 stock e ache naki?",
        "Ami 1 ta portable speaker mini nite chai.",
        "Earbuds warranty ase?",
    ],
    "home_haven_bd": [
        "Cotton bedsheet queen er price bolben?",
        "Ceramic dinner set available ache?",
        "Storage basket set 2 ta order korte chai.",
        "Bedsheet er color options ki ki?",
    ],
}
