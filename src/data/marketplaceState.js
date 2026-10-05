// GreenCart Smart Multi-Vendor Commerce Engine State Manager
// Handles Sellers, Delivery Fleet, Admin Moderation, Smart Intelligence & Persistence

export const DEFAULT_COMMISSION_RATES = {
  'Vegetables & Fruits': 8,
  'Dairy Products': 8,
  'Bakery & Breakfast': 10,
  'Meat & Seafood': 12,
  'Groceries & Spices': 8,
  'Snacks & Beverages': 10,
  'Household & Cleaning': 10
};

export const INITIAL_SELLERS = [
  {
    id: 'seller-nilgiris',
    businessName: 'Nilgiris Organic Farms',
    ownerName: 'K. Subramanian',
    email: 'subramanian@nilgirisfarms.in',
    phone: '+91 94432 88102',
    category: 'Vegetables & Fruits',
    address: 'Kotagiri Road, Ooty (Branch: Gandhipuram Hub, Coimbatore)',
    pincode: '641012',
    description: 'Direct farm harvest of Ooty mountain carrots, beetroot, fresh broccoli and crisp greens.',
    fssaiLicense: 'FSSAI-12423002000412',
    status: 'approved', // 'approved' | 'pending_approval' | 'rejected'
    rating: 4.9,
    commissionRate: 8,
    grossSales: 64200,
    commissionPaid: 5136,
    netEarnings: 59064,
    pendingPayout: 4800,
    totalOrders: 148,
    completedOrders: 146,
    dispatchSla: '99.2%',
    activeProducts: 14,
    joinedDate: '12 Aug 2026',
    bankAccount: 'HDFC •••• 4092'
  },
  {
    id: 'seller-aavin',
    businessName: 'Aavin Dairy Producers Co-op',
    ownerName: 'R. Meenakshi',
    email: 'meenakshi@aavindairy.coop',
    phone: '+91 98421 55670',
    category: 'Dairy Products',
    address: 'Sathy Road Milk Chilling Center, Coimbatore',
    pincode: '641006',
    description: 'Fresh pasteurized farm milk, butter, rich curd, paneer and ghee chilled within 2 hours of milking.',
    fssaiLicense: 'FSSAI-12421001000889',
    status: 'approved',
    rating: 4.8,
    commissionRate: 8,
    grossSales: 89400,
    commissionPaid: 7152,
    netEarnings: 82248,
    pendingPayout: 7500,
    totalOrders: 215,
    completedOrders: 212,
    dispatchSla: '99.5%',
    activeProducts: 9,
    joinedDate: '01 Jul 2026',
    bankAccount: 'SBI •••• 9812'
  },
  {
    id: 'seller-kovai-bakes',
    businessName: 'Kovai Artisanal Bakehouse',
    ownerName: 'Arun Paul',
    email: 'arun@kovaibakes.com',
    phone: '+91 97890 33412',
    category: 'Bakery & Breakfast',
    address: '142 D.B. Road, R.S. Puram, Coimbatore',
    pincode: '641002',
    description: 'Stone-ground sourdough bread, whole wheat pav buns, muffins, and morning fresh teacakes.',
    fssaiLicense: 'FSSAI-12422003001290',
    status: 'approved',
    rating: 4.7,
    commissionRate: 10,
    grossSales: 34100,
    commissionPaid: 3410,
    netEarnings: 30690,
    pendingPayout: 2800,
    totalOrders: 94,
    completedOrders: 91,
    dispatchSla: '98.8%',
    activeProducts: 8,
    joinedDate: '18 Sep 2026',
    bankAccount: 'Axis •••• 6120'
  },
  {
    id: 'seller-kongu-meat',
    businessName: 'Kongu Fresh Country Meats',
    ownerName: 'Senthil Nathan',
    email: 'senthil@kongumeats.in',
    phone: '+91 99441 77823',
    category: 'Meat & Seafood',
    address: 'Near Central Bus Stand, Gandhipuram, Coimbatore',
    pincode: '641012',
    description: 'Chemical-free fresh country chicken, tender curry-cut mutton, and coastal fresh fish daily.',
    fssaiLicense: 'FSSAI-12423004000311',
    status: 'approved',
    rating: 4.8,
    commissionRate: 12,
    grossSales: 51200,
    commissionPaid: 6144,
    netEarnings: 45056,
    pendingPayout: 5200,
    totalOrders: 112,
    completedOrders: 110,
    dispatchSla: '99.1%',
    activeProducts: 6,
    joinedDate: '25 Aug 2026',
    bankAccount: 'Canara •••• 3341'
  },
  {
    id: 'seller-pollachi-agro',
    businessName: 'Pollachi Virgin Coconut & Spices',
    ownerName: 'V. Thangavel',
    email: 'thangavel@pollachicoconut.com',
    phone: '+91 96552 11904',
    category: 'Groceries & Spices',
    address: 'Palakkad Main Road, Pollachi',
    pincode: '642001',
    description: 'Cold-pressed virgin coconut oil, traditional ground spices, palm jaggery, and tender coconuts.',
    fssaiLicense: 'FSSAI-12424005001188',
    status: 'pending_approval',
    rating: 5.0,
    commissionRate: 8,
    grossSales: 0,
    commissionPaid: 0,
    netEarnings: 0,
    pendingPayout: 0,
    totalOrders: 0,
    completedOrders: 0,
    dispatchSla: '100%',
    activeProducts: 3,
    joinedDate: 'Just now',
    bankAccount: 'IOB •••• 5521'
  }
];

