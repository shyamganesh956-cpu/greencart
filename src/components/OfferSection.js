import React, { useState, useEffect } from 'react';
import { Flame, Clock, Plus, Check } from 'lucide-react';
import ProductCard from './ProductCard';
import tomatoImg from '../assets/products/tomatoes.jpg';

export default function OfferSection({
  products = [],
  cartItems = {},
  wishlist = {},
  onAddToCart,
  onUpdateQuantity,
  onToggleWishlist,
}) {
  // Real-time countdown timer for daily fresh deals: starts at 04:32:18
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 32,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 4, minutes: 32, seconds: 18 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (val) => String(val).padStart(2, '0');

  // Spotlight Deal product
  const spotlightDeal = {
    id: 'prod-tomato-deal',
    name: 'Fresh Farm Tomatoes',
    category: 'Vegetables',
    unit: '1 kg',
    price: 30,
    originalPrice: 40,
    discountTag: '25% OFF',
    badge: 'Deal of the Day',
    rating: 4.9,
    reviews: 284,
    image: tomatoImg,
  };

  const spotlightInCart = cartItems['prod-tomato-deal']?.quantity || 0;

  return (
    <section className="section-block offers-section" id="offers">
      <div className="container">
        <div className="section-header-row">
          <div>
            <div className="deals-title-group">
              <span className="flame-icon-wrap">
                <Flame size={20} className="flame-icon" />
              </span>
              <h2 className="section-title">Today's Deals &amp; Offers</h2>
              <span className="discount-pill">Up to 35% OFF</span>
            </div>
            <p className="section-subtitle">
              Hand-harvested farm produce and kitchen staples at unbeatable daily morning prices
            </p>
          </div>

          <div className="deals-right-controls">
            <div className="countdown-pill">
              <Clock size={15} className="countdown-clock" />
              <span>
                Offer ends in: <strong>{formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Featured Spotlight Banner: Today's Deal */}
        <div className="spotlight-deal-card">
          <div className="spotlight-deal-badge">
            <Flame size={15} />
            <span>TODAY'S DEAL</span>
          </div>
          <div className="spotlight-content">
            <div className="spotlight-img-wrap">
              <img src={tomatoImg} alt="Fresh Tomatoes" className="spotlight-img" />
              <span className="spotlight-discount-tag">28% OFF</span>
            </div>
            <div className="spotlight-info">
              <div className="spotlight-meta">
                <span className="spotlight-tag">⭐ 4.9 Farm Fresh</span>
                <span className="spotlight-stock">In Stock &bull; 100% Organic</span>
              </div>
              <h3 className="spotlight-title">Fresh Tomatoes</h3>
              <p className="spotlight-desc">
                Crisp, sun-ripened organic tomatoes freshly picked at sunrise. Rich in lycopene and perfect for fresh salads, gravies, and soups.
              </p>
              <div className="spotlight-price-row">
                <div className="spotlight-prices">
                  <span className="spotlight-current-price">₹30</span>
                  <span className="spotlight-unit">/kg</span>
                  <span className="spotlight-orig-price">₹40</span>
                  <span className="spotlight-save-pill">Save ₹10</span>
                </div>
                <div className="spotlight-timer-box">
                  <Clock size={14} />
                  <span>Offer ends in <strong>{formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}</strong></span>
                </div>
              </div>
              <div className="spotlight-actions">
                <button
                  type="button"
                  className="spotlight-add-btn"
                  onClick={() => onAddToCart(spotlightDeal)}
                >
                  {spotlightInCart > 0 ? (
                    <>
                      <Check size={16} />
                      <span>Added to Basket ({spotlightInCart})</span>
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      <span>Claim Deal &bull; Add ₹30</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Other daily deals */}
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              cartQuantity={cartItems[product.id]?.quantity || 0}
              isWishlisted={Boolean(wishlist[product.id])}
              onAddToCart={onAddToCart}
              onUpdateQuantity={onUpdateQuantity}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
