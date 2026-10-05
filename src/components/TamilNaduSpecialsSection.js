import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { TAMIL_NADU_SPECIALS_DATA } from '../data/productsData';

export default function TamilNaduSpecialsSection({
  cartItems = {},
  wishlist = {},
  onAddToCart,
  onUpdateQuantity,
  onToggleWishlist,
  onOpenReviews,
  onOpenProductDetail,
  onExploreCategory
}) {
  return (
    <section className="tamil-specials-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="tamil-specials-header">
          <div className="header-left">
            <div className="tamil-badge-pill">
              <MapPin size={14} className="pin-icon" />
              <span>Regional Farm Fresh Specials • Heritage Staples</span>
            </div>
            <h2 className="tamil-section-title">
              Authentic Regional Brands &amp; Heritage Farm Favorites
            </h2>
            <p className="tamil-section-desc">
              From fresh morning dairy milk &amp; Ooty carrots to wood-pressed gingelly oil, crisp peanut chikki, and rich filter coffee.
            </p>
          </div>

          <div className="tamil-header-right">
            <button 
              type="button" 
              className="tamil-explore-btn"
              onClick={() => onExploreCategory && onExploreCategory(5)} // Navigate to staples/TN
            >
              <span>View All Regional Staples</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="tamil-products-grid">
          {TAMIL_NADU_SPECIALS_DATA.map((product) => {
            const cartQty = cartItems[product.id]?.quantity || 0;
            const isWishlisted = Boolean(wishlist[product.id]);

            return (
              <ProductCard
                key={product.id}
                product={product}
                cartQuantity={cartQty}
                isWishlisted={isWishlisted}
                onAddToCart={onAddToCart}
                onUpdateQuantity={onUpdateQuantity}
                onToggleWishlist={onToggleWishlist}
                onOpenReviews={onOpenReviews}
                onOpenDetail={onOpenProductDetail}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
