// Local Category image assets
import vegImg from '../assets/categories/vegetables.jpg';
import fruitImg from '../assets/categories/fruits.jpg';
import dairyImg from '../assets/categories/dairy.jpg';
import grainImg from '../assets/categories/grains.jpg';
import snackImg from '../assets/categories/snacks.jpg';
import bevImg from '../assets/categories/beverages.jpg';
import houseImg from '../assets/categories/household.jpg';

// Local Product image assets
import tomatoImg from '../assets/products/tomatoes.jpg';
import appleImg from '../assets/products/apples.jpg';
import milkImg from '../assets/products/milk.jpg';
import riceImg from '../assets/products/rice.jpg';
import spinachImg from '../assets/products/spinach.jpg';
import yogurtImg from '../assets/products/yogurt.jpg';
import carrotImg from '../assets/products/carrots.jpg';
import eggImg from '../assets/products/eggs.jpg';

// Curated high-res grocery photography
const meatCatImg = 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=400&q=80';
const bakeryCatImg = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80';
const personalCatImg = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80';

const babyCatImg = 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=400&q=80';
const petCatImg = 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=400&q=80';
const organicCatImg = 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80';
const frozenCatImg = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80';
const kitchenCatImg = 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80';

// Specific product imagery
const breadImg = 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=400&q=80';
const onionImg = 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=400&q=80';
const bananaImg = 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=400&q=80';
const oilImg = 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80';
const almondsImg = 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=400&q=80';
const peanutButterImg = 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=400&q=80';
const cornFlakesImg = 'https://images.unsplash.com/photo-1521483451569-e33803c0330c?auto=format&fit=crop&w=400&q=80';
const honeyImg = 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=80';
const corianderImg = 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=400&q=80';
const greenBeansImg = 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=400&q=80';
const cucumberImg = 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?auto=format&fit=crop&w=400&q=80';
const chickenImg = 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=400&q=80';
const muttonImg = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80';
const fishImg = 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80';
const prawnsImg = 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=400&q=80';

// Distinct Tomato Varieties to avoid repetition
const cherryTomatoImg = 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80';
const plumTomatoImg = 'https://images.unsplash.com/photo-1546470427-e26264be0b11?auto=format&fit=crop&w=400&q=80';