export const INITIAL_DELIVERY_AGENTS = [
  {
    id: 'rider-101',
    name: 'Ravi Kumar',
    agentCode: 'DA-101',
    phone: '+91 98421 11021',
    vehicle: 'Ather 450X (Electric Scooter)',
    vehicleNumber: 'TN 38 BX 4821',
    status: 'busy', // 'available' | 'busy' | 'offline'
    dutyStatus: 'online', // 'online' | 'offline'
    currentArea: 'Gandhipuram, Coimbatore',
    activeOrderId: 'GC-84920',
    todayEarnings: 540,
    completedToday: 8,
    rating: 4.9,
    trips: [
      { orderId: 'GC-84920', fee: 45, status: 'In Transit', time: '10:35 AM' },
      { orderId: 'GC-73194', fee: 40, status: 'Delivered', time: '09:50 AM' },
      { orderId: 'GC-71082', fee: 40, status: 'Delivered', time: '09:12 AM' }
    ]
  },
  {
    id: 'rider-102',
    name: 'Praveen Soundar',
    agentCode: 'DA-102',
    phone: '+91 97890 22345',
    vehicle: 'TVS iQube (Electric Scooter)',
    vehicleNumber: 'TN 37 CY 9012',
    status: 'available',
    dutyStatus: 'online',
    currentArea: 'Gandhipuram / R.S. Puram',
    activeOrderId: null,
    todayEarnings: 420,
    completedToday: 7,
    rating: 4.8,
    trips: []
  },
  {
    id: 'rider-103',
    name: 'Karthik Mohan',
    agentCode: 'DA-103',
    phone: '+91 99443 33456',
    vehicle: 'Honda Activa 6G',
    vehicleNumber: 'TN 66 AB 1928',
    status: 'available',
    dutyStatus: 'online',
    currentArea: 'Peelamedu & Hopes College',
    activeOrderId: null,
    todayEarnings: 360,
    completedToday: 6,
    rating: 4.7,
    trips: []
  },
  {
    id: 'rider-104',
    name: 'Murugan Raja',
    agentCode: 'DA-104',
    phone: '+91 96551 44567',
    vehicle: 'Ola S1 Pro',
    vehicleNumber: 'TN 38 CZ 7741',
    status: 'offline',
    dutyStatus: 'offline',
    currentArea: 'Saravanampatti Hub',
    activeOrderId: null,
    todayEarnings: 0,
    completedToday: 0,
    rating: 4.9,
    trips: []
  }
];

