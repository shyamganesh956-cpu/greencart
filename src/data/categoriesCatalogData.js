// Full 15 Main Product Categories with Subcategories & Individual Products Catalog
// Local Category image assets
import vegImg from '../assets/categories/vegetables.jpg';
import fruitImg from '../assets/categories/fruits.jpg';
import dairyImg from '../assets/categories/dairy.jpg';
import grainImg from '../assets/categories/grains.jpg';
import snackImg from '../assets/categories/snacks.jpg';
import bevImg from '../assets/categories/beverages.jpg';
import houseImg from '../assets/categories/household.jpg';

// Local Product image assets where available
import tomatoImg from '../assets/products/tomatoes.jpg';
import appleImg from '../assets/products/apples.jpg';
import milkImg from '../assets/products/milk.jpg';
import riceImg from '../assets/products/rice.jpg';
import spinachImg from '../assets/products/spinach.jpg';
import yogurtImg from '../assets/products/yogurt.jpg';
import carrotImg from '../assets/products/carrots.jpg';
import eggImg from '../assets/products/eggs.jpg';
import berriesImg from '../assets/products/berries.jpg';
import coconutWaterImg from '../assets/products/coconut-water.jpg';

// Photography assets
const meatCatImg = 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=600&q=80';
const bakeryCatImg = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80';
const personalCatImg = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80';
const babyCatImg = 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80';
const petCatImg = 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&q=80';
const organicCatImg = 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80';
const frozenCatImg = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80';
const kitchenCatImg = 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80';

