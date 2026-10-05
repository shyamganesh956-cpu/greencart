import React, { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';
import './MarketplacePortals.css';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import SellerPortal from './pages/SellerPortal';
import DeliveryPortal from './pages/DeliveryPortal';
import AdminPortal from './pages/AdminPortal';
import RoleSwitcherBar from './components/RoleSwitcherBar';
import PortalAuthModal from './components/PortalAuthModal';
import AccountModal from './components/AccountModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import ProductDetailModal from './components/ProductDetailModal';
import DeliveryTrackerModal from './components/DeliveryTrackerModal';
import Toast from './components/Toast';
import { TAMIL_NADU_SPECIALS_DATA } from './data/productsData';
import { 
  loadMarketplaceState, 
  saveMarketplaceState, 
  INITIAL_SELLERS, 
  INITIAL_DELIVERY_AGENTS, 
  INITIAL_MARKETPLACE_PRODUCTS, 
  INITIAL_MARKETPLACE_ORDERS, 
  DEFAULT_COMMISSION_RATES 
} from './data/marketplaceState';

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
    total: 328,
    itemsCount: 3,
    deliveryEta: '18 mins',
    address: 'Flat 402, Green Meadows, Cross Cut Road, Gandhipuram, Coimbatore (641012)',
    paymentMethod: 'UPI',
    date: 'Today',
    placedAt: '10:15 AM',
    status: 'Out for Delivery',
    deliveryOtp: '4826',
    savings: 65,
    items: [
      { id: 'tn-aavin-milk', name: 'Aavin Nice Toned Milk (Blue Pouch)', unit: '500ml pouch', price: 23, quantity: 2 },
      { id: 'tn-ooty-carrot', name: 'Ooty Sweet Crisp Carrots', unit: '500g pack', price: 45, quantity: 1 },
      { id: 'prod-country-chicken', name: 'Fresh Country Chicken Curry Cut', unit: '500g pack', price: 260, quantity: 1 }
    ]
  },
  {
    orderId: 'GC-73194',
    total: 550,
    itemsCount: 2,
    deliveryEta: 'Delivered',
    address: 'Gandhipuram, Coimbatore (641012)',
    paymentMethod: 'Card',
    date: 'Yesterday',
    placedAt: '5:40 PM',
    status: 'Delivered',
    deliveryOtp: '5519',
    savings: 65,
    items: [
      { id: 'tn-ponni-rice', name: 'BB Royal Deluxe Ponni Boiled Rice', unit: '5 kg bag', price: 285, quantity: 1 },
      { id: 'tn-idhayam-oil', name: 'Idhayam Pure Sesame Gingelly Oil', unit: '1 L bottle', price: 265, quantity: 1 }
    ]
  }
];

