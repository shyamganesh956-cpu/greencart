import React, { useState } from 'react';
import { 
  Search, 
  ShoppingCart, 
  User, 
  X, 
  Menu, 
  Truck,
  Heart
} from 'lucide-react';
import Logo from './Logo';

export default function Navbar({
  cartCount = 0,
  wishlistCount = 0,
  currentUser = null,
  onOpenCart,
  onOpenWishlist,
  onOpenTracker,
  onOpenAccount,
  searchQuery = '',
  onSearchChange,
  onSearchSubmit,
  activeSection = 'home',
  onNavigate
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                placeholder="Search 'tomatoes', 'milk', 'rice', 'spices', 'snacks'..."
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
