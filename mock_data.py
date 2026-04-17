"""Mock f-commerce shop data for testing."""

from __future__ import annotations


MOCK_SHOP = {
    "id": "shop_001",
    "name": "Fashion Hub BD",
    "platform": "facebook",
    "owner": "Rahi Khan",
    "tone": "friendly",
}

MOCK_PRODUCTS = [
    {
        "id": "prod_001",
        "name": "Black T-Shirt",
        "price": 450,
        "stock": 25,
        "description": "Premium cotton black t-shirt",
        "sizes": ["S", "M", "L", "XL"],
    },
    {
        "id": "prod_002",
        "name": "Blue Jeans",
        "price": 1200,
        "stock": 15,
        "description": "Slim fit blue jeans",
        "sizes": ["28", "30", "32", "34", "36"],
    },
    {
        "id": "prod_003",
        "name": "Red Dress",
        "price": 850,
        "stock": 8,
        "description": "Casual red summer dress",
        "sizes": ["S", "M", "L"],
    },
    {
        "id": "prod_004",
        "name": "White Sneakers",
        "price": 1800,
        "stock": 12,
        "description": "Comfortable white canvas sneakers",
        "sizes": ["6", "7", "8", "9", "10", "11"],
    },
    {
        "id": "prod_005",
        "name": "Sunglasses",
        "price": 600,
        "stock": 30,
        "description": "UV protection sunglasses",
        "sizes": ["One Size"],
    },
]

MOCK_CUSTOMER_QUERIES = [
    "Assalamu alaikum, black t-shirt M size ase?",
    "Blue jeans er price koto?",
    "I want to order 2 red dress, size L.",
    "White sneakers stock e ache naki?",
]