function App() {
  // Active Role State: 'customer' | 'seller' | 'delivery' | 'admin'
  const [currentRole, setCurrentRole] = useState(() =>
    loadMarketplaceState('greencart_current_role', 'customer')
  );

  // Customer Navigation State: 'home' | 'categories'
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategoryForPage, setSelectedCategoryForPage] = useState(1);

  // Multi-Vendor Active Entities
  const [activeSellerId, setActiveSellerId] = useState(() => 
    loadMarketplaceState('greencart_active_seller_id', 'seller-nilgiris')
  );
  const [activeRiderId, setActiveRiderId] = useState(() => 
    loadMarketplaceState('greencart_active_rider_id', 'rider-101')
  );

  // Shared Marketplace State (Synced with LocalStorage)
  const [sellers, setSellers] = useState(() => 
    loadMarketplaceState('greencart_sellers', INITIAL_SELLERS)
  );
  const [marketplaceProducts, setMarketplaceProducts] = useState(() => 
    loadMarketplaceState('greencart_marketplace_products', INITIAL_MARKETPLACE_PRODUCTS)
  );
  const [marketplaceOrders, setMarketplaceOrders] = useState(() => 
    loadMarketplaceState('greencart_marketplace_orders', INITIAL_MARKETPLACE_ORDERS)
  );
  const [riders, setRiders] = useState(() => 
    loadMarketplaceState('greencart_riders', INITIAL_DELIVERY_AGENTS)
  );
  const [commissionRates, setCommissionRates] = useState(() => 
    loadMarketplaceState('greencart_commissions', DEFAULT_COMMISSION_RATES)
  );

  // Role Auth / Switcher Modal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Customer Account State
  const [currentUser, setCurrentUser] = useState(() => 
    loadStorage('greencart_user', {
      name: 'Shyam Sundar',
      phone: '+91 98765 43210',
      email: 'shyam@greencart.com'
    })
  );
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  // Customer Cart State
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

  // Wishlist State
  const [wishlist, setWishlist] = useState(() => 
    loadStorage('greencart_wishlist', {
      'tn-ooty-carrot': TAMIL_NADU_SPECIALS_DATA.find((p) => p.id === 'tn-ooty-carrot') || {
        id: 'tn-ooty-carrot',
        name: 'Ooty Sweet Crisp Carrots',
        price: 45,
        unit: '500g pack',
      },
    })
  );

  // Order Details for Live Delivery Tracker
  const [activeOrderDetails, setActiveOrderDetails] = useState(() => 
    loadStorage('greencart_active_order', DEFAULT_ORDERS_HISTORY[0])
  );

  // Order History List
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

  // Save changes to localStorage whenever marketplace entities change
  useEffect(() => {
    saveMarketplaceState('greencart_current_role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    saveMarketplaceState('greencart_sellers', sellers);
  }, [sellers]);

  useEffect(() => {
    saveMarketplaceState('greencart_marketplace_products', marketplaceProducts);
  }, [marketplaceProducts]);

  useEffect(() => {
    saveMarketplaceState('greencart_marketplace_orders', marketplaceOrders);
  }, [marketplaceOrders]);

  useEffect(() => {
    saveMarketplaceState('greencart_riders', riders);
  }, [riders]);

  useEffect(() => {
    saveMarketplaceState('greencart_commissions', commissionRates);
  }, [commissionRates]);

  useEffect(() => {
    saveMarketplaceState('greencart_active_seller_id', activeSellerId);
  }, [activeSellerId]);

  useEffect(() => {
    saveMarketplaceState('greencart_active_rider_id', activeRiderId);
  }, [activeRiderId]);

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
    if (hash === '#/seller' || hash === '#seller') {
      setCurrentRole('seller');
    } else if (hash === '#/delivery' || hash === '#delivery') {
      setCurrentRole('delivery');
    } else if (hash === '#/admin' || hash === '#admin') {
      setCurrentRole('admin');
    } else if (hash.startsWith('#/categories') || hash === '#categories') {
      setCurrentRole('customer');
      setCurrentPage('categories');
      const match = hash.match(/categories\/(\d+)/);
      if (match && match[1]) {
        setSelectedCategoryForPage(parseInt(match[1], 10));
      }
    } else {
      setCurrentRole('customer');
      setCurrentPage('home');
    }
  }, []);

  useEffect(() => {
    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, [parseHash]);

  // Role Switcher Navigation Handler
  const handleSelectRole = (newRole) => {
    setCurrentRole(newRole);
    if (newRole === 'seller') {
      window.location.hash = '#/seller';
    } else if (newRole === 'delivery') {
      window.location.hash = '#/delivery';
    } else if (newRole === 'admin') {
      window.location.hash = '#/admin';
    } else {
      window.location.hash = '#/';
      setCurrentPage('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Customer Navigation handlers
  const handleNavigateToHome = () => {
    setCurrentRole('customer');
    setCurrentPage('home');
    window.location.hash = '#/';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToCategoryPage = (category) => {
    setCurrentRole('customer');
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

  // Shared Wishlist Toggle
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

  // Final Step: Order Placement Success with Multi-Vendor Splitter Append
  const handleCheckoutSuccess = (orderSummary) => {
    const finalOrder = {
      orderId: orderSummary.orderId || `GC-${Math.floor(10000 + Math.random() * 90000)}`,
      customerName: currentUser?.name || 'Shyam Sundar',
      customerPhone: currentUser?.phone || '+91 98765 43210',
      total: orderSummary.total,
      totalAmount: orderSummary.total,
      itemsCount: orderSummary.itemsCount,
      deliveryEta: orderSummary.deliveryEta || '18 mins',
      address: orderSummary.address,
      area: orderSummary.area || 'Gandhipuram',
      paymentMethod: orderSummary.paymentMethod || 'UPI',
      items: orderSummary.items || [],
      placedAt: orderSummary.placedAt || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: 'Today',
      status: 'placed',
      deliveryOtp: orderSummary.deliveryOtp || '4826',
      assignedRiderId: 'rider-101',
      assignedRiderName: 'Ravi Kumar',
      savings: orderSummary.savings || 45,
      isSplitOrder: orderSummary.isSplitOrder || false,
      subOrders: orderSummary.subOrders || []
    };

    setActiveOrderDetails(finalOrder);
    setOrderHistory((prev) => [finalOrder, ...prev]);
    setMarketplaceOrders((prev) => [finalOrder, ...prev]);
    setCompletedOrderForModal(finalOrder);
    setIsOrderSuccessOpen(true);
    showToast('Order Placed! 🚀', `Dispatched across ${finalOrder.subOrders.length || 1} vendor dark-stores. OTP: ${finalOrder.deliveryOtp}`, 'success');
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

  // ==========================================
  // MULTI-VENDOR ACTION HANDLERS
  // ==========================================

  // Seller Registration
  const handleRegisterSeller = (newSeller) => {
    setSellers((prev) => [newSeller, ...prev]);
    showToast('Seller Application Sent 🏪', `${newSeller.businessName} submitted for Admin review.`, 'info');
  };

  // Seller adds product (status: pending_approval)
  const handleAddNewProduct = (newProd) => {
    setMarketplaceProducts((prev) => [newProd, ...prev]);
    showToast('Product Submitted for Moderation 📦', `${newProd.name} sent to Admin queue.`, 'info');
  };

  // Seller adjusts stock
  const handleUpdateProductStock = (productId, newStock) => {
    setMarketplaceProducts((prev) => 
      prev.map(p => p.id === productId ? { ...p, stock: newStock } : p)
    );
    showToast('Stock Level Updated 📊', `New stock: ${newStock} units`, 'success');
  };

  // Seller creates Save Food discount
  const handleApplySaveFoodOffer = (productId, discountPrice) => {
    setMarketplaceProducts((prev) => 
      prev.map(p => p.id === productId ? { ...p, saveFoodDiscount: true, saveFoodPrice: discountPrice } : p)
    );
    showToast('🌱 Save Food Offer Live!', `Perishable discounted to ₹${discountPrice} to prevent waste.`, 'success');
  };

  // Seller packs sub-order
  const handleUpdateSubOrderStatus = (parentOrderId, subOrderId, newStatus) => {
    setMarketplaceOrders((prev) => 
      prev.map(order => {
        if (order.orderId !== parentOrderId) return order;
        const updatedSubs = (order.subOrders || []).map(sub => 
          sub.subOrderId === subOrderId ? { ...sub, status: newStatus } : sub
        );
        // Check if all suborders are ready for pickup
        const allReady = updatedSubs.every(s => ['ready_for_pickup', 'out_for_delivery', 'delivered'].includes(s.status));
        return {
          ...order,
          subOrders: updatedSubs,
          status: allReady ? 'ready_for_pickup' : order.status
        };
      })
    );
    showToast('Fulfillment Updated 📦', `Sub-order marked ${newStatus.replace(/_/g, ' ')}`, 'info');
  };

  // Delivery agent / Admin updates master order status
  const handleUpdateOrderStatus = (orderId, newStatus, riderId = null, riderName = null) => {
    setMarketplaceOrders((prev) => 
      prev.map(order => {
        if (order.orderId !== orderId) return order;
        return {
          ...order,
          status: newStatus,
          assignedRiderId: riderId || order.assignedRiderId,
          assignedRiderName: riderName || order.assignedRiderName
        };
      })
    );
    if (activeOrderDetails && activeOrderDetails.orderId === orderId) {
      setActiveOrderDetails((prev) => ({
        ...prev,
        status: newStatus,
        assignedRiderName: riderName || prev.assignedRiderName
      }));
    }
  };

  // Delivery Rider Duty Toggle
  const handleToggleRiderDuty = (riderId) => {
    setRiders((prev) => 
      prev.map(r => {
        if (r.id !== riderId) return r;
        const newDuty = r.dutyStatus === 'online' ? 'offline' : 'online';
        showToast(`Rider Status: ${newDuty.toUpperCase()}`, newDuty === 'online' ? 'Ready to accept order drops' : 'Shift paused', 'info');
        return { ...r, dutyStatus: newDuty };
      })
    );
  };

  // Delivery Rider OTP Verification & Complete Delivery
  const handleRiderCompleteDelivery = (orderId, riderId) => {
    setMarketplaceOrders((prev) => 
      prev.map(order => {
        if (order.orderId !== orderId) return order;
        return {
          ...order,
          status: 'delivered',
          deliveryProof: {
            deliveredAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            verifiedBy: `Rider ${riderId}`,
            otpVerified: true,
            signature: `DIGITAL_RECEIPT_${order.deliveryOtp}`
          }
        };
      })
    );

    // Update rider earnings (+₹45) and completed drops count
    setRiders((prev) => 
      prev.map(r => {
        if (r.id !== riderId) return r;
        return {
          ...r,
          todayEarnings: r.todayEarnings + 45,
          completedToday: r.completedToday + 1
        };
      })
    );

    // Update customer active tracking modal if open
    if (activeOrderDetails && activeOrderDetails.orderId === orderId) {
      setActiveOrderDetails((prev) => ({
        ...prev,
        status: 'Delivered',
        deliveryEta: 'Delivered Just Now!'
      }));
    }

    showToast('Delivery Completed! 🎉', `Order #${orderId} verified by OTP. +₹45 credited.`, 'success');
  };

  // Admin Approves Seller
  const handleApproveSeller = (sellerId) => {
    setSellers((prev) => 
      prev.map(s => s.id === sellerId ? { ...s, status: 'approved' } : s)
    );
    showToast('Seller Approved! 🛡️', 'Merchant partnership confirmed.', 'success');
  };

  // Admin Rejects Seller
  const handleRejectSeller = (sellerId) => {
    setSellers((prev) => 
      prev.map(s => s.id === sellerId ? { ...s, status: 'rejected' } : s)
    );
    showToast('Seller Rejected', 'Merchant application rejected.', 'info');
  };

  // Admin Approves Product
  const handleApproveProduct = (productId) => {
    setMarketplaceProducts((prev) => 
      prev.map(p => p.id === productId ? { ...p, status: 'approved' } : p)
    );
    showToast('Product Published! 🛒', 'Now visible on Customer Home & Categories.', 'success');
  };

  // Admin Rejects Product
  const handleRejectProduct = (productId) => {
    setMarketplaceProducts((prev) => 
      prev.map(p => p.id === productId ? { ...p, status: 'rejected' } : p)
    );
    showToast('Product Rejected', 'Returned to vendor.', 'info');
  };

  // Admin Updates Commission Rate
  const handleUpdateCommissionRate = (category, newRate) => {
    setCommissionRates((prev) => ({ ...prev, [category]: newRate }));
    showToast('Commission Rate Updated 💰', `${category} set to ${newRate}%`, 'success');
  };

  // Admin Reassigns Rider
  const handleReassignOrderRider = (orderId, newRiderId, newRiderName) => {
    setMarketplaceOrders((prev) => 
      prev.map(order => 
        order.orderId === orderId 
          ? { ...order, assignedRiderId: newRiderId, assignedRiderName: newRiderName } 
          : order
      )
    );
    showToast('Rider Reassigned 🛵', `Assigned to ${newRiderName}`, 'info');
  };

  const activeSeller = sellers.find(s => s.id === activeSellerId) || sellers[0];
  const activeRider = riders.find(r => r.id === activeRiderId) || riders[0];

  return (
    <div className="App">
      {/* 1. Global Role Switcher Banner */}
      <RoleSwitcherBar
        currentRole={currentRole}
        onSelectRole={handleSelectRole}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        activeSeller={activeSeller}
        activeRider={activeRider}
      />

      {/* 2. Main Portal Rendering by Role */}
      {currentRole === 'seller' ? (
        <SellerPortal
          activeSeller={activeSeller}
          allProducts={marketplaceProducts}
          orders={marketplaceOrders}
          onAddNewProduct={handleAddNewProduct}
          onUpdateProductStock={handleUpdateProductStock}
          onApplySaveFoodOffer={handleApplySaveFoodOffer}
          onUpdateSubOrderStatus={handleUpdateSubOrderStatus}
          onNavigateCustomer={handleNavigateToHome}
        />
      ) : currentRole === 'delivery' ? (
        <DeliveryPortal
          activeRider={activeRider}
          orders={marketplaceOrders}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onToggleRiderDuty={handleToggleRiderDuty}
          onRiderCompleteDelivery={handleRiderCompleteDelivery}
          onNavigateCustomer={handleNavigateToHome}
        />
      ) : currentRole === 'admin' ? (
        <AdminPortal
          sellers={sellers}
          products={marketplaceProducts}
          orders={marketplaceOrders}
          riders={riders}
          commissionRates={commissionRates}
          onApproveSeller={handleApproveSeller}
          onRejectSeller={handleRejectSeller}
          onApproveProduct={handleApproveProduct}
          onRejectProduct={handleRejectProduct}
          onUpdateCommissionRate={handleUpdateCommissionRate}
          onReassignOrderRider={handleReassignOrderRider}
          onNavigateCustomer={handleNavigateToHome}
        />
      ) : (
        /* Customer Shopping Experience */
        currentPage === 'categories' ? (
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
        )
      )}

      {/* Role & Account Authentication Switcher Modal */}
      <PortalAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentRole={currentRole}
        onSelectRole={handleSelectRole}
        sellers={sellers}
        riders={riders}
        activeSellerId={activeSellerId}
        activeRiderId={activeRiderId}
        onSetActiveSellerId={setActiveSellerId}
        onSetActiveRiderId={setActiveRiderId}
        onRegisterSeller={handleRegisterSeller}
      />

      {/* Account Profile Modal */}
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

      {/* Order Placement Success Modal */}
      <OrderSuccessModal
        isOpen={isOrderSuccessOpen}
        onClose={() => setIsOrderSuccessOpen(false)}
        order={completedOrderForModal}
        onTrackOrder={handleTrackSpecificOrder}
        onContinueShopping={() => setIsOrderSuccessOpen(false)}
      />

      {/* Product Detail Modal */}
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

      {/* Live Delivery Tracker Modal */}
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