// 1. The 10 Main Grocery Categories with Detailed Subcategories (No emoji icons)
export const CATEGORIES_DATA = [
  {
    id: 'cat-veg',
    name: 'Vegetables',
    count: '48 Items',
    image: vegImg,
    subcategories: [
      'Fresh Vegetables (Tomato, Onion, Brinjal, Capsicum)',
      'Leafy Vegetables (Spinach, Coriander, Mint, Curry Leaves)',
      'Root Vegetables (Potato, Carrot, Beetroot, Radish)',
      'Exotic Vegetables (Broccoli, Zucchini, Lettuce, Celery)',
      'Cucumbers & Gourds (Cucumber, Bottle Gourd, Bitter Gourd)',
      'Peppers & Chillies (Green Chilli, Red Chilli, Jalapeño)'
    ]
  },
  {
    id: 'cat-fruit',
    name: 'Fruits',
    count: '36 Items',
    image: fruitImg,
    subcategories: [
      'Fresh Fruits (Apple, Banana, Orange, Guava)',
      'Tropical Fruits (Mango, Papaya, Pineapple, Watermelon)',
      'Citrus Fruits (Orange, Lemon, Sweet Lime)',
      'Berries (Strawberry, Blueberry, Raspberry)',
      'Exotic Fruits (Kiwi, Dragon Fruit, Avocado)',
      'Seasonal Fruits (Mango, Jackfruit, Watermelon)'
    ]
  },
  {
    id: 'cat-dairy',
    name: 'Dairy & Eggs',
    count: '28 Items',
    image: dairyImg,
    subcategories: [
      'Milk (Full Cream Milk, Toned Milk, Low-Fat Milk)',
      'Curd & Yogurt (Curd, Greek Yogurt, Flavoured Yogurt)',
      'Paneer & Tofu (Paneer, Tofu)',
      'Butter & Cheese (Butter, Cheese Slices, Cheese Cubes)',
      'Eggs (Regular Eggs, Brown Eggs, Organic Eggs)'
    ]
  },
  {
    id: 'cat-meat',
    name: 'Meat & Seafood',
    count: '22 Items',
    image: meatCatImg,
    subcategories: [
      'Chicken (Whole Chicken, Chicken Breast, Chicken Legs)',
      'Mutton (Mutton Curry Cut, Mutton Boneless)',
      'Fish (Rohu, Katla, Seer Fish)',
      'Prawns & Shrimp (Small Prawns, Large Prawns)',
      'Ready-to-Cook Meat (Chicken Nuggets, Chicken Kebabs)'
    ]
  },
  {
    id: 'cat-grocery',
    name: 'Grocery & Staples',
    count: '45 Items',
    image: grainImg,
    subcategories: [
      'Rice & Grains (Basmati Rice, Sona Masoori, Brown Rice)',
      'Atta & Flour (Wheat Atta, Maida, Ragi Flour)',
      'Dal & Pulses (Toor Dal, Moong Dal, Chana Dal)',
      'Oil & Ghee (Sunflower Oil, Groundnut Oil, Ghee)',
      'Spices & Masala (Turmeric, Chilli Powder, Garam Masala)',
      'Sugar & Salt (Sugar, Rock Salt, Iodized Salt)'
    ]
  },
  {
    id: 'cat-snack',
    name: 'Snacks',
    count: '38 Items',
    image: snackImg,
    subcategories: [
      'Chips (Potato Chips, Banana Chips, Nachos)',
      'Biscuits (Cream Biscuits, Glucose Biscuits, Cookies)',
      'Healthy Snacks (Nuts, Dry Fruits, Granola Bars)',
      'Namkeen Snacks (Mixture, Sev, Bhujia)',
      'Chocolates & Candies (Chocolates, Candy, Toffee)',
      'Popcorn (Salted Popcorn, Caramel Popcorn)'
    ]
  },
  {
    id: 'cat-bev',
    name: 'Beverages',
    count: '25 Items',
    image: bevImg,
    subcategories: [
      'Tea (Tea Powder, Green Tea)',
      'Coffee (Instant Coffee, Filter Coffee)',
      'Juices (Orange Juice, Apple Juice, Mixed Fruit Juice)',
      'Soft Drinks (Cola, Lemon Drink)',
      'Energy & Sports Drinks (Energy Drinks, Electrolyte Drinks)',
      'Water (Packaged Water, Sparkling Water)'
    ]
  },
  {
    id: 'cat-bakery',
    name: 'Bakery & Breakfast',
    count: '20 Items',
    image: bakeryCatImg,
    subcategories: [
      'Bread (White Bread, Brown Bread, Multigrain Bread)',
      'Buns & Rolls (Burger Buns, Pav, Dinner Rolls)',
      'Cakes & Pastries (Cake, Pastry, Muffins)',
      'Breakfast Cereals (Corn Flakes, Muesli, Oats)',
      'Spreads (Peanut Butter, Jam, Chocolate Spread)'
    ]
  },
  {
    id: 'cat-house',
    name: 'Household Essentials',
    count: '32 Items',
    image: houseImg,
    subcategories: [
      'Cleaning Products (Floor Cleaner, Toilet Cleaner)',
      'Dishwashing (Dishwash Liquid, Dishwash Bar)',
      'Laundry (Detergent, Fabric Softener)',
      'Paper & Tissue (Tissue Paper, Kitchen Towels)',
      'Home Utility (Garbage Bags, Foil, Food Storage Bags)'
    ]
  },
  {
    id: 'cat-personal',
    name: 'Personal Care',
    count: '24 Items',
    image: personalCatImg,
    subcategories: [
      'Bath & Body (Soap, Body Wash)',
      'Hair Care (Shampoo, Conditioner, Hair Oil)',
      'Oral Care (Toothpaste, Toothbrush, Mouthwash)',
      'Skin Care (Face Wash, Moisturizer)',
      'Hand Care (Hand Wash, Hand Sanitizer)'
    ]
  },
  {
    id: 'cat-baby',
    name: 'Baby Care',
    count: '18 Items',
    image: babyCatImg,
    subcategories: [
      'Baby Diapers & Wipes (Diaper Pants, Wet Wipes)',
      'Baby Food & Formula (Infant Formula, Baby Cereal, Puree)',
      'Baby Bath & Skin (Baby Shampoo, Baby Lotion, Massage Oil)'
    ]
  },
  {
    id: 'cat-pet',
    name: 'Pet Care',
    count: '16 Items',
    image: petCatImg,
    subcategories: [
      'Dog Food & Treats (Dry Dog Kibble, Chicken Chew Treats)',
      'Cat Food & Treats (Tuna Wet Food, Catnip Crunchies)',
      'Pet Grooming & Hygiene (Pet Shampoo, Odor Neutralizer, Litter)'
    ]
  },
  {
    id: 'cat-organic',
    name: 'Organic & Gourmet',
    count: '20 Items',
    image: organicCatImg,
    subcategories: [
      'Organic Staples (Organic Brown Sugar, Virgin Olive Oil, Quinoa)',
      'Gourmet Cheese & Dips (Artisan Gouda, Salsa Dip, Hummus)',
      'Superfoods & Seeds (Chia Seeds, Flax Seeds, Pumpkin Seeds)'
    ]
  },
  {
    id: 'cat-frozen',
    name: 'Frozen & Ready-to-Eat',
    count: '18 Items',
    image: frozenCatImg,
    subcategories: [
      'Frozen Vegetables & Snacks (Green Peas, French Fries, Sweet Corn)',
      'Ready Meals & Curries (Paneer Butter Masala, Dal Makhani Heat & Eat)',
      'Frozen Parathas & Breads (Malabar Paratha, Garlic Naan)'
    ]
  },
  {
    id: 'cat-kitchen',
    name: 'Kitchen & Home Utility',
    count: '22 Items',
    image: kitchenCatImg,
    subcategories: [
      'Cookware & Dining (Non-Stick Fry Pan, Steel Water Bottle)',
      'Kitchen Storage & Foil (Aluminium Foil Roll, Storage Containers)',
      'Cleaning Tools (Microfiber Cleaning Cloth, Scrub Sponges)'
    ]
  }
];

