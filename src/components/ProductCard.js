import React, { useState, useMemo } from 'react';
import { Star, Plus, Minus, Heart } from 'lucide-react';

export default function ProductCard({
  product,
  cartQuantity = 0,
  isWishlisted = false,
  onAddToCart,
  onUpdateQuantity,
  onToggleWishlist,
}) {
  const {
    id,
    name,
    unit: defaultUnit,
    price: defaultPrice,
    originalPrice: defaultOriginalPrice,
    discountTag,
    badge,
    rating,
    reviews,
    image,
  } = product;

  // Determine if product should have weight variants (e.g. 250g, 500g, 1kg)
  const variants = useMemo(() => {
    if (product.variants && product.variants.length > 0) return product.variants;
    
    const unitLower = (defaultUnit || '').toLowerCase();
    const catLower = (product.category || '').toLowerCase();

    // Check if it's a grocery item that supports 250g, 500g, 1kg
    const eligibleCategories = ['vegetables', 'fruits', 'grocery & staples', 'staples', 'grains'];
    const isEligible = eligibleCategories.some(c => catLower.includes(c)) || unitLower.includes('kg') || unitLower.includes('500g') || unitLower.includes('250g');

    if (isEligible && !unitLower.includes('pack of') && !unitLower.includes('can') && !unitLower.includes('bottle')) {
      const basePrice = defaultPrice || 40;
      const baseOrig = defaultOriginalPrice || Math.round(basePrice * 1.25);
      
      return [
        {
          label: '250g',
          price: Math.max(10, Math.round(basePrice * 0.32)),
          originalPrice: Math.max(15, Math.round(baseOrig * 0.32)),
        },
        {
          label: '500g',
          price: Math.max(18, Math.round(basePrice * 0.58)),
          originalPrice: Math.max(24, Math.round(baseOrig * 0.58)),
        },
        {
          label: '1 kg',
          price: basePrice,
          originalPrice: baseOrig,
        }
      ];
    }

    return null;
  }, [product, defaultUnit, defaultPrice, defaultOriginalPrice]);

  // Selected variant state (defaults to 1kg or last variant if available)
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(
    variants ? (variants.length > 2 ? 2 : 0) : 0
  );

  const activeVariant = variants ? variants[selectedVariantIdx] : null;
  const currentPrice = activeVariant ? activeVariant.price : defaultPrice;
  const currentOriginalPrice = activeVariant ? activeVariant.originalPrice : defaultOriginalPrice;
  const currentUnit = activeVariant ? activeVariant.label : defaultUnit;

  // Calculate discount percentage if original price is greater
  const discountPercent = 
    currentOriginalPrice && currentOriginalPrice > currentPrice
      ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100)
      : null;

  const handleAdd = (e) => {
    e.stopPropagation();
    const itemToAdd = {
      ...product,
      id: variants ? `${id}-${activeVariant.label}` : id,
      name: variants ? `${name} (${activeVariant.label})` : name,
      unit: currentUnit,
      price: currentPrice,
      originalPrice: currentOriginalPrice,
    };
    onAddToCart(itemToAdd);
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    const targetId = variants ? `${id}-${activeVariant.label}` : id;
    onUpdateQuantity(targetId, cartQuantity + 1);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    const targetId = variants ? `${id}-${activeVariant.label}` : id;
    onUpdateQuantity(targetId, cartQuantity - 1);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(product);
    }
  };

  return (
    <div className="product-card">
      {/* Product Image & Badges & Wishlist */}
      <div className="product-image-wrap">
        <img 
          src={image} 
          alt={name} 
          className="product-img" 
          loading="lazy" 
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80';
          }}
        />
        
        {/* Floating Badges */}
        <div className="product-badges-overlay">
          {discountPercent ? (
            <span className="badge-deal">{discountPercent}% OFF</span>
          ) : discountTag ? (
            <span className="badge-deal">{discountTag}</span>
          ) : null}
          {badge && (
            <span className="badge-organic">{badge}</span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          type="button"
          className={`product-wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          title={isWishlisted ? 'In your wishlist' : 'Add to wishlist'}
        >
          <Heart 
            size={16} 
            fill={isWishlisted ? '#ef4444' : 'none'} 
            color={isWishlisted ? '#ef4444' : '#6b7280'} 
          />
        </button>
      </div>

      {/* Product Information */}
      <div className="product-info">
        {/* Rating */}
        <div className="product-rating-row">
          <Star size={13} className="star-icon" fill="#F59E0B" color="#F59E0B" />
          <span className="rating-score">{rating || 4.8}</span>
          <span className="rating-count">({reviews || 95})</span>
        </div>

        {/* Name */}
        <h3 className="product-name" title={name}>
          {name}
        </h3>

        {/* Weight Variants Selector (e.g. 250g | 500g | 1kg) */}
        {variants ? (
          <div className="product-variant-selector">
            {variants.map((v, vIdx) => (
              <button
                key={vIdx}
                type="button"
                className={`variant-pill-btn ${selectedVariantIdx === vIdx ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedVariantIdx(vIdx);
                }}
                title={`Select ${v.label} for ₹${v.price}`}
              >
                {v.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="product-unit">{currentUnit}</div>
        )}

        {/* Price & Add to Cart Button */}
        <div className="product-bottom-row">
          <div className="product-pricing">
            <div className="price-main">
              <span className="current-price">₹{currentPrice}</span>
              {currentOriginalPrice && currentOriginalPrice > currentPrice && (
                <span className="original-price">₹{currentOriginalPrice}</span>
              )}
            </div>
            <div className="price-per-unit">
              ₹{currentPrice} / {currentUnit}
            </div>
          </div>

          <div className="product-action">
            {cartQuantity === 0 ? (
              <button 
                type="button" 
                className="add-cart-btn" 
                onClick={handleAdd}
                title={`Add ${name} to cart`}
              >
                <Plus size={14} />
                <span>Add</span>
              </button>
            ) : (
              <div className="quantity-stepper">
                <button
                  type="button"
                  className="step-btn minus-btn"
                  onClick={handleDecrement}
                  aria-label="Decrease quantity"
                >
                  <Minus size={13} />
                </button>
                <span className="step-qty">{cartQuantity}</span>
                <button
                  type="button"
                  className="step-btn plus-btn"
                  onClick={handleIncrement}
                  aria-label="Increase quantity"
                >
                  <Plus size={13} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
