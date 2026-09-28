import React from 'react';
import { CheckCircle2, ShoppingBag, Heart, Sparkles, X, Info } from 'lucide-react';

export default function Toast({ toast, onClose, onActionClick }) {
  if (!toast || !toast.visible) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'cart':
        return <ShoppingBag size={18} className="toast-icon-cart" />;
      case 'wishlist':
        return <Heart size={18} className="toast-icon-wishlist" fill="#ef4444" color="#ef4444" />;
      case 'success':
        return <CheckCircle2 size={18} className="toast-icon-success" />;
      case 'sparkle':
        return <Sparkles size={18} className="toast-icon-sparkle" />;
      default:
        return <Info size={18} className="toast-icon-info" />;
    }
  };

  return (
    <div className={`greencart-toast-container ${toast.visible ? 'show' : ''}`}>
      <div className="greencart-toast-pill">
        <div className="toast-icon-box">{getIcon()}</div>
        <div className="toast-content-box">
          <strong className="toast-title">{toast.title}</strong>
          {toast.message && <p className="toast-message">{toast.message}</p>}
        </div>
        {toast.actionLabel && (
          <button
            type="button"
            className="toast-action-btn"
            onClick={() => {
              if (onActionClick) onActionClick(toast.actionType);
              if (onClose) onClose();
            }}
          >
            {toast.actionLabel}
          </button>
        )}
        <button
          type="button"
          className="toast-dismiss-btn"
          onClick={onClose}
          aria-label="Dismiss notification"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