// 15 MAIN PRODUCT CATEGORIES
export const MAIN_CATEGORIES_15 = [
  {
    id: 'cat-1-vegetables',
    number: 1,
    name: 'Vegetables',
    slug: 'vegetables',
    itemCount: '24+ Items',
    tagline: 'Farm-fresh, crisp, and 100% naturally harvested vegetables',
    image: vegImg,
    subcategories: [
      {
        name: 'Fresh Vegetables',
        items: ['Tomato', 'Onion', 'Brinjal', 'Capsicum']
      },
      {
        name: 'Leafy Vegetables',
        items: ['Spinach', 'Coriander', 'Mint', 'Curry Leaves']
      },
      {
        name: 'Root Vegetables',
        items: ['Potato', 'Carrot', 'Beetroot', 'Radish']
      },
      {
        name: 'Exotic Vegetables',
        items: ['Broccoli', 'Zucchini', 'Lettuce', 'Celery']
      },
      {
        name: 'Cucumbers & Gourds',
        items: ['Cucumber', 'Bottle Gourd', 'Bitter Gourd']
      },
      {
        name: 'Peppers & Chillies',
        items: ['Green Chilli', 'Red Chilli', 'Jalapeño']
      }
    ]
  },
  {
    id: 'cat-2-fruits',
    number: 2,
    name: 'Fruits',
    slug: 'fruits',
    itemCount: '23+ Items',
    tagline: 'Sweet, juicy, and hand-picked orchard fresh seasonal fruits',
    image: fruitImg,
    subcategories: [
      {
        name: 'Fresh Fruits',
        items: ['Apple', 'Banana', 'Orange', 'Guava']
      },
      {
        name: 'Tropical Fruits',
        items: ['Mango', 'Papaya', 'Pineapple', 'Watermelon']
      },
      {
        name: 'Citrus Fruits',
        items: ['Orange', 'Lemon', 'Sweet Lime']
      },
      {
        name: 'Berries',
        items: ['Strawberry', 'Blueberry', 'Raspberry']
      },
      {
        name: 'Exotic Fruits',
        items: ['Kiwi', 'Dragon Fruit', 'Avocado']
      },
      {
        name: 'Seasonal Fruits',
        items: ['Mango', 'Jackfruit', 'Watermelon']
      }
    ]
  },
  {
    id: 'cat-3-dairy-eggs',
    number: 3,
    name: 'Dairy & Eggs',
    slug: 'dairy-eggs',
    itemCount: '17+ Items',
    tagline: 'Fresh farm milk, artisanal cheese, curd, paneer, and organic eggs',
    image: dairyImg,
    subcategories: [
      {
        name: 'Milk',
        items: ['Full Cream Milk', 'Toned Milk', 'Low-Fat Milk']
      },
      {
        name: 'Curd & Yogurt',
        items: ['Curd', 'Greek Yogurt', 'Flavoured Yogurt']
      },
      {
        name: 'Paneer & Tofu',
        items: ['Paneer', 'Tofu']
      },
      {
        name: 'Butter & Cheese',
        items: ['Butter', 'Cheese Slices', 'Cheese Cubes']
      },
      {
        name: 'Eggs',
        items: ['Regular Eggs', 'Brown Eggs', 'Organic Eggs']
      }
    ]
  },
  {
    id: 'cat-4-meat-seafood',
    number: 4,
    name: 'Meat & Seafood',
    slug: 'meat-seafood',
    itemCount: '13+ Items',
    tagline: '100% antibiotic-free tender chicken, mutton, and fresh ocean catch',
    image: meatCatImg,
    subcategories: [
      {
        name: 'Chicken',
        items: ['Whole Chicken', 'Chicken Breast', 'Chicken Legs']
      },
      {
        name: 'Mutton',
        items: ['Mutton Curry Cut', 'Mutton Boneless']
      },
      {
        name: 'Fish',
        items: ['Rohu', 'Katla', 'Seer Fish']
      },
      {
        name: 'Prawns & Shrimp',
        items: ['Small Prawns', 'Large Prawns']
      },
      {
        name: 'Ready-to-Cook Meat',
        items: ['Chicken Nuggets', 'Chicken Kebabs']
      }
    ]
  },
  {
    id: 'cat-5-grocery-staples',
    number: 5,
    name: 'Grocery & Staples',
    slug: 'grocery-staples',
    itemCount: '18+ Items',
    tagline: 'Purity-tested grains, premium flours, cold-pressed oils, and spices',
    image: grainImg,
    subcategories: [
      {
        name: 'Rice & Grains',
        items: ['Basmati Rice', 'Sona Masoori', 'Brown Rice']
      },
      {
        name: 'Atta & Flour',
        items: ['Wheat Atta', 'Maida', 'Ragi Flour']
      },
      {
        name: 'Dal & Pulses',
        items: ['Toor Dal', 'Moong Dal', 'Chana Dal']
      },
      {
        name: 'Oil & Ghee',
        items: ['Sunflower Oil', 'Groundnut Oil', 'Ghee']
      },
      {
        name: 'Spices & Masala',
        items: ['Turmeric', 'Chilli Powder', 'Garam Masala']
      },
      {
        name: 'Sugar & Salt',
        items: ['Sugar', 'Rock Salt', 'Iodized Salt']
      }
    ]
  },
  {
    id: 'cat-6-snacks',
    number: 6,
    name: 'Snacks',
    slug: 'snacks',
    itemCount: '18+ Items',
    tagline: 'Crunchy chips, premium cookies, roasted nuts, and sweets',
    image: snackImg,
    subcategories: [
      {
        name: 'Chips',
        items: ['Potato Chips', 'Banana Chips', 'Nachos']
      },
      {
        name: 'Biscuits',
        items: ['Cream Biscuits', 'Glucose Biscuits', 'Cookies']
      },
      {
        name: 'Healthy Snacks',
        items: ['Nuts', 'Dry Fruits', 'Granola Bars']
      },
      {
        name: 'Namkeen Snacks',
        items: ['Mixture', 'Sev', 'Bhujia']
      },
      {
        name: 'Chocolates & Candies',
        items: ['Chocolates', 'Candy', 'Toffee']
      },
      {
        name: 'Popcorn',
        items: ['Salted Popcorn', 'Caramel Popcorn']
      }
    ]
  },
  {
    id: 'cat-7-beverages',
    number: 7,
    name: 'Beverages',
    slug: 'beverages',
    itemCount: '17+ Items',
    tagline: 'Refreshing cold-pressed juices, aromatic teas, coffee, and energy drinks',
    image: bevImg,
    subcategories: [
      {
        name: 'Tea',
        items: ['Tea Powder', 'Green Tea']
      },
      {
        name: 'Coffee',
        items: ['Instant Coffee', 'Filter Coffee']
      },
      {
        name: 'Juices',
        items: ['Orange Juice', 'Apple Juice', 'Mixed Fruit Juice']
      },
      {
        name: 'Soft Drinks',
        items: ['Cola', 'Lemon Drink']
      },
      {
        name: 'Energy & Sports Drinks',
        items: ['Energy Drinks', 'Electrolyte Drinks']
      },
      {
        name: 'Water',
        items: ['Packaged Water', 'Sparkling Water']
      }
    ]
  },
  {
    id: 'cat-8-bakery-breakfast',
    number: 8,
    name: 'Bakery & Breakfast',
    slug: 'bakery-breakfast',
    itemCount: '16+ Items',
    tagline: 'Warm oven-fresh bread, wholesome cereals, buns, and decadent spreads',
    image: bakeryCatImg,
    subcategories: [
      {
        name: 'Bread',
        items: ['White Bread', 'Brown Bread', 'Multigrain Bread']
      },
      {
        name: 'Buns & Rolls',
        items: ['Burger Buns', 'Pav', 'Dinner Rolls']
      },
      {
        name: 'Cakes & Pastries',
        items: ['Cake', 'Pastry', 'Muffins']
      },
      {
        name: 'Breakfast Cereals',
        items: ['Corn Flakes', 'Muesli', 'Oats']
      },
      {
        name: 'Spreads',
        items: ['Peanut Butter', 'Jam', 'Chocolate Spread']
      }
    ]
  },
  {
    id: 'cat-9-household-essentials',
    number: 9,
    name: 'Household Essentials',
    slug: 'household-essentials',
    itemCount: '14+ Items',
    tagline: 'Effective floor cleaners, laundry detergents, wraps, and kitchen paper',
    image: houseImg,
    subcategories: [
      {
        name: 'Cleaning Products',
        items: ['Floor Cleaner', 'Toilet Cleaner']
      },
      {
        name: 'Dishwashing',
        items: ['Dishwash Liquid', 'Dishwash Bar']
      },
      {
        name: 'Laundry',
        items: ['Detergent', 'Fabric Softener']
      },
      {
        name: 'Paper & Tissue',
        items: ['Tissue Paper', 'Kitchen Towels']
      },
      {
        name: 'Home Utility',
        items: ['Garbage Bags', 'Foil', 'Food Storage Bags']
      }
    ]
  },
  {
    id: 'cat-10-personal-care',
    number: 10,
    name: 'Personal Care',
    slug: 'personal-care',
    itemCount: '13+ Items',
    tagline: 'Gentle soaps, herbal shampoos, toothpastes, moisturizers, and sanitizers',
    image: personalCatImg,
    subcategories: [
      {
        name: 'Bath & Body',
        items: ['Soap', 'Body Wash']
      },
      {
        name: 'Hair Care',
        items: ['Shampoo', 'Conditioner', 'Hair Oil']
      },
      {
        name: 'Oral Care',
        items: ['Toothpaste', 'Toothbrush', 'Mouthwash']
      },
      {
        name: 'Skin Care',
        items: ['Face Wash', 'Moisturizer']
      },
      {
        name: 'Hand Care',
        items: ['Hand Wash', 'Hand Sanitizer']
      }
    ]
  },
  {
    id: 'cat-11-baby-care',
    number: 11,
    name: 'Baby Care',
    slug: 'baby-care',
    itemCount: '8+ Items',
    tagline: 'Gentle baby diapers, nourishing infant cereals, and dermatologically tested care',
    image: babyCatImg,
    subcategories: [
      {
        name: 'Baby Diapers & Wipes',
        items: ['Diaper Pants', 'Wet Wipes']
      },
      {
        name: 'Baby Food & Formula',
        items: ['Infant Formula', 'Baby Cereal', 'Fruit Puree']
      },
      {
        name: 'Baby Bath & Skin',
        items: ['Baby Shampoo', 'Baby Lotion', 'Massage Oil']
      }
    ]
  },
  {
    id: 'cat-12-pet-care',
    number: 12,
    name: 'Pet Care',
    slug: 'pet-care',
    itemCount: '8+ Items',
    tagline: 'Nutritious dog kibbles, ocean fish cat food, chew treats, and litter hygiene',
    image: petCatImg,
    subcategories: [
      {
        name: 'Dog Food & Treats',
        items: ['Dry Dog Kibble', 'Chicken Chew Treats', 'Dog Biscuits']
      },
      {
        name: 'Cat Food & Treats',
        items: ['Tuna Wet Cat Food', 'Catnip Crunchies']
      },
      {
        name: 'Pet Grooming & Hygiene',
        items: ['Pet Shampoo', 'Odor Neutralizer', 'Cat Litter']
      }
    ]
  },
  {
    id: 'cat-13-organic-gourmet',
    number: 13,
    name: 'Organic & Gourmet',
    slug: 'organic-gourmet',
    itemCount: '9+ Items',
    tagline: 'Certified organic cold-pressed oils, artisan cheese, superfood seeds, and dips',
    image: organicCatImg,
    subcategories: [
      {
        name: 'Organic Staples',
        items: ['Organic Brown Sugar', 'Cold-Pressed Virgin Olive Oil', 'Quinoa']
      },
      {
        name: 'Gourmet Cheese & Dips',
        items: ['Artisan Gouda', 'Salsa Dip', 'Hummus']
      },
      {
        name: 'Superfoods & Seeds',
        items: ['Chia Seeds', 'Flax Seeds', 'Pumpkin Seeds']
      }
    ]
  },
  {
    id: 'cat-14-frozen-instant',
    number: 14,
    name: 'Frozen & Ready-to-Eat',
    slug: 'frozen-instant',
    itemCount: '8+ Items',
    tagline: 'Quick 5-minute frozen fries, sweet corn, ready-to-eat curries, and flaky parathas',
    image: frozenCatImg,
    subcategories: [
      {
        name: 'Frozen Vegetables & Snacks',
        items: ['Frozen Green Peas', 'French Fries', 'Sweet Corn']
      },
      {
        name: 'Ready Meals & Curries',
        items: ['Instant Paneer Butter Masala', 'Dal Makhani Heat & Eat']
      },
      {
        name: 'Frozen Parathas & Breads',
        items: ['Malabar Paratha', 'Garlic Naan', 'Veg Spring Rolls']
      }
    ]
  },
  {
    id: 'cat-15-kitchen-utility',
    number: 15,
    name: 'Kitchen & Home Utility',
    slug: 'kitchen-utility',
    itemCount: '8+ Items',
    tagline: 'Non-stick cookware, stainless steel bottles, foil wraps, and cleaning essentials',
    image: kitchenCatImg,
    subcategories: [
      {
        name: 'Cookware & Dining',
        items: ['Non-Stick Fry Pan', 'Steel Water Bottle', 'Glass Container Set']
      },
      {
        name: 'Kitchen Storage & Foil',
        items: ['Aluminium Foil Roll', 'Food Storage Containers', 'Cling Film']
      },
      {
        name: 'Cleaning Tools',
        items: ['Microfiber Cleaning Cloth', 'Scrub Sponges']
      }
    ]
  }
];

