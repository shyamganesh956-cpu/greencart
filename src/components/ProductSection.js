import React from 'react';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';

export default function ProductSection({
  id,
  title,
  subtitle,
  badgeText,
  icon: IconComponent,
  products = [],
  cartItems = {},
  wishlist = {},
  onAddToCart,
  onUpdateQuantity,
  onToggleWishlist,
  onViewAll,
}) {
  return (
    <section className="section-block" id={id}>
      <div className="container">
        <div className="section-header-row">
          <div>
            <div className="deals-title-group">
              {IconComponent && (
                <span className="section-icon-wrap">
                  <IconComponent size={20} className="section-title-icon" />
                </span>
              )}
              <h2 className="section-title">{title}</h2>
              {badgeText && (
                <span className="section-curated-badge">{badgeText}</span>
              )}
            </div>
            {subtitle && (
              <p className="section-subtitle">{subtitle}</p>
            )}
          </div>

          <button 
            type="button" 
            className="view-all-link"
            onClick={onViewAll}
          >
            <span>View All</span>
            <ArrowRight size={15} />
          </button>
        </div>

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