export const INITIAL_MARKETPLACE_PRODUCTS = [
  {
    id: 'prod-ooty-carrot',
    name: 'Ooty Sweet Crisp Carrots',
    sellerId: 'seller-nilgiris',
    sellerName: 'Nilgiris Organic Farms',
    category: 'Vegetables & Fruits',
    subCategory: 'Root Vegetables',
    price: 45,
    originalPrice: 60,
    discount: '25% OFF',
    unit: '500g pack',
    stock: 14, // Low stock simulation
    avgDailySales: 10,
    expiryDays: 4,
    status: 'approved',
    saveFoodDiscount: false,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=400&q=80',
    description: 'Crisp mountain carrots harvested directly from Ooty high-altitude organic terraces.',
    organic: true
  },
  {
    id: 'prod-aavin-milk',
    name: 'Aavin Nice Toned Milk (Blue Pouch)',
    sellerId: 'seller-aavin',
    sellerName: 'Aavin Dairy Producers Co-op',
    category: 'Dairy Products',
    subCategory: 'Fresh Milk',
    price: 23,
    originalPrice: 25,
    discount: 'Save ₹2',
    unit: '500ml pouch',
    stock: 45,
    avgDailySales: 35,
    expiryDays: 1, // Expiry alert simulation!
    status: 'approved',
    saveFoodDiscount: true, // Auto recommended offer!
    saveFoodPrice: 19,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80',
    description: 'Fresh pasteurized homogenized toned milk with 3.0% fat and 8.5% SNF.',
    organic: false
  },
  {
    id: 'prod-sourdough-bread',
    name: 'Artisan Whole Wheat Sourdough Bread',
    sellerId: 'seller-kovai-bakes',
    sellerName: 'Kovai Artisanal Bakehouse',
    category: 'Bakery & Breakfast',
    subCategory: 'Breads & Loaves',
    price: 65,
    originalPrice: 85,
    discount: '23% OFF',
    unit: '400g loaf',
    stock: 18,
    avgDailySales: 12,
    expiryDays: 2,
    status: 'approved',
    saveFoodDiscount: false,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80',
    description: 'Naturally fermented 24-hour slow proofed artisan bread with golden crisp crust.',
    organic: true
  },
  {
    id: 'prod-country-chicken',
    name: 'Fresh Country Chicken Curry Cut',
    sellerId: 'seller-kongu-meat',
    sellerName: 'Kongu Fresh Country Meats',
    category: 'Meat & Seafood',
    subCategory: 'Poultry & Meat',
    price: 260,
    originalPrice: 310,
    discount: '16% OFF',
    unit: '500g pack',
    stock: 8, // Very low stock
    avgDailySales: 7,
    expiryDays: 1,
    status: 'approved',
    saveFoodDiscount: false,
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=400&q=80',
    description: 'Tender free-range village chicken cut into juicy curry pieces, cleaned and vacuum sealed.',
    organic: true
  },
  {
    id: 'prod-pollachi-oil-pending',
    name: 'Cold-Pressed Virgin Coconut Oil',
    sellerId: 'seller-pollachi-agro',
    sellerName: 'Pollachi Virgin Coconut & Spices',
    category: 'Groceries & Spices',
    subCategory: 'Oils & Ghee',
    price: 280,
    originalPrice: 340,
    discount: '18% OFF',
    unit: '1 L glass bottle',
    stock: 50,
    avgDailySales: 8,
    expiryDays: 180,
    status: 'pending_approval', // Pending Admin Moderation!
    saveFoodDiscount: false,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80',
    description: 'Traditional wood-pressed virgin coconut oil pressed from sun-dried Pollachi copra.',
    organic: true
  },
  {
    id: 'prod-organic-spinach',
    name: 'Farm Fresh Organic Palak Spinach',
    sellerId: 'seller-nilgiris',
    sellerName: 'Nilgiris Organic Farms',
    category: 'Vegetables & Fruits',
    subCategory: 'Greens & Herbs',
    price: 25,
    originalPrice: 35,
    discount: '28% OFF',
    unit: '250g bunch',
    stock: 6, // Low stock & expiring soon
    avgDailySales: 8,
    expiryDays: 1,
    status: 'approved',
    saveFoodDiscount: true,
    saveFoodPrice: 18,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=400&q=80',
    description: 'Crisp pesticide-free tender palak leaves plucked fresh at 5:00 AM.',
    organic: true
  }
];