// Special Section 1: Previous Purchases (Buy Again)
// Milk – 1 L, Eggs – 12 pcs, Tomato – 1 kg, Basmati Rice – 5 kg, Bread – 1 pack
export const PREVIOUS_PURCHASES_DATA = [
  {
    id: 'prod-milk-pp',
    productId: 'prod-milk',
    name: 'Pure Organic Cow Milk',
    category: 'Dairy & Eggs',
    unit: '1 L',
    price: 65,
    originalPrice: 75,
    rating: 4.9,
    image: milkImg,
    boughtCount: 2,
    lastOrdered: 'Yesterday',
  },
  {
    id: 'prod-egg-pp',
    productId: 'prod-egg-12',
    name: 'Farm Fresh Brown Eggs',
    category: 'Dairy & Eggs',
    unit: '12 pcs pack',
    price: 150,
    originalPrice: 170,
    rating: 4.9,
    image: eggImg,
    boughtCount: 3,
    lastOrdered: '3 days ago',
  },
  {
    id: 'prod-tomato-pp',
    productId: 'prod-tomato',
    name: 'Fresh Farm Tomatoes',
    category: 'Vegetables',
    unit: '1 kg',
    price: 30,
    originalPrice: 40,
    rating: 4.9,
    image: tomatoImg,
    boughtCount: 4,
    lastOrdered: '4 days ago',
  },
  {
    id: 'prod-rice-pp',
    productId: 'prod-rice-5kg',
    name: 'Premium Royal Basmati Rice',
    category: 'Grocery & Staples',
    unit: '5 kg',
    price: 495,
    originalPrice: 560,
    rating: 4.8,
    image: riceImg,
    boughtCount: 1,
    lastOrdered: 'Last week',
  },
  {
    id: 'prod-bread-pp',
    productId: 'prod-bread',
    name: 'Soft Multigrain Brown Bread',
    category: 'Bakery & Breakfast',
    unit: '1 pack (400g)',
    price: 45,
    originalPrice: 50,
    rating: 4.8,
    image: breadImg,
    boughtCount: 2,
    lastOrdered: '2 days ago',
  }
];

