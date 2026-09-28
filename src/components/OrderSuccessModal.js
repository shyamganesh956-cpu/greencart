import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Truck, 
  MapPin, 
  CreditCard, 
  Sparkles, 
  X, 
  Download, 
  ShoppingBag,
  Clock,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function OrderSuccessModal({
  isOpen,
  onClose,
  order = null,
  onTrackOrder,
  onContinueShopping
}) {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen || !order) return null;

  const {
    orderId = 'GC-84920',
    total = 274,
    itemsCount = 3,
    deliveryEta = '23 mins',
    address = 'Gandhipuram, Coimbatore (628001)',
    paymentMethod = 'UPI',
    items = [],
    placedAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    savings = 45
  } = order;

  // Generate downloadable invoice receipt
  const handleDownloadInvoice = () => {
    const invoiceContent = `
=========================================
          GREENCART FRESH GROCERY
       Official Tax Invoice & Receipt
=========================================
Order ID: #${orderId}
Date & Time: ${new Date().toLocaleDateString()} ${placedAt}
Delivery Address: ${address}
Payment Mode: ${paymentMethod}
Estimated Delivery: Within ${deliveryEta}

-----------------------------------------
ITEMS ORDERED:
-----------------------------------------
${items && items.length > 0 
  ? items.map(item => `- ${item.product?.name || item.name} (${item.product?.unit || item.unit}) x ${item.quantity} = Rs.${(item.product?.price || item.price) * item.quantity}`).join('\n')
  : `- Fresh Organic Produce Bundle x ${itemsCount} items = Rs.${total}`}

-----------------------------------------
Subtotal: Rs.${total}
Delivery Fee: FREE (Instamart 30-min express)
Handling Fee: Rs.4 (Included)
Total Savings: Rs.${savings}
-----------------------------------------
FINAL AMOUNT PAID: Rs.${total}
=========================================
Thank you for shopping healthy with GreenCart!
Farm Fresh to Your Doorstep in 30 Minutes.
=========================================
`;

    const blob = new Blob([invoiceContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `GreenCart-Invoice-${orderId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="order-success-backdrop" onClick={onClose}>
      <div className="order-success-modal" onClick={(e) => e.stopPropagation()}>
        {/* Confetti decoration */}
        <div className="success-confetti-badge">
          <Sparkles size={24} className="confetti-icon pulse" />
        </div>

        <button 
          type="button" 
          className="order-success-close-btn" 
          onClick={onClose}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Success Header */}
        <div className="success-header-content">
          <div className="success-checkmark-ring">
            <CheckCircle2 size={42} color="#059669" />
          </div>
          <span className="success-mini-tag">ORDER CONFIRMED</span>
          <h2>Payment Received &amp; Order Placed!</h2>
          <p className="success-subtext">
            Our packing team is bagging your crisp produce in temperature-controlled boxes.
          </p>
        </div>

        {/* ETA & Order ID Banner */}
        <div className="success-eta-card">
          <div className="eta-badge-item">
            <div className="eta-icon-wrap">
              <Clock size={20} color="#059669" />
            </div>
            <div>
              <span className="eta-label">ESTIMATED DELIVERY</span>
              <strong className="eta-time">Arriving in {deliveryEta}</strong>
            </div>
          </div>
          <div className="order-num-pill">
            <span>Order #{orderId}</span>
          </div>
        </div>

        {/* Order Details Body */}
        <div className="success-details-body">
          {/* Order Info Grid */}
          <div className="order-info-columns">
            <div className="order-info-item">
              <div className="info-icon">
                <MapPin size={16} />
              </div>
              <div>
                <span className="info-title">Delivering to</span>
                <p className="info-val">{address}</p>
              </div>
            </div>

            <div className="order-info-item">
              <div className="info-icon">
                <CreditCard size={16} />
              </div>
              <div>
                <span className="info-title">Payment Mode</span>
                <p className="info-val">{paymentMethod} (Verified)</p>
              </div>
            </div>
          </div>

          {/* Items Summary Preview */}
          {items && items.length > 0 && (
            <div className="success-items-preview">
              <div className="items-preview-header">
                <span>Items in this delivery ({items.reduce((s, i) => s + i.quantity, 0)})</span>
                <span className="savings-highlight">Saved ₹{savings}</span>
              </div>
              <div className="success-items-list">
                {items.slice(0, 4).map((item, idx) => (
                  <div key={idx} className="success-item-chip">
                    {item.product?.image && (
                      <img 
                        src={item.product.image} 
                        alt={item.product?.name || item.name} 
                        className="item-chip-img"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=100&q=80';
                        }}
                      />
                    )}
                    <span className="item-chip-name">{item.product?.name || item.name}</span>
                    <span className="item-chip-qty">x{item.quantity}</span>
                  </div>
                ))}
                {items.length > 4 && (
                  <div className="success-item-more">+{items.length - 4} more</div>
                )}
              </div>
            </div>
          )}

          {/* Pricing Row */}
          <div className="success-price-row">
            <span>Total Paid (incl. taxes &amp; free delivery)</span>
            <strong className="success-total-amount">₹{total}</strong>
          </div>

          <div className="green-promise-strip">
            <ShieldCheck size={16} color="#059669" />
            <span>100% Contactless Delivery with Tamper-Evident Freshness Seal</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="success-modal-actions">
          <button
            type="button"
            className="action-btn-track"
            onClick={() => {
              if (onTrackOrder) onTrackOrder(order);
            }}
          >
            <Truck size={18} />
            <span>Track Live Delivery</span>
            <ArrowRight size={16} />
          </button>

          <div className="secondary-actions-row">
            <button
              type="button"
              className="action-btn-invoice"
              onClick={handleDownloadInvoice}
            >
              <Download size={16} />
              <span>{downloadSuccess ? 'Downloaded!' : 'Download Invoice'}</span>
            </button>

            <button
              type="button"
              className="action-btn-continue"
              onClick={() => {
                if (onContinueShopping) onContinueShopping();
                else onClose();
              }}
            >
              <ShoppingBag size={16} />
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
