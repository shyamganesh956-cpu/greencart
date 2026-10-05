import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Store, 
  Bike, 
  AlertTriangle, 
  CheckCircle2, 
  DollarSign, 
  TrendingUp, 
  Check, 
  X, 
  Leaf, 
  Sparkles, 
  ChevronDown, 
  ChevronUp,
  ArrowRight,
  Receipt,
  Download,
  Search,
  Wallet
} from 'lucide-react';

export default function AdminPortal({
  sellers = [],
  products = [],
  orders = [],
  riders = [],
  commissionRates = {},
  onApproveSeller,
  onRejectSeller,
  onApproveProduct,
  onRejectProduct,
  onUpdateCommissionRate,
  onReassignOrderRider,
  onNavigateCustomer
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'grossHistory' | 'sellers' | 'products' | 'orders' | 'fleet' | 'commission' | 'problems' | 'waste'
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  // Gross History interactive filter states
  const [historyFilterSeller, setHistoryFilterSeller] = useState('all');
  const [historyFilterStatus, setHistoryFilterStatus] = useState('all');
  const [historySearchQuery, setHistorySearchQuery] = useState('');
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState(null);

  // Computed metrics
  const pendingSellers = sellers.filter(s => s.status === 'pending_approval');
  const approvedSellers = sellers.filter(s => s.status === 'approved');
  
  const pendingProducts = products.filter(p => p.status === 'pending_approval');

  const totalGMV = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  
  // Total GreenCart Platform Commission & Merchant Disbursements
  let totalPlatformCommission = 0;
  let totalSellerDisbursements = 0;
  orders.forEach(o => {
    if (o.subOrders) {
      o.subOrders.forEach(sub => {
        totalPlatformCommission += (sub.commission || 0);
        totalSellerDisbursements += (sub.sellerPayout || (sub.subtotal - (sub.commission || 0)));
      });
    }
  });

  const totalRiderFees = orders.filter(o => o.assignedRiderId).length * 45;
  const avgOrderValue = orders.length > 0 ? Math.round(totalGMV / orders.length) : 0;

  const onlineRiders = riders.filter(r => r.dutyStatus === 'online');
  const activeOrdersCount = orders.filter(o => ['placed', 'accepted', 'preparing', 'ready_for_pickup', 'out_for_delivery'].includes(o.status)).length;
  
  // Smart Problem Detection items
  const delayedOrders = orders.filter(o => o.status === 'preparing' || (!o.assignedRiderId && o.status === 'ready_for_pickup'));
  
  // Food waste reduction items
  const expiringProducts = products.filter(p => p.expiryDays <= 2);

  return (
    <div className="admin-portal-view">
      {/* Admin Header */}
      <div className="admin-header-banner">
        <div className="container admin-header-container">
          <div className="admin-brand-col">
            <div className="admin-shield-icon">
              <ShieldCheck size={32} />
            </div>
            <div>
              <div className="admin-status-chips">
                <span className="admin-badge">GreenCart Super Admin</span>
                <span className="live-hub-badge">Coimbatore Central Hub</span>
              </div>
              <h1>Platform Management Command Center</h1>
              <p>Monitor multi-vendor dispatch, moderate seller catalog, optimize fleet batching, and track commissions.</p>
            </div>
          </div>

          <div className="admin-header-right">
            <button 
              type="button" 
              className="admin-view-store-btn"
              onClick={onNavigateCustomer}
            >
              <span>View Live Customer Store</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Admin Sub Navigation */}
      <div className="admin-nav-bar">
        <div className="container admin-nav-container">
          <button 
            type="button"
            className={`admin-nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span>Dashboard</span>
          </button>
          <button 
            type="button"
            className={`admin-nav-btn ${activeTab === 'grossHistory' ? 'active' : ''}`}
            onClick={() => setActiveTab('grossHistory')}
          >
            <span>Gross Sales History</span>
            <span className="tab-bubble success">₹{totalGMV.toLocaleString()}</span>
          </button>
          <button 
            type="button"
            className={`admin-nav-btn ${activeTab === 'sellers' ? 'active' : ''}`}
            onClick={() => setActiveTab('sellers')}
          >
            <span>Seller Approvals</span>
            {pendingSellers.length > 0 && <span className="tab-bubble warning">{pendingSellers.length}</span>}
          </button>
          <button 
            type="button"
            className={`admin-nav-btn ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <span>Product Moderation</span>
            {pendingProducts.length > 0 && <span className="tab-bubble warning">{pendingProducts.length}</span>}
          </button>
          <button 
            type="button"
            className={`admin-nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <span>Orders & Splitter</span>
            <span className="tab-bubble info">{orders.length}</span>
          </button>
          <button 
            type="button"
            className={`admin-nav-btn ${activeTab === 'fleet' ? 'active' : ''}`}
            onClick={() => setActiveTab('fleet')}
          >
            <span>Delivery Fleet</span>
            <span className="tab-bubble success">{onlineRiders.length} Online</span>
          </button>
          <button 
            type="button"
            className={`admin-nav-btn ${activeTab === 'commission' ? 'active' : ''}`}
            onClick={() => setActiveTab('commission')}
          >
            <span>Commission Engine</span>
          </button>
          <button 
            type="button"
            className={`admin-nav-btn ${activeTab === 'problems' ? 'active' : ''}`}
            onClick={() => setActiveTab('problems')}
          >
            <span>Problem Detector</span>
            {delayedOrders.length > 0 && <span className="tab-bubble danger">{delayedOrders.length}</span>}
          </button>
          <button 
            type="button"
            className={`admin-nav-btn ${activeTab === 'waste' ? 'active' : ''}`}
            onClick={() => setActiveTab('waste')}
          >
            <span>Food-Waste Engine</span>
          </button>
        </div>
      </div>

      <div className="container admin-body-container">
        {/* TAB 1: OVERVIEW DASHBOARD */}
        {activeTab === 'overview' && (
          <div className="admin-pane">
            {/* Top Metric Cards */}
            <div className="admin-kpi-grid">
              <div className="admin-kpi-card">
                <div className="kpi-symbol green">
                  <TrendingUp size={22} />
                </div>
                <div className="kpi-details">
                  <span className="kpi-title">Gross Merchandise Value</span>
                  <h2>₹{totalGMV.toLocaleString()}</h2>
                  <span className="kpi-foot">Across all seller categories</span>
                </div>
              </div>

              <div className="admin-kpi-card highlight">
                <div className="kpi-symbol emerald">
                  <DollarSign size={22} />
                </div>
                <div className="kpi-details">
                  <span className="kpi-title">Platform Commission</span>
                  <h2>₹{Math.round(totalPlatformCommission).toLocaleString()}</h2>
                  <span className="kpi-foot">Net GreenCart marketplace revenue</span>
                </div>
              </div>

              <div className="admin-kpi-card">
                <div className="kpi-symbol blue">
                  <Store size={22} />
                </div>
                <div className="kpi-details">
                  <span className="kpi-title">Active Sellers</span>
                  <h2>{approvedSellers.length} Approved</h2>
                  <span className="kpi-foot warning">{pendingSellers.length} pending review</span>
                </div>
              </div>

              <div className="admin-kpi-card">
                <div className="kpi-symbol purple">
                  <Bike size={22} />
                </div>
                <div className="kpi-details">
                  <span className="kpi-title">Fleet On Duty</span>
                  <h2>{onlineRiders.length} Riders Active</h2>
                  <span className="kpi-foot">{activeOrdersCount} live deliveries</span>
                </div>
              </div>
            </div>

            {/* Smart Problem Detector Alert Strip */}
            {delayedOrders.length > 0 && (
              <div className="problem-detector-alert-box">
                <div className="alert-left">
                  <AlertTriangle size={22} className="alert-amber" />
                  <div>
                    <strong>🧠 Smart Problem Detector: {delayedOrders.length} order(s) require intervention</strong>
                    <p>Order #{delayedOrders[0].orderId} has been in preparation longer than SLA standard.</p>
                  </div>
                </div>
                <button 
                  className="btn-inspect-issue"
                  onClick={() => setActiveTab('problems')}
                >
                  Inspect Bottlenecks
                </button>
              </div>
            )}

            {/* Quick Action Tables Grid */}
            <div className="admin-split-grid">
              {/* Left: Pending Seller Applications */}
              <div className="admin-card-panel">
                <div className="panel-head">
                  <h4>Pending Seller Applications</h4>
                  <button className="panel-link" onClick={() => setActiveTab('sellers')}>View All</button>
                </div>
                {pendingSellers.length === 0 ? (
                  <p className="clean-state-text">✓ All seller applications reviewed.</p>
                ) : (
                  <div className="mini-pending-list">
                    {pendingSellers.map((s) => (
                      <div key={s.id} className="mini-pending-item">
                        <div>
                          <strong>{s.businessName}</strong>
                          <span className="sub-text">{s.category} · {s.ownerName}</span>
                        </div>
                        <div className="quick-action-btns">
                          <button 
                            className="btn-approve-mini"
                            onClick={() => {
                              onApproveSeller(s.id);
                              alert(`Approved ${s.businessName}! They can now log in and sell.`);
                            }}
                          >
                            <Check size={14} /> Approve
                          </button>
                          <button 
                            className="btn-reject-mini"
                            onClick={() => onRejectSeller(s.id)}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Pending Product Moderation */}
              <div className="admin-card-panel">
                <div className="panel-head">
                  <h4>Products Awaiting Approval</h4>
                  <button className="panel-link" onClick={() => setActiveTab('products')}>View All</button>
                </div>
                {pendingProducts.length === 0 ? (
                  <p className="clean-state-text">✓ No unapproved products in queue.</p>
                ) : (
                  <div className="mini-pending-list">
                    {pendingProducts.map((p) => (
                      <div key={p.id} className="mini-pending-item">
                        <img src={p.image} alt={p.name} className="mini-prod-thumb" />
                        <div>
                          <strong>{p.name}</strong>
                          <span className="sub-text">₹{p.price} · {p.sellerName}</span>
                        </div>
                        <div className="quick-action-btns">
                          <button 
                            className="btn-approve-mini"
                            onClick={() => {
                              onApproveProduct(p.id);
                              alert(`Approved ${p.name}! Now live on Customer Store.`);
                            }}
                          >
                            <Check size={14} /> Publish
                          </button>
                          <button 
                            className="btn-reject-mini"
                            onClick={() => onRejectProduct(p.id)}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 1.5: GROSS SALES & FINANCIAL HISTORY */}
        {activeTab === 'grossHistory' && (
          <div className="admin-pane">
            <div className="gross-history-container">
              {/* Top Financial KPI Row */}
              <div className="gross-kpi-grid">
                <div className="gross-kpi-card emerald-highlight">
                  <span className="kpi-sub-title">Total Platform GMV</span>
                  <h2>
                    <TrendingUp size={24} className="text-emerald" />
                    ₹{totalGMV.toLocaleString()}
                  </h2>
                  <span className="kpi-note positive">✓ Total customer gross purchase value</span>
                </div>

                <div className="gross-kpi-card">
                  <span className="kpi-sub-title">Platform Take-Rate Revenue</span>
                  <h2>
                    <DollarSign size={24} className="text-blue" />
                    ₹{Math.round(totalPlatformCommission).toLocaleString()}
                  </h2>
                  <span className="kpi-note">~{totalGMV > 0 ? Math.round((totalPlatformCommission / totalGMV) * 100) : 10}% average commission take</span>
                </div>

                <div className="gross-kpi-card blue-highlight">
                  <span className="kpi-sub-title">Net Merchant Payouts</span>
                  <h2>
                    <Wallet size={24} className="text-navy" />
                    ₹{Math.round(totalSellerDisbursements).toLocaleString()}
                  </h2>
                  <span className="kpi-note positive">Direct bank transfers to farmers & sellers</span>
                </div>

                <div className="gross-kpi-card">
                  <span className="kpi-sub-title">Delivery Fleet Payouts</span>
                  <h2>
                    <Bike size={24} className="text-purple" />
                    ₹{totalRiderFees.toLocaleString()}
                  </h2>
                  <span className="kpi-note">₹45/drop paid to active delivery partners</span>
                </div>

                <div className="gross-kpi-card">
                  <span className="kpi-sub-title">Average Order Value</span>
                  <h2>₹{avgOrderValue}</h2>
                  <span className="kpi-note">Across {orders.length} orders logged</span>
                </div>
              </div>

              {/* Filter and Search Bar */}
              <div className="gross-toolbar">
                <div className="toolbar-left">
                  <div className="search-box-wrap">
                    <Search size={16} />
                    <input 
                      type="text" 
                      placeholder="Search Order ID, Customer, Area..." 
                      value={historySearchQuery}
                      onChange={(e) => setHistorySearchQuery(e.target.value)}
                    />
                  </div>

                  <select 
                    className="gross-select-filter"
                    value={historyFilterSeller}
                    onChange={(e) => setHistoryFilterSeller(e.target.value)}
                  >
                    <option value="all">All Merchant Partners ({sellers.length})</option>
                    {sellers.map((s) => (
                      <option key={s.id} value={s.id}>{s.businessName}</option>
                    ))}
                  </select>

                  <select 
                    className="gross-select-filter"
                    value={historyFilterStatus}
                    onChange={(e) => setHistoryFilterStatus(e.target.value)}
                  >
                    <option value="all">All Order Statuses</option>
                    <option value="delivered">Delivered (Settled)</option>
                    <option value="out_for_delivery">Out for Delivery (Escrow)</option>
                    <option value="ready_for_pickup">Ready for Pickup</option>
                    <option value="preparing">Preparing</option>
                  </select>
                </div>

                <button 
                  type="button" 
                  className="btn-export-csv"
                  onClick={() => {
                    alert(`Exporting complete Gross Revenue History for ${orders.length} transactions as GreenCart-Financial-Report-${new Date().toISOString().slice(0, 10)}.csv!`);
                  }}
                >
                  <Download size={14} />
                  <span>Export Financial Ledger (CSV)</span>
                </button>
              </div>

              {/* Category Gross Contribution Bar */}
              <div className="category-gross-distribution">
                <div className="cat-dist-header">
                  <h4>Category Gross Revenue Contribution</h4>
                  <span className="text-muted text-xs">Real-time GMV split across store sectors</span>
                </div>

                <div className="cat-dist-grid">
                  {[
                    { cat: 'Vegetables & Fruits', amount: 890, pct: 41, comm: '8%' },
                    { cat: 'Dairy Products', amount: 560, pct: 26, comm: '8%' },
                    { cat: 'Meat & Seafood', amount: 780, pct: 36, comm: '12%' },
                    { cat: 'Bakery & Breakfast', amount: 325, pct: 15, comm: '10%' },
                    { cat: 'Groceries & Spices', amount: 280, pct: 13, comm: '8%' },
                  ].map((item) => (
                    <div key={item.cat} className="cat-dist-item">
                      <div className="cat-dist-top">
                        <strong>{item.cat}</strong>
                        <span>₹{item.amount}</span>
                      </div>
                      <div className="cat-dist-bar-track">
                        <div className="cat-dist-bar-fill" style={{ width: `${Math.min(100, item.pct * 2)}%` }} />
                      </div>
                      <span className="cat-dist-sub">Commission Take: {item.comm}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Gross Orders Ledger Table */}
              <div className="gross-ledger-card">
                <div className="gross-ledger-header">
                  <h4>Platform Orders & Gross Financial Ledger</h4>
                  <span className="text-muted text-xs">Showing {orders.length} transaction entries</span>
                </div>

                <div className="gross-table-scroll">
                  <table className="gross-ledger-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Date & Time</th>
                        <th>Customer & Area</th>
                        <th>Vendors Split</th>
                        <th>Gross GMV</th>
                        <th>Platform Fee</th>
                        <th>Rider Pay</th>
                        <th>Net Seller Disbursement</th>
                        <th>Settlement</th>
                        <th>Receipt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders
                        .filter(o => {
                          const q = historySearchQuery.toLowerCase().trim();
                          const matchesSearch = !q || 
                            o.orderId.toLowerCase().includes(q) ||
                            o.customerName.toLowerCase().includes(q) ||
                            (o.area && o.area.toLowerCase().includes(q));
                          const matchesStatus = historyFilterStatus === 'all' || o.status === historyFilterStatus;
                          const matchesSeller = historyFilterSeller === 'all' || 
                            (o.subOrders && o.subOrders.some(sub => sub.sellerId === historyFilterSeller));
                          return matchesSearch && matchesStatus && matchesSeller;
                        })
                        .map((order) => {
                          let orderComm = 0;
                          let orderSellerNet = 0;
                          if (order.subOrders) {
                            order.subOrders.forEach(sub => {
                              orderComm += (sub.commission || 0);
                              orderSellerNet += (sub.sellerPayout || (sub.subtotal - (sub.commission || 0)));
                            });
                          }
                          const isDelivered = order.status === 'delivered';
                          const isTransit = order.status === 'out_for_delivery';

                          return (
                            <tr key={order.orderId}>
                              <td>
                                <span className="order-badge-id">#{order.orderId}</span>
                                <br />
                                <span className="payment-method-chip">{order.paymentMethod || 'UPI'}</span>
                              </td>
                              <td>
                                <strong>{order.date || 'Today'}</strong>
                                <br />
                                <small className="text-muted">{order.placedAt || '10:00 AM'}</small>
                              </td>
                              <td>
                                <strong>{order.customerName}</strong>
                                <br />
                                <small className="text-muted">{order.area || 'Coimbatore'}</small>
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
                                <span className="amount-gross">₹{order.totalAmount}</span>
                              </td>
                              <td>
                                <span className="amount-commission">
                                  +₹{Math.round(orderComm * 100) / 100}
                                </span>
                              </td>
                              <td>
                                <span>₹45</span>
                              </td>
                              <td>
                                <span className="amount-payout">
                                  ₹{Math.round(orderSellerNet * 100) / 100}
                                </span>
                              </td>
                              <td>
                                <span className={`settlement-status-badge ${isDelivered ? 'settled' : isTransit ? 'escrow' : 'clearing'}`}>
                                  {isDelivered ? '✓ Settled' : isTransit ? '⏳ In Escrow' : '⚡ Clearing'}
                                </span>
                              </td>
                              <td>
                                <button 
                                  type="button" 
                                  className="btn-receipt-action"
                                  onClick={() => setSelectedReceiptOrder(order)}
                                >
                                  <Receipt size={13} />
                                  <span>Receipt</span>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SELLER APPROVALS */}
        {activeTab === 'sellers' && (
          <div className="admin-pane">
            <div className="pane-head-note">
              <h3>Seller & Farmer Partner Applications</h3>
              <p>Verify business documents, FSSAI certificates, and assign default commission rates.</p>
            </div>

            <div className="sellers-table-wrapper">
              <table className="seller-data-table">
                <thead>
                  <tr>
                    <th>Business / Farm Name</th>
                    <th>Category</th>
                    <th>Owner & Phone</th>
                    <th>Address / Hub</th>
                    <th>FSSAI License</th>
                    <th>Status</th>
                    <th>Commission</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sellers.map((s) => (
                    <tr key={s.id}>
                      <td>
                        <strong>{s.businessName}</strong>
                        <br /><small>Joined: {s.joinedDate}</small>
                      </td>
                      <td>{s.category}</td>
                      <td>
                        {s.ownerName}
                        <br /><small>{s.phone}</small>
                      </td>
                      <td>{s.address}</td>
                      <td><code>{s.fssaiLicense}</code></td>
                      <td>
                        <span className={`status-pill ${s.status}`}>
                          {s.status === 'approved' ? '✓ Approved' : '⏳ Pending'}
                        </span>
                      </td>
                      <td><strong>{s.commissionRate}%</strong></td>
                      <td>
                        {s.status === 'pending_approval' ? (
                          <div className="table-btn-group">
                            <button 
                              className="btn-action-approve"
                              onClick={() => {
                                onApproveSeller(s.id);
                                alert(`Approved ${s.businessName}!`);
                              }}
                            >
                              Approve Partnership
                            </button>
                            <button 
                              className="btn-action-reject"
                              onClick={() => onRejectSeller(s.id)}
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="done-pill">Active Merchant</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PRODUCT MODERATION */}
        {activeTab === 'products' && (
          <div className="admin-pane">
            <div className="pane-head-note">
              <h3>Product Catalog Moderation Queue</h3>
              <p>Sellers cannot sell products directly until Admin approves images, prices, and organic claims.</p>
            </div>

            <div className="product-moderation-grid">
              {products.map((p) => (
                <div key={p.id} className="moderation-card">
                  <div className="mod-thumb-box">
                    <img src={p.image} alt={p.name} />
                    <span className={`status-pill ${p.status}`}>
                      {p.status === 'approved' ? 'Live on Store' : 'Pending Approval'}
                    </span>
                  </div>
                  <div className="mod-content">
                    <h4>{p.name}</h4>
                    <span className="mod-seller-tag">Sold by: {p.sellerName}</span>
                    <div className="mod-details-row">
                      <span><strong>Price:</strong> ₹{p.price} ({p.unit})</span>
                      <span><strong>Stock:</strong> {p.stock} units</span>
                      <span><strong>Expiry:</strong> {p.expiryDays} days</span>
                    </div>
                    <p className="mod-desc">{p.description}</p>
                    
                    <div className="mod-footer-actions">
                      {p.status === 'pending_approval' ? (
                        <>
                          <button 
                            type="button" 
                            className="btn-action-approve full"
                            onClick={() => {
                              onApproveProduct(p.id);
                              alert(`Published ${p.name} to the Customer Store!`);
                            }}
                          >
                            <Check size={16} />
                            <span>Approve & Publish to Store</span>
                          </button>
                          <button 
                            type="button" 
                            className="btn-action-reject"
                            onClick={() => onRejectProduct(p.id)}
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className="done-pill full-width">✓ Currently Visible to Customers</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ORDERS & MULTI-VENDOR SPLITTER */}
        {activeTab === 'orders' && (
          <div className="admin-pane">
            <div className="pane-head-note">
              <h3>🔥 Smart Multi-Vendor Order Splitter Monitor</h3>
              <p>Inspect how one customer cart is automatically routed to multiple independent sellers and delivery routes.</p>
            </div>

            <div className="orders-splitter-table-container">
              {orders.map((order) => {
                const isExpanded = expandedOrderId === order.orderId;

                return (
                  <div key={order.orderId} className="order-split-card">
                    <div 
                      className="split-card-header"
                      onClick={() => setExpandedOrderId(isExpanded ? null : order.orderId)}
                    >
                      <div className="split-head-left">
                        <span className="order-main-id">Order #{order.orderId}</span>
                        <span className={`status-pill ${order.status}`}>
                          {order.status.replace(/_/g, ' ')}
                        </span>
                        <span className="split-otp-badge">Customer OTP: {order.deliveryOtp}</span>
                      </div>

                      <div className="split-head-mid">
                        <span>Customer: <strong>{order.customerName}</strong> ({order.area})</span>
                        <span>Total: <strong>₹{order.totalAmount}</strong></span>
                      </div>

                      <div className="split-head-right">
                        <span className="rider-assigned-tag">
                          🛵 Rider: {order.assignedRiderName || 'Unassigned'}
                        </span>
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </div>

                    {/* Split Details Expansion */}
                    {isExpanded && (
                      <div className="split-card-body">
                        <div className="splitter-diagram-banner">
                          <Sparkles size={16} />
                          <span>
                            <strong>Smart Order Splitter:</strong> This single customer order was partitioned into {order.subOrders?.length || 1} independent vendor fulfillment tasks:
                          </span>
                        </div>

                        <div className="suborders-breakdown-grid">
                          {order.subOrders && order.subOrders.map((sub, idx) => (
                            <div key={idx} className="suborder-item-box">
                              <div className="suborder-head">
                                <strong>{sub.sellerName}</strong>
                                <span className="cat-mini">{sub.sellerCategory}</span>
                              </div>
                              <div className="suborder-items">
                                {sub.items.map((it, i) => (
                                  <div key={i} className="mini-item-row">
                                    <span>{it.quantity}x {it.name}</span>
                                    <span>₹{it.total}</span>
                                  </div>
                                ))}
                              </div>
                              <div className="suborder-math">
                                <span>Subtotal: ₹{sub.subtotal}</span>
                                <span>GreenCart Fee ({sub.commissionRate}%): +₹{sub.commission}</span>
                                <strong>Seller Payout: ₹{sub.sellerPayout}</strong>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="dispatch-action-row">
                          <div className="reassign-rider-col">
                            <label>Reassign Rider Manually:</label>
                            <select 
                              defaultValue={order.assignedRiderId || ''}
                              onChange={(e) => {
                                const selectedRider = riders.find(r => r.id === e.target.value);
                                if (selectedRider) {
                                  onReassignOrderRider(order.orderId, selectedRider.id, selectedRider.name);
                                  alert(`Reassigned order #${order.orderId} to ${selectedRider.name}!`);
                                }
                              }}
                            >
                              <option value="">Select Delivery Partner</option>
                              {riders.map((r) => (
                                <option key={r.id} value={r.id}>
                                  {r.name} ({r.agentCode}) - {r.dutyStatus}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="order-destination-info">
                            <span>Drop: {order.address}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: FLEET MONITOR */}
        {activeTab === 'fleet' && (
          <div className="admin-pane">
            <div className="pane-head-note">
              <h3>🛵 Delivery Fleet & Rider Monitoring</h3>
              <p>Monitor electric scooter fleets, driver availability, active assignments, and digital proof-of-delivery records.</p>
            </div>

            <div className="fleet-grid">
              {riders.map((r) => (
                <div key={r.id} className="fleet-card">
                  <div className="fleet-head">
                    <div className="fleet-rider-info">
                      <div className="rider-icon-circ">
                        <Bike size={20} />
                      </div>
                      <div>
                        <h4>{r.name}</h4>
                        <span className="code-chip">{r.agentCode} · {r.vehicle}</span>
                      </div>
                    </div>
                    <span className={`duty-chip ${r.dutyStatus}`}>
                      {r.dutyStatus === 'online' ? '🟢 Online' : '⚪ Offline'}
                    </span>
                  </div>

                  <div className="fleet-metrics">
                    <div className="f-metric">
                      <span>Vehicle Reg</span>
                      <strong>{r.vehicleNumber}</strong>
                    </div>
                    <div className="f-metric">
                      <span>Coverage Hub</span>
                      <strong>{r.currentArea}</strong>
                    </div>
                    <div className="f-metric">
                      <span>Today's Pay</span>
                      <strong>₹{r.todayEarnings}</strong>
                    </div>
                    <div className="f-metric">
                      <span>Rating</span>
                      <strong>★ {r.rating}</strong>
                    </div>
                  </div>

                  <div className="fleet-current-task">
                    <span>Active Assignment:</span>
                    <strong>{r.activeOrderId ? `Order #${r.activeOrderId} in Transit` : 'Idle / Available at Hub'}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: COMMISSION ENGINE */}
        {activeTab === 'commission' && (
          <div className="admin-pane">
            <div className="pane-head-note">
              <h3>💰 Marketplace Commission Engine</h3>
              <p>Configure automated platform take-rates per grocery category. GreenCart auto-splits transactions during checkout.</p>
            </div>

            <div className="commission-rate-editor-grid">
              {Object.entries(commissionRates).map(([category, rate]) => (
                <div key={category} className="comm-card">
                  <div className="comm-card-head">
                    <h4>{category}</h4>
                    <span className="comm-pct">{rate}%</span>
                  </div>
                  <p>Standard marketplace platform and delivery facilitation fee.</p>
                  
                  <div className="comm-adjust-row">
                    <label>Adjust Percentage:</label>
                    <div className="comm-input-group">
                      <input 
                        type="number" 
                        defaultValue={rate}
                        min={0}
                        max={30}
                        onBlur={(e) => onUpdateCommissionRate(category, Number(e.target.value))}
                      />
                      <span>%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: PROBLEM DETECTOR */}
        {activeTab === 'problems' && (
          <div className="admin-pane">
            <div className="pane-head-note">
              <h3>🧠 Smart Problem Detector</h3>
              <p>Automated SLA watchdog monitors the entire order lifecycle to catch delays before customers complain.</p>
            </div>

            <div className="problem-alerts-list">
              <div className="problem-alert-card warning">
                <div className="prob-icon-wrap">
                  <AlertTriangle size={24} />
                </div>
                <div className="prob-body">
                  <h4>Order #GC-91024 — Seller Packing Delay Detected</h4>
                  <p>
                    Kovai Artisanal Bakehouse accepted order 25 minutes ago. Expected preparation time was 12 minutes.
                  </p>
                  <div className="prob-actions">
                    <span className="prob-impact">Impact: Customer ETA pushed by +8 mins</span>
                    <button 
                      className="btn-prob-resolve"
                      onClick={() => alert('Automated expedite ping sent to Kovai Artisanal Bakehouse kitchen manager!')}
                    >
                      Send Expedite Ping to Seller
                    </button>
                  </div>
                </div>
              </div>

              <div className="problem-alert-card safe">
                <div className="prob-icon-wrap">
                  <CheckCircle2 size={24} />
                </div>
                <div className="prob-body">
                  <h4>Delivery Fleet Balance: Healthy</h4>
                  <p>Current active riders in Gandhipuram & R.S. Puram match expected order volume for the next 2 hours.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: FOOD-WASTE REDUCTION ENGINE */}
        {activeTab === 'waste' && (
          <div className="admin-pane">
            <div className="pane-head-note">
              <h3>🌱 Food-Waste Reduction Engine</h3>
              <p>Platform sustainability analytics tracking products saved from landfills through automatic algorithmic discounting.</p>
            </div>

            <div className="waste-kpi-row">
              <div className="waste-kpi-card">
                <Leaf size={28} className="leaf-green" />
                <div>
                  <span>Food Saved This Month</span>
                  <h3>184 kg</h3>
                  <small>Fresh vegetables & dairy</small>
                </div>
              </div>

              <div className="waste-kpi-card">
                <Sparkles size={28} className="leaf-emerald" />
                <div>
                  <span>Active "Save Food" Offers</span>
                  <h3>{products.filter(p => p.saveFoodDiscount).length} Items</h3>
                  <small>Discounted 15-25% to prevent waste</small>
                </div>
              </div>
            </div>

            <div className="expiring-admin-table">
              <h4>Perishables Approaching Expiry Across All Vendors</h4>
              <table className="seller-data-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Seller</th>
                    <th>Current Stock</th>
                    <th>Expiry Window</th>
                    <th>Save Food Offer Status</th>
                  </tr>
                </thead>
                <tbody>
                  {expiringProducts.map((p) => (
                    <tr key={p.id}>
                      <td><strong>{p.name}</strong> ({p.unit})</td>
                      <td>{p.sellerName}</td>
                      <td>{p.stock} units</td>
                      <td><span className="urgency-pill high">Expires in {p.expiryDays} day(s)</span></td>
                      <td>
                        {p.saveFoodDiscount ? (
                          <span className="status-pill approved">✓ Active Offer (₹{p.saveFoodPrice})</span>
                        ) : (
                          <span className="status-pill pending">Pending Seller Discount</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Commercial Tax Receipt Modal */}
      {selectedReceiptOrder && (
        <div className="receipt-modal-backdrop" onClick={() => setSelectedReceiptOrder(null)}>
          <div className="receipt-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="receipt-card-header">
              <div className="receipt-brand-title">
                <Receipt size={20} />
                <span>GreenCart Commercial Tax Invoice &amp; Settlement</span>
              </div>
              <button className="receipt-close-btn" onClick={() => setSelectedReceiptOrder(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="receipt-card-body">
              <div className="receipt-info-grid">
                <div>
                  <span className="text-muted">Order ID:</span>
                  <strong>#{selectedReceiptOrder.orderId}</strong>
                </div>
                <div>
                  <span className="text-muted">Date &amp; Time:</span>
                  <strong>{selectedReceiptOrder.date || 'Today'} · {selectedReceiptOrder.placedAt || '10:00 AM'}</strong>
                </div>
                <div>
                  <span className="text-muted">Customer Name:</span>
                  <strong>{selectedReceiptOrder.customerName}</strong>
                </div>
                <div>
                  <span className="text-muted">Payment Channel:</span>
                  <strong>{selectedReceiptOrder.paymentMethod || 'UPI'}</strong>
                </div>
                <div>
                  <span className="text-muted">Delivery Address:</span>
                  <small>{selectedReceiptOrder.address}</small>
                </div>
                <div>
                  <span className="text-muted">Assigned Fleet Agent:</span>
                  <strong>{selectedReceiptOrder.assignedRiderName || 'Ravi Kumar (DA-101)'}</strong>
                </div>
              </div>

              <div className="receipt-vendors-section">
                <h5 style={{ margin: '0 0 8px 0', fontSize: '11px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>
                  Participating Vendor Settlement Splits
                </h5>
                <table className="receipt-items-table">
                  <thead>
                    <tr>
                      <th>Merchant</th>
                      <th>Items Sold</th>
                      <th>Gross Subtotal</th>
                      <th>Commission Take</th>
                      <th>Net Payout</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedReceiptOrder.subOrders && selectedReceiptOrder.subOrders.map((sub, i) => (
                      <tr key={i}>
                        <td>
                          <strong>{sub.sellerName}</strong>
                          <br /><small className="text-muted">{sub.sellerCategory}</small>
                        </td>
                        <td>
                          {sub.items.map((it, idx) => (
                            <div key={idx} style={{ fontSize: '12px' }}>
                              {it.quantity}x {it.name}
                            </div>
                          ))}
                        </td>
                        <td><strong>₹{sub.subtotal}</strong></td>
                        <td style={{ color: '#059669' }}>-₹{sub.commission || (Math.round(sub.subtotal * 0.08))} ({sub.commissionRate || 8}%)</td>
                        <td><strong>₹{sub.sellerPayout || (sub.subtotal - (sub.commission || 0))}</strong></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="receipt-financial-math-box">
                <div className="receipt-math-row">
                  <span>Gross Order Value (Customer Paid):</span>
                  <strong>₹{selectedReceiptOrder.totalAmount}</strong>
                </div>
                <div className="receipt-math-row">
                  <span>Customer Savings / Discounts:</span>
                  <span style={{ color: '#059669' }}>-₹{selectedReceiptOrder.savings || 45}</span>
                </div>
                <div className="receipt-math-row">
                  <span>GreenCart Platform Commission:</span>
                  <strong>₹{Math.round((selectedReceiptOrder.subOrders?.reduce((acc, s) => acc + (s.commission || 0), 0) || (selectedReceiptOrder.totalAmount * 0.08)) * 100) / 100}</strong>
                </div>
                <div className="receipt-math-row">
                  <span>Delivery Fleet Logistics Fee:</span>
                  <span>₹45</span>
                </div>
                <div className="receipt-math-row highlight-total">
                  <span>Total Net Merchant Settlement:</span>
                  <span style={{ color: '#047857' }}>₹{Math.round((selectedReceiptOrder.subOrders?.reduce((acc, s) => acc + (s.sellerPayout || 0), 0) || (selectedReceiptOrder.totalAmount * 0.92)) * 100) / 100}</span>
                </div>
              </div>

              <div className="receipt-stamp-badge">
                ✓ Digitally Reconciled &amp; Audited · GreenCart Multi-Vendor Engine
              </div>
            </div>

            <div className="receipt-card-actions">
              <button 
                type="button" 
                className="btn-download-pdf"
                onClick={() => {
                  alert(`Statement for Order #${selectedReceiptOrder.orderId} downloaded successfully!`);
                  setSelectedReceiptOrder(null);
                }}
              >
                <Download size={15} />
                <span>Download Tax Invoice (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