// Special Section 2: Recommended For You
// Greek Yogurt, Almonds, Peanut Butter, Corn Flakes, Honey
export const RECOMMENDED_FOR_YOU_DATA = [
  {
    id: 'prod-yogurt-rec',
    name: 'Artisanal Thick Greek Yogurt',
    category: 'Dairy & Eggs',
    unit: '400g',
    price: 85,
    originalPrice: 100,
    discountTag: '15% OFF',
    badge: 'Probiotic Rich',
    rating: 4.9,
    reviews: 142,
    image: yogurtImg,
    inStock: true,
  },
  {
    id: 'prod-almonds-rec',
    name: 'Premium California Raw Almonds',
    category: 'Snacks',
    unit: '250g',
    price: 240,
    originalPrice: 290,
    discountTag: '17% OFF',
    badge: 'Heart Healthy',
    rating: 4.9,
    reviews: 198,
    image: almondsImg,
    inStock: true,
  },
  {
    id: 'prod-peanut-butter-rec',
    name: 'All-Natural Creamy Peanut Butter',
    category: 'Bakery & Breakfast',
    unit: '350g',
    price: 165,
    originalPrice: 195,
    discountTag: '15% OFF',
    badge: 'High Protein',
    rating: 4.8,
    reviews: 110,
    image: peanutButterImg,
    inStock: true,
  },
  {
    id: 'prod-corn-flakes-rec',
    name: 'Crisp Golden Corn Flakes Cereal',
    category: 'Bakery & Breakfast',
    unit: '500g',
    price: 135,
    originalPrice: 160,
    discountTag: '16% OFF',
    badge: 'Iron & Vitamins',
    rating: 4.7,
    reviews: 85,
    image: cornFlakesImg,
    inStock: true,
  },
  {
    id: 'prod-honey-rec',
    name: '100% Pure Wild Forest Raw Honey',
    category: 'Bakery & Breakfast',
    unit: '500g',
    price: 260,
    originalPrice: 310,
    discountTag: '16% OFF',
    badge: 'Unprocessed',
    rating: 4.9,
    reviews: 215,
    image: honeyImg,
    inStock: true,
  }
];

// Special Section 3: Today's Offers
// Apple – ₹180 → ₹149/kg, Tomato – ₹40 → ₹30/kg, Sunflower Oil – ₹160 → ₹145/L, Potato Chips – ₹30 → ₹25
export const TODAYS_OFFERS_DATA = [
  {
    id: 'prod-tomato-deal',
    name: 'Fresh Farm Red Tomatoes',
    category: 'Vegetables',
    unit: '1 kg',
    price: 30,
    originalPrice: 40,
    discountTag: '25% OFF',
    badge: 'Deal of Day',
    rating: 4.9,
    reviews: 284,
    image: tomatoImg,
    inStock: true,
  },
  {
    id: 'prod-apple-deal',
    name: 'Crisp Royal Himachal Apples',
    category: 'Fruits',
    unit: '1 kg',
    price: 149,
    originalPrice: 180,
    discountTag: '17% OFF',
    badge: 'Farm Fresh',
    rating: 4.9,
    reviews: 218,
    image: appleImg,
    inStock: true,
  },
  {
    id: 'prod-sunflower-oil-deal',
    name: 'Pure Refined Sunflower Cooking Oil',
    category: 'Grocery & Staples',
    unit: '1 L',
    price: 145,
    originalPrice: 160,
    discountTag: '9% OFF',
    badge: 'Purity Tested',
    rating: 4.8,
    reviews: 175,
    image: oilImg,
    inStock: true,
  },
  {
    id: 'prod-kurkure-deal',
    name: 'Kurkure Masala Munch (Tedha Par Mera)',
    category: 'Snacks',
    unit: '85g pack',
    price: 20,
    originalPrice: 20,
    discountTag: 'Super Hit',
    badge: 'Zepto Choice',
    rating: 4.9,
    reviews: 320,
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=400&q=80',
    inStock: true,
  },
  {
    id: 'prod-bhujia-deal',
    name: "Haldiram's Aloo Bhujia Sev",
    category: 'Snacks',
    unit: '200g pack',
    price: 48,
    originalPrice: 55,
    discountTag: '13% OFF',
    badge: 'Desi Namkeen',
    rating: 4.9,
    reviews: 410,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80',
    inStock: true,
  },
  {
    id: 'prod-frooti-deal',
    name: "Frooti Fresh 'N' Juicy Mango Drink",
    category: 'Beverages',
    unit: '1.2 L bottle',
    price: 65,
    originalPrice: 75,
    discountTag: '13% OFF',
    badge: 'Real Mango Pulp',
    rating: 4.9,
    reviews: 380,
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=400&q=80',
    inStock: true,
  },
  {
    id: 'prod-paperboat-deal',
    name: 'Paper Boat Aamras Mango Juice',
    category: 'Beverages',
    unit: '250ml pouch',
    price: 35,
    originalPrice: 40,
    discountTag: '12% OFF',
    badge: 'Dadi Ka Magic',
    rating: 4.9,
    reviews: 290,
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=400&q=80',
    inStock: true,
  }
];

