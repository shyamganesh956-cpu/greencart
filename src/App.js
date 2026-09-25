import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import AccountModal from './components/AccountModal';
import { TODAYS_OFFERS_DATA } from './data/productsData';

function App() {
  // Navigation State: 'home' | 'categories'
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategoryForPage, setSelectedCategoryForPage] = useState(1); // Default to Category 1 (Vegetables)

  // Customer Account State
  const [currentUser, setCurrentUser] = useState({
    name: 'Shyam Sundar',
    phone: '+91 98765 43210',
    email: 'shyam@greencart.com'
  });
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  // Shared Cart State across all pages
  const [cartItems, setCartItems] = useState({
    'prod-milk': {
      product: TODAYS_OFFERS_DATA.find((p) => p.id === 'prod-milk') || {
        id: 'prod-milk',
        name: 'Pure Organic Cow Milk',
        price: 65,
        unit: '1 L',
      },
      quantity: 2,
    },
  });

  // Shared Wishlist State across all pages
  const [wishlist, setWishlist] = useState({
    'prod-apple-deal': TODAYS_OFFERS_DATA.find((p) => p.id === 'prod-apple-deal') || {
      id: 'prod-apple-deal',
      name: 'Crisp Royal Himachal Apples',
      price: 149,
      unit: '1 kg',
    },
  });

  // Shared Order Details for Live Delivery Tracker
  const [activeOrderDetails, setActiveOrderDetails] = useState({
    orderId: 'GC-84920',
    total: 274,
    itemsCount: 3,
    deliveryEta: '23 mins',
    address: 'Gandhipuram, Coimbatore (628001)',
  });

  // Synchronize with URL hash for seamless direct links and back/forward navigation
  const parseHash = useCallback(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#/categories') || hash === '#categories') {
      setCurrentPage('categories');
      // Check for category query or param e.g. #/categories/2 or #/categories?cat=fruits
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

  // Shared Cart Operations
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

  // Shared Wishlist Toggle
  const handleToggleWishlist = (product) => {
    setWishlist((prev) => {
      const updated = { ...prev };
      if (updated[product.id]) {
        delete updated[product.id];
      } else {
        updated[product.id] = product;
      }
      return updated;
    });
  };

  const handleCheckoutSuccess = (orderSummary) => {
    setActiveOrderDetails({
      orderId: `GC-${Math.floor(10000 + Math.random() * 90000)}`,
      total: orderSummary.total,
      itemsCount: orderSummary.itemsCount,
      deliveryEta: orderSummary.deliveryEta,
      address: orderSummary.address,
    });
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
        />
      )}

      {/* Account Login / Profile Modal */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        currentUser={currentUser}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
        }}
        onLogout={() => {
          setCurrentUser(null);
        }}
      />
    </div>
  );
}

export default App;
