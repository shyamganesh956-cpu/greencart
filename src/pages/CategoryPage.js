import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Layers, 
  ChevronRight, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  X,
  SlidersHorizontal,
  ArrowUpDown,
  Tag,
  ShieldCheck,
  Zap,
  ShoppingBag,
  Bot,
  Coins
} from 'lucide-react';

import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import DeliveryTrackerModal from '../components/DeliveryTrackerModal';
import WishlistModal from '../components/WishlistModal';
import SmartAssistantModal from '../components/SmartAssistantModal';
import BudgetShoppingModal from '../components/BudgetShoppingModal';
import ProductReviewModal from '../components/ProductReviewModal';

import { 
  MAIN_CATEGORIES_15, 
  GENERATED_CATEGORY_PRODUCTS 
} from '../data/categoriesCatalogData';

export default function CategoryPage({
  initialCategory = null,
  onNavigateHome,
  cartItems = {},
  wishlist = {},
  currentUser = null,
  onOpenAccount,
  onAddToCart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onToggleWishlist,
  onOpenTracker,
  activeOrderDetails,
  onCheckoutSuccess
}) {
  // Selected category (number, e.g. 1 for Vegetables, null for All)
  const [selectedCategoryNum, setSelectedCategoryNum] = useState(
    initialCategory ? initialCategory : 1
  );

  // Selected subcategory filter within the active category
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all'); // 'all', 'under50', '50to150', 'above150'
  const [minRatingFilter, setMinRatingFilter] = useState(0); // 0, 4.5, 4.8
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-low', 'price-high', 'rating'

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const [selectedProductForReview, setSelectedProductForReview] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Sync initial category if passed or changed externally
  useEffect(() => {
    if (initialCategory) {
      if (typeof initialCategory === 'number') {
        setSelectedCategoryNum(initialCategory);
      } else if (typeof initialCategory === 'string') {
        const found = MAIN_CATEGORIES_15.find(
          c => c.name.toLowerCase() === initialCategory.toLowerCase() ||
               c.slug.toLowerCase() === initialCategory.toLowerCase()
        );
        if (found) {
          setSelectedCategoryNum(found.number);
        }
      }
    }
  }, [initialCategory]);

  // Reset subcategory filter when switching main category
  const handleSelectCategory = (catNum) => {
    setSelectedCategoryNum(catNum);
    setSelectedSubCategory(null);
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  // Find currently active category object
  const currentCategory = useMemo(() => {
    if (!selectedCategoryNum) return null;
    return MAIN_CATEGORIES_15.find(c => c.number === selectedCategoryNum) || MAIN_CATEGORIES_15[0];
  }, [selectedCategoryNum]);

  // Filter products based on active filters
  const filteredProducts = useMemo(() => {
    let list = [...GENERATED_CATEGORY_PRODUCTS];

    // Filter by category
    if (selectedCategoryNum) {
      list = list.filter(p => p.categoryNumber === selectedCategoryNum);
    }

    // Filter by subcategory
    if (selectedSubCategory) {
      list = list.filter(p => p.subCategory.toLowerCase() === selectedSubCategory.toLowerCase());
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subCategory.toLowerCase().includes(q)
      );
    }

    // Filter by price
    if (priceFilter === 'under50') {
      list = list.filter(p => p.price < 50);
    } else if (priceFilter === '50to150') {
      list = list.filter(p => p.price >= 50 && p.price <= 150);
    } else if (priceFilter === 'above150') {
      list = list.filter(p => p.price > 150);
    }

    // Filter by rating
    if (minRatingFilter > 0) {
      list = list.filter(p => (p.rating || 4.5) >= minRatingFilter);
    }

    // Sorting
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return list;
  }, [selectedCategoryNum, selectedSubCategory, searchQuery, priceFilter, minRatingFilter, sortBy]);

  // Group products by subcategory for the active category (when no specific subcategory is clicked)
  const groupedSubcategories = useMemo(() => {
    if (!currentCategory) return [];
    return currentCategory.subcategories.map(sub => {
      const items = filteredProducts.filter(p => p.subCategory.toLowerCase() === sub.name.toLowerCase());
      return {
        name: sub.name,
        rawItemsList: sub.items,
        products: items
      };
    });
  }, [currentCategory, filteredProducts]);

  // Cart total count
  const totalCartCount = useMemo(() => {
    return Object.values(cartItems).reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const wishlistCount = Object.keys(wishlist).length;

  return (
    <div className="category-page-wrapper">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="cart-toast-alert">
          <CheckCircle2 size={18} color="#10B981" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage('')} className="toast-close">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlistCount}
        currentUser={currentUser}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenTracker={() => setIsTrackerOpen(true)}
        onOpenAccount={onOpenAccount}
        onOpenAssistant={() => setIsAssistantOpen(true)}
        onOpenBudget={() => setIsBudgetOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={(term) => setSearchQuery(term)}
        activeSection="categories"
        onNavigate={(target) => {
          if (target === 'home') {
            onNavigateHome();
          } else if (target === 'categories') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else if (target === 'products') {
            setSelectedCategoryNum(null);
            setSelectedSubCategory(null);
            window.scrollTo({ top: 180, behavior: 'smooth' });
          }
        }}
      />

      {/* Top Banner / Hero Header */}
      <section className="category-page-header">
        <div className="container">
          <div className="cat-header-top-row">
            {/* Breadcrumb */}
            <nav className="cat-breadcrumb" aria-label="Breadcrumb">
              <button 
                type="button" 
                onClick={onNavigateHome}
                className="breadcrumb-link"
              >
                Home
              </button>
              <ChevronRight size={14} className="breadcrumb-arrow" />
              <button 
                type="button" 
                onClick={() => { setSelectedCategoryNum(null); setSelectedSubCategory(null); }}
                className={`breadcrumb-link ${!selectedCategoryNum ? 'current' : ''}`}
              >
                Main Product Categories
              </button>
              {currentCategory && (
                <>
                  <ChevronRight size={14} className="breadcrumb-arrow" />
                  <span className="breadcrumb-current">
                    {currentCategory.number}. {currentCategory.name}
                  </span>
                </>
              )}
              {selectedSubCategory && (
                <>
                  <ChevronRight size={14} className="breadcrumb-arrow" />
                  <span className="breadcrumb-current sub-pill">{selectedSubCategory}</span>
                </>
              )}
            </nav>

            <button 
              type="button" 
              onClick={onNavigateHome} 
              className="cat-back-home-btn"
            >
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </button>
          </div>

          <div className="cat-header-content">
            <div className="cat-title-badge">
              <Sparkles size={14} />
              <span>ALL 15 MAIN PRODUCT CATEGORIES</span>
            </div>
            <h1 className="cat-main-title">
              {currentCategory ? (
                <>
                  <span className="cat-number-circle">{currentCategory.number}</span>
                  {currentCategory.name}
                </>
              ) : (
                'All 15 Main Product Categories'
              )}
            </h1>
            <p className="cat-tagline-text">
              {currentCategory 
                ? currentCategory.tagline 
                : 'Browse our complete 15 product departments, detailed subcategories, and farm-fresh essentials.'}
            </p>

            {/* Quick in-page category search */}
            <div className="cat-search-bar-wrap">
              <Search size={18} className="cat-search-icon" />
              <input
                type="text"
                placeholder={`Search in ${currentCategory ? currentCategory.name : 'all 15 categories'} (e.g. Tomato, Spinach, Milk, Rice, Chicken)...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="cat-search-input"
              />
              {searchQuery && (
                <button 
                  type="button" 
                  onClick={() => setSearchQuery('')}
                  className="cat-search-clear"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Workspace: Sidebar + Aisles */}
      <section className="category-workspace-section">
        <div className="container category-layout-grid">
          
          {/* Left Category Navigation Sidebar */}
          <aside className="category-sidebar">
            <div className="sidebar-sticky-box">
              <div className="sidebar-header">
                <Layers size={18} className="sidebar-icon" />
                <h3>15 Main Categories</h3>
              </div>

              {/* All Categories Option */}
              <button
                type="button"
                className={`sidebar-cat-btn ${selectedCategoryNum === null ? 'active' : ''}`}
                onClick={() => { setSelectedCategoryNum(null); setSelectedSubCategory(null); }}
              >
                <div className="cat-btn-left">
                  <span className="cat-badge-all">ALL</span>
                  <span className="sidebar-cat-name">All 15 Categories</span>
                </div>
                <span className="sidebar-cat-count">Catalog</span>
              </button>

              <div className="sidebar-divider" />

              {/* 15 Categories list */}
              <div className="sidebar-categories-list">
                {MAIN_CATEGORIES_15.map((cat) => {
                  const isActive = selectedCategoryNum === cat.number;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      className={`sidebar-cat-btn ${isActive ? 'active' : ''}`}
                      onClick={() => handleSelectCategory(cat.number)}
                    >
                      <div className="cat-btn-left">
                        <span className={`cat-num-badge ${isActive ? 'active' : ''}`}>
                          {cat.number}
                        </span>
                        <div className="sidebar-text-col">
                          <span className="sidebar-cat-name">{cat.name}</span>
                          <span className="sidebar-cat-subs">
                            {cat.subcategories.length} Subcategories
                          </span>
                        </div>
                      </div>
                      <ChevronRight size={16} className={`cat-nav-chevron ${isActive ? 'active' : ''}`} />
                    </button>
                  );
                })}
              </div>

              {/* Compact Quick Tools (AI Assistant & Budget Shopper) */}
              <div className="sidebar-quick-tools">
                <button 
                  type="button" 
                  className="sidebar-tool-pill assistant-pill"
                  onClick={() => setIsAssistantOpen(true)}
                  title="Ask AI Smart Assistant for Recipe Ingredients"
                >
                  <div className="tool-pill-left">
                    <Bot size={16} className="pill-icon" />
                    <span>AI Recipe Assistant</span>
                  </div>
                  <Sparkles size={13} className="pill-sparkle" />
                </button>

                <button 
                  type="button" 
                  className="sidebar-tool-pill budget-pill"
                  onClick={() => setIsBudgetOpen(true)}
                  title="Create a Grocery Basket Under Your Budget"
                >
                  <div className="tool-pill-left">
                    <Coins size={16} className="pill-icon" />
                    <span>Budget Shopper</span>
                  </div>
                  <span className="pill-badge">₹500</span>
                </button>
              </div>

              {/* Compact Sunrise Harvest Guarantee */}
              <div className="sidebar-mini-guarantee">
                <ShieldCheck size={16} color="#059669" className="guarantee-icon" />
                <div className="mini-guarantee-text">
                  <strong>Sunrise Harvest Guarantee</strong>
                  <span>6 AM Harvest • 4°C Cold-Chain Delivery</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Main Product Aisle Content */}
          <main className="category-main-content">
            
            {/* Horizontal Category Quick Tabs (for mobile/tablet & quick jump) */}
            <div className="horizontal-category-scroller">
              <button
                type="button"
                className={`cat-pill-tab ${selectedCategoryNum === null ? 'active' : ''}`}
                onClick={() => { setSelectedCategoryNum(null); setSelectedSubCategory(null); }}
              >
                All 15 Categories
              </button>
              {MAIN_CATEGORIES_15.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`cat-pill-tab ${selectedCategoryNum === cat.number ? 'active' : ''}`}
                  onClick={() => handleSelectCategory(cat.number)}
                >
                  <span className="tab-num">{cat.number}.</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>

            {/* If All Categories view is selected, show an overview of all 15 with subcategories */}
            {selectedCategoryNum === null && (
              <div className="all-categories-overview-panel">
                <div className="overview-hero-card">
                  <h2>15 Main Product Categories</h2>
                  <p>Choose any category below to inspect its detailed subcategories and individual items:</p>
                </div>

                <div className="all-15-categories-grid">
                  {MAIN_CATEGORIES_15.map((cat) => (
                    <div 
                      key={cat.id} 
                      className="category-overview-card"
                      onClick={() => handleSelectCategory(cat.number)}
                    >
                      <div className="cat-overview-img-wrap">
                        <img 
                          src={cat.image} 
                          alt={cat.name} 
                          className="cat-overview-img"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80';
                          }}
                        />
                        <div className="cat-overview-number-pill">Category {cat.number}</div>
                      </div>
                      
                      <div className="cat-overview-body">
                        <h3 className="cat-overview-title">{cat.number}. {cat.name}</h3>
                        <p className="cat-overview-tagline">{cat.tagline}</p>
                        
                        <div className="cat-overview-subcategories-list">
                          <strong className="subcategories-label">Subcategories &amp; Items:</strong>
                          <ul className="overview-subs-bullets">
                            {cat.subcategories.map((sub, sIdx) => (
                              <li key={sIdx}>
                                <strong>{sub.name}:</strong>{' '}
                                <span className="overview-item-tokens">
                                  {sub.items.join(', ')}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button 
                          type="button"
                          className="cat-overview-open-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectCategory(cat.number);
                          }}
                        >
                          <span>Explore {cat.name}</span>
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* When a specific Category is active */}
            {currentCategory && (
              <div className="active-category-section">
                
                {/* Active Category Banner */}
                <div className="active-category-banner">
                  <div className="banner-left">
                    <span className="banner-dept-badge">DEPARTMENT {currentCategory.number} OF 15</span>
                    <h2 className="banner-cat-title">{currentCategory.name}</h2>
                    <p className="banner-cat-desc">{currentCategory.tagline}</p>
                    <div className="banner-stat-chips">
                      <span className="stat-chip">
                        <Tag size={13} />
                        {currentCategory.subcategories.length} Subcategories
                      </span>
                      <span className="stat-chip">
                        <ShoppingBag size={13} />
                        {filteredProducts.length} Products Available
                      </span>
                      <span className="stat-chip highlight">
                        <Zap size={13} />
                        30 Min Delivery
                      </span>
                    </div>
                  </div>

                  <div className="banner-right-img">
                    <img 
                      src={currentCategory.image} 
                      alt={currentCategory.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80';
                      }}
                    />
                  </div>
                </div>

                {/* Subcategory Pills Bar (Matching user specification criteria) */}
                <div className="subcategories-filter-strip">
                  <span className="sub-strip-label">
                    <SlidersHorizontal size={14} />
                    Subcategories:
                  </span>
                  <div className="sub-pills-container">
                    <button
                      type="button"
                      className={`sub-pill-btn ${selectedSubCategory === null ? 'active' : ''}`}
                      onClick={() => setSelectedSubCategory(null)}
                    >
                      All Subcategories ({currentCategory.subcategories.reduce((acc, s) => acc + s.items.length, 0)})
                    </button>

                    {currentCategory.subcategories.map((sub, idx) => {
                      const isActive = selectedSubCategory === sub.name;
                      return (
                        <button
                          key={idx}
                          type="button"
                          className={`sub-pill-btn ${isActive ? 'active' : ''}`}
                          onClick={() => setSelectedSubCategory(isActive ? null : sub.name)}
                        >
                          <span>{sub.name}</span>
                          <span className="sub-count-tag">({sub.items.length})</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Secondary Filters & Sort Bar */}
                <div className="cat-filters-toolbar">
                  {/* Price filter pills */}
                  <div className="toolbar-group">
                    <span className="toolbar-label">Price:</span>
                    <div className="toolbar-pills">
                      <button
                        type="button"
                        className={`tb-pill ${priceFilter === 'all' ? 'active' : ''}`}
                        onClick={() => setPriceFilter('all')}
                      >
                        All
                      </button>
                      <button
                        type="button"
                        className={`tb-pill ${priceFilter === 'under50' ? 'active' : ''}`}
                        onClick={() => setPriceFilter('under50')}
                      >
                        &lt; ₹50
                      </button>
                      <button
                        type="button"
                        className={`tb-pill ${priceFilter === '50to150' ? 'active' : ''}`}
                        onClick={() => setPriceFilter('50to150')}
                      >
                        ₹50 - ₹150
                      </button>
                      <button
                        type="button"
                        className={`tb-pill ${priceFilter === 'above150' ? 'active' : ''}`}
                        onClick={() => setPriceFilter('above150')}
                      >
                        &gt; ₹150
                      </button>
                    </div>
                  </div>

                  {/* Rating filter */}
                  <div className="toolbar-group">
                    <span className="toolbar-label">Rating:</span>
                    <div className="toolbar-pills">
                      <button
                        type="button"
                        className={`tb-pill ${minRatingFilter === 0 ? 'active' : ''}`}
                        onClick={() => setMinRatingFilter(0)}
                      >
                        All
                      </button>
                      <button
                        type="button"
                        className={`tb-pill ${minRatingFilter === 4.8 ? 'active' : ''}`}
                        onClick={() => setMinRatingFilter(4.8)}
                      >
                        4.8+ ★
                      </button>
                    </div>
                  </div>

                  {/* Sort select */}
                  <div className="toolbar-group sort-group">
                    <ArrowUpDown size={14} className="sort-icon" />
                    <select
                      className="cat-sort-select"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="featured">Featured Picks</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                  </div>

                  {/* Clear all filters if any active */}
                  {(selectedSubCategory || priceFilter !== 'all' || minRatingFilter > 0 || searchQuery) && (
                    <button
                      type="button"
                      className="cat-reset-filters-btn"
                      onClick={() => {
                        setSelectedSubCategory(null);
                        setPriceFilter('all');
                        setMinRatingFilter(0);
                        setSearchQuery('');
                        setSortBy('featured');
                      }}
                    >
                      Reset Filters
                    </button>
                  )}
                </div>

                {/* Products Display */}
                {filteredProducts.length === 0 ? (
                  <div className="cat-empty-state">
                    <p>No products found matching your current filter criteria in this category.</p>
                    <button
                      type="button"
                      className="cat-empty-reset-btn"
                      onClick={() => {
                        setSelectedSubCategory(null);
                        setPriceFilter('all');
                        setMinRatingFilter(0);
                        setSearchQuery('');
                      }}
                    >
                      Show All Items in {currentCategory.name}
                    </button>
                  </div>
                ) : selectedSubCategory ? (
                  // Single subcategory view: direct grid
                  <div className="subcategory-focused-view">
                    <div className="sub-focus-header">
                      <h3>
                        Showing items for <strong>{selectedSubCategory}</strong>
                      </h3>
                      <span className="sub-focus-count">
                        {filteredProducts.length} items
                      </span>
                    </div>

                    <div className="product-grid">
                      {filteredProducts.map((prod) => (
                        <ProductCard
                          key={prod.id}
                          product={prod}
                          cartQuantity={cartItems[prod.id]?.quantity || 0}
                          isWishlisted={Boolean(wishlist[prod.id])}
                          onAddToCart={(p) => {
                            onAddToCart(p);
                            showToast(`Added ${p.name} to basket!`);
                          }}
                          onUpdateQuantity={onUpdateQuantity}
                          onOpenReviews={(p) => setSelectedProductForReview(p)}
                          onToggleWishlist={(p) => {
                            onToggleWishlist(p);
                            showToast(
                              wishlist[p.id]
                                ? `Removed ${p.name} from Wishlist`
                                : `Saved ${p.name} to Wishlist ❤️`
                            );
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  // All subcategories view: Grouped neatly by subcategory sections with user item lists
                  <div className="subcategories-sections-container">
                    {groupedSubcategories.map((subGroup, gIdx) => {
                      if (subGroup.products.length === 0) return null;
                      return (
                        <section key={gIdx} className="sub-aisle-block">
                          <div className="sub-aisle-header">
                            <div>
                              <div className="sub-aisle-title-row">
                                <h3 className="sub-aisle-title">{subGroup.name}</h3>
                                <span className="sub-aisle-badge">
                                  {subGroup.products.length} Items
                                </span>
                              </div>
                              <p className="sub-aisle-items-list">
                                <strong>Items:</strong> {subGroup.rawItemsList.join(' • ')}
                              </p>
                            </div>

                            <button
                              type="button"
                              className="filter-this-sub-btn"
                              onClick={() => setSelectedSubCategory(subGroup.name)}
                            >
                              <span>Only {subGroup.name}</span>
                              <ChevronRight size={14} />
                            </button>
                          </div>

                          <div className="product-grid">
                            {subGroup.products.map((prod) => (
                              <ProductCard
                                key={prod.id}
                                product={prod}
                                cartQuantity={cartItems[prod.id]?.quantity || 0}
                                isWishlisted={Boolean(wishlist[prod.id])}
                                onAddToCart={(p) => {
                                  onAddToCart(p);
                                  showToast(`Added ${p.name} to basket!`);
                                }}
                                onUpdateQuantity={onUpdateQuantity}
                                onOpenReviews={(p) => setSelectedProductForReview(p)}
                                onToggleWishlist={(p) => {
                                  onToggleWishlist(p);
                                  showToast(
                                    wishlist[p.id]
                                      ? `Removed ${p.name} from Wishlist`
                                      : `Saved ${p.name} to Wishlist ❤️`
                                  );
                                }}
                              />
                            ))}
                          </div>
                        </section>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </section>

      {/* Footer */}
      <Footer
        onCategoryClick={(catName) => {
          const found = MAIN_CATEGORIES_15.find(
            c => c.name.toLowerCase() === catName.toLowerCase() ||
                 c.slug.toLowerCase() === catName.toLowerCase()
          );
          if (found) {
            handleSelectCategory(found.number);
          } else {
            handleSelectCategory(1);
          }
        }}
        onOpenTracker={() => setIsTrackerOpen(true)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={onUpdateQuantity}
        onRemoveItem={onRemoveItem}
        onClearCart={onClearCart}
        selectedLocation={{ area: 'Gandhipuram', city: 'Coimbatore', eta: '23 mins' }}
        onCheckoutSuccess={(orderSummary) => {
          if (onCheckoutSuccess) {
            onCheckoutSuccess(orderSummary);
          }
          setIsTrackerOpen(true);
          showToast('Order Placed! Express Cold-Chain courier dispatched.');
        }}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onAddToCart={(p) => {
          onAddToCart(p);
          showToast(`Added ${p.name} to basket!`);
        }}
        onRemoveFromWishlist={(id) => {
          if (onToggleWishlist && wishlist[id]) {
            onToggleWishlist(wishlist[id]);
            showToast('Item removed from Wishlist');
          }
        }}
      />

      {/* Order Tracker Modal */}
      <DeliveryTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        orderDetails={activeOrderDetails}
      />

      {/* Smart Assistant Modal */}
      <SmartAssistantModal
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        onAddToCart={(p) => {
          onAddToCart(p);
          showToast(`Added ${p.name} to basket!`);
        }}
        onOpenBudgetModal={() => setIsBudgetOpen(true)}
      />

      {/* Budget Shopping Modal */}
      <BudgetShoppingModal
        isOpen={isBudgetOpen}
        onClose={() => setIsBudgetOpen(false)}
        onAddToCart={(p) => {
          onAddToCart(p);
          showToast(`Added ${p.name} to basket!`);
        }}
      />

      {/* Product Review Modal */}
      <ProductReviewModal
        isOpen={Boolean(selectedProductForReview)}
        onClose={() => setSelectedProductForReview(null)}
        product={selectedProductForReview}
      />
    </div>
  );
}
