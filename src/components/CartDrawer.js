import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  Check, 
  Percent,
  CreditCard,
  Banknote,
  Smartphone,
  MapPin,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems = {},
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  selectedLocation,
  onCheckoutSuccess
}) {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null); // 'WELCOME10', 'FRESH50'
  const [couponError, setCouponError] = useState('');
  const [selectedTip, setSelectedTip] = useState(10); // ₹10 default tip
  
  // Checkout flow state (drawer vs checkout form)
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart' | 'checkout'
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Checkout address & payment form
  const [customerName, setCustomerName] = useState('Shyam Sundar');
  const [customerPhone, setCustomerPhone] = useState('9876543210');
  const [houseAddress, setHouseAddress] = useState('Flat 402, Green Meadows, Cross Cut Road');
  const [city, setCity] = useState('Coimbatore');
  const [pincode, setPincode] = useState('628001');
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi', 'card', 'cod'

  if (!isOpen) return null;

  const itemsList = Object.values(cartItems).filter((item) => item.quantity > 0);
  const totalItemsCount = itemsList.reduce((sum, item) => sum + item.quantity, 0);

  // Calculations
  const mrpTotal = itemsList.reduce(
    (sum, item) => sum + (item.product.originalPrice || item.product.price) * item.quantity,
    0
  );

  const subtotal = itemsList.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const productSavings = Math.max(0, mrpTotal - subtotal);

  // Instamart Free delivery threshold ₹199
  const freeDeliveryThreshold = 199;
  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));
  const amountNeeded = Math.max(0, freeDeliveryThreshold - subtotal);
  const deliveryFee = subtotal >= freeDeliveryThreshold || subtotal === 0 ? 0 : 25;
  const platformFee = subtotal > 0 ? 4 : 0; // Standard handling fee
  const gstAmount = subtotal > 0 ? Math.round(subtotal * 0.05) : 0; // 5% GST

  // Coupon discount calculation
  let discountAmount = 0;
  if (appliedCoupon === 'WELCOME10') {
    discountAmount = Math.round(subtotal * 0.1);
  } else if (appliedCoupon === 'FRESH50') {
    discountAmount = 50;
  }

  const grandTotal = Math.max(0, subtotal + deliveryFee + platformFee + gstAmount + selectedTip - discountAmount);
  const totalSavings = productSavings + discountAmount + (deliveryFee === 0 && subtotal > 0 ? 25 : 0);

  const handleApplyCoupon = (codeToApply) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    setCouponError('');

    if (code === 'WELCOME10') {
      if (subtotal < 149) {
        setCouponError('Minimum cart value for WELCOME10 is ₹149');
        return;
      }
      setAppliedCoupon('WELCOME10');
      setCouponCode('WELCOME10');
      setCouponError('');
    } else if (code === 'FRESH50') {
      if (subtotal < 249) {
        setCouponError('Minimum cart value for FRESH50 is ₹249');
        return;
      }
      setAppliedCoupon('FRESH50');
      setCouponCode('FRESH50');
      setCouponError('');
    } else {
      setCouponError('Invalid code. Try WELCOME10 or FRESH50');
    }
  };

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);
    setTimeout(() => {
      setIsPlacingOrder(false);
      setCheckoutStep('cart');
      onClose();
      if (onCheckoutSuccess) {
        onCheckoutSuccess({
          itemsCount: totalItemsCount,
          total: grandTotal,
          deliveryEta: selectedLocation?.eta || '23 mins',
          address: `${houseAddress}, ${city} (${pincode})`,
          paymentMethod: paymentMethod.toUpperCase(),
        });
      }
      onClearCart();
    }, 1200);
  };

  return (
    <div className="cart-backdrop" onClick={onClose}>
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Cart Header */}
        <div className="cart-header">
          <div className="cart-header-title">
            {checkoutStep === 'checkout' ? (
              <button 
                type="button" 
                className="cart-back-step-btn"
                onClick={() => setCheckoutStep('cart')}
                aria-label="Back to Cart"
              >
                <ArrowLeft size={18} />
              </button>
            ) : (
              <ShoppingBag size={22} className="cart-title-icon" />
            )}
            <div>
              <h3>{checkoutStep === 'checkout' ? 'Instant Checkout' : 'Your Fresh Basket'}</h3>
              <span className="cart-items-count-badge">
                {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}
              </span>
            </div>
          </div>
          <button className="cart-close-btn" onClick={onClose} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {checkoutStep === 'cart' ? (
          <>
            {/* Free Delivery Goal Meter (Instamart style) */}
            <div className="cart-delivery-goal">
              <div className="goal-status-text">
                {amountNeeded > 0 ? (
                  <span>
                    Add <strong>₹{amountNeeded}</strong> more to unlock <strong>FREE 30-min delivery</strong>!
                  </span>
                ) : (
                  <span className="goal-unlocked">
                    <Check size={16} /> <strong>Hooray! Free 30-Min Delivery Unlocked</strong>
                  </span>
                )}
              </div>
              <div className="goal-progress-bar">
                <div 
                  className="goal-progress-fill" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="cart-items-scroll">
              {itemsList.length === 0 ? (
                <div className="cart-empty-state">
                  <div className="empty-cart-icon-wrap">
                    <ShoppingBag size={48} />
                  </div>
                  <h4>Your basket is empty</h4>
                  <p>Explore our fresh morning harvest and pick wholesome produce for your table!</p>
                  <button className="empty-cart-cta" onClick={onClose}>
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="cart-items-list">
                  {itemsList.map(({ product, quantity }) => (
                    <div key={product.id} className="cart-item-row">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="cart-item-thumb"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                      <div className="cart-item-details">
                        <h4 className="cart-item-title">{product.name}</h4>
                        <span className="cart-item-unit">{product.unit}</span>
                        <div className="cart-item-price-wrap">
                          <span className="cart-item-price">₹{product.price * quantity}</span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="cart-item-mrp">
                              ₹{product.originalPrice * quantity}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="cart-item-actions">
                        <div className="cart-stepper">
                          <button
                            type="button"
                            className="cart-step-btn"
                            onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="cart-step-count">{quantity}</span>
                          <button
                            type="button"
                            className="cart-step-btn"
                            onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          type="button"
                          className="cart-item-trash"
                          onClick={() => onRemoveItem(product.id)}
                          title="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bill Summary, Tip, Coupons, and Checkout */}
            {itemsList.length > 0 && (
              <div className="cart-footer">
                {/* 1-Click Available Coupons Pill Bar */}
                <div className="cart-quick-coupons-bar">
                  <span className="coupons-bar-label">Available Offers:</span>
                  <div className="coupons-chips-row">
                    <button
                      type="button"
                      className={`coupon-chip-btn ${appliedCoupon === 'WELCOME10' ? 'active' : ''}`}
                      onClick={() => handleApplyCoupon('WELCOME10')}
                    >
                      <Percent size={12} />
                      <span>WELCOME10 (10% OFF)</span>
                    </button>
                    <button
                      type="button"
                      className={`coupon-chip-btn ${appliedCoupon === 'FRESH50' ? 'active' : ''}`}
                      onClick={() => handleApplyCoupon('FRESH50')}
                    >
                      <Percent size={12} />
                      <span>FRESH50 (₹50 OFF)</span>
                    </button>
                  </div>
                </div>

                {/* Promo Code Input Box */}
                <form onSubmit={(e) => { e.preventDefault(); handleApplyCoupon(); }} className="coupon-box">
                  {!appliedCoupon ? (
                    <>
                      <input
                        type="text"
                        placeholder="Enter coupon code (e.g. WELCOME10)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <button type="submit" className="coupon-apply-btn">
                        Apply
                      </button>
                    </>
                  ) : (
                    <div className="coupon-success-banner">
                      <span>
                        <Sparkles size={15} /> Coupon <strong>{appliedCoupon}</strong> applied (-₹{discountAmount})
                      </span>
                      <button
                        type="button"
                        className="coupon-remove-btn"
                        onClick={() => {
                          setAppliedCoupon(null);
                          setCouponCode('');
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </form>
                {couponError && <div className="coupon-error-msg">{couponError}</div>}

                {/* Delivery Tip Selector (Instamart / Zepto signature) */}
                <div className="delivery-tip-box">
                  <div className="tip-header-row">
                    <span className="tip-title">Tip your delivery partner</span>
                    <span className="tip-subtitle">100% goes to your rider</span>
                  </div>
                  <div className="tip-buttons-row">
                    {[0, 10, 20, 30].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        className={`tip-btn ${selectedTip === amt ? 'active' : ''}`}
                        onClick={() => setSelectedTip(amt)}
                      >
                        {amt === 0 ? 'No Tip' : `₹${amt}`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Detailed Instamart/Zepto Bill Breakdown */}
                <div className="bill-summary">
                  <h5 className="bill-heading">Bill Details</h5>

                  <div className="bill-row">
                    <span>Items Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>

                  <div className="bill-row">
                    <span>Delivery Partner Fee</span>
                    <span>
                      {deliveryFee === 0 ? (
                        <strong className="text-free">FREE</strong>
                      ) : (
                        `₹${deliveryFee}`
                      )}
                    </span>
                  </div>

                  <div className="bill-row">
                    <span>Handling &amp; Platform Fee</span>
                    <span>₹{platformFee}</span>
                  </div>

                  <div className="bill-row">
                    <span>Govt. Taxes &amp; GST (5%)</span>
                    <span>₹{gstAmount}</span>
                  </div>

                  {selectedTip > 0 && (
                    <div className="bill-row">
                      <span>Delivery Tip</span>
                      <span>₹{selectedTip}</span>
                    </div>
                  )}

                  {discountAmount > 0 && (
                    <div className="bill-row discount-row">
                      <span>Coupon Discount ({appliedCoupon})</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}

                  <div className="bill-divider" />

                  <div className="bill-row total-row">
                    <div>
                      <span className="to-pay-label">To Pay</span>
                      <small className="tax-inclusive-text">Inclusive of all GST &amp; fees</small>
                    </div>
                    <span className="to-pay-amount">₹{grandTotal}</span>
                  </div>

                  {totalSavings > 0 && (
                    <div className="bill-savings-card">
                      <Sparkles size={15} color="#059669" />
                      <span>You are saving <strong>₹{totalSavings}</strong> on this order!</span>
                    </div>
                  )}
                </div>

                {/* Proceed to Checkout CTA */}
                <button
                  type="button"
                  className="cart-checkout-btn"
                  onClick={() => setCheckoutStep('checkout')}
                >
                  <div className="checkout-btn-text">
                    <span className="checkout-items-label">{totalItemsCount} Items</span>
                    <span className="checkout-total-price">₹{grandTotal}</span>
                  </div>
                  <div className="checkout-btn-cta">
                    <span>Proceed to Checkout</span>
                    <ArrowRight size={18} />
                  </div>
                </button>
              </div>
            )}
          </>
        ) : (
          /* Step 2: Instant Demo Checkout Form */
          <div className="checkout-form-container">
            <div className="checkout-step-body">
              {/* Delivery Address Form */}
              <div className="checkout-section-block">
                <div className="checkout-sec-header">
                  <MapPin size={18} className="checkout-sec-icon" />
                  <h4>1. Delivery Address</h4>
                </div>
                <div className="checkout-fields-grid">
                  <div className="checkout-field-row">
                    <label>Full Name</label>
                    <input
                      type="text"
                      className="checkout-input"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="checkout-field-row">
                    <label>Mobile Number</label>
                    <input
                      type="tel"
                      className="checkout-input"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="checkout-field-row full-width">
                    <label>House / Flat / Street Details</label>
                    <input
                      type="text"
                      className="checkout-input"
                      value={houseAddress}
                      onChange={(e) => setHouseAddress(e.target.value)}
                      required
                    />
                  </div>
                  <div className="checkout-field-row">
                    <label>City</label>
                    <input
                      type="text"
                      className="checkout-input"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </div>
                  <div className="checkout-field-row">
                    <label>Pincode</label>
                    <input
                      type="text"
                      className="checkout-input"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="checkout-section-block">
                <div className="checkout-sec-header">
                  <CreditCard size={18} className="checkout-sec-icon" />
                  <h4>2. Payment Method</h4>
                </div>
                <div className="payment-options-list">
                  <label className={`payment-option-card ${paymentMethod === 'upi' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                    />
                    <Smartphone size={18} color="#059669" />
                    <div className="payment-text">
                      <strong>UPI (Google Pay / PhonePe / Paytm)</strong>
                      <span>Fast &amp; zero payment fee</span>
                    </div>
                  </label>

                  <label className={`payment-option-card ${paymentMethod === 'card' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                    />
                    <CreditCard size={18} color="#2563eb" />
                    <div className="payment-text">
                      <strong>Credit / Debit Card</strong>
                      <span>Visa, Mastercard, RuPay</span>
                    </div>
                  </label>

                  <label className={`payment-option-card ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                    />
                    <Banknote size={18} color="#d97706" />
                    <div className="payment-text">
                      <strong>Cash on Delivery</strong>
                      <span>Pay cash or UPI at your doorstep</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Order Final Summary */}
              <div className="checkout-summary-pill">
                <span>Total Payable: <strong>₹{grandTotal}</strong></span>
                <span className="eta-badge">⚡ 30-Min Cold Chain Delivery</span>
              </div>
            </div>

            {/* Place Order Button */}
            <div className="checkout-footer-action">
              <button
                type="button"
                className="place-order-btn"
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder}
              >
                {isPlacingOrder ? (
                  <span>Securing Order...</span>
                ) : (
                  <>
                    <CheckCircle2 size={18} />
                    <span>Place Order (₹{grandTotal})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
