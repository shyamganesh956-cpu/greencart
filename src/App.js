import React, { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import AccountModal from './components/AccountModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import ProductDetailModal from './components/ProductDetailModal';
import DeliveryTrackerModal from './components/DeliveryTrackerModal';
import Toast from './components/Toast';
import { TAMIL_NADU_SPECIALS_DATA } from './data/productsData';

// Helper to safely load from localStorage
const loadStorage = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (e) {
    console.error(`Error loading ${key} from storage:`, e);
    return fallback;
  }
};

const DEFAULT_ORDERS_HISTORY = [
  {
    orderId: 'GC-84920',
    total: 274,
    itemsCount: 3,
    deliveryEta: '18 mins',
    address: 'Gandhipuram, Coimbatore (628001)',
    paymentMethod: 'UPI',
    date: 'Today',
    placedAt: '2:15 PM',
    status: 'Out for Delivery',
    savings: 55,
    items: [
      { id: 'tn-aavin-milk', name: 'Aavin Nice Toned Milk (Blue Pouch)', unit: '500ml pouch', price: 23, quantity: 2 },
      { id: 'tn-ooty-carrot', name: 'Ooty Sweet Crisp Carrots', unit: '500g pack', price: 45, quantity: 1 },
      { id: 'prod-apple-deal', name: 'Crisp Royal Himachal Apples', unit: '1 kg', price: 149, quantity: 1 }
    ]
  },
  {
    orderId: 'GC-73194',
    total: 550,
    itemsCount: 2,
    deliveryEta: 'Delivered',
    address: 'Gandhipuram, Coimbatore (628001)',
    paymentMethod: 'Card',
    date: 'Yesterday',
    placedAt: '5:40 PM',
    status: 'Delivered',
    savings: 65,
    items: [
      { id: 'tn-ponni-rice', name: 'BB Royal Deluxe Ponni Boiled Rice', unit: '5 kg bag', price: 285, quantity: 1 },
      { id: 'tn-idhayam-oil', name: 'Idhayam Pure Sesame Gingelly Oil', unit: '1 L bottle', price: 265, quantity: 1 }
    ]
  }
];