// Special Section 4: Most Purchased
// Milk, Onion, Tomato, Rice, Eggs, Banana, Bread, Cooking Oil
export const MOST_PURCHASED_DATA = [
  {
    id: 'prod-milk-mp',
    name: 'Pure Organic Cow Milk',
    category: 'Dairy & Eggs',
    unit: '1 L',
    price: 65,
    originalPrice: 75,
    discountTag: 'TOP SELLER',
    badge: 'Farm Fresh',
    rating: 4.9,
    reviews: 520,
    image: milkImg,
    inStock: true,
  },
  {
    id: 'prod-onion-mp',
    name: 'Fresh Red Farm Onions',
    category: 'Vegetables',
    unit: '1 kg',
    price: 35,
    originalPrice: 45,
    discountTag: '22% OFF',
    badge: 'Direct Farm',
    rating: 4.8,
    reviews: 310,
    image: onionImg,
    inStock: true,
  },
  {
    id: 'prod-tomato-roma',
    name: 'Organic Roma Plum Tomatoes',
    category: 'Vegetables',
    unit: '500g',
    price: 38,
    originalPrice: 48,
    discountTag: '20% OFF',
    badge: 'Plum Rich',
    rating: 4.9,
    reviews: 440,
    image: plumTomatoImg,
    inStock: true,
  },
  {
    id: 'prod-rice-mp',
    name: 'Premium Aged Basmati Rice',
    category: 'Grocery & Staples',
    unit: '1 kg',
    price: 110,
    originalPrice: 130,
    discountTag: '15% OFF',
    badge: 'Royal Grain',
    rating: 4.8,
    reviews: 290,
    image: riceImg,
    inStock: true,
  },
  {
    id: 'prod-egg-mp',
    name: 'Farm Fresh Brown Eggs',
    category: 'Dairy & Eggs',
    unit: '6 pcs pack',
    price: 85,
    originalPrice: 95,
    discountTag: '11% OFF',
    badge: 'Free Range',
    rating: 4.9,
    reviews: 420,
    image: eggImg,
    inStock: true,
  },
  {
    id: 'prod-banana-mp',
    name: 'Fresh Robusta Table Bananas',
    category: 'Fruits',
    unit: '1 kg (5-6 pcs)',
    price: 48,
    originalPrice: 60,
    discountTag: '20% OFF',
    badge: 'Naturally Ripened',
    rating: 4.8,
    reviews: 260,
    image: bananaImg,
    inStock: true,
  },
  {
    id: 'prod-bread-mp',
    name: 'Soft Whole Wheat Brown Bread',
    category: 'Bakery & Breakfast',
    unit: '400g',
    price: 45,
    originalPrice: 50,
    discountTag: 'DAILY BREAD',
    badge: 'Freshly Baked',
    rating: 4.8,
    reviews: 195,
    image: breadImg,
    inStock: true,
  },
  {
    id: 'prod-oil-mp',
    name: 'Sunflower Cooking Oil Jar',
    category: 'Grocery & Staples',
    unit: '1 L',
    price: 145,
    originalPrice: 160,
    discountTag: 'BEST VALUE',
    badge: 'Pure & Light',
    rating: 4.8,
    reviews: 230,
    image: oilImg,
    inStock: true,
  }
];

