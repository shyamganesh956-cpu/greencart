import React, { useState, useMemo } from 'react';
import { 
  X, 
  Star, 
  Heart, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Leaf, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Calendar, 
  Thermometer, 
  Award 
} from 'lucide-react';

export default function ProductDetailModal({
  isOpen,
  onClose,
  product = null,
  cartQuantity = 0,
  isWishlisted = false,
  onAddToCart,
  onUpdateQuantity,
  onToggleWishlist,
  onOpenReviews
}) {
  // Determine product variants (e.g. 250g, 500g, 1kg)
  const variants = useMemo(() => {
    if (!product) return null;
    if (product.variants && product.variants.length > 0) return product.variants;

    const unitLower = (product.unit || '').toLowerCase();
    const catLower = (product.category || '').toLowerCase();

    const eligibleCategories = ['vegetables', 'fruits', 'grocery & staples', 'staples', 'grains', 'tamil nadu'];
    const isEligible = eligibleCategories.some(c => catLower.includes(c)) || unitLower.includes('kg') || unitLower.includes('500g') || unitLower.includes('250g');

    if (isEligible && !unitLower.includes('pack of') && !unitLower.includes('can') && !unitLower.includes('bottle') && !unitLower.includes('bunch')) {
      const basePrice = product.price || 40;
      const baseOrig = product.originalPrice || Math.round(basePrice * 1.25);

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
  }, [product]);

  const [selectedVariantIdx, setSelectedVariantIdx] = useState(
    variants ? (variants.length > 2 ? 2 : 0) : 0
  );

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'nutrition' | 'origin'

  if (!isOpen || !product) return null;

  const activeVariant = variants ? variants[selectedVariantIdx] : null;
  const currentPrice = activeVariant ? activeVariant.price : product.price;
  const currentOriginalPrice = activeVariant ? activeVariant.originalPrice : product.originalPrice;
  const currentUnit = activeVariant ? activeVariant.label : product.unit;

  const discountPercent =
    currentOriginalPrice && currentOriginalPrice > currentPrice
      ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100)
      : null;

  const targetId = variants ? `${product.id}-${activeVariant.label}` : product.id;

  const handleAdd = () => {
    const itemToAdd = {
      ...product,
      id: targetId,
      name: variants ? `${product.name} (${activeVariant.label})` : product.name,
      unit: currentUnit,
      price: currentPrice,
      originalPrice: currentOriginalPrice,
    };
    if (onAddToCart) onAddToCart(itemToAdd);
  };

  const handleIncrement = () => {
    if (onUpdateQuantity) onUpdateQuantity(targetId, cartQuantity + 1);
  };

  const handleDecrement = () => {
    if (onUpdateQuantity) onUpdateQuantity(targetId, cartQuantity - 1);
  };

  // Nutrition helper based on category
  const getNutritionData = () => {
    const nameLower = product.name.toLowerCase();
    if (nameLower.includes('carrot') || nameLower.includes('keerai') || nameLower.includes('spinach')) {
      return [
        { label: 'Energy', val: '41 kcal' },
        { label: 'Carbs', val: '9.6g' },
        { label: 'Dietary Fiber', val: '2.8g' },
        { label: 'Protein', val: '1.2g' },
        { label: 'Vitamin A', val: '334% DV' },
        { label: 'Vitamin C', val: '7mg' },
      ];
    }
    if (nameLower.includes('apple') || nameLower.includes('banana') || nameLower.includes('fruit')) {
      return [
        { label: 'Energy', val: '52 kcal' },
        { label: 'Carbs', val: '14g' },
        { label: 'Natural Sugars', val: '10g' },
        { label: 'Dietary Fiber', val: '2.4g' },
        { label: 'Vitamin C', val: '14% DV' },
        { label: 'Potassium', val: '107mg' },
      ];
    }
    if (nameLower.includes('milk') || nameLower.includes('aavin') || nameLower.includes('curd') || nameLower.includes('paneer')) {
      return [
        { label: 'Energy', val: '64 kcal' },
        { label: 'Protein', val: '3.4g' },
        { label: 'Total Fat', val: '3.5g' },
        { label: 'Calcium', val: '120mg' },
        { label: 'Vitamin D', val: '24% DV' },
        { label: 'Carbs', val: '4.8g' },
      ];
    }
    if (nameLower.includes('rice') || nameLower.includes('atta') || nameLower.includes('dal') || nameLower.includes('semiya')) {
      return [
        { label: 'Energy', val: '345 kcal' },
        { label: 'Carbs', val: '78g' },
        { label: 'Protein', val: '7.5g' },
        { label: 'Dietary Fiber', val: '3.2g' },
        { label: 'Iron', val: '15% DV' },
        { label: 'Fat', val: '0.6g' },
      ];
    }
    return [
      { label: 'Energy', val: '68 kcal' },
      { label: 'Total Carbs', val: '11g' },
      { label: 'Protein', val: '2.1g' },
      { label: 'Fiber', val: '2.2g' },
      { label: 'Sodium', val: '8mg' },
      { label: 'Antioxidants', val: 'High' },
    ];
  };

  const nutritionList = getNutritionData();

  // Farm origin helper
  const getOriginInfo = () => {
    const nameLower = product.name.toLowerCase();
    if (nameLower.includes('ooty') || nameLower.includes('carrot')) {
      return {
        farm: 'Nilgiris Mountain Terrace Farms, Ooty (TN)',
        harvest: 'Harvested daily at 5:30 AM',
        distance: 'Direct 85 km cold-chain transit to dark store',
        soil: 'Organic red volcanic highland soil'
      };
    }
    if (nameLower.includes('aavin') || nameLower.includes('milk')) {
      return {
        farm: 'Tamil Nadu Co-operative Milk Producers (Aavin)',
        harvest: 'Pasteurized & Packed same morning',
        distance: 'Processed at Erode / Coimbatore dairy plants',
        soil: 'Grass-fed native country cows'
      };
    }
    if (nameLower.includes('shallot') || nameLower.includes('vengayam') || nameLower.includes('onion')) {
      return {
        farm: 'Udumalpet & Dharapuram Agro Cluster, Tamil Nadu',
        harvest: 'Sun-cured and graded yesterday',
        distance: 'Local farm gate pickup within 45 km',
        soil: 'Rich black alluvial soil'
      };
    }
    if (nameLower.includes('idhayam') || nameLower.includes('oil')) {
      return {
        farm: 'Virudhunagar & Madurai Gingelly Mills, Tamil Nadu',
        harvest: 'Traditional cold-pressed extraction',
        distance: 'Authentic mill packed',
        soil: 'First-grade natural sesame seeds'
      };
    }
    return {
      farm: 'Verified Organic Regional Farmers Collective, Tamil Nadu',
      harvest: 'Sunrise harvest (within 24 hours)',
      distance: 'Cold-chain routed to maintain crunch & vitamins',
      soil: 'Pesticide-free certified farmland'
    };
  };

  const originInfo = getOriginInfo();

  return (
    <div className="product-detail-backdrop" onClick={onClose}>
      <div className="product-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button 
          type="button" 
          className="product-detail-close-btn" 
          onClick={onClose}
          aria-label="Close product details"
        >
          <X size={20} />
        </button>

        <div className="product-detail-grid">
          {/* Left Column: Image & Badges */}
          <div className="product-detail-media">
            <div className="detail-image-box">
              <img 
                src={product.image} 
                alt={product.name} 
                className="detail-main-img"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80';
                }}
              />
              
              <div className="detail-badges-overlay">
                {discountPercent ? (
                  <span className="badge-deal">{discountPercent}% OFF</span>
                ) : product.discountTag ? (
                  <span className="badge-deal">{product.discountTag}</span>
                ) : null}
                {product.badge && (
                  <span className="badge-organic">{product.badge}</span>
                )}
                <span className="badge-freshness-pill">
                  <Leaf size={12} />
                  <span>99% Freshness Index</span>
                </span>
              </div>

              <button
                type="button"
                className={`detail-wishlist-toggle ${isWishlisted ? 'active' : ''}`}
                onClick={() => onToggleWishlist && onToggleWishlist(product)}
                aria-label="Wishlist item"
              >
                <Heart size={20} fill={isWishlisted ? '#ef4444' : 'none'} color={isWishlisted ? '#ef4444' : '#64748b'} />
              </button>
            </div>

            {/* Quick Trust Highlights */}
            <div className="detail-trust-pills">
              <div className="trust-pill-item">
                <Truck size={15} color="#059669" />
                <span>30-Min Fast Delivery</span>
              </div>
              <div className="trust-pill-item">
                <RotateCcw size={15} color="#059669" />
                <span>Instant Doorstep Return</span>
              </div>
              <div className="trust-pill-item">
                <ShieldCheck size={15} color="#059669" />
                <span>100% Quality Inspected</span>
              </div>
            </div>
          </div>

          {/* Right Column: Info & Add to Cart */}
          <div className="product-detail-content">
            {/* Category Breadcrumb */}
            <div className="detail-breadcrumb">
              <span>Home</span>
              <span>/</span>
              <span>{product.category || 'Fresh Groceries'}</span>
              {product.subCategory && (
                <>
                  <span>/</span>
                  <span className="current-crumb">{product.subCategory}</span>
                </>
              )}
            </div>

            <h1 className="detail-product-title">{product.name}</h1>
            
            {/* Rating & Review row */}
            <div className="detail-rating-row">
              <div 
                className="detail-star-badge"
                onClick={() => {
                  if (onOpenReviews) onOpenReviews(product);
                }}
              >
                <Star size={14} fill="#F59E0B" color="#F59E0B" />
                <span className="star-num">{product.rating || 4.9}</span>
              </div>
              <span className="detail-review-count">
                ({product.reviews || 128} verified customer reviews)
              </span>
              <button 
                type="button" 
                className="detail-reviews-link"
                onClick={() => {
                  if (onOpenReviews) onOpenReviews(product);
                }}
              >
                Read Reviews
              </button>
            </div>

            {/* Pricing Section */}
            <div className="detail-pricing-box">
              <div className="detail-price-main">
                <span className="detail-currency">₹</span>
                <span className="detail-final-price">{currentPrice}</span>
                {currentOriginalPrice && currentOriginalPrice > currentPrice && (
                  <span className="detail-mrp">₹{currentOriginalPrice}</span>
                )}
                {discountPercent && (
                  <span className="detail-discount-tag">Save {discountPercent}%</span>
                )}
              </div>
              <span className="detail-unit-caption">(Incl. of all taxes / {currentUnit})</span>
            </div>

            {/* Weight / Pack Variant Selector */}
            {variants && (
              <div className="detail-variants-group">
                <label className="variant-label">Choose Quantity / Pack:</label>
                <div className="variant-buttons-row">
                  {variants.map((v, idx) => (
                    <button
                      key={v.label}
                      type="button"
                      className={`variant-option-pill ${selectedVariantIdx === idx ? 'selected' : ''}`}
                      onClick={() => setSelectedVariantIdx(idx)}
                    >
                      <span className="variant-option-name">{v.label}</span>
                      <span className="variant-option-price">₹{v.price}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Tabs for Deep Info */}
            <div className="detail-tabs-bar">
              <button 
                type="button" 
                className={`detail-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview &amp; Storage
              </button>
              <button 
                type="button" 
                className={`detail-tab-btn ${activeTab === 'nutrition' ? 'active' : ''}`}
                onClick={() => setActiveTab('nutrition')}
              >
                Nutrition Facts
              </button>
              <button 
                type="button" 
                className={`detail-tab-btn ${activeTab === 'origin' ? 'active' : ''}`}
                onClick={() => setActiveTab('origin')}
              >
                Farm Origin
              </button>
            </div>

            {/* Tab 1: Overview & Storage */}
            {activeTab === 'overview' && (
              <div className="tab-pane-detail">
                <div className="storage-info-card">
                  <div className="storage-info-row">
                    <Calendar size={18} className="storage-icon" />
                    <div>
                      <strong>Shelf Life</strong>
                      <p>Consume within 4–5 days of delivery for peak nutrition and crispness.</p>
                    </div>
                  </div>
                  <div className="storage-info-row">
                    <Thermometer size={18} className="storage-icon" />
                    <div>
                      <strong>Storage Advice</strong>
                      <p>Store in refrigerator vegetable crisper drawer at 4°C – 8°C. Do not wash before storing.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Nutrition Facts */}
            {activeTab === 'nutrition' && (
              <div className="tab-pane-detail">
                <div className="nutrition-facts-grid">
                  {nutritionList.map((item, i) => (
                    <div key={i} className="nutrition-cell">
                      <span className="nutri-label">{item.label}</span>
                      <strong className="nutri-val">{item.val}</strong>
                    </div>
                  ))}
                </div>
                <small className="nutri-disclaimer">Values based on standard 100g raw produce serving.</small>
              </div>
            )}

            {/* Tab 3: Farm Origin */}
            {activeTab === 'origin' && (
              <div className="tab-pane-detail">
                <div className="farm-origin-card">
                  <div className="origin-row">
                    <Award size={18} color="#059669" />
                    <div>
                      <strong>Source Farm</strong>
                      <p>{originInfo.farm}</p>
                    </div>
                  </div>
                  <div className="origin-row">
                    <Leaf size={18} color="#059669" />
                    <div>
                      <strong>Harvest Schedule</strong>
                      <p>{originInfo.harvest} ({originInfo.distance})</p>
                    </div>
                  </div>
                  <div className="origin-row">
                    <ShieldCheck size={18} color="#059669" />
                    <div>
                      <strong>Cultivation Method</strong>
                      <p>{originInfo.soil} with 0 chemical ripeners.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Add to Basket Action Row */}
            <div className="detail-action-footer">
              {cartQuantity > 0 ? (
                <div className="detail-qty-stepper">
                  <button 
                    type="button" 
                    className="detail-qty-btn"
                    onClick={handleDecrement}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="detail-qty-val">{cartQuantity}</span>
                  <button 
                    type="button" 
                    className="detail-qty-btn"
                    onClick={handleIncrement}
                    aria-label="Increase quantity"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="detail-add-btn"
                  onClick={handleAdd}
                >
                  <ShoppingBag size={18} />
                  <span>Add to Basket • ₹{currentPrice}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
