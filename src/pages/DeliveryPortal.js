import React, { useState } from 'react';
import { 
  Bike, 
  MapPin, 
  Phone, 
  Navigation, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Package, 
  DollarSign, 
  ShieldCheck, 
  KeyRound, 
  X,
  Sparkles,
  Download,
  Search,
  TrendingUp,
  Award
} from 'lucide-react';

export default function DeliveryPortal({
  activeRider,
  orders = [],
  onUpdateOrderStatus,
  onToggleRiderDuty,
  onRiderCompleteDelivery,
  onNavigateCustomer
}) {
  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'available' | 'trips'
  
  // Trip history search & POD modal states
  const [tripSearchQuery, setTripSearchQuery] = useState('');
  const [selectedPodOrder, setSelectedPodOrder] = useState(null);

  // OTP Verification modal state
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [selectedOrderForOtp, setSelectedOrderForOtp] = useState(null);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState('');

  // Failed delivery recovery modal state
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);
  const [selectedOrderForRecovery, setSelectedOrderForRecovery] = useState(null);

  if (!activeRider) {
    return (
      <div className="portal-empty-state">
        <Bike size={48} className="empty-icon" />
        <h3>No Delivery Agent Selected</h3>
        <p>Please select a delivery partner profile from the top switcher.</p>
      </div>
    );
  }

  // Active delivery assigned to this rider
  const assignedOrders = orders.filter(
    (o) => o.assignedRiderId === activeRider.id && ['preparing', 'ready_for_pickup', 'out_for_delivery'].includes(o.status)
  );

  // Available ready orders awaiting rider pickup
  const availableOrders = orders.filter(
    (o) => !o.assignedRiderId && ['ready_for_pickup', 'preparing'].includes(o.status)
  );

  // Completed delivery history for this rider
  const completedOrders = orders.filter(
    (o) => o.assignedRiderId === activeRider.id && o.status === 'delivered'
  );

  // Handle OTP submission
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!selectedOrderForOtp) return;

    if (enteredOtp.trim() === selectedOrderForOtp.deliveryOtp) {
      setOtpError('');
      setShowOtpModal(false);
      if (onRiderCompleteDelivery) {
        onRiderCompleteDelivery(selectedOrderForOtp.orderId, activeRider.id);
      }
      setEnteredOtp('');
      alert(`🎉 Delivery Verified! Order #${selectedOrderForOtp.orderId} marked Delivered. +₹45 added to your earnings!`);
    } else {
      setOtpError(`Invalid OTP. Ask customer for the 4-digit code shown on their tracking screen (Demo: ${selectedOrderForOtp.deliveryOtp})`);
    }
  };

  return (
    <div className="delivery-portal-view">
      {/* Mobile-Friendly App Header */}
      <div className="delivery-header-banner">
        <div className="container delivery-header-container">
          <div className="rider-profile-row">
            <div className="rider-avatar-wrap">
              <Bike size={24} />
            </div>
            <div className="rider-meta-text">
              <h3>{activeRider.name} <span className="agent-badge">{activeRider.agentCode}</span></h3>
              <p>{activeRider.vehicle} ({activeRider.vehicleNumber}) · {activeRider.currentArea}</p>
            </div>
          </div>

          <div className="rider-duty-toggle-wrap">
            <button 
              type="button" 
              className={`duty-toggle-btn ${activeRider.dutyStatus}`}
              onClick={() => onToggleRiderDuty(activeRider.id)}
            >
              <span className="duty-status-dot" />
              <span>{activeRider.dutyStatus === 'online' ? 'ON DUTY (Online)' : 'OFF DUTY'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Rider Performance Strip */}
      <div className="rider-stats-strip">
        <div className="container rider-stats-container">
          <div className="rider-stat-box">
            <span className="stat-sub">Today's Earnings</span>
            <div className="stat-value-row">
              <DollarSign size={18} className="stat-icon green" />
              <strong>₹{activeRider.todayEarnings}</strong>
            </div>
          </div>

          <div className="rider-stat-box">
            <span className="stat-sub">Drops Completed</span>
            <div className="stat-value-row">
              <Package size={18} className="stat-icon blue" />
              <strong>{activeRider.completedToday + completedOrders.length} Drops</strong>
            </div>
          </div>

          <div className="rider-stat-box">
            <span className="stat-sub">Partner Rating</span>
            <div className="stat-value-row">
              <span className="star-icon">★</span>
              <strong>{activeRider.rating}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Rider Navigation Tabs */}
      <div className="delivery-nav-bar">
        <div className="container delivery-nav-container">
          <button 
            type="button"
            className={`delivery-tab-btn ${activeTab === 'active' ? 'active' : ''}`}
            onClick={() => setActiveTab('active')}
          >
            <span>Active Trips</span>
            <span className="tab-bubble success">{assignedOrders.length}</span>
          </button>
          <button 
            type="button"
            className={`delivery-tab-btn ${activeTab === 'available' ? 'active' : ''}`}
            onClick={() => setActiveTab('available')}
          >
            <span>Available Pickup Pool</span>
            <span className="tab-bubble warning">{availableOrders.length}</span>
          </button>
          <button 
            type="button"
            className={`delivery-tab-btn ${activeTab === 'trips' ? 'active' : ''}`}
            onClick={() => setActiveTab('trips')}
          >
            <span>Delivery History &amp; Payouts</span>
            <span className="tab-bubble info">{completedOrders.length} Completed</span>
          </button>
        </div>
      </div>

      <div className="container delivery-body-container">
        {/* SMART BATCHING CALLOUT */}
        <div className="smart-batch-banner">
          <div className="batch-icon-badge">
            <Sparkles size={16} />
          </div>
          <div className="batch-text">
            <strong>🧠 Smart Route Batching Active:</strong>
            <p>Orders in Gandhipuram & R.S. Puram are automatically batched together to reduce battery usage and deliver faster.</p>
          </div>
        </div>

        {/* TAB 1: ACTIVE TRIPS */}
        {activeTab === 'active' && (
          <div className="delivery-pane">
            {assignedOrders.length === 0 ? (
              <div className="empty-trips-card">
                <CheckCircle2 size={40} className="check-icon" />
                <h4>No active trips right now</h4>
                <p>You have fulfilled all assigned deliveries. Check the Available Pickup Pool to accept new deliveries!</p>
                <button 
                  type="button" 
                  className="btn-check-pool"
                  onClick={() => setActiveTab('available')}
                >
                  View Available Orders ({availableOrders.length})
                </button>
              </div>
            ) : (
              assignedOrders.map((order) => {
                const isOutOfDelivery = order.status === 'out_for_delivery';
                const isReadyForPickup = order.status === 'ready_for_pickup';
                const isPreparing = order.status === 'preparing';

                return (
                  <div key={order.orderId} className="active-delivery-card">
                    {/* Card Top */}
                    <div className="card-top-row">
                      <div>
                        <span className="order-pill-title">Live Delivery Task</span>
                        <h3 className="trip-order-id">Order #{order.orderId}</h3>
                      </div>
                      <div className="order-eta-badge">
                        <Clock size={15} />
                        <span>ETA: {order.deliveryEta}</span>
                      </div>
                    </div>

                    {/* Step Lifecycle Tracker */}
                    <div className="rider-stepper-row">
                      <div className={`step-dot ${isPreparing || isReadyForPickup || isOutOfDelivery ? 'done' : ''}`}>
                        <span>1</span>
                        <small>Seller Pack</small>
                      </div>
                      <div className={`step-line ${isReadyForPickup || isOutOfDelivery ? 'done' : ''}`} />
                      <div className={`step-dot ${isReadyForPickup || isOutOfDelivery ? 'done' : ''}`}>
                        <span>2</span>
                        <small>Store Pickup</small>
                      </div>
                      <div className={`step-line ${isOutOfDelivery ? 'done' : ''}`} />
                      <div className={`step-dot ${isOutOfDelivery ? 'done' : ''}`}>
                        <span>3</span>
                        <small>On The Way</small>
                      </div>
                      <div className="step-line" />
                      <div className="step-dot">
                        <span>4</span>
                        <small>Customer OTP</small>
                      </div>
                    </div>

                    {/* Pickup Sellers Breakdown */}
                    <div className="trip-locations-box">
                      <div className="loc-row pickup">
                        <Package size={18} className="loc-pin" />
                        <div>
                          <strong>Pickup Hub / Sellers:</strong>
                          {order.subOrders && order.subOrders.map((sub, i) => (
                            <div key={i} className="seller-pickup-item">
                              • <strong>{sub.sellerName}</strong> ({sub.sellerCategory}) - {sub.items.length} items
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="loc-row drop">
                        <MapPin size={18} className="loc-pin drop" />
                        <div>
                          <strong>Drop Destination:</strong>
                          <p>{order.customerName} · {order.address}</p>
                          <span className="pay-method-tag">Payment: {order.paymentMethod} (₹{order.totalAmount})</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="rider-quick-contacts">
                      <a 
                        href={`tel:${order.customerPhone}`} 
                        className="contact-link call"
                      >
                        <Phone size={15} />
                        <span>Call Customer</span>
                      </a>

                      <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(order.address)}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="contact-link maps"
                      >
                        <Navigation size={15} />
                        <span>Google Maps</span>
                      </a>

                      <button 
                        type="button"
                        className="contact-link issue"
                        onClick={() => {
                          setSelectedOrderForRecovery(order);
                          setShowRecoveryModal(true);
                        }}
                      >
                        <AlertCircle size={15} />
                        <span>Customer Not Answering?</span>
                      </button>
                    </div>

                    {/* Sequential Progress Action Button */}
                    <div className="rider-main-action-wrap">
                      {isReadyForPickup && (
                        <button 
                          type="button" 
                          className="btn-rider-step-action pickup"
                          onClick={() => {
                            onUpdateOrderStatus(order.orderId, 'out_for_delivery');
                            alert(`Order #${order.orderId} marked Picked Up! Now Out for Delivery.`);
                          }}
                        >
                          <Package size={20} />
                          <span>Picked Up from Stores → Start Delivery Trip</span>
                        </button>
                      )}

                      {isPreparing && (
                        <div className="waiting-seller-banner">
                          <Clock size={18} />
                          <span>Waiting for Seller to finish packing before pickup...</span>
                        </div>
                      )}

                      {isOutOfDelivery && (
                        <button 
                          type="button" 
                          className="btn-rider-step-action verify"
                          onClick={() => {
                            setSelectedOrderForOtp(order);
                            setShowOtpModal(true);
                            setOtpError('');
                            setEnteredOtp('');
                          }}
                        >
                          <KeyRound size={20} />
                          <span>Arrived at Doorstep → Verify Customer OTP</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* TAB 2: AVAILABLE POOL */}
        {activeTab === 'available' && (
          <div className="delivery-pane">
            <div className="pane-head-note">
              <h4>📦 Ready Orders Awaiting Delivery Partner</h4>
              <p>Accept an order to claim pickup responsibility and earn trip incentives.</p>
            </div>

            {availableOrders.length === 0 ? (
              <div className="empty-trips-card">
                <h4>No pending orders in the pool</h4>
                <p>All current orders have been claimed by riders.</p>
              </div>
            ) : (
              <div className="available-orders-grid">
                {availableOrders.map((order) => (
                  <div key={order.orderId} className="available-order-card">
                    <div className="avail-card-head">
                      <div>
                        <strong>Order #{order.orderId}</strong>
                        <span>{order.area} · {order.placedAt}</span>
                      </div>
                      <span className="earning-incentive">+₹45 Earning</span>
                    </div>

                    <div className="avail-card-body">
                      <p><strong>Deliver to:</strong> {order.address}</p>
                      <div className="items-mini-list">
                        Total {order.subOrders?.length || 1} vendor pickup stops · ₹{order.totalAmount}
                      </div>
                    </div>

                    <div className="avail-card-actions">
                      <button 
                        type="button" 
                        className="btn-accept-task"
                        onClick={() => {
                          onUpdateOrderStatus(order.orderId, 'ready_for_pickup', activeRider.id, activeRider.name);
                          setActiveTab('active');
                          alert(`Accepted delivery for #${order.orderId}! Added to your active trips.`);
                        }}
                      >
                        Accept Delivery (+₹45)
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: TRIPS HISTORY & DIGITAL PROOF */}
        {activeTab === 'trips' && (
          <div className="delivery-pane">
            <div className="gross-history-container">
              <div className="pane-head-note">
                <h3>Delivery Trips History &amp; Payouts Ledger</h3>
                <p>Transparent accounting of completed deliveries, customer OTP verification timestamps, base trip pay, and automated UPI credits.</p>
              </div>

              {/* Rider Financial Stats Grid */}
              <div className="gross-kpi-grid">
                <div className="gross-kpi-card emerald-highlight">
                  <span className="kpi-sub-title">Total Lifetime Payouts</span>
                  <h2>
                    <TrendingUp size={24} className="text-emerald" />
                    ₹{Math.max((activeRider.todayEarnings || 0) + 2640, 3180).toLocaleString()}
                  </h2>
                  <span className="kpi-note positive">✓ Total credited to {activeRider.phone} UPI</span>
                </div>

                <div className="gross-kpi-card">
                  <span className="kpi-sub-title">Today's Earnings</span>
                  <h2>
                    <DollarSign size={24} className="text-blue" />
                    ₹{activeRider.todayEarnings}
                  </h2>
                  <span className="kpi-note">{activeRider.completedToday + completedOrders.length} trips completed today</span>
                </div>

                <div className="gross-kpi-card blue-highlight">
                  <span className="kpi-sub-title">Total Completed Drops</span>
                  <h2>
                    <Package size={24} className="text-navy" />
                    {activeRider.completedToday + completedOrders.length + 14} Drops
                  </h2>
                  <span className="kpi-note positive">100% digital proof verified</span>
                </div>

                <div className="gross-kpi-card">
                  <span className="kpi-sub-title">On-Time SLA Rate</span>
                  <h2>
                    <Award size={24} className="text-purple" />
                    99.4%
                  </h2>
                  <span className="kpi-note">Tier 1 Elite Fleet Partner</span>
                </div>
              </div>

              {/* Search and Filter Toolbar */}
              <div className="gross-toolbar">
                <div className="toolbar-left">
                  <div className="search-box-wrap">
                    <Search size={16} />
                    <input 
                      type="text" 
                      placeholder="Search Trip ID, Order ID, Customer..." 
                      value={tripSearchQuery}
                      onChange={(e) => setTripSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <button 
                  type="button" 
                  className="btn-export-csv"
                  onClick={() => {
                    alert(`Exporting complete Delivery Trips History for ${activeRider.name} (${activeRider.agentCode}) as GreenCart-Rider-Report-${new Date().toISOString().slice(0, 10)}.csv!`);
                  }}
                >
                  <Download size={14} />
                  <span>Download Trip Summary (CSV)</span>
                </button>
              </div>

              {/* Detailed Delivery Trips Table */}
              <div className="gross-ledger-card">
                <div className="gross-ledger-header">
                  <h4>Completed Trip Logs &amp; Verified Proof-of-Deliveries</h4>
                  <span className="text-muted text-xs">
                    Showing {(completedOrders.length > 0 ? completedOrders : orders.filter(o => o.status === 'delivered')).length} verified trips
                  </span>
                </div>

                <div className="gross-table-scroll">
                  <table className="gross-ledger-table">
                    <thead>
                      <tr>
                        <th>Trip / Order ID</th>
                        <th>Delivered Time</th>
                        <th>Customer &amp; Drop Area</th>
                        <th>Vendor Pickup Stops</th>
                        <th>Digital OTP Proof</th>
                        <th>Fare Breakdown</th>
                        <th>Rider Payout</th>
                        <th>Payout Status</th>
                        <th>Proof of Delivery</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(completedOrders.length > 0 ? completedOrders : orders.filter(o => o.status === 'delivered'))
                        .filter(order => {
                          const q = tripSearchQuery.toLowerCase().trim();
                          return !q || 
                            order.orderId.toLowerCase().includes(q) ||
                            order.customerName.toLowerCase().includes(q) ||
                            (order.area && order.area.toLowerCase().includes(q));
                        })
                        .map((order) => (
                          <tr key={order.orderId}>
                            <td>
                              <span className="order-badge-id">#{order.orderId}</span>
                              <br />
                              <small className="text-muted">{order.deliveryBatchId || 'BATCH-DIRECT'}</small>
                            </td>
                            <td>
                              <strong>{order.date || 'Today'}</strong>
                              <br />
                              <small className="text-muted">{order.placedAt || '10:00 AM'}</small>
                            </td>
                            <td>
                              <strong>{order.customerName}</strong>
                              <br />
                              <small className="text-muted">{order.address}</small>
                            </td>
                            <td>
                              <div className="seller-tags-cluster">
                                {order.subOrders && order.subOrders.map((sub, i) => (
                                  <span key={i} className="mini-vendor-tag">
                                    • {sub.sellerName}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td>
                              <span className="settlement-status-badge settled">
                                OTP: {order.deliveryOtp} Verified
                              </span>
                            </td>
                            <td>
                              <span style={{ fontSize: '12px' }}>Base: ₹40 + Bonus: ₹5</span>
                            </td>
                            <td>
                              <span className="amount-gross" style={{ color: '#059669' }}>+₹45</span>
                            </td>
                            <td>
                              <span className="settlement-status-badge settled">
                                ✓ Credited to UPI
                              </span>
                            </td>
                            <td>
                              <button 
                                type="button" 
                                className="btn-receipt-action"
                                onClick={() => setSelectedPodOrder(order)}
                              >
                                <ShieldCheck size={13} />
                                <span>View POD</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* OTP Verification Modal */}
      {showOtpModal && selectedOrderForOtp && (
        <div className="modal-backdrop" onClick={() => setShowOtpModal(false)}>
          <div className="otp-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="otp-modal-head">
              <div className="otp-icon-wrap">
                <KeyRound size={24} />
              </div>
              <div>
                <h3>Customer OTP Verification</h3>
                <p>Order #{selectedOrderForOtp.orderId} · {selectedOrderForOtp.customerName}</p>
              </div>
              <button className="tracker-close-btn" onClick={() => setShowOtpModal(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleVerifyOtp} className="otp-form-body">
              <div className="demo-otp-hint">
                <span>💡 Demo Hint: Customer's OTP is:</span>
                <strong>{selectedOrderForOtp.deliveryOtp}</strong>
              </div>

              <div className="otp-input-wrap">
                <input 
                  type="text" 
                  maxLength={4}
                  autoFocus
                  placeholder="Enter 4-Digit OTP"
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                />
              </div>

              {otpError && <div className="otp-error-banner">{otpError}</div>}

              <div className="otp-modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowOtpModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-verify-otp">
                  Confirm & Complete Delivery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Failed Delivery Recovery Modal */}
      {showRecoveryModal && selectedOrderForRecovery && (
        <div className="modal-backdrop" onClick={() => setShowRecoveryModal(false)}>
          <div className="recovery-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="recovery-head">
              <AlertCircle size={24} className="alert-red" />
              <h3>Smart Failed-Delivery Recovery</h3>
            </div>
            <p>If customer is not picking up or the door is locked, do not cancel immediately. GreenCart auto-recovery helps reschedule.</p>
            
            <div className="recovery-options-list">
              <button 
                type="button"
                className="recovery-opt-btn"
                onClick={() => {
                  alert('Notification alert & automated call ping sent to customer phone.');
                  setShowRecoveryModal(false);
                }}
              >
                <span>📞 Send Automated WhatsApp & Call Reminder</span>
              </button>

              <button 
                type="button"
                className="recovery-opt-btn"
                onClick={() => {
                  alert(`Rescheduled order #${selectedOrderForRecovery.orderId} for retry in 30 minutes.`);
                  setShowRecoveryModal(false);
                }}
              >
                <span>⏱️ Reschedule Delivery Window (+30 Mins)</span>
              </button>

              <button 
                type="button"
                className="recovery-opt-btn"
                onClick={() => {
                  alert('Reported door locked to Admin Hub dispatcher.');
                  setShowRecoveryModal(false);
                }}
              >
                <span>🏠 Report Door Locked / Safe Place Drop</span>
              </button>
            </div>

            <button className="btn-close-recovery" onClick={() => setShowRecoveryModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Proof of Delivery (POD) Modal */}
      {selectedPodOrder && (
        <div className="receipt-modal-backdrop" onClick={() => setSelectedPodOrder(null)}>
          <div className="receipt-modal-card" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
            <div className="receipt-card-header">
              <div className="receipt-brand-title">
                <ShieldCheck size={20} />
                <span>Digital Proof of Delivery (POD)</span>
              </div>
              <button className="receipt-close-btn" onClick={() => setSelectedPodOrder(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="receipt-card-body">
              <div className="receipt-stamp-badge" style={{ fontSize: '13px', padding: '12px' }}>
                🎉 Successfully Delivered &amp; Reconciled
              </div>

              <div className="receipt-info-grid">
                <div>
                  <span className="text-muted">Order ID:</span>
                  <strong>#{selectedPodOrder.orderId}</strong>
                </div>
                <div>
                  <span className="text-muted">Delivered Timestamp:</span>
                  <strong>{selectedPodOrder.date || 'Today'} · {selectedPodOrder.deliveryProof?.deliveredAt || '10:45 AM'}</strong>
                </div>
                <div>
                  <span className="text-muted">Customer Name:</span>
                  <strong>{selectedPodOrder.customerName}</strong>
                </div>
                <div>
                  <span className="text-muted">OTP Code Verified:</span>
                  <strong style={{ color: '#059669', letterSpacing: '2px' }}>{selectedPodOrder.deliveryOtp}</strong>
                </div>
                <div>
                  <span className="text-muted">Delivery Location:</span>
                  <small>{selectedPodOrder.address}</small>
                </div>
                <div>
                  <span className="text-muted">Fulfilling Rider:</span>
                  <strong>{activeRider.name} ({activeRider.agentCode})</strong>
                </div>
              </div>

              <div className="receipt-financial-math-box">
                <div className="receipt-math-row">
                  <span>Base Pickup &amp; Drop Fee:</span>
                  <strong>₹40</strong>
                </div>
                <div className="receipt-math-row">
                  <span>On-Time Fulfillment Bonus:</span>
                  <span style={{ color: '#059669' }}>+₹5</span>
                </div>
                <div className="receipt-math-row highlight-total">
                  <span>Total Credited to Driver UPI:</span>
                  <span style={{ color: '#047857' }}>₹45</span>
                </div>
              </div>
            </div>

            <div className="receipt-card-actions">
              <button 
                type="button" 
                className="btn-download-pdf"
                onClick={() => {
                  alert(`Digital POD for Order #${selectedPodOrder.orderId} downloaded!`);
                  setSelectedPodOrder(null);
                }}
              >
                <Download size={15} />
                <span>Download Proof Receipt (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
