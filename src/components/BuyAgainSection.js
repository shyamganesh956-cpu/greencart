import React from 'react';
import { RotateCcw, Plus, Check } from 'lucide-react';

export default function BuyAgainSection({
  items = [],
  cartItems = {},
  onAddToCart,
}) {
  if (!items || items.length === 0) return null;

  return (
    <section className="section-block buy-again-section" id="buy-again">
      <div className="container">
        <div className="section-header-row">
          <div>
            <div className="deals-title-group">
              <span className="flame-icon-wrap" style={{ background: '#ecfdf5', color: '#059669' }}>
                <RotateCcw size={20} />
              </span>
              <h2 className="section-title">Buy Again</h2>
              <span className="discount-pill" style={{ background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0' }}>
                Your Frequently Ordered Staples
              </span>
            </div>
            <p className="section-subtitle">
              Quickly re-order the daily kitchen essentials you buy most often
            </p>
          </div>
        </div>

        <div className="buy-again-grid">
          {items.map((item) => {
            const inCartQty = cartItems[item.productId || item.id]?.quantity || 0;
            return (
              <div key={item.id} className="buy-again-card">
                <div className="buy-again-img-wrap">
                  <img src={item.image} alt={item.name} className="buy-again-img" />
                  <span className="bought-count-badge">
                    Bought {item.boughtCount} {item.boughtCount === 1 ? 'time' : 'times'}
                  </span>
                </div>

                <div className="buy-again-content">
                  <div className="buy-again-last-ordered">Last ordered: {item.lastOrdered}</div>
                  <h4 className="buy-again-name" title={item.name}>{item.name}</h4>
                  <div className="buy-again-unit">{item.unit}</div>

                  <div className="buy-again-bottom">
                    <div className="buy-again-price-wrap">
                      <span className="buy-again-price">₹{item.price}</span>
                      {item.originalPrice && (
                        <span className="buy-again-orig-price">₹{item.originalPrice}</span>
                      )}
                    </div>

                    <button
                      type="button"
                      className="buy-again-reorder-btn"
                      onClick={() => onAddToCart({
                        id: item.productId || item.id,
                        name: item.name,
                        unit: item.unit,
                        price: item.price,
                        originalPrice: item.originalPrice,
                        image: item.image,
                        category: item.category,
                      })}
                    >
                      {inCartQty > 0 ? (
                        <>
                          <Check size={14} />
                          <span>Added ({inCartQty})</span>
                        </>
                      ) : (
                        <>
                          <Plus size={14} />
                          <span>Re-order</span>
                        </>
                      )}
                    </button>
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