// Special Section 5: Fresh Today
// Fresh Spinach, Coriander, Tomato, Carrot, Green Beans, Cucumber, Banana
export const FRESH_TODAY_DATA = [
  {
    id: 'prod-spinach-ft',
    name: 'Fresh Tender Baby Spinach',
    category: 'Vegetables',
    unit: '250g',
    price: 35,
    originalPrice: 45,
    badge: 'Fresh Today',
    rating: 4.9,
    reviews: 140,
    image: spinachImg,
    inStock: true,
  },
  {
    id: 'prod-coriander-ft',
    name: 'Aromatic Fresh Coriander Leaves',
    category: 'Vegetables',
    unit: '100g bunch',
    price: 15,
    originalPrice: 20,
    badge: 'Fresh Today',
    rating: 4.8,
    reviews: 95,
    image: corianderImg,
    inStock: true,
  },
  {
    id: 'prod-tomato-cherry',
    name: 'Sweet Hydroponic Cherry Tomatoes',
    category: 'Vegetables',
    unit: '250g box',
    price: 45,
    originalPrice: 55,
    badge: 'Sweet & Crisp',
    rating: 4.9,
    reviews: 310,
    image: cherryTomatoImg,
    inStock: true,
  },
  {
    id: 'prod-carrot-ft',
    name: 'Crunchy Sweet Farm Carrots',
    category: 'Vegetables',
    unit: '500g',
    price: 45,
    originalPrice: 55,
    badge: 'Fresh Today',
    rating: 4.8,
    reviews: 185,
    image: carrotImg,
    inStock: true,
  },
  {
    id: 'prod-beans-ft',
    name: 'Crisp Green String Beans',
    category: 'Vegetables',
    unit: '250g',
    price: 28,
    originalPrice: 35,
    badge: 'Fresh Today',
    rating: 4.8,
    reviews: 88,
    image: greenBeansImg,
    inStock: true,
  },
  {
    id: 'prod-cucumber-ft',
    name: 'Crisp English Salad Cucumbers',
    category: 'Vegetables',
    unit: '500g',
    price: 30,
    originalPrice: 38,
    badge: 'Fresh Today',
    rating: 4.9,
    reviews: 120,
    image: cucumberImg,
    inStock: true,
  },
  {
    id: 'prod-banana-ft',
    name: 'Sweet Golden Table Bananas',
    category: 'Fruits',
    unit: '1 kg',
    price: 50,
    originalPrice: 60,
    badge: 'Fresh Today',
    rating: 4.9,
    reviews: 160,
    image: bananaImg,
    inStock: true,
  }
];

// Meat & Seafood Section Products
export const MEAT_SEAFOOD_DATA = [
  {
    id: 'prod-chicken-cb',
    name: 'Fresh Tender Chicken Breast (Boneless)',
    category: 'Meat & Seafood',
    unit: '500g',
    price: 185,
    originalPrice: 220,
    discountTag: '16% OFF',
    badge: 'Antibiotic Free',
    rating: 4.9,
    reviews: 210,
    image: chickenImg,
    inStock: true,
  },
  {
    id: 'prod-mutton-curry',
    name: 'Farm Fresh Mutton Curry Cut',
    category: 'Meat & Seafood',
    unit: '500g',
    price: 440,
    originalPrice: 490,
    discountTag: '10% OFF',
    badge: 'Tender & Fresh',
    rating: 4.8,
    reviews: 94,
    image: muttonImg,
    inStock: true,
  },
  {
    id: 'prod-fish-salmon',
    name: 'Atlantic Salmon Fillet Cut',
    category: 'Meat & Seafood',
    unit: '300g',
    price: 499,
    originalPrice: 590,
    discountTag: '15% OFF',
    badge: 'Omega-3 Rich',
    rating: 4.9,
    reviews: 82,
    image: fishImg,
    inStock: true,
  },
  {
    id: 'prod-prawns-clean',
    name: 'Coastal Cleaned Large Prawns',
    category: 'Meat & Seafood',
    unit: '500g',
    price: 360,
    originalPrice: 420,
    discountTag: '14% OFF',
    badge: 'Daily Catch',
    rating: 4.8,
    reviews: 130,
    image: prawnsImg,
    inStock: true,
  },
];