// Curated high quality grocery photo database
const ITEM_IMAGES = {
  // Vegetables
  'Tomato': tomatoImg,
  'Onion': 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=400&q=80',
  'Brinjal': 'https://images.unsplash.com/photo-1628773822503-930a84d9435b?auto=format&fit=crop&w=400&q=80',
  'Capsicum': 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=400&q=80',
  'Spinach': spinachImg,
  'Coriander': 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=400&q=80',
  'Mint': 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=400&q=80',
  'Curry Leaves': 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=400&q=80',
  'Potato': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80',
  'Carrot': carrotImg,
  'Beetroot': 'https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?auto=format&fit=crop&w=400&q=80',
  'Radish': 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=400&q=80',
  'Broccoli': 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=400&q=80',
  'Zucchini': 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=400&q=80',
  'Lettuce': 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=400&q=80',
  'Celery': 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=400&q=80',
  'Cucumber': 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?auto=format&fit=crop&w=400&q=80',
  'Bottle Gourd': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=400&q=80',
  'Bitter Gourd': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=400&q=80',
  'Green Chilli': 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=400&q=80',
  'Red Chilli': 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=400&q=80',
  'Jalapeño': 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=400&q=80',

  // Fruits
  'Apple': appleImg,
  'Banana': 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=400&q=80',
  'Orange': 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=400&q=80',
  'Guava': 'https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?auto=format&fit=crop&w=400&q=80',
  'Mango': 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=400&q=80',
  'Papaya': 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?auto=format&fit=crop&w=400&q=80',
  'Pineapple': 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=400&q=80',
  'Watermelon': 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=80',
  'Lemon': 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=400&q=80',
  'Sweet Lime': 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=400&q=80',
  'Strawberry': 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=400&q=80',
  'Blueberry': berriesImg,
  'Raspberry': 'https://images.unsplash.com/photo-1577069808021-76a086ef5670?auto=format&fit=crop&w=400&q=80',
  'Kiwi': 'https://images.unsplash.com/photo-1585059895524-72359e06133a?auto=format&fit=crop&w=400&q=80',
  'Dragon Fruit': 'https://images.unsplash.com/photo-1527324688151-0e627063f2b1?auto=format&fit=crop&w=400&q=80',
  'Avocado': 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=400&q=80',
  'Jackfruit': 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=400&q=80',

  // Dairy & Eggs
  'Full Cream Milk': milkImg,
  'Toned Milk': milkImg,
  'Low-Fat Milk': milkImg,
  'Curd': yogurtImg,
  'Greek Yogurt': yogurtImg,
  'Flavoured Yogurt': yogurtImg,
  'Paneer': 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=400&q=80',
  'Tofu': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80',
  'Butter': 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=400&q=80',
  'Cheese Slices': 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=400&q=80',
  'Cheese Cubes': 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=400&q=80',
  'Regular Eggs': eggImg,
  'Brown Eggs': eggImg,
  'Organic Eggs': eggImg,

  // Meat & Seafood
  'Whole Chicken': 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=400&q=80',
  'Chicken Breast': 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=400&q=80',
  'Chicken Legs': 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=400&q=80',
  'Mutton Curry Cut': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
  'Mutton Boneless': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
  'Rohu': 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80',
  'Katla': 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80',
  'Seer Fish': 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80',
  'Small Prawns': 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=400&q=80',
  'Large Prawns': 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=400&q=80',
  'Chicken Nuggets': 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=400&q=80',
  'Chicken Kebabs': 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=400&q=80',

  // Grocery & Staples
  'Basmati Rice': riceImg,
  'Sona Masoori': riceImg,
  'Brown Rice': riceImg,
  'Wheat Atta': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80',
  'Maida': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80',
  'Ragi Flour': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80',
  'Toor Dal': 'https://images.unsplash.com/photo-1585994192701-f1a505c817ea?auto=format&fit=crop&w=400&q=80',
  'Moong Dal': 'https://images.unsplash.com/photo-1585994192701-f1a505c817ea?auto=format&fit=crop&w=400&q=80',
  'Chana Dal': 'https://images.unsplash.com/photo-1585994192701-f1a505c817ea?auto=format&fit=crop&w=400&q=80',
  'Sunflower Oil': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80',
  'Groundnut Oil': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80',
  'Ghee': 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=400&q=80',
  'Turmeric': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80',
  'Chilli Powder': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80',
  'Garam Masala': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80',
  'Sugar': 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&w=400&q=80',
  'Rock Salt': 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?auto=format&fit=crop&w=400&q=80',
  'Iodized Salt': 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?auto=format&fit=crop&w=400&q=80',

  // Snacks
  'Potato Chips': 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=400&q=80',
  'Banana Chips': 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=400&q=80',
  'Nachos': 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=400&q=80',
  'Cream Biscuits': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80',
  'Glucose Biscuits': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80',
  'Cookies': 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=400&q=80',
  'Nuts': 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=400&q=80',
  'Dry Fruits': 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=400&q=80',
  'Granola Bars': 'https://images.unsplash.com/photo-1622484214647-7589ebef6c3b?auto=format&fit=crop&w=400&q=80',
  'Mixture': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80',
  'Sev': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80',
  'Bhujia': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80',
  'Chocolates': 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=400&q=80',
  'Candy': 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=400&q=80',
  'Toffee': 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=400&q=80',
  'Salted Popcorn': 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=400&q=80',
  'Caramel Popcorn': 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=400&q=80',

  // Beverages
  'Tea Powder': 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80',
  'Green Tea': 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=400&q=80',
  'Instant Coffee': 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80',
  'Filter Coffee': 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80',
  'Orange Juice': 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=400&q=80',
  'Apple Juice': 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=400&q=80',
  'Mixed Fruit Juice': 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=400&q=80',
  'Cola': 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80',
  'Lemon Drink': 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80',
  'Energy Drinks': 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=400&q=80',
  'Electrolyte Drinks': coconutWaterImg,
  'Packaged Water': 'https://images.unsplash.com/photo-1559839914-ba2ac5cd7b9b?auto=format&fit=crop&w=400&q=80',
  'Sparkling Water': 'https://images.unsplash.com/photo-1559839914-ba2ac5cd7b9b?auto=format&fit=crop&w=400&q=80',

  // Bakery & Breakfast
  'White Bread': 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=400&q=80',
  'Brown Bread': 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=400&q=80',
  'Multigrain Bread': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80',
  'Burger Buns': 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=400&q=80',
  'Pav': 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=400&q=80',
  'Dinner Rolls': 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=400&q=80',
  'Cake': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80',
  'Pastry': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80',
  'Muffins': 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=400&q=80',
  'Corn Flakes': 'https://images.unsplash.com/photo-1521483451569-e33803c0330c?auto=format&fit=crop&w=400&q=80',
  'Muesli': 'https://images.unsplash.com/photo-1521483451569-e33803c0330c?auto=format&fit=crop&w=400&q=80',
  'Oats': 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=80',
  'Peanut Butter': 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=400&q=80',
  'Jam': 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&w=400&q=80',
  'Chocolate Spread': 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=400&q=80',

  // Household Essentials
  'Floor Cleaner': 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=400&q=80',
  'Toilet Cleaner': 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=400&q=80',
  'Dishwash Liquid': 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=400&q=80',
  'Dishwash Bar': 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=400&q=80',
  'Detergent': 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=400&q=80',
  'Fabric Softener': 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=400&q=80',
  'Tissue Paper': 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&w=400&q=80',
  'Kitchen Towels': 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&w=400&q=80',
  'Garbage Bags': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
  'Foil': 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=400&q=80',
  'Food Storage Bags': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',

  // Personal Care
  'Soap': 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=400&q=80',
  'Body Wash': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
  'Shampoo': 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=400&q=80',
  'Conditioner': 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=400&q=80',
  'Hair Oil': 'https://images.unsplash.com/photo-1608248597359-00977d018635?auto=format&fit=crop&w=400&q=80',
  'Toothpaste': 'https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=400&q=80',
  'Toothbrush': 'https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=400&q=80',
  'Mouthwash': 'https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=400&q=80',
  'Face Wash': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
  'Moisturizer': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
  'Hand Wash': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
  'Hand Sanitizer': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',

  // Baby Care
  'Diaper Pants': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=400&q=80',
  'Wet Wipes': 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&w=400&q=80',
  'Infant Formula': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=400&q=80',
  'Baby Cereal': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=400&q=80',
  'Fruit Puree': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=400&q=80',
  'Baby Shampoo': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=400&q=80',
  'Baby Lotion': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=400&q=80',
  'Massage Oil': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=400&q=80',

  // Pet Care
  'Dry Dog Kibble': 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=400&q=80',
  'Chicken Chew Treats': 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=400&q=80',
  'Dog Biscuits': 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=400&q=80',
  'Tuna Wet Cat Food': 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80',
  'Catnip Crunchies': 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80',
  'Pet Shampoo': 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=400&q=80',
  'Odor Neutralizer': 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=400&q=80',
  'Cat Litter': 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80',

  // Organic & Gourmet
  'Organic Brown Sugar': 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&w=400&q=80',
  'Cold-Pressed Virgin Olive Oil': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80',
  'Quinoa': 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=80',
  'Artisan Gouda': 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=400&q=80',
  'Salsa Dip': 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=400&q=80',
  'Hummus': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80',
  'Chia Seeds': 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=400&q=80',
  'Flax Seeds': 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=400&q=80',
  'Pumpkin Seeds': 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=400&q=80',

  // Frozen & Ready-to-Eat
  'Frozen Green Peas': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80',
  'French Fries': 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=400&q=80',
  'Sweet Corn': 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=400&q=80',
  'Instant Paneer Butter Masala': 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=400&q=80',
  'Dal Makhani Heat & Eat': 'https://images.unsplash.com/photo-1585994192701-f1a505c817ea?auto=format&fit=crop&w=400&q=80',
  'Malabar Paratha': 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=400&q=80',
  'Garlic Naan': 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=400&q=80',
  'Veg Spring Rolls': 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=400&q=80',

  // Kitchen & Home Utility
  'Non-Stick Fry Pan': 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80',
  'Steel Water Bottle': 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=400&q=80',
  'Glass Container Set': 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=400&q=80',
  'Aluminium Foil Roll': 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=400&q=80',
  'Food Storage Containers': 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=400&q=80',
  'Cling Film': 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=400&q=80',
  'Microfiber Cleaning Cloth': 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=400&q=80',
  'Scrub Sponges': 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=400&q=80'
};