function App() {
  // Navigation State: 'home' | 'categories'
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategoryForPage, setSelectedCategoryForPage] = useState(1);

  // Customer Account State with LocalStorage Sync
  const [currentUser, setCurrentUser] = useState(() => 
    loadStorage('greencart_user', {
      name: 'Shyam Sundar',
      phone: '+91 98765 43210',
      email: 'shyam@greencart.com'
    })
  );
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  // Cart State with LocalStorage Sync
  const [cartItems, setCartItems] = useState(() => 
    loadStorage('greencart_cart_items', {
      'tn-aavin-milk': {
        product: TAMIL_NADU_SPECIALS_DATA.find((p) => p.id === 'tn-aavin-milk') || {
          id: 'tn-aavin-milk',
          name: 'Aavin Nice Toned Milk (Blue Pouch)',
          price: 23,
          unit: '500ml pouch',
          image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80'
        },
        quantity: 2,
      },
    })
  );

  // Wishlist State with LocalStorage Sync
  const [wishlist, setWishlist] = useState(() => 
    loadStorage('greencart_wishlist', {
      'tn-ooty-carrot': TAMIL_NADU_SPECIALS_DATA.find((p) => p.id === 'tn-ooty-carrot') || {
        id: 'tn-ooty-carrot',
        name: 'Ooty Sweet Crisp Carrots (ஊட்டி கேரட்)',
        price: 45,
        unit: '500g pack',
      },
    })
  );

  // Order Details for Live Delivery Tracker
  const [activeOrderDetails, setActiveOrderDetails] = useState(() => 
    loadStorage('greencart_active_order', DEFAULT_ORDERS_HISTORY[0])
  );

  // Order History List with LocalStorage Sync
  const [orderHistory, setOrderHistory] = useState(() => 
    loadStorage('greencart_order_history', DEFAULT_ORDERS_HISTORY)
  );

  // Modals state
  const [completedOrderForModal, setCompletedOrderForModal] = useState(null);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);

  // Floating Toast State
  const [toast, setToast] = useState({
    visible: false,
    title: '',
    message: '',
    type: 'info',
    actionLabel: null,
    actionType: null,
  });
  const toastTimerRef = useRef(null);

  const showToast = useCallback((title, message = '', type = 'info', actionLabel = null, actionType = null) => {
    setToast({ visible: true, title, message, type, actionLabel, actionType });
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3500);
  }, []);

  // Save to LocalStorage whenever critical states change
  useEffect(() => {
    localStorage.setItem('greencart_cart_items', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('greencart_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('greencart_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('greencart_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('greencart_active_order', JSON.stringify(activeOrderDetails));
  }, [activeOrderDetails]);

  useEffect(() => {
    localStorage.setItem('greencart_order_history', JSON.stringify(orderHistory));
  }, [orderHistory]);

  // Synchronize with URL hash for seamless direct links and back/forward navigation
  const parseHash = useCallback(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#/categories') || hash === '#categories') {
      setCurrentPage('categories');
      const match = hash.match(/categories\/(\d+)/);
      if (match && match[1]) {
        setSelectedCategoryForPage(parseInt(match[1], 10));
      }
    } else {
      setCurrentPage('home');
    }
  }, []);

  useEffect(() => {
    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, [parseHash]);

  // Navigation handlers
  const handleNavigateToHome = () => {
    setCurrentPage('home');
    window.location.hash = '#/';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToCategoryPage = (category) => {
    if (category) {
      if (typeof category === 'number') {
        setSelectedCategoryForPage(category);
        window.location.hash = `#/categories/${category}`;
      } else {
        setSelectedCategoryForPage(category);
        window.location.hash = `#/categories`;
      }
    } else {
      window.location.hash = `#/categories`;
    }
    setCurrentPage('categories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Shared Cart Operations with Toast Feedback
  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev[product.id];
      const newQty = existing ? existing.quantity + 1 : 1;
      return {
        ...prev,
        [product.id]: {
          product,
          quantity: newQty,
        },
      };
    });
    showToast('Added to Basket 🛒', `${product.name} (${product.unit})`, 'cart');
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (newQuantity <= 0) {
        delete updated[productId];
      } else if (updated[productId]) {
        updated[productId] = {
          ...updated[productId],
          quantity: newQuantity,
        };
      }
      return updated;
    });
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[productId];
      return updated;
    });
  };

  const handleClearCart = () => {
    setCartItems({});
  };

  // Shared Wishlist Toggle with Toast Feedback
  const handleToggleWishlist = (product) => {
    setWishlist((prev) => {
      const updated = { ...prev };
      if (updated[product.id]) {
        delete updated[product.id];
        showToast('Removed from Wishlist', product.name, 'info');
      } else {
        updated[product.id] = product;
        showToast('Saved to Wishlist ❤️', product.name, 'wishlist');
      }
      return updated;
    });
  };

  // Final Step: Order Placement Success with Modal & History Append
  const handleCheckoutSuccess = (orderSummary) => {
    const finalOrder = {
      orderId: orderSummary.orderId || `GC-${Math.floor(10000 + Math.random() * 90000)}`,
      total: orderSummary.total,
      itemsCount: orderSummary.itemsCount,
      deliveryEta: orderSummary.deliveryEta || '23 mins',
      address: orderSummary.address,
      paymentMethod: orderSummary.paymentMethod || 'UPI',
      items: orderSummary.items || [],
      placedAt: orderSummary.placedAt || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: 'Today',
      status: 'Packing',
      savings: orderSummary.savings || 45
    };

    setActiveOrderDetails(finalOrder);
    setOrderHistory((prev) => [finalOrder, ...prev]);
    setCompletedOrderForModal(finalOrder);
    setIsOrderSuccessOpen(true);
    showToast('Order Placed Successfully! 🎉', `Order #${finalOrder.orderId} arriving in ${finalOrder.deliveryEta}`, 'success');
  };

  // One-Click "Reorder All" from Account Modal
  const handleReorderItems = (pastItems = []) => {
    if (!pastItems || pastItems.length === 0) return;

    setCartItems((prev) => {
      const updated = { ...prev };
      pastItems.forEach((item) => {
        const prod = item.product || item;
        const qty = item.quantity || 1;
        const existing = updated[prod.id];
        updated[prod.id] = {
          product: prod,
          quantity: existing ? existing.quantity + qty : qty,
        };
      });
      return updated;
    });

    setIsAccountOpen(false);
    showToast('All Items Reordered! 🛍️', `Added ${pastItems.length} items from past order into your basket`, 'cart');
  };

  // Open Product Detail Modal
  const handleOpenProductDetail = (product) => {
    setSelectedProductForDetail(product);
    setIsProductDetailOpen(true);
  };

  // Open Tracker from Order Success or Account Modal
  const handleTrackSpecificOrder = (order) => {
    setActiveOrderDetails(order || activeOrderDetails);
    setIsOrderSuccessOpen(false);
    setIsAccountOpen(false);
    setIsTrackerOpen(true);
  };

  return (
    <div className="App">
      {currentPage === 'categories' ? (
        <CategoryPage
          initialCategory={selectedCategoryForPage}
          onNavigateHome={handleNavigateToHome}
          cartItems={cartItems}
          wishlist={wishlist}
          currentUser={currentUser}
          onOpenAccount={() => setIsAccountOpen(true)}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
          onToggleWishlist={handleToggleWishlist}
          activeOrderDetails={activeOrderDetails}
          onCheckoutSuccess={handleCheckoutSuccess}
          onOpenProductDetail={handleOpenProductDetail}
          onOpenTracker={() => setIsTrackerOpen(true)}
        />
      ) : (
        <HomePage
          cartItems={cartItems}
          wishlist={wishlist}
          currentUser={currentUser}
          onOpenAccount={() => setIsAccountOpen(true)}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
          onToggleWishlist={handleToggleWishlist}
          onNavigateToCategoryPage={handleNavigateToCategoryPage}
          activeOrderDetails={activeOrderDetails}
          onCheckoutSuccess={handleCheckoutSuccess}
          onOpenProductDetail={handleOpenProductDetail}
          onOpenTracker={() => setIsTrackerOpen(true)}
        />
      )}

      {/* Account Login / Profile Modal */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        currentUser={currentUser}
        orderHistory={orderHistory}
        onTrackOrder={handleTrackSpecificOrder}
        onReorderItems={handleReorderItems}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          showToast('Welcome back!', `Logged in as ${user.name}`, 'success');
        }}
        onLogout={() => {
          setCurrentUser(null);
          showToast('Logged Out', 'You have been safely signed out.', 'info');
        }}
      />

      {/* Final Step: Order Placement Success & Invoice Modal */}
      <OrderSuccessModal
        isOpen={isOrderSuccessOpen}
        onClose={() => setIsOrderSuccessOpen(false)}
        order={completedOrderForModal}
        onTrackOrder={handleTrackSpecificOrder}
        onContinueShopping={() => setIsOrderSuccessOpen(false)}
      />

      {/* Final Step: Product Quick-View & Nutritional Facts Modal */}
      {selectedProductForDetail && (
        <ProductDetailModal
          isOpen={isProductDetailOpen}
          onClose={() => setIsProductDetailOpen(false)}
          product={selectedProductForDetail}
          cartQuantity={cartItems[selectedProductForDetail.id]?.quantity || 0}
          isWishlisted={Boolean(wishlist[selectedProductForDetail.id])}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

      {/* Global Live Delivery Tracker Modal */}
      <DeliveryTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        orderDetails={activeOrderDetails}
      />

      {/* Floating Micro-Interaction Toast Notification */}
      <Toast
        toast={toast}
        onClose={() => setToast((prev) => ({ ...prev, visible: false }))}
      />
    </div>
  );
}

export default App;