// Combined Catalog for instant search & filtering
export const ALL_PRODUCTS = [
  ...TODAYS_OFFERS_DATA,
  ...FRESH_TODAY_DATA,
  ...MOST_PURCHASED_DATA,
  ...RECOMMENDED_FOR_YOU_DATA,
  ...PREVIOUS_PURCHASES_DATA,
  ...MEAT_SEAFOOD_DATA,
];

// Hero Value Propositions
export const VALUE_PROPS = [
  {
    title: 'Farm Fresh',
    subtitle: 'Daily sunrise harvest',
    icon: 'sprout',
  },
  {
    title: '30 Min Delivery',
    subtitle: 'Lightning quick service',
    icon: 'clock',
  },
  {
    title: 'Best Price Guarantee',
    subtitle: 'Direct from farm gates',
    icon: 'percent',
  },
  {
    title: 'Easy Returns',
    subtitle: 'No questions asked refund',
    icon: 'rotate-ccw',
  },
];

// Promises section
export const PROMISES = [
  {
    id: 'p1',
    title: 'Fresh Products',
    badge: '100% Organic',
    subtitle: 'Sunrise Farm Harvest',
    description:
      'Sourced directly from verified organic regional farms every morning. No cold storage aging; guaranteed fresh to your kitchen.',
    icon: 'leaf',
  },
  {
    id: 'p2',
    title: 'Easy Shopping',
    badge: 'Zero Friction',
    subtitle: 'Smooth & Intuitive',
    description:
      'Clean, effortless interface designed for quick weekly grocery refills, smart search, and 1-tap cart additions.',
    icon: 'shopping-bag',
  },
  {
    id: 'p3',
    title: 'Great Prices',
    badge: 'Wholesale Savings',
    subtitle: 'Direct Farm Gate Value',
    description:
      'By cutting out traditional wholesale middlemen and storage markups, we pass honest savings directly back to you.',
    icon: 'tag',
  },
  {
    id: 'p4',
    title: 'Fast Delivery',
    badge: 'Express 30 Mins',
    subtitle: '30 Minute Cold-Chain',
    description:
      'Hyper-local temperature-controlled delivery vans ensure tender leaves stay crisp and dairy stays frosty cold.',
    icon: 'zap',
  },
];

