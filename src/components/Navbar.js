import React, { useState } from 'react';
import { 
  Search, 
  ShoppingCart, 
  User, 
  X, 
  Menu, 
  Truck,
  Heart,
  Bell
} from 'lucide-react';
import Logo from './Logo';

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: 'Order Out for Delivery!',
    desc: 'Order #GC-84920 has been picked up by partner. ETA: 22 mins.',
    time: '5m ago',
    icon: '🚚',
    unread: true
  },
  {
    id: 2,
    title: 'Fresh Morning Harvest Arrived!',
    desc: 'Ooty mountain carrots, broccoli & farm spinach now in stock.',
    time: '1h ago',
    icon: '🥬',
    unread: true
  },
  {
    id: 3,
    title: 'Flash 15% OFF on Fruits',
    desc: 'Use coupon FRESH15 on Royal Himachal Apples & Alphonso Mangoes.',
    time: '3h ago',
    icon: '🏷️',
    unread: true
  }
];

export default function Navbar({
  cartCount = 0,
  wishlistCount = 0,
  currentUser = null,
  onOpenCart,
  onOpenWishlist,
  onOpenTracker,
  onOpenAccount,
  onOpenAssistant,
  onOpenBudget,
  onOpenLocationModal,
  searchQuery = '',
  onSearchChange,
  onSearchSubmit,
  activeSection = 'home',
  onNavigate
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Notification center state
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const handleNavClick = (sectionId) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="site-header">

      {/* Main Navbar */}
      <nav className="main-navbar">
        <div className="container navbar-container">
          {/* Logo */}
          <div className="navbar-left">
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} 
              className="logo-link"
              title="GreenCart Fresh & Organic"
            >
              <Logo height={42} />
            </a>
          </div>

          {/* Search Bar */}
          <div className="navbar-search-wrapper">
            <form 
              className="navbar-search-form" 
              onSubmit={(e) => {
                e.preventDefault();
                if (onSearchSubmit) onSearchSubmit(searchQuery);
              }}
            >
              <Search size={18} className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search 'tomatoes', 'milk', 'rice', 'dosa', 'biryani'..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => onSearchChange('')}
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
              <button type="submit" className="search-submit-btn">
                Search
              </button>
            </form>
          </div>

          {/* Nav Links & Actions */}
          <div className="navbar-right">
            <ul className="nav-links">
              <li>
                <button 
                  className={`nav-link-btn ${activeSection === 'home' ? 'active' : ''}`}
                  onClick={() => handleNavClick('home')}
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  className={`nav-link-btn ${activeSection === 'categories' ? 'active' : ''}`}
                  onClick={() => handleNavClick('categories')}
                >
                  Categories
                </button>
              </li>
              <li>
                <button 
                  className={`nav-link-btn ${activeSection === 'products' ? 'active' : ''}`}
                  onClick={() => handleNavClick('products')}
                >
                  Products
                </button>
              </li>
              <li>
                <button 
                  className="nav-link-btn track-order-nav-btn"
                  onClick={onOpenTracker}
                  title="Track your live grocery delivery"
                >
                  <Truck size={15} />
                  <span>Track Order</span>
                </button>
              </li>
            </ul>

            {/* Notification Bell with Dropdown */}
            <div className="notif-wrapper">
              <button 
                type="button"
                className="notif-nav-btn" 
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                title="Notifications"
              >
                <Bell size={18} className="notif-icon" />
                {unreadCount > 0 && (
                  <span className="notif-badge">{unreadCount}</span>
                )}
              </button>

              {isNotifOpen && (
                <div className="notif-dropdown-menu">
                  <div className="notif-dropdown-header">
                    <h4>Notifications</h4>
                    {unreadCount > 0 && (
                      <button 
                        type="button" 
                        className="mark-read-btn"
                        onClick={handleMarkAllRead}
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="notif-list">
                    {notifications.map(n => (
                      <div key={n.id} className={`notif-item ${n.unread ? 'unread' : ''}`}>
                        <span className="notif-emoji">{n.icon}</span>
                        <div className="notif-content">
                          <span className="notif-item-title">{n.title}</span>
                          <p className="notif-item-desc">{n.desc}</p>
                          <span className="notif-time">{n.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist quick button */}
            <button 
              className="wishlist-nav-btn" 
              onClick={onOpenWishlist}
              title="View Wishlist"
            >
              <Heart size={18} className="wishlist-nav-icon" />
              {wishlistCount > 0 && (
                <span className="wishlist-badge">{wishlistCount}</span>
              )}
            </button>

            {/* Account / Login Profile UI */}
            <button 
              className="account-btn" 
              onClick={onOpenAccount}
              title={currentUser ? `Customer Profile: ${currentUser.name}` : "Login / Sign Up"}
            >
              <div className="account-icon-wrap">
                <User size={18} />
              </div>
              <span className="account-label">
                {currentUser ? (currentUser.name || '').split(' ')[0] : 'Login'}
              </span>
            </button>

            {/* Cart Button */}
            <button 
              className="cart-btn" 
              onClick={onOpenCart}
              title="Open Shopping Cart"
            >
              <ShoppingCart size={19} className="cart-icon" />
              <span className="cart-text">Cart</span>
              <span className="cart-counter-badge">{cartCount}</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button 
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Row */}
        <div className="mobile-search-container">
          <form 
            className="navbar-search-form" 
            onSubmit={(e) => {
              e.preventDefault();
              if (onSearchSubmit) onSearchSubmit(searchQuery);
            }}
          >
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search groceries & produce..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => onSearchChange('')}
              >
                <X size={15} />
              </button>
            )}
            <button type="submit" className="search-submit-btn">
              Search
            </button>
          </form>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-dropdown-menu">
            <div className="mobile-nav-links">
              <button onClick={() => handleNavClick('home')}>Home</button>
              <button onClick={() => handleNavClick('categories')}>Shop by Category</button>
              <button onClick={() => handleNavClick('products')}>All Products</button>
              <button onClick={() => { onOpenAssistant(); setMobileMenuOpen(false); }}>
                🤖 Smart Assistant (AI)
              </button>
              <button onClick={() => { onOpenBudget(); setMobileMenuOpen(false); }}>
                💰 Budget Shopping (₹500)
              </button>
              <button onClick={() => { if (onOpenAccount) onOpenAccount(); setMobileMenuOpen(false); }}>
                {currentUser ? `Account Profile (${currentUser.name})` : 'Customer Login / Profile'}
              </button>
              <button onClick={() => { onOpenTracker(); setMobileMenuOpen(false); }}>
                Live Delivery Tracking
              </button>
              <button onClick={() => { onOpenCart(); setMobileMenuOpen(false); }}>
                View Cart ({cartCount} items)
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
