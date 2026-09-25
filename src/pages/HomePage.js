import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  X, 
  Filter, 
  UtensilsCrossed 
} from 'lucide-react';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';
import FreshTodaySection from '../components/FreshTodaySection';
import OfferSection from '../components/OfferSection';
import BuyAgainSection from '../components/BuyAgainSection';
import ProductCard from '../components/ProductCard';
import ProductSection from '../components/ProductSection';
import WhyChooseUs from '../components/WhyChooseUs';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import DeliveryTrackerModal from '../components/DeliveryTrackerModal';
import WishlistModal from '../components/WishlistModal';
import CookThisMealSection from '../components/CookThisMealSection';

import { 
  CATEGORIES_DATA, 
  TODAYS_OFFERS_DATA, 
  PREVIOUS_PURCHASES_DATA,
  RECOMMENDED_FOR_YOU_DATA, 
  MOST_PURCHASED_DATA, 
  FRESH_TODAY_DATA,
  MEAT_SEAFOOD_DATA,
  ALL_PRODUCTS 
} from '../data/productsData';

export default function HomePage({
  cartItems: propCartItems,
  wishlist: propWishlist,
  currentUser = null,
  onOpenAccount,
  onAddToCart: propAddToCart,
  onUpdateQuantity: propUpdateQuantity,
  onRemoveItem: propRemoveItem,
  onClearCart: propClearCart,
  onToggleWishlist: propToggleWishlist,
  onNavigateToCategoryPage,
  onOpenTracker: propOpenTracker,
  activeOrderDetails: propOrderDetails,
  onCheckoutSuccess: propCheckoutSuccess,
}) {
  // Cart state - initialized with Cow Milk (qty 2) to match mockup if not controlled
  const [internalCartItems, setInternalCartItems] = useState({
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

  const cartItems = propCartItems !== undefined ? propCartItems : internalCartItems;

  // Wishlist state
  const [internalWishlist, setInternalWishlist] = useState({
    'prod-apple-deal': TODAYS_OFFERS_DATA.find((p) => p.id === 'prod-apple-deal') || {
      id: 'prod-apple-deal',
      name: 'Crisp Royal Himachal Apples',
      price: 149,
      unit: '1 kg',
    },
  });

  const wishlist = propWishlist !== undefined ? propWishlist : internalWishlist;

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [internalOrderDetails, setInternalOrderDetails] = useState({
    orderId: 'GC-84920',
    total: 274,
    itemsCount: 3,
    deliveryEta: '23 mins',
    address: 'Gandhipuram, Coimbatore (628001)',
  });

  const activeOrderDetails = propOrderDetails || internalOrderDetails;

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceFilter, setPriceFilter] = useState('all'); // 'all', 'under50', '50to150', 'above150'
  const [minRatingFilter, setMinRatingFilter] = useState(0); // 0, 4.5, 4.8
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-low', 'price-high', 'rating'

  // Toast notifications
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  // Cart operations
  const handleAddToCart = (product) => {
    if (propAddToCart) {
      propAddToCart(product);
    } else {
      setInternalCartItems((prev) => {
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
    }
    showToast(`Added ${product.name} to basket!`);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (propUpdateQuantity) {
      propUpdateQuantity(productId, newQuantity);
    } else {
      setInternalCartItems((prev) => {
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
    }
  };

  const handleRemoveItem = (productId) => {
    if (propRemoveItem) {
      propRemoveItem(productId);
    } else {
      setInternalCartItems((prev) => {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
      });
    }
  };

  const handleClearCart = () => {
    if (propClearCart) {
      propClearCart();
    } else {
      setInternalCartItems({});
    }
  };

  // Wishlist toggle
  const handleToggleWishlist = (product) => {
    if (propToggleWishlist) {
      propToggleWishlist(product);
      showToast(
        wishlist[product.id]
          ? `Removed ${product.name} from Wishlist`
          : `Saved ${product.name} to Wishlist ❤️`
      );
    } else {
      setInternalWishlist((prev) => {
        const updated = { ...prev };
        if (updated[product.id]) {
          delete updated[product.id];
          showToast(`Removed ${product.name} from Wishlist`);
        } else {
          updated[product.id] = product;
          showToast(`Saved ${product.name} to Wishlist ❤️`);
        }
        return updated;
      });
    }
  };

  // Cart total count
  const totalCartCount = useMemo(() => {
    return Object.values(cartItems).reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const wishlistCount = Object.keys(wishlist).length;

  // Filtered products logic
  const filteredProducts = useMemo(() => {
    let result = [...ALL_PRODUCTS];

    // Remove duplicates by ID and product name
    const seenIds = new Set();
    const seenNames = new Set();
    result = result.filter((p) => {
      const cleanName = p.name.toLowerCase().trim();
      if (seenIds.has(p.id) || seenNames.has(cleanName)) return false;
      seenIds.add(p.id);
      seenNames.add(cleanName);
      return true;
    });

    // Category filter
    if (selectedCategory) {
      result = result.filter((p) =>
        p.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          (p.subCategory && p.subCategory.toLowerCase().includes(query))
      );
    }

    // Price filter
    if (priceFilter === 'under50') {
      result = result.filter((p) => p.price < 50);
    } else if (priceFilter === '50to150') {
      result = result.filter((p) => p.price >= 50 && p.price <= 150);
    } else if (priceFilter === 'above150') {
      result = result.filter((p) => p.price > 150);
    }

    // Rating filter
    if (minRatingFilter > 0) {
      result = result.filter((p) => (p.rating || 4.5) >= minRatingFilter);
    }

    // In Stock filter
    if (inStockOnly) {
      result = result.filter((p) => p.inStock !== false);
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [selectedCategory, searchQuery, priceFilter, minRatingFilter, inStockOnly, sortBy]);

  const isFiltering = Boolean(selectedCategory || searchQuery.trim() || priceFilter !== 'all' || minRatingFilter > 0);

  // Smooth Navigation
  const handleNavigate = (sectionId) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  };

  const handleShopNow = () => {
    handleNavigate('offers');
  };

  const handleSearchSubmit = (term) => {
    setSearchQuery(term);
    setTimeout(() => {
      const el = document.getElementById('search-results') || document.getElementById('offers');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleCheckoutSuccess = (orderSummary) => {
    if (propCheckoutSuccess) {
      propCheckoutSuccess(orderSummary);
    } else {
      setInternalOrderDetails({
        orderId: `GC-${Math.floor(10000 + Math.random() * 90000)}`,
        total: orderSummary.total,
        itemsCount: orderSummary.itemsCount,
        deliveryEta: orderSummary.deliveryEta,
        address: orderSummary.address,
      });
    }
    setIsTrackerOpen(true);
    showToast('Order Placed Successfully! Temperature-controlled express courier dispatched.');
  };

  return (
    <div className="homepage-wrapper">
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

      {/* 1. Main Navigation Header */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlistCount}
        currentUser={currentUser}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenTracker={propOpenTracker || (() => setIsTrackerOpen(true))}
        onOpenAccount={onOpenAccount}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        onNavigate={(target) => {
          if (target === 'categories') {
            if (onNavigateToCategoryPage) {
              onNavigateToCategoryPage(null);
            } else {
              handleNavigate('categories');
            }
          } else if (target === 'products') {
            handleNavigate('offers');
          } else {
            handleNavigate(target);
          }
        }}
      />

      {/* 2. Hero Section (Wide & Spacious) */}
      <Hero
        onSearchSubmit={handleSearchSubmit}
        onShopNowClick={() => {
          if (onNavigateToCategoryPage) {
            onNavigateToCategoryPage(null);
          } else {
            handleShopNow();
          }
        }}
      />

      {/* 3. The 10 Main Grocery Categories */}
      <CategorySection
        categories={CATEGORIES_DATA}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          if (onNavigateToCategoryPage) {
            onNavigateToCategoryPage(cat);
          } else {
            setSelectedCategory((prev) => (prev === cat ? null : cat));
          }
        }}
        onOpenCategoryPage={onNavigateToCategoryPage}
      />

      {/* 4. Filtered Grocery Search Results */}
      {isFiltering && (
        <section className="section-block search-results-section" id="search-results">
          <div className="container">
            <div className="filter-results-header">
              <div className="filter-results-title">
                <Filter size={20} className="filter-icon" />
                <h3>
                  Search &amp; Filter Results{' '}
                  {selectedCategory && (
                    <span className="filter-tag">Category: {selectedCategory}</span>
                  )}
                  {searchQuery && (
                    <span className="filter-tag">"{searchQuery}"</span>
                  )}
                </h3>
                <span className="results-count-badge">
                  {filteredProducts.length} items found
                </span>
              </div>
              <button
                type="button"
                className="clear-filters-btn"
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchQuery('');
                  setPriceFilter('all');
                  setMinRatingFilter(0);
                  setInStockOnly(false);
                  setSortBy('featured');
                }}
              >
                Clear All Filters
              </button>
            </div>

            {/* Interactive Filters Bar */}
            <div className="grocery-filters-toolbar">
              <div className="filter-group">
                <span className="filter-label">Price:</span>
                <div className="filter-pills">
                  <button
                    type="button"
                    className={`filter-pill-btn ${priceFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setPriceFilter('all')}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    className={`filter-pill-btn ${priceFilter === 'under50' ? 'active' : ''}`}
                    onClick={() => setPriceFilter('under50')}
                  >
                    Under ₹50
                  </button>
                  <button
                    type="button"
                    className={`filter-pill-btn ${priceFilter === '50to150' ? 'active' : ''}`}
                    onClick={() => setPriceFilter('50to150')}
                  >
                    ₹50 - ₹150
                  </button>
                  <button
                    type="button"
                    className={`filter-pill-btn ${priceFilter === 'above150' ? 'active' : ''}`}
                    onClick={() => setPriceFilter('above150')}
                  >
                    Above ₹150
                  </button>
                </div>
              </div>

              <div className="filter-group">
                <span className="filter-label">Rating:</span>
                <div className="filter-pills">
                  <button
                    type="button"
                    className={`filter-pill-btn ${minRatingFilter === 0 ? 'active' : ''}`}
                    onClick={() => setMinRatingFilter(0)}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    className={`filter-pill-btn ${minRatingFilter === 4.8 ? 'active' : ''}`}
                    onClick={() => setMinRatingFilter(4.8)}
                  >
                    4.8+ ★
                  </button>
                  <button
                    type="button"
                    className={`filter-pill-btn ${minRatingFilter === 4.5 ? 'active' : ''}`}
                    onClick={() => setMinRatingFilter(4.5)}
                  >
                    4.5+ ★
                  </button>
                </div>
              </div>

              <div className="filter-group">
                <span className="filter-label">Sort:</span>
                <select 
                  className="filter-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured Picks</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="no-results-box">
                <p>No products found matching your filter criteria.</p>
                <button
                  type="button"
                  className="reset-search-btn"
                  onClick={() => {
                    setSelectedCategory(null);
                    setSearchQuery('');
                    setPriceFilter('all');
                    setMinRatingFilter(0);
                  }}
                >
                  Browse All Products
                </button>
              </div>
            ) : (
              <div className="product-grid">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    cartQuantity={cartItems[product.id]?.quantity || 0}
                    isWishlisted={Boolean(wishlist[product.id])}
                    onAddToCart={handleAddToCart}
                    onUpdateQuantity={handleUpdateQuantity}
                    onToggleWishlist={handleToggleWishlist}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 5. Special Section 5: "Fresh Today" (Newly Stocked Sunrise Fruits & Vegetables) */}
      <FreshTodaySection
        products={FRESH_TODAY_DATA}
        cartItems={cartItems}
        onAddToCart={handleAddToCart}
        onUpdateQuantity={handleUpdateQuantity}
      />

      {/* 6. Special Section 3: "Today's Offers" (Apple 180->149, Tomato 40->30, Oil 160->145, Chips 30->25) */}
      <OfferSection
        products={TODAYS_OFFERS_DATA}
        cartItems={cartItems}
        wishlist={wishlist}
        onAddToCart={handleAddToCart}
        onUpdateQuantity={handleUpdateQuantity}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* 7. Instamart Signature Feature: "Cook This Meal" 1-Click Recipe Kits */}
      <CookThisMealSection
        onAddRecipeToCart={handleAddToCart}
        cartItems={cartItems}
      />

      {/* 7. Special Section 1: "Previous Purchases" ("Buy Again": Milk, Eggs 12pcs, Tomato, Basmati Rice 5kg, Bread) */}
      <BuyAgainSection
        items={PREVIOUS_PURCHASES_DATA}
        cartItems={cartItems}
        onAddToCart={handleAddToCart}
      />

      {/* 8. Special Section 2: "Recommended For You" (Greek Yogurt, Almonds, Peanut Butter, Corn Flakes, Honey) */}
      <ProductSection
        id="recommended"
        title="Recommended For You"
        subtitle="Curated wholesome staples based on your favorite purchases like Milk, Oats, and Bananas"
        badgeText="Personalized Picks"
        icon={Sparkles}
        products={RECOMMENDED_FOR_YOU_DATA}
        cartItems={cartItems}
        wishlist={wishlist}
        onAddToCart={handleAddToCart}
        onUpdateQuantity={handleUpdateQuantity}
        onToggleWishlist={handleToggleWishlist}
        onViewAll={() => showToast('Displaying curated recommendations')}
      />

      {/* 9. Special Section 4: "Most Purchased" (Milk, Onion, Tomato, Rice, Eggs, Banana, Bread, Cooking Oil) */}
      <ProductSection
        id="most-purchased"
        title="Most Purchased"
        subtitle="Frequently bought everyday groceries loved by GreenCart neighborhood households"
        badgeText="Popular Staples"
        icon={TrendingUp}
        products={MOST_PURCHASED_DATA}
        cartItems={cartItems}
        wishlist={wishlist}
        onAddToCart={handleAddToCart}
        onUpdateQuantity={handleUpdateQuantity}
        onToggleWishlist={handleToggleWishlist}
        onViewAll={() => showToast('Showing top pantry essentials')}
      />

      {/* 10. Meat & Seafood Section */}
      <ProductSection
        id="meat-seafood"
        title="Meat &amp; Seafood"
        subtitle="Fresh tender chicken breast, mutton curry cut, wild Atlantic salmon, and coastal cleaned prawns"
        badgeText="100% Antibiotic Free"
        icon={UtensilsCrossed}
        products={MEAT_SEAFOOD_DATA}
        cartItems={cartItems}
        wishlist={wishlist}
        onAddToCart={handleAddToCart}
        onUpdateQuantity={handleUpdateQuantity}
        onToggleWishlist={handleToggleWishlist}
        onViewAll={() => showToast('Showing Meat & Seafood')}
      />

      {/* 11. Why Choose Us Section */}
      <WhyChooseUs />

      {/* 12. Footer with Reordered Columns (GreenCart Logo & Contact on Far Right) */}
      <Footer
        onCategoryClick={(cat) => {
          if (onNavigateToCategoryPage) {
            onNavigateToCategoryPage(cat);
          } else {
            setSelectedCategory(cat);
            handleNavigate('categories');
          }
        }}
        onOpenTracker={propOpenTracker || (() => setIsTrackerOpen(true))}
      />

      {/* Smart Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        selectedLocation={{ area: 'Gandhipuram', city: 'Coimbatore', eta: '23 mins' }}
        onCheckoutSuccess={handleCheckoutSuccess}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onAddToCart={handleAddToCart}
        onRemoveFromWishlist={(id) => {
          if (wishlist[id]) {
            handleToggleWishlist(wishlist[id]);
          }
        }}
      />

      {/* Live 4-Step Delivery Tracker Modal */}
      <DeliveryTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        orderDetails={activeOrderDetails}
      />
    </div>
  );
}