export const INITIAL_MARKETPLACE_ORDERS = [
  {
    orderId: 'GC-84920',
    customerName: 'Shyam Sundar',
    customerPhone: '+91 98765 43210',
    address: 'Flat 402, Green Meadows, Cross Cut Road, Gandhipuram, Coimbatore (641012)',
    area: 'Gandhipuram',
    paymentMethod: 'UPI (GooglePay)',
    placedAt: '10:15 AM',
    date: 'Today',
    status: 'out_for_delivery', // 'placed' | 'accepted' | 'preparing' | 'ready_for_pickup' | 'out_for_delivery' | 'delivered' | 'failed_attempt'
    deliveryOtp: '4826', // Simulated OTP for rider verification
    assignedRiderId: 'rider-101',
    assignedRiderName: 'Ravi Kumar',
    totalAmount: 328,
    savings: 65,
    deliveryEta: '12 mins',
    // Smart Multi-Vendor Order Splitter Representation
    isSplitOrder: true,
    subOrders: [
      {
        subOrderId: 'GC-84920-A',
        sellerId: 'seller-aavin',
        sellerName: 'Aavin Dairy Producers Co-op',
        sellerCategory: 'Dairy Products',
        status: 'ready_for_pickup',
        commissionRate: 8,
        items: [
          { id: 'prod-aavin-milk', name: 'Aavin Nice Toned Milk (Blue Pouch)', unit: '500ml pouch', price: 23, quantity: 2, total: 46 }
        ],
        subtotal: 46,
        commission: 3.68,
        sellerPayout: 42.32
      },
      {
        subOrderId: 'GC-84920-B',
        sellerId: 'seller-nilgiris',
        sellerName: 'Nilgiris Organic Farms',
        sellerCategory: 'Vegetables & Fruits',
        status: 'out_for_delivery',
        commissionRate: 8,
        items: [
          { id: 'prod-ooty-carrot', name: 'Ooty Sweet Crisp Carrots', unit: '500g pack', price: 45, quantity: 1, total: 45 },
          { id: 'prod-organic-spinach', name: 'Farm Fresh Organic Palak Spinach', unit: '250g bunch', price: 25, quantity: 1, total: 25 }
        ],
        subtotal: 70,
        commission: 5.60,
        sellerPayout: 64.40
      },
      {
        subOrderId: 'GC-84920-C',
        sellerId: 'seller-kongu-meat',
        sellerName: 'Kongu Fresh Country Meats',
        sellerCategory: 'Meat & Seafood',
        status: 'out_for_delivery',
        commissionRate: 12,
        items: [
          { id: 'prod-country-chicken', name: 'Fresh Country Chicken Curry Cut', unit: '500g pack', price: 260, quantity: 1, total: 260 }
        ],
        subtotal: 260,
        commission: 31.20,
        sellerPayout: 228.80
      }
    ],
    deliveryBatchId: 'BATCH-GANDHI-01',
    deliveryProof: null
  },
  {
    orderId: 'GC-91024',
    customerName: 'Ananya Ramesh',
    customerPhone: '+91 97899 12340',
    address: 'Villa 18, Brookefields Enclave, R.S. Puram, Coimbatore (641002)',
    area: 'R.S. Puram',
    paymentMethod: 'Credit Card',
    placedAt: '10:40 AM',
    date: 'Today',
    status: 'preparing',
    deliveryOtp: '7193',
    assignedRiderId: 'rider-102',
    assignedRiderName: 'Praveen Soundar',
    totalAmount: 195,
    savings: 40,
    deliveryEta: '22 mins',
    isSplitOrder: true,
    subOrders: [
      {
        subOrderId: 'GC-91024-A',
        sellerId: 'seller-kovai-bakes',
        sellerName: 'Kovai Artisanal Bakehouse',
        sellerCategory: 'Bakery & Breakfast',
        status: 'preparing',
        commissionRate: 10,
        items: [
          { id: 'prod-sourdough-bread', name: 'Artisan Whole Wheat Sourdough Bread', unit: '400g loaf', price: 65, quantity: 2, total: 130 }
        ],
        subtotal: 130,
        commission: 13.00,
        sellerPayout: 117.00
      },
      {
        subOrderId: 'GC-91024-B',
        sellerId: 'seller-aavin',
        sellerName: 'Aavin Dairy Producers Co-op',
        sellerCategory: 'Dairy Products',
        status: 'accepted',
        commissionRate: 8,
        items: [
          { id: 'prod-aavin-milk', name: 'Aavin Nice Toned Milk (Blue Pouch)', unit: '500ml pouch', price: 23, quantity: 2, total: 46 }
        ],
        subtotal: 46,
        commission: 3.68,
        sellerPayout: 42.32
      }
    ],
    deliveryBatchId: null,
    deliveryProof: null
  },
  {
    orderId: 'GC-73194',
    customerName: 'Dr. Vignesh Kumar',
    customerPhone: '+91 94433 77123',
    address: 'Apartment 3B, Mayflower Sakthi, Peelamedu, Coimbatore (641004)',
    area: 'Peelamedu',
    paymentMethod: 'UPI',
    placedAt: 'Yesterday 5:40 PM',
    date: 'Yesterday',
    status: 'delivered',
    deliveryOtp: '5519',
    assignedRiderId: 'rider-101',
    assignedRiderName: 'Ravi Kumar',
    totalAmount: 550,
    savings: 65,
    deliveryEta: 'Delivered',
    isSplitOrder: false,
    subOrders: [
      {
        subOrderId: 'GC-73194-A',
        sellerId: 'seller-nilgiris',
        sellerName: 'Nilgiris Organic Farms',
        sellerCategory: 'Vegetables & Fruits',
        status: 'delivered',
        commissionRate: 8,
        items: [
          { id: 'prod-ooty-carrot', name: 'Ooty Sweet Crisp Carrots', unit: '500g pack', price: 45, quantity: 2, total: 90 },
          { id: 'prod-country-chicken', name: 'Fresh Country Chicken Curry Cut', unit: '500g pack', price: 260, quantity: 1, total: 260 }
        ],
        subtotal: 350,
        commission: 28.00,
        sellerPayout: 322.00
      }
    ],
    deliveryProof: {
      deliveredAt: 'Yesterday 6:02 PM',
      verifiedBy: 'Ravi Kumar (DA-101)',
      otpVerified: true,
      signature: 'DIGITAL_CONFIRM_4826'
    }
  },
  {
    orderId: 'GC-71082',
    customerName: 'Pooja Sundaram',
    customerPhone: '+91 97901 88452',
    address: '14/B, Avinashi Road, Peelamedu, Coimbatore (641004)',
    area: 'Peelamedu',
    paymentMethod: 'Card (Visa)',
    placedAt: 'Yesterday 8:30 AM',
    date: 'Yesterday',
    status: 'delivered',
    deliveryOtp: '3941',
    assignedRiderId: 'rider-101',
    assignedRiderName: 'Ravi Kumar',
    totalAmount: 423,
    savings: 55,
    deliveryEta: 'Delivered',
    isSplitOrder: true,
    subOrders: [
      {
        subOrderId: 'GC-71082-A',
        sellerId: 'seller-kovai-bakes',
        sellerName: 'Kovai Artisanal Bakehouse',
        sellerCategory: 'Bakery & Breakfast',
        status: 'delivered',
        commissionRate: 10,
        items: [
          { id: 'prod-sourdough-bread', name: 'Artisan Whole Wheat Sourdough Bread', unit: '400g loaf', price: 65, quantity: 3, total: 195 }
        ],
        subtotal: 195,
        commission: 19.50,
        sellerPayout: 175.50
      },
      {
        subOrderId: 'GC-71082-B',
        sellerId: 'seller-aavin',
        sellerName: 'Aavin Dairy Producers Co-op',
        sellerCategory: 'Dairy Products',
        status: 'delivered',
        commissionRate: 8,
        items: [
          { id: 'prod-aavin-milk', name: 'Aavin Nice Toned Milk (Blue Pouch)', unit: '500ml pouch', price: 23, quantity: 6, total: 138 }
        ],
        subtotal: 138,
        commission: 11.04,
        sellerPayout: 126.96
      },
      {
        subOrderId: 'GC-71082-C',
        sellerId: 'seller-nilgiris',
        sellerName: 'Nilgiris Organic Farms',
        sellerCategory: 'Vegetables & Fruits',
        status: 'delivered',
        commissionRate: 8,
        items: [
          { id: 'prod-ooty-carrot', name: 'Ooty Sweet Crisp Carrots', unit: '500g pack', price: 45, quantity: 2, total: 90 }
        ],
        subtotal: 90,
        commission: 7.20,
        sellerPayout: 82.80
      }
    ],
    deliveryBatchId: 'BATCH-PEELAMEDU-03',
    deliveryProof: {
      deliveredAt: 'Yesterday 9:12 AM',
      verifiedBy: 'Ravi Kumar (DA-101)',
      otpVerified: true,
      signature: 'DIGITAL_CONFIRM_3941'
    }
  },
  {
    orderId: 'GC-68910',
    customerName: 'Karthikeyan Balan',
    customerPhone: '+91 94421 66109',
    address: 'Flat 204, Royal Palms, Race Course, Coimbatore (641018)',
    area: 'Race Course',
    paymentMethod: 'UPI (Paytm)',
    placedAt: '2 days ago, 11:20 AM',
    date: '27 Sep 2026',
    status: 'delivered',
    deliveryOtp: '8204',
    assignedRiderId: 'rider-102',
    assignedRiderName: 'Praveen Soundar',
    totalAmount: 680,
    savings: 90,
    deliveryEta: 'Delivered',
    isSplitOrder: true,
    subOrders: [
      {
        subOrderId: 'GC-68910-A',
        sellerId: 'seller-kongu-meat',
        sellerName: 'Kongu Fresh Country Meats',
        sellerCategory: 'Meat & Seafood',
        status: 'delivered',
        commissionRate: 12,
        items: [
          { id: 'prod-country-chicken', name: 'Fresh Country Chicken Curry Cut', unit: '500g pack', price: 260, quantity: 2, total: 520 }
        ],
        subtotal: 520,
        commission: 62.40,
        sellerPayout: 457.60
      },
      {
        subOrderId: 'GC-68910-B',
        sellerId: 'seller-nilgiris',
        sellerName: 'Nilgiris Organic Farms',
        sellerCategory: 'Vegetables & Fruits',
        status: 'delivered',
        commissionRate: 8,
        items: [
          { id: 'prod-organic-spinach', name: 'Farm Fresh Organic Palak Spinach', unit: '250g bunch', price: 25, quantity: 4, total: 100 },
          { id: 'prod-ooty-carrot', name: 'Ooty Sweet Crisp Carrots', unit: '500g pack', price: 45, quantity: 1, total: 45 }
        ],
        subtotal: 145,
        commission: 11.60,
        sellerPayout: 133.40
      }
    ],
    deliveryBatchId: 'BATCH-RACECOURSE-01',
    deliveryProof: {
      deliveredAt: '27 Sep 2026, 11:48 AM',
      verifiedBy: 'Praveen Soundar (DA-102)',
      otpVerified: true,
      signature: 'DIGITAL_CONFIRM_8204'
    }
  }
];

