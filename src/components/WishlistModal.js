import React from 'react';
import { Heart, X, ShoppingCart, Trash2 } from 'lucide-react';

export default function WishlistModal({
  isOpen,
  onClose,
  wishlist = {},
  onAddToCart,
  onRemoveFromWishlist,
}) {
  if (!isOpen) return null;

  const items = Object.values(wishlist);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="wishlist-modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="wishlist-modal-header">
          <div className="wishlist-modal-title">
            <Heart size={22} fill="#ef4444" color="#ef4444" />
            <h3>Your Wishlist ({items.length})</h3>
          </div>
          <button className="wishlist-close-btn" onClick={onClose} aria-label="Close wishlist">
            <X size={20} />
          </button>
        </div>

        <div className="wishlist-modal-body">
          {items.length === 0 ? (
            <div className="wishlist-empty-box">
              <Heart size={44} color="#d1d5db" />
              <h4>No favorites yet</h4>
              <p>Tap the ❤️ heart icon on any product card to save it for later!</p>
              <button className="wishlist-browse-btn" onClick={onClose}>
                Browse Groceries
              </button>
            </div>
          ) : (
            <div className="wishlist-items-list">
              {items.map((product) => (
                <div key={product.id} className="wishlist-item-row">
                  <img src={product.image} alt={product.name} className="wishlist-item-img" />
                  <div className="wishlist-item-info">
                    <h4>{product.name}</h4>
                    <span className="wishlist-item-unit">{product.unit}</span>
                    <div className="wishlist-item-prices">
                      <span className="wishlist-current-price">₹{product.price}</span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="wishlist-orig-price">₹{product.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  <div className="wishlist-item-actions">
                    <button
                      type="button"
                      className="wishlist-add-cart-btn"
                      onClick={() => {
                        onAddToCart(product);
                      }}
                      title="Move to Cart"
                    >
                      <ShoppingCart size={15} />
                      <span>Add</span>
                    </button>
                    <button
                      type="button"
                      className="wishlist-remove-btn"
                      onClick={() => onRemoveFromWishlist(product.id)}
                      title="Remove from wishlist"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