// "Cook This Meal" 1-Click Recipe Kits
export const COOK_THIS_MEAL_RECIPES = [
  {
    id: 'meal-biryani',
    name: 'Hyderabadi Chicken Biryani',
    tagline: 'Fragrant aged basmati rice slow-cooked with tender chicken and aromatic spices',
    emoji: '🍚',
    time: '45 mins',
    servings: '3-4 Servings',
    badge: 'Sunday Special',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    ingredients: [
      { id: 'prod-rice-mp', name: 'Premium Aged Basmati Rice', unit: '1 kg', price: 110, image: riceImg },
      { id: 'prod-chicken-cb', name: 'Fresh Tender Chicken Breast', unit: '500g', price: 185, image: chickenImg },
      { id: 'prod-onion-mp', name: 'Fresh Red Farm Onions', unit: '1 kg', price: 35, image: onionImg },
      { id: 'prod-tomato-deal', name: 'Fresh Farm Red Tomatoes', unit: '1 kg', price: 30, image: tomatoImg },
      { id: 'prod-coriander-ft', name: 'Aromatic Fresh Coriander Leaves', unit: '100g bunch', price: 15, image: corianderImg },
    ]
  },
  {
    id: 'meal-paneer-butter',
    name: 'Shahi Paneer Butter Masala',
    tagline: 'Melt-in-mouth cottage cheese simmered in a luscious rich tomato-butter gravy',
    emoji: '🥘',
    time: '25 mins',
    servings: '2-3 Servings',
    badge: 'Popular Veg',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
    ingredients: [
      { id: 'prod-paneer-item', name: 'Malai Soft Paneer Block', unit: '200g', price: 95, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=400&q=80' },
      { id: 'prod-tomato-deal', name: 'Fresh Farm Red Tomatoes', unit: '1 kg', price: 30, image: tomatoImg },
      { id: 'prod-onion-mp', name: 'Fresh Red Farm Onions', unit: '1 kg', price: 35, image: onionImg },
      { id: 'prod-butter-item', name: 'Creamery Salted Butter', unit: '100g', price: 60, image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=400&q=80' },
      { id: 'prod-milk-deal', name: 'Pure Organic Cow Milk', unit: '1 L', price: 65, image: milkImg },
    ]
  },
  {
    id: 'meal-sambar',
    name: 'Authentic South Indian Sambar',
    tagline: 'Slow-simmered toor dal with fresh garden vegetables and aromatic tempered curry leaves',
    emoji: '🍲',
    time: '30 mins',
    servings: '4 Servings',
    badge: 'Traditional Staple',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    ingredients: [
      { id: 'prod-toor-dal', name: 'Unpolished Toor Dal', unit: '1 kg', price: 165, image: 'https://images.unsplash.com/photo-1585994192701-f1a505c817ea?auto=format&fit=crop&w=400&q=80' },
      { id: 'prod-tomato-deal', name: 'Fresh Farm Red Tomatoes', unit: '1 kg', price: 30, image: tomatoImg },
      { id: 'prod-onion-mp', name: 'Fresh Red Farm Onions', unit: '1 kg', price: 35, image: onionImg },
      { id: 'prod-beans-ft', name: 'Crisp Green String Beans', unit: '250g', price: 28, image: greenBeansImg },
      { id: 'prod-curry-item', name: 'Fresh Curry Leaves', unit: '50g', price: 10, image: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=400&q=80' },
    ]
  },
  {
    id: 'meal-pasta',
    name: 'Creamy Garlic Veggie Pasta',
    tagline: 'Quick delicious evening pasta tossed with fresh crunchy capsicum and cheddar cheese',
    emoji: '🍝',
    time: '20 mins',
    servings: '2 Servings',
    badge: 'Kids Favorite',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281728?auto=format&fit=crop&w=600&q=80',
    ingredients: [
      { id: 'prod-bread-mp', name: 'Soft Multigrain Brown Bread', unit: '400g', price: 45, image: breadImg },
      { id: 'prod-cheese-item', name: 'Cheddar Cheese Slices', unit: '200g', price: 145, image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=400&q=80' },
      { id: 'prod-capsicum-item', name: 'Crisp Green Capsicum', unit: '500g', price: 42, image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=400&q=80' },
      { id: 'prod-milk-deal', name: 'Pure Organic Cow Milk', unit: '1 L', price: 65, image: milkImg },
    ]
  },
  {
    id: 'meal-omelette',
    name: 'Spicy Masala Omelette & Pav',
    tagline: 'High-protein farm fresh brown eggs whisked with crunchy onions, green chillies, and warm pav',
    emoji: '🍳',
    time: '10 mins',
    servings: '1-2 Servings',
    badge: 'Express Breakfast',
    image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=600&q=80',
    ingredients: [
      { id: 'prod-egg-mp', name: 'Farm Fresh Brown Eggs', unit: '6 pcs pack', price: 85, image: eggImg },
      { id: 'prod-onion-mp', name: 'Fresh Red Farm Onions', unit: '1 kg', price: 35, image: onionImg },
      { id: 'prod-tomato-deal', name: 'Fresh Farm Red Tomatoes', unit: '1 kg', price: 30, image: tomatoImg },
      { id: 'prod-coriander-ft', name: 'Aromatic Fresh Coriander Leaves', unit: '100g bunch', price: 15, image: corianderImg },
    ]
  }
];
