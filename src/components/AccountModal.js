import React, { useState } from 'react';
import { 
  X, 
  User, 
  MapPin, 
  Package, 
  Tag, 
  LogOut, 
  CheckCircle2, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export default function AccountModal({ 
  isOpen, 
  onClose,
  currentUser = null,
  onLoginSuccess,
  onLogout 
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(currentUser));
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState('');
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'addresses', 'coupons'

  if (!isOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      setOtpStep(true);
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    if (onLoginSuccess) {
      onLoginSuccess({
        name: name.trim() || 'Shyam Sundar',
        phone: phoneNumber || '+91 98765 43210',
        email: 'shyam@example.com'
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setOtpStep(false);
    setPhoneNumber('');
    if (onLogout) onLogout();
  };

  return (
    <div className="account-modal-backdrop" onClick={onClose}>
      <div className="account-modal-panel" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="account-modal-header">
          <div className="modal-header-left">
            <div className="account-avatar-circle">
              <User size={22} />
            </div>
            <div>
              <h3>{isLoggedIn ? (currentUser?.name || name || 'Shyam Sundar') : 'Customer Login'}</h3>
              <p className="account-sub-label">
                {isLoggedIn ? (currentUser?.phone || '+91 98765 43210') : 'Login or Sign Up for instant 30-min deliveries'}
              </p>
            </div>
          </div>
          <button className="account-close-btn" onClick={onClose} aria-label="Close Account Modal">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="account-modal-body">
          {!isLoggedIn ? (
            /* Login / Signup Form */
            <div className="account-login-form-box">
              <div className="login-intro-banner">
                <ShieldCheck size={20} color="#059669" />
                <div>
                  <strong>Safe &amp; Instant Access</strong>
                  <p>Track live delivery status, save favourite items, and earn GreenCoins</p>
                </div>
              </div>

              {!otpStep ? (
                <form onSubmit={handleSendOtp} className="login-form-inner">
                  <div className="form-group">
                    <label>Your Name</label>
                    <input
                      type="text"
                      className="account-input"
                      placeholder="Enter your name (e.g. Shyam Sundar)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Mobile Number</label>
                    <div className="phone-input-wrap">
                      <span className="phone-prefix">+91</span>
                      <input
                        type="tel"
                        className="account-input phone-field"
                        placeholder="98765 43210"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        maxLength={10}
                      />
                    </div>
                  </div>

                  <button type="submit" className="login-continue-btn">
                    <span>Continue with OTP</span>
                    <ArrowRight size={16} />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="login-form-inner">
                  <div className="otp-sent-info">
                    <CheckCircle2 size={16} color="#059669" />
                    <span>OTP sent to <strong>+91 {phoneNumber}</strong></span>
                  </div>

                  <div className="form-group">
                    <label>Enter 4-Digit OTP</label>
                    <input
                      type="text"
                      className="account-input otp-field"
                      placeholder="••••"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={4}
                      required
                    />
                    <small className="otp-hint">Hint: Demo mode - enter any 4 numbers (e.g. 1234)</small>
                  </div>

                  <button type="submit" className="login-continue-btn">
                    <span>Verify &amp; Login</span>
                    <ArrowRight size={16} />
                  </button>

                  <button 
                    type="button" 
                    className="otp-back-btn"
                    onClick={() => setOtpStep(false)}
                  >
                    Change Phone Number
                  </button>
                </form>
              )}
            </div>
          ) : (
            /* Logged In Dashboard */
            <div className="account-dashboard-view">
              {/* Navigation Tabs */}
              <div className="account-tabs-row">
                <button
                  type="button"
                  className={`acc-tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
                  onClick={() => setActiveTab('orders')}
                >
                  <Package size={16} />
                  <span>My Orders</span>
                </button>

                <button
                  type="button"
                  className={`acc-tab-btn ${activeTab === 'addresses' ? 'active' : ''}`}
                  onClick={() => setActiveTab('addresses')}
                >
                  <MapPin size={16} />
                  <span>Saved Addresses</span>
                </button>

                <button
                  type="button"
                  className={`acc-tab-btn ${activeTab === 'coupons' ? 'active' : ''}`}
                  onClick={() => setActiveTab('coupons')}
                >
                  <Tag size={16} />
                  <span>My Coupons</span>
                </button>
              </div>

              {/* Tab 1: Orders */}
              {activeTab === 'orders' && (
                <div className="acc-tab-content">
                  <div className="acc-order-card active-order">
                    <div className="acc-order-header">
                      <div>
                        <span className="order-status-badge out-for-delivery">Out for Delivery</span>
                        <h4 className="order-id-label">Order #GC-84920</h4>
                      </div>
                      <span className="order-total-price">₹274</span>
                    </div>
                    <p className="order-items-snippet">
                      Pure Organic Cow Milk (2x), Crisp Royal Himachal Apples (1x)
                    </p>
                    <div className="order-eta-row">
                      <span>⚡ Estimated Arrival: <strong>18 mins</strong></span>
                      <button 
                        type="button" 
                        className="order-track-mini-btn"
                        onClick={onClose}
                      >
                        Track Live
                      </button>
                    </div>
                  </div>

                  <div className="acc-order-card past-order">
                    <div className="acc-order-header">
                      <div>
                        <span className="order-status-badge delivered">Delivered Yesterday</span>
                        <h4 className="order-id-label">Order #GC-73194</h4>
                      </div>
                      <span className="order-total-price">₹495</span>
                    </div>
                    <p className="order-items-snippet">
                      Premium Basmati Rice (5kg), Fresh Farm Tomatoes (1kg)
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 2: Addresses */}
              {activeTab === 'addresses' && (
                <div className="acc-tab-content">
                  <div className="acc-address-card default-address">
                    <div className="address-type-pill">HOME (Default)</div>
                    <h4>Flat 402, Green Meadows Apartment</h4>
                    <p>Cross Cut Road, Gandhipuram, Coimbatore, Tamil Nadu - 628001</p>
                    <span className="address-contact">Phone: +91 98765 43210</span>
                  </div>

                  <div className="acc-address-card">
                    <div className="address-type-pill work">WORK</div>
                    <h4>Tidel Park Tech Hub, 4th Floor</h4>
                    <p>Avinashi Road, Civil Aerodrome Post, Coimbatore - 641014</p>
                  </div>
                </div>
              )}

              {/* Tab 3: Coupons */}
              {activeTab === 'coupons' && (
                <div className="acc-tab-content">
                  <div className="acc-coupon-card">
                    <div className="coupon-code-badge">WELCOME10</div>
                    <h4>Get 10% OFF on your first 3 orders</h4>
                    <p>Applicable on all fresh fruits, vegetables, and pantry staples above ₹199</p>
                  </div>

                  <div className="acc-coupon-card">
                    <div className="coupon-code-badge">FRESH50</div>
                    <h4>Flat ₹50 OFF Instant Discount</h4>
                    <p>Valid on organic vegetables and morning dairy refills above ₹349</p>
                  </div>
                </div>
              )}

              {/* Logout Button */}
              <div className="account-footer-logout">
                <button type="button" className="acc-logout-btn" onClick={handleLogout}>
                  <LogOut size={16} />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
