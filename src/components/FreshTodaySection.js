import React from 'react';
import { Sparkles, Plus, Minus } from 'lucide-react';

export default function FreshTodaySection({
  products = [],
  cartItems = {},
  onAddToCart,
  onUpdateQuantity,
}) {
  if (!products || products.length === 0) return null;

  return (
    <section className="section-block fresh-today-section" id="fresh-today">
      <div className="container">
        <div className="section-header-row">
          <div>
            <div className="deals-title-group">
              <span className="flame-icon-wrap" style={{ background: '#ecfdf5', color: '#059669' }}>
                <Sparkles size={20} />
              </span>
              <h2 className="section-title">Fresh Today</h2>
              <span className="discount-pill" style={{ background: '#10b981', color: '#ffffff' }}>
                Sunrise Stocked
              </span>
            </div>
            <p className="section-subtitle">
              Crisp farm vegetables and fruits harvested early this morning and newly stocked
            </p>
          </div>
        </div>

        <div className="fresh-today-grid">
          {products.map((product) => {
            const inCartQty = cartItems[product.id]?.quantity || 0;
            return (
              <div key={product.id} className="fresh-today-card">
                <div className="fresh-today-img-wrap">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="fresh-today-img"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80';
                    }} 
                  />
                  {/* Dedicated Fresh Today badge */}
                  <span className="fresh-today-pill-badge">Fresh Today</span>
                </div>

                <div className="fresh-today-content">
                  <h4 className="fresh-today-name" title={product.name}>{product.name}</h4>
                  <div className="fresh-today-unit">{product.unit}</div>

                  <div className="fresh-today-bottom">
                    <div className="fresh-today-price-wrap">
                      <span className="fresh-today-price">₹{product.price}</span>
                      <span className="fresh-today-per-unit">/{product.unit}</span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="fresh-today-orig-price">₹{product.originalPrice}</span>
                      )}
                    </div>

                    <div className="fresh-today-action">
                      {inCartQty === 0 ? (
                        <button
                          type="button"
                          className="fresh-today-add-btn"
                          onClick={() => onAddToCart(product)}
                        >
                          <Plus size={14} />
                          <span>Add</span>
                        </button>
                      ) : (
                        <div className="quantity-stepper small-stepper">
                          <button
                            type="button"
                            className="stepper-btn"
                            onClick={() => onUpdateQuantity(product.id, inCartQty - 1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="stepper-qty">{inCartQty}</span>
                          <button
                            type="button"
                            className="stepper-btn"
                            onClick={() => onUpdateQuantity(product.id, inCartQty + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