// Pricing and unit dictionary for all individual items
const ITEM_DETAILS_MAP = {
  // Vegetables
  'Tomato': { unit: '1 kg', price: 30, originalPrice: 40, rating: 4.9, badge: 'Organic Farm' },
  'Onion': { unit: '1 kg', price: 35, originalPrice: 45, rating: 4.8, badge: 'Direct Harvest' },
  'Brinjal': { unit: '500g', price: 28, originalPrice: 35, rating: 4.7, badge: 'Fresh & Tender' },
  'Capsicum': { unit: '500g', price: 42, originalPrice: 55, rating: 4.8, badge: 'Crisp Green' },
  'Spinach': { unit: '250g', price: 25, originalPrice: 35, rating: 4.9, badge: 'Farm Fresh' },
  'Coriander': { unit: '100g bunch', price: 15, originalPrice: 20, rating: 4.8, badge: 'Aromatic' },
  'Mint': { unit: '100g bunch', price: 18, originalPrice: 24, rating: 4.8, badge: 'Fresh Greens' },
  'Curry Leaves': { unit: '50g bunch', price: 10, originalPrice: 15, rating: 4.9, badge: 'Handpicked' },
  'Potato': { unit: '1 kg', price: 32, originalPrice: 42, rating: 4.7, badge: 'Staple Root' },
  'Carrot': { unit: '500g', price: 45, originalPrice: 55, rating: 4.8, badge: 'Sweet & Crisp' },
  'Beetroot': { unit: '500g', price: 34, originalPrice: 45, rating: 4.8, badge: 'Rich Iron' },
  'Radish': { unit: '500g', price: 26, originalPrice: 35, rating: 4.6, badge: 'Fresh Pick' },
  'Broccoli': { unit: '1 pc (350g)', price: 65, originalPrice: 85, rating: 4.9, badge: 'Exotic Farm' },
  'Zucchini': { unit: '500g', price: 58, originalPrice: 75, rating: 4.7, badge: 'Hydroponic' },
  'Lettuce': { unit: '1 head (250g)', price: 45, originalPrice: 60, rating: 4.8, badge: 'Crisp Iceberg' },
  'Celery': { unit: '250g', price: 48, originalPrice: 65, rating: 4.7, badge: 'Exotic Herb' },
  'Cucumber': { unit: '500g', price: 28, originalPrice: 38, rating: 4.8, badge: 'Hydrating' },
  'Bottle Gourd': { unit: '1 pc (700g)', price: 35, originalPrice: 45, rating: 4.7, badge: 'Tender' },
  'Bitter Gourd': { unit: '500g', price: 36, originalPrice: 48, rating: 4.6, badge: 'Immunity Boost' },
  'Green Chilli': { unit: '100g', price: 12, originalPrice: 18, rating: 4.8, badge: 'Spicy Fresh' },
  'Red Chilli': { unit: '100g', price: 16, originalPrice: 22, rating: 4.7, badge: 'Fiery Pick' },
  'Jalapeño': { unit: '150g', price: 49, originalPrice: 65, rating: 4.8, badge: 'Zesty Mild' },

  // Fruits
  'Apple': { unit: '1 kg (4-5 pcs)', price: 149, originalPrice: 180, rating: 4.9, badge: 'Shimla Fresh' },
  'Banana': { unit: '1 kg (5-6 pcs)', price: 48, originalPrice: 60, rating: 4.8, badge: 'Naturally Ripe' },
  'Orange': { unit: '1 kg', price: 89, originalPrice: 110, rating: 4.8, badge: 'Juicy Citrus' },
  'Guava': { unit: '1 kg', price: 65, originalPrice: 85, rating: 4.7, badge: 'Allahabad Sweet' },
  'Mango': { unit: '1 kg', price: 199, originalPrice: 240, rating: 5.0, badge: 'King of Fruits' },
  'Papaya': { unit: '1 pc (1 kg)', price: 55, originalPrice: 70, rating: 4.7, badge: 'Rich Enzyme' },
  'Pineapple': { unit: '1 pc', price: 79, originalPrice: 95, rating: 4.8, badge: 'Sweet Tropical' },
  'Watermelon': { unit: '1 pc (2.5 kg)', price: 85, originalPrice: 110, rating: 4.9, badge: 'Summer Chill' },
  'Lemon': { unit: '250g (4 pcs)', price: 25, originalPrice: 35, rating: 4.8, badge: 'Vitamin C' },
  'Sweet Lime': { unit: '1 kg', price: 95, originalPrice: 120, rating: 4.8, badge: 'Immune Guard' },
  'Strawberry': { unit: '200g box', price: 110, originalPrice: 140, rating: 4.9, badge: 'Mahabaleshwar' },
  'Blueberry': { unit: '125g box', price: 189, originalPrice: 230, rating: 4.9, badge: 'Antioxidant' },
  'Raspberry': { unit: '125g box', price: 210, originalPrice: 260, rating: 4.8, badge: 'Rare Exotic' },
  'Kiwi': { unit: '3 pcs pack', price: 89, originalPrice: 115, rating: 4.8, badge: 'Green Zespri' },
  'Dragon Fruit': { unit: '1 pc', price: 85, originalPrice: 110, rating: 4.8, badge: 'Pink Superfruit' },
  'Avocado': { unit: '1 pc (200g)', price: 99, originalPrice: 130, rating: 4.9, badge: 'Butter Fruit' },
  'Jackfruit': { unit: '500g cleaned', price: 75, originalPrice: 95, rating: 4.7, badge: 'Seasonal' },

  // Dairy & Eggs
  'Full Cream Milk': { unit: '1 L pouch', price: 68, originalPrice: 75, rating: 4.9, badge: 'Pure Buffalo' },
  'Toned Milk': { unit: '1 L pouch', price: 58, originalPrice: 65, rating: 4.9, badge: 'Daily Cow' },
  'Low-Fat Milk': { unit: '1 L carton', price: 72, originalPrice: 80, rating: 4.8, badge: 'Slim Milk' },
  'Curd': { unit: '500g tub', price: 40, originalPrice: 48, rating: 4.8, badge: 'Thick Dahi' },
  'Greek Yogurt': { unit: '400g tub', price: 85, originalPrice: 100, rating: 4.9, badge: 'High Protein' },
  'Flavoured Yogurt': { unit: '150g cup', price: 35, originalPrice: 42, rating: 4.7, badge: 'Blueberry Swirl' },
  'Paneer': { unit: '200g block', price: 95, originalPrice: 110, rating: 4.9, badge: 'Malai Soft' },
  'Tofu': { unit: '200g pack', price: 75, originalPrice: 90, rating: 4.7, badge: 'Non-GMO Soya' },
  'Butter': { unit: '500g brick', price: 275, originalPrice: 295, rating: 4.9, badge: 'Creamery Salted' },
  'Cheese Slices': { unit: '200g (10 slices)', price: 145, originalPrice: 165, rating: 4.8, badge: 'Cheddar Melt' },
  'Cheese Cubes': { unit: '200g (8 cubes)', price: 139, originalPrice: 155, rating: 4.8, badge: 'Kids Favorite' },
  'Regular Eggs': { unit: '6 pcs pack', price: 52, originalPrice: 60, rating: 4.8, badge: 'Farm Fresh' },
  'Brown Eggs': { unit: '6 pcs pack', price: 85, originalPrice: 95, rating: 4.9, badge: 'Country Hens' },
  'Organic Eggs': { unit: '12 pcs carton', price: 165, originalPrice: 190, rating: 4.9, badge: 'Pasture Raised' },

  // Meat & Seafood
  'Whole Chicken': { unit: '1 kg whole cleaned', price: 230, originalPrice: 270, rating: 4.8, badge: 'Farm Dressed' },
  'Chicken Breast': { unit: '500g boneless', price: 185, originalPrice: 220, rating: 4.9, badge: 'Antibiotic Free' },
  'Chicken Legs': { unit: '500g (4 pcs)', price: 175, originalPrice: 210, rating: 4.8, badge: 'Juicy Drumsticks' },
  'Mutton Curry Cut': { unit: '500g with bone', price: 440, originalPrice: 490, rating: 4.8, badge: 'Tender Goat' },
  'Mutton Boneless': { unit: '500g prime cut', price: 530, originalPrice: 590, rating: 4.9, badge: 'Grass Fed' },
  'Rohu': { unit: '500g bengali cut', price: 190, originalPrice: 230, rating: 4.7, badge: 'Freshwater Fish' },
  'Katla': { unit: '500g large cut', price: 210, originalPrice: 250, rating: 4.8, badge: 'Sweet River' },
  'Seer Fish': { unit: '500g steaks', price: 590, originalPrice: 680, rating: 4.9, badge: 'Vanjaram Premium' },
  'Small Prawns': { unit: '250g peeled', price: 195, originalPrice: 240, rating: 4.8, badge: 'Coastal Catch' },
  'Large Prawns': { unit: '500g cleaned', price: 360, originalPrice: 420, rating: 4.9, badge: 'Tiger Prawns' },
  'Chicken Nuggets': { unit: '400g ready pack', price: 160, originalPrice: 190, rating: 4.8, badge: 'Crispy Snack' },
  'Chicken Kebabs': { unit: '350g marinated', price: 220, originalPrice: 260, rating: 4.9, badge: 'Tandoori Spiced' },

  // Grocery & Staples
  'Basmati Rice': { unit: '1 kg packet', price: 110, originalPrice: 130, rating: 4.9, badge: 'Aged 2 Years' },
  'Sona Masoori': { unit: '5 kg bag', price: 330, originalPrice: 380, rating: 4.8, badge: 'Light & Fluffy' },
  'Brown Rice': { unit: '1 kg pack', price: 95, originalPrice: 115, rating: 4.7, badge: 'High Fiber' },
  'Wheat Atta': { unit: '5 kg bag', price: 245, originalPrice: 280, rating: 4.9, badge: '100% Sharbati' },
  'Maida': { unit: '1 kg', price: 48, originalPrice: 58, rating: 4.7, badge: 'Fine All-Purpose' },
  'Ragi Flour': { unit: '1 kg', price: 58, originalPrice: 70, rating: 4.8, badge: 'Pure Millet' },
  'Toor Dal': { unit: '1 kg', price: 165, originalPrice: 185, rating: 4.8, badge: 'Unpolished' },
  'Moong Dal': { unit: '1 kg', price: 145, originalPrice: 165, rating: 4.8, badge: 'Yellow Split' },
  'Chana Dal': { unit: '1 kg', price: 105, originalPrice: 125, rating: 4.7, badge: 'Protein Rich' },
  'Sunflower Oil': { unit: '1 L bottle', price: 145, originalPrice: 160, rating: 4.8, badge: 'Heart Healthy' },
  'Groundnut Oil': { unit: '1 L can', price: 195, originalPrice: 220, rating: 4.8, badge: 'Cold Pressed' },
  'Ghee': { unit: '500ml jar', price: 340, originalPrice: 380, rating: 4.9, badge: 'Danedar Cow' },
  'Turmeric': { unit: '200g pack', price: 45, originalPrice: 55, rating: 4.9, badge: 'Salem Turmeric' },
  'Chilli Powder': { unit: '200g pack', price: 55, originalPrice: 65, rating: 4.8, badge: 'Guntur Fiery' },
  'Garam Masala': { unit: '100g pack', price: 68, originalPrice: 80, rating: 4.9, badge: '12 Whole Spices' },
  'Sugar': { unit: '1 kg', price: 48, originalPrice: 55, rating: 4.7, badge: 'Sulphur Free' },
  'Rock Salt': { unit: '1 kg', price: 65, originalPrice: 80, rating: 4.8, badge: 'Himalayan Pink' },
  'Iodized Salt': { unit: '1 kg pack', price: 26, originalPrice: 30, rating: 4.8, badge: 'Vacuum Evaporated' },

  // Snacks
  'Potato Chips': { unit: '100g pack', price: 25, originalPrice: 30, rating: 4.7, badge: 'Classic Salted' },
  'Banana Chips': { unit: '200g pack', price: 75, originalPrice: 90, rating: 4.8, badge: 'Coconut Oil Fry' },
  'Nachos': { unit: '150g pack', price: 65, originalPrice: 80, rating: 4.7, badge: 'Cheese Jalapeno' },
  'Cream Biscuits': { unit: '120g pack', price: 35, originalPrice: 40, rating: 4.7, badge: 'Bourbon Choco' },
  'Glucose Biscuits': { unit: '250g pack', price: 25, originalPrice: 30, rating: 4.8, badge: 'Energy Bite' },
  'Cookies': { unit: '200g tin', price: 99, originalPrice: 125, rating: 4.8, badge: 'Butter Choco Chip' },
  'Nuts': { unit: '250g jar', price: 240, originalPrice: 290, rating: 4.9, badge: 'California Almonds' },
  'Dry Fruits': { unit: '250g mix', price: 290, originalPrice: 350, rating: 4.9, badge: 'Cashew & Raisin' },
  'Granola Bars': { unit: 'Pack of 4', price: 120, originalPrice: 150, rating: 4.8, badge: 'Oats & Honey' },
  'Mixture': { unit: '200g pack', price: 48, originalPrice: 60, rating: 4.8, badge: 'South Madras' },
  'Sev': { unit: '200g pack', price: 42, originalPrice: 55, rating: 4.7, badge: 'Crispy Besan' },
  'Bhujia': { unit: '200g pack', price: 50, originalPrice: 65, rating: 4.8, badge: 'Bikaneri Spice' },
  'Chocolates': { unit: '130g bar', price: 85, originalPrice: 100, rating: 4.9, badge: 'Silky Cocoa' },
  'Candy': { unit: '150g pack', price: 35, originalPrice: 45, rating: 4.6, badge: 'Fruity Pop' },
  'Toffee': { unit: '200g pouch', price: 45, originalPrice: 55, rating: 4.7, badge: 'Caramel Chew' },
  'Salted Popcorn': { unit: '85g tub', price: 45, originalPrice: 55, rating: 4.7, badge: 'Theater Style' },
  'Caramel Popcorn': { unit: '100g tub', price: 75, originalPrice: 95, rating: 4.8, badge: 'Sweet Glaze' },

  // Beverages
  'Tea Powder': { unit: '500g pack', price: 190, originalPrice: 220, rating: 4.9, badge: 'Assam CTC' },
  'Green Tea': { unit: '25 tea bags', price: 160, originalPrice: 195, rating: 4.8, badge: 'Darjeeling Detox' },
  'Instant Coffee': { unit: '100g jar', price: 185, originalPrice: 220, rating: 4.8, badge: 'Rich Aroma' },
  'Filter Coffee': { unit: '200g pack', price: 120, originalPrice: 145, rating: 4.9, badge: '80:20 Chicory' },
  'Orange Juice': { unit: '1 L carton', price: 110, originalPrice: 130, rating: 4.8, badge: '100% Pulp' },
  'Apple Juice': { unit: '1 L carton', price: 115, originalPrice: 135, rating: 4.8, badge: 'Cold Pressed' },
  'Mixed Fruit Juice': { unit: '1 L carton', price: 105, originalPrice: 125, rating: 4.8, badge: 'Multivitamin' },
  'Cola': { unit: '750ml bottle', price: 40, originalPrice: 45, rating: 4.7, badge: 'Chilled Fizzy' },
  'Lemon Drink': { unit: '600ml bottle', price: 35, originalPrice: 40, rating: 4.7, badge: 'Zesty Lime' },
  'Energy Drinks': { unit: '250ml can', price: 125, originalPrice: 135, rating: 4.7, badge: 'Caffeine Boost' },
  'Electrolyte Drinks': { unit: '500ml bottle', price: 45, originalPrice: 55, rating: 4.9, badge: 'Tender Coconut' },
  'Packaged Water': { unit: '1 L bottle', price: 20, originalPrice: 20, rating: 4.8, badge: 'Added Minerals' },
  'Sparkling Water': { unit: '500ml bottle', price: 60, originalPrice: 70, rating: 4.8, badge: 'Zero Calorie' },

  // Bakery & Breakfast
  'White Bread': { unit: '400g loaf', price: 38, originalPrice: 42, rating: 4.7, badge: 'Daily Soft' },
  'Brown Bread': { unit: '400g loaf', price: 45, originalPrice: 50, rating: 4.8, badge: 'Whole Wheat' },
  'Multigrain Bread': { unit: '400g loaf', price: 55, originalPrice: 65, rating: 4.9, badge: '7 Grains & Seeds' },
  'Burger Buns': { unit: 'Pack of 2', price: 30, originalPrice: 35, rating: 4.7, badge: 'Sesame Seed' },
  'Pav': { unit: 'Pack of 6', price: 32, originalPrice: 38, rating: 4.8, badge: 'Fluffy Soft' },
  'Dinner Rolls': { unit: 'Pack of 4', price: 40, originalPrice: 48, rating: 4.7, badge: 'Butter Crust' },
  'Cake': { unit: '350g loaf', price: 125, originalPrice: 150, rating: 4.8, badge: 'Plum & Fruit' },
  'Pastry': { unit: '2 pcs pack', price: 95, originalPrice: 120, rating: 4.8, badge: 'Dutch Truffle' },
  'Muffins': { unit: 'Pack of 2', price: 65, originalPrice: 80, rating: 4.7, badge: 'Choco Chip' },
  'Corn Flakes': { unit: '500g box', price: 135, originalPrice: 160, rating: 4.8, badge: 'Crispy Golden' },
  'Muesli': { unit: '400g jar', price: 230, originalPrice: 275, rating: 4.9, badge: 'Fruits & Nuts' },
  'Oats': { unit: '1 kg pouch', price: 155, originalPrice: 185, rating: 4.9, badge: '100% Rolled' },
  'Peanut Butter': { unit: '350g jar', price: 165, originalPrice: 195, rating: 4.9, badge: 'Creamy Roast' },
  'Jam': { unit: '500g bottle', price: 135, originalPrice: 155, rating: 4.8, badge: 'Mixed Fruit' },
  'Chocolate Spread': { unit: '350g jar', price: 285, originalPrice: 320, rating: 4.9, badge: 'Hazelnut Cocoa' },

  // Household Essentials
  'Floor Cleaner': { unit: '1 L bottle', price: 165, originalPrice: 195, rating: 4.8, badge: 'Citrus Fresh' },
  'Toilet Cleaner': { unit: '750ml bottle', price: 110, originalPrice: 130, rating: 4.8, badge: 'Power Disinfect' },
  'Dishwash Liquid': { unit: '750ml bottle', price: 145, originalPrice: 170, rating: 4.9, badge: 'Lemon Tough' },
  'Dishwash Bar': { unit: 'Pack of 3', price: 45, originalPrice: 54, rating: 4.7, badge: 'Anti-Grease' },
  'Detergent': { unit: '1 kg powder', price: 180, originalPrice: 210, rating: 4.8, badge: 'Stain Eraser' },
  'Fabric Softener': { unit: '800ml bottle', price: 175, originalPrice: 205, rating: 4.8, badge: 'Spring Blossom' },
  'Tissue Paper': { unit: 'Pack of 2 (100 pulls)', price: 75, originalPrice: 90, rating: 4.8, badge: '3-Ply Ultra' },
  'Kitchen Towels': { unit: 'Pack of 2 rolls', price: 85, originalPrice: 105, rating: 4.8, badge: 'High Absorb' },
  'Garbage Bags': { unit: '30 bags roll (Medium)', price: 89, originalPrice: 110, rating: 4.7, badge: 'Biodegradable' },
  'Foil': { unit: '18m roll', price: 95, originalPrice: 120, rating: 4.8, badge: 'Heavy Duty Food' },
  'Food Storage Bags': { unit: '20 zip bags', price: 79, originalPrice: 99, rating: 4.8, badge: 'Freezer Safe' },

  // Personal Care
  'Soap': { unit: 'Pack of 4 (100g)', price: 140, originalPrice: 165, rating: 4.8, badge: 'Shea Butter' },
  'Body Wash': { unit: '250ml bottle', price: 175, originalPrice: 210, rating: 4.8, badge: 'Almond Milk' },
  'Shampoo': { unit: '340ml bottle', price: 235, originalPrice: 275, rating: 4.8, badge: 'Anti-Dandruff' },
  'Conditioner': { unit: '180ml tube', price: 165, originalPrice: 195, rating: 4.8, badge: 'Smooth Keratin' },
  'Hair Oil': { unit: '200ml bottle', price: 115, originalPrice: 135, rating: 4.9, badge: 'Pure Coconut' },
  'Toothpaste': { unit: '150g tube', price: 88, originalPrice: 105, rating: 4.8, badge: 'Herbal Cavity' },
  'Toothbrush': { unit: 'Pack of 2', price: 65, originalPrice: 80, rating: 4.7, badge: 'Soft Charcoal' },
  'Mouthwash': { unit: '250ml bottle', price: 125, originalPrice: 150, rating: 4.8, badge: 'Cool Mint' },
  'Face Wash': { unit: '100ml tube', price: 135, originalPrice: 165, rating: 4.8, badge: 'Tea Tree Neem' },
  'Moisturizer': { unit: '200ml lotion', price: 185, originalPrice: 220, rating: 4.9, badge: '24hr Hydration' },
  'Hand Wash': { unit: '500ml pump bottle', price: 119, originalPrice: 145, rating: 4.8, badge: 'Germ Defense' },
  'Hand Sanitizer': { unit: '200ml bottle', price: 79, originalPrice: 99, rating: 4.8, badge: '70% Alcohol' },

  // Baby Care
  'Diaper Pants': { unit: 'Large (34 pcs)', price: 449, originalPrice: 520, rating: 4.9, badge: '12hr Absorption' },
  'Wet Wipes': { unit: '72 wipes pack', price: 95, originalPrice: 120, rating: 4.8, badge: 'Aloe Infused' },
  'Infant Formula': { unit: '400g tin', price: 480, originalPrice: 520, rating: 4.9, badge: 'Immunity Nutri' },
  'Baby Cereal': { unit: '300g box', price: 175, originalPrice: 195, rating: 4.8, badge: 'Rice & Veggies' },
  'Fruit Puree': { unit: '100g pouch', price: 65, originalPrice: 80, rating: 4.8, badge: 'Apple Banana' },
  'Baby Shampoo': { unit: '200ml bottle', price: 160, originalPrice: 190, rating: 4.9, badge: 'No More Tears' },
  'Baby Lotion': { unit: '200ml bottle', price: 175, originalPrice: 210, rating: 4.9, badge: 'Gentle Care' },
  'Massage Oil': { unit: '200ml bottle', price: 195, originalPrice: 230, rating: 4.9, badge: 'Almond & Olive' },

  // Pet Care
  'Dry Dog Kibble': { unit: '3 kg bag', price: 699, originalPrice: 820, rating: 4.9, badge: 'Real Chicken' },
  'Chicken Chew Treats': { unit: '200g pack', price: 185, originalPrice: 220, rating: 4.8, badge: 'Dental Health' },
  'Dog Biscuits': { unit: '500g box', price: 140, originalPrice: 165, rating: 4.8, badge: 'Calcium Rich' },
  'Tuna Wet Cat Food': { unit: 'Pack of 4 pouches', price: 190, originalPrice: 225, rating: 4.9, badge: 'Tender Flakes' },
  'Catnip Crunchies': { unit: '150g pack', price: 110, originalPrice: 135, rating: 4.8, badge: 'Treat Bites' },
  'Pet Shampoo': { unit: '250ml bottle', price: 210, originalPrice: 250, rating: 4.8, badge: 'Tick Defense' },
  'Odor Neutralizer': { unit: '300ml spray', price: 180, originalPrice: 215, rating: 4.7, badge: 'Lavender Fresh' },
  'Cat Litter': { unit: '5 kg bag', price: 340, originalPrice: 395, rating: 4.8, badge: 'Clumping Bentonite' },

  // Organic & Gourmet
  'Organic Brown Sugar': { unit: '1 kg packet', price: 95, originalPrice: 120, rating: 4.8, badge: 'Natural Jaggery' },
  'Cold-Pressed Virgin Olive Oil': { unit: '500ml bottle', price: 460, originalPrice: 530, rating: 4.9, badge: 'Extra Virgin' },
  'Quinoa': { unit: '500g pack', price: 175, originalPrice: 210, rating: 4.8, badge: 'Organic Grain' },
  'Artisan Gouda': { unit: '200g wedge', price: 260, originalPrice: 310, rating: 4.9, badge: 'Aged 6 Months' },
  'Salsa Dip': { unit: '250g jar', price: 135, originalPrice: 160, rating: 4.8, badge: 'Chunky Mexican' },
  'Hummus': { unit: '200g tub', price: 155, originalPrice: 180, rating: 4.9, badge: 'Tahini Olive' },
  'Chia Seeds': { unit: '200g jar', price: 145, originalPrice: 175, rating: 4.9, badge: 'Omega 3 Super' },
  'Flax Seeds': { unit: '250g pack', price: 75, originalPrice: 95, rating: 4.8, badge: 'Roasted' },
  'Pumpkin Seeds': { unit: '150g pack', price: 160, originalPrice: 195, rating: 4.9, badge: 'Raw Shelled' },

  // Frozen & Ready-to-Eat
  'Frozen Green Peas': { unit: '1 kg pouch', price: 110, originalPrice: 135, rating: 4.8, badge: 'Garden Sweet' },
  'French Fries': { unit: '450g pack', price: 115, originalPrice: 140, rating: 4.8, badge: 'Crispy Cut' },
  'Sweet Corn': { unit: '500g pack', price: 85, originalPrice: 105, rating: 4.8, badge: 'American Kernel' },
  'Instant Paneer Butter Masala': { unit: '300g heat & eat', price: 125, originalPrice: 150, rating: 4.9, badge: 'Ready in 3 Mins' },
  'Dal Makhani Heat & Eat': { unit: '300g heat & eat', price: 105, originalPrice: 130, rating: 4.8, badge: 'Slow Cooked' },
  'Malabar Paratha': { unit: 'Pack of 5', price: 85, originalPrice: 100, rating: 4.8, badge: 'Flaky Layers' },
  'Garlic Naan': { unit: 'Pack of 4', price: 95, originalPrice: 115, rating: 4.8, badge: 'Clay Oven Baked' },
  'Veg Spring Rolls': { unit: '6 pcs pack', price: 135, originalPrice: 160, rating: 4.7, badge: 'Crunchy Rolls' },

  // Kitchen & Home Utility
  'Non-Stick Fry Pan': { unit: '24cm induction base', price: 549, originalPrice: 699, rating: 4.8, badge: '3-Layer Granite' },
  'Steel Water Bottle': { unit: '750ml insulated', price: 349, originalPrice: 450, rating: 4.9, badge: 'Hot & Cold 12h' },
  'Glass Container Set': { unit: 'Set of 3 (Airtight)', price: 399, originalPrice: 520, rating: 4.9, badge: 'Microwave Safe' },
  'Aluminium Foil Roll': { unit: '20m food grade', price: 110, originalPrice: 135, rating: 4.8, badge: 'Keeps Fresh' },
  'Food Storage Containers': { unit: 'Set of 4 (BPA Free)', price: 249, originalPrice: 320, rating: 4.8, badge: 'Stackable' },
  'Cling Film': { unit: '30m roll', price: 85, originalPrice: 105, rating: 4.8, badge: 'Moisture Lock' },
  'Microfiber Cleaning Cloth': { unit: 'Pack of 4', price: 145, originalPrice: 180, rating: 4.9, badge: 'Scratch Free' },
  'Scrub Sponges': { unit: 'Pack of 3', price: 49, originalPrice: 60, rating: 4.8, badge: 'Heavy Duty Scrub' }
};

// Generate full catalog of individual items organized with unique IDs and categories
export const GENERATED_CATEGORY_PRODUCTS = MAIN_CATEGORIES_15.flatMap((cat) => {
  return cat.subcategories.flatMap((sub) => {
    return sub.items.map((itemName, idx) => {
      const details = ITEM_DETAILS_MAP[itemName] || {
        unit: '1 standard pack',
        price: 99,
        originalPrice: 120,
        rating: 4.8,
        badge: 'Quality Assured'
      };
      const img = ITEM_IMAGES[itemName] || cat.image;
      const id = `catitem-${cat.slug}-${itemName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${idx}`;
      
      const discountPercent = Math.round(((details.originalPrice - details.price) / details.originalPrice) * 100);

      return {
        id,
        name: itemName,
        category: cat.name,
        categoryId: cat.id,
        categorySlug: cat.slug,
        categoryNumber: cat.number,
        subCategory: sub.name,
        unit: details.unit,
        price: details.price,
        originalPrice: details.originalPrice,
        discountTag: `${discountPercent}% OFF`,
        badge: details.badge,
        rating: details.rating,
        reviews: Math.floor(60 + (idx * 27) + (cat.number * 13)),
        image: img,
        inStock: true
      };
    });
  });
});