// Helper to safely load from localStorage
export const loadMarketplaceState = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    if (/[\u0B80-\u0BFF]/.test(item)) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(item);
  } catch (e) {
    console.error(`Error loading ${key} from storage:`, e);
    return fallback;
  }
};

// Helper to save to localStorage and broadcast event
export const saveMarketplaceState = (key, data, broadcastType = 'state_change') => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('greencart_store_updated', {
      detail: { key, type: broadcastType }
    }));
  } catch (e) {
    console.error(`Error saving ${key} to storage:`, e);
  }
};

// Product substitution map for when items run out of stock
export const PRODUCT_SUBSTITUTES_MAP = {
  'prod-aavin-milk': [
    { id: 'sub-milma', name: 'Milma Smart Homogenised Milk (500ml)', price: 26, seller: 'Aavin Dairy Co-op' },
    { id: 'sub-heritage', name: 'Heritage Daily Health Milk (500ml)', price: 27, seller: 'Nilgiris Organics' },
    { id: 'sub-amul', name: 'Amul Taaza Fresh Toned Milk (500ml)', price: 28, seller: 'Kovai Bakes' }
  ],
  'prod-ooty-carrot': [
    { id: 'sub-baby-carrot', name: 'Farm Baby Carrots (400g)', price: 50, seller: 'Nilgiris Organic Farms' },
    { id: 'sub-local-carrot', name: 'Native Red Carrots (500g)', price: 40, seller: 'Nilgiris Organic Farms' }
  ],
  'prod-sourdough-bread': [
    { id: 'sub-brown-bread', name: 'Whole Wheat 100% Brown Bread (400g)', price: 45, seller: 'Kovai Artisanal Bakehouse' },
    { id: 'sub-multigrain', name: 'Multigrain 7-Seeds Sourdough Loaf (400g)', price: 75, seller: 'Kovai Artisanal Bakehouse' }
  ]
};

// Recipe health analyzer rule database
export const RECIPE_HEALTH_MAP = [
  {
    recipeName: 'Chicken Biryani',
    requiredItems: ['rice', 'chicken', 'onion', 'tomato', 'biryani masala', 'ginger garlic paste'],
    category: 'Non-Veg Feast',
    suggestMissing: { id: 'prod-gg-paste', name: 'Fresh Aromatic Ginger Garlic Paste', price: 35, unit: '150g jar' }
  },
  {
    recipeName: 'Paneer Butter Masala',
    requiredItems: ['paneer', 'tomato', 'onion', 'butter', 'milk', 'garam masala'],
    category: 'Vegetarian Classic',
    suggestMissing: { id: 'prod-butter-item', name: 'Creamery Salted Butter', price: 60, unit: '100g pack' }
  },
  {
    recipeName: 'South Indian Sambar',
    requiredItems: ['toor dal', 'carrot', 'tomato', 'onion', 'sambar powder', 'curry leaves'],
    category: 'Traditional Staple',
    suggestMissing: { id: 'prod-curry-leaves', name: 'Fresh Farm Curry Leaves', price: 10, unit: '50g bunch' }
  }
];
