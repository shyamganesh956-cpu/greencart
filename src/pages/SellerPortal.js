import React, { useState } from 'react';
import { 
  Store, 
  Package, 
  AlertTriangle, 
  PlusCircle, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  DollarSign, 
  Sparkles, 
  Calendar, 
  Tag, 
  ArrowRight, 
  X, 
  Truck,
  Receipt,
  Download,
  Search,
  Wallet,
  CreditCard
} from 'lucide-react';

export default function SellerPortal({
  activeSeller,
  allProducts = [],
  orders = [],
  onAddNewProduct,
  onUpdateProductStock,
  onApplySaveFoodOffer,
  onUpdateSubOrderStatus,
  onNavigateCustomer
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'products' | 'inventory' | 'expiry' | 'orders' | 'earnings'
  const [showAddModal, setShowAddModal] = useState(false);

  // Gross History filtering & modal states
  const [grossSearchQuery, setGrossSearchQuery] = useState('');
  const [grossStatusFilter, setGrossStatusFilter] = useState('all');
  const [selectedSellerReceipt, setSelectedSellerReceipt] = useState(null);
  const [withdrawnAmount, setWithdrawnAmount] = useState(0);
  const [showWithdrawSuccess, setShowWithdrawSuccess] = useState(false);

  // New product form state
  const [productForm, setProductForm] = useState({
    name: '',
    category: activeSeller?.category || 'Vegetables & Fruits',
    subCategory: 'Fresh Produce',
    price: '',
    originalPrice: '',
    unit: '500g pack',
    stock: 25,
    avgDailySales: 8,
    expiryDays: 3,
    description: '',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=400&q=80',
    organic: true
  });

  if (!activeSeller) {
    return (
      <div className="portal-empty-state">
        <Store size={48} className="empty-icon" />
        <h3>No Active Seller Selected</h3>
        <p>Please select a seller account from the top switcher to manage products and orders.</p>
      </div>
    );
  }

  // Filter products belonging to this seller
  const sellerProducts = allProducts.filter(p => p.sellerId === activeSeller.id);
  const activeProductsCount = sellerProducts.filter(p => p.status === 'approved').length;
  const pendingProductsCount = sellerProducts.filter(p => p.status === 'pending_approval').length;
  
  // Stock alerts
  const lowStockProducts = sellerProducts.filter(p => p.stock <= (p.avgDailySales * 1.5));
  
  // Expiry alerts
  const expiringProducts = sellerProducts.filter(p => p.expiryDays <= 2);

  // Orders that contain this seller's products
  const sellerSubOrdersList = [];
  orders.forEach(order => {
    if (order.subOrders && Array.isArray(order.subOrders)) {
      order.subOrders.forEach(sub => {
        if (sub.sellerId === activeSeller.id) {
          sellerSubOrdersList.push({
            parentOrderId: order.orderId,
            customerName: order.customerName,
            customerAddress: order.address,
            placedAt: order.placedAt,
            parentStatus: order.status,
            ...sub
          });
        }
      });
    }
  });

  const pendingOrdersCount = sellerSubOrdersList.filter(o => ['placed', 'accepted', 'preparing'].includes(o.status)).length;

  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) {
      alert('Please provide product title and price');
      return;
    }

    const newProd = {
      id: `prod-${Date.now()}`,
      name: productForm.name,
      sellerId: activeSeller.id,
      sellerName: activeSeller.businessName,
      category: productForm.category,
      subCategory: productForm.subCategory,
      price: Number(productForm.price),
      originalPrice: Number(productForm.originalPrice || productForm.price),
      discount: productForm.originalPrice ? `${Math.round(((productForm.originalPrice - productForm.price)/productForm.originalPrice)*100)}% OFF` : 'Best Price',
      unit: productForm.unit,
      stock: Number(productForm.stock),
      avgDailySales: Number(productForm.avgDailySales || 5),
      expiryDays: Number(productForm.expiryDays || 7),
      description: productForm.description || 'Locally harvested fresh product on GreenCart.',
      image: productForm.image,
      organic: Boolean(productForm.organic),
      status: 'pending_approval', // Sent to Admin for review!
      saveFoodDiscount: false
    };

    if (onAddNewProduct) {
      onAddNewProduct(newProd);
    }

    setShowAddModal(false);
    setProductForm({
      name: '',
      category: activeSeller.category || 'Vegetables & Fruits',
      subCategory: 'Fresh Produce',
      price: '',
      originalPrice: '',
      unit: '500g pack',
      stock: 25,
      avgDailySales: 8,
      expiryDays: 3,
      description: '',
      image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=400&q=80',
      organic: true
    });

    alert('Product submitted! It is in "Pending Approval" state. Once approved by Admin, customers will see it live.');
  };

  return (
    <div className="seller-portal-view">
      {/* Seller Header */}
      <div className="seller-header-banner">
        <div className="container seller-header-container">
          <div className="seller-identity">
            <div className="seller-avatar-badge">
              <Store size={28} />
            </div>
            <div>
              <div className="seller-badge-row">
                <span className={`seller-status-chip ${activeSeller.status}`}>
                  {activeSeller.status === 'approved' ? 'Active Verified Seller' : 'Pending Verification'}
                </span>
                <span className="seller-cat-chip">{activeSeller.category}</span>
                <span className="seller-comm-chip">Commission: {activeSeller.commissionRate}%</span>
              </div>
              <h1 className="seller-store-name">{activeSeller.businessName}</h1>
              <p className="seller-meta-text">
                Owner: {activeSeller.ownerName} · {activeSeller.address} · FSSAI: {activeSeller.fssaiLicense}
              </p>
            </div>
          </div>

          <div className="seller-header-actions">
            <button 
              type="button" 
              className="seller-add-prod-btn"
              onClick={() => setShowAddModal(true)}
            >
              <PlusCircle size={18} />
              <span>Add New Product</span>
            </button>

            <button 
              type="button" 
              className="seller-view-store-btn"
              onClick={onNavigateCustomer}
            >
              <span>View Customer Store</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Seller Sub Navigation */}
      <div className="seller-nav-bar">
        <div className="container seller-nav-container">
          <button 
            type="button"
            className={`seller-nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span>Dashboard</span>
          </button>
          <button 
            type="button"
            className={`seller-nav-btn ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <span>Products</span>
            <span className="tab-bubble info">{sellerProducts.length}</span>
            {pendingProductsCount > 0 && <span className="tab-bubble warning">{pendingProductsCount} in review</span>}
          </button>
          <button 
            type="button"
            className={`seller-nav-btn ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            <span>Stock Prediction</span>
            {lowStockProducts.length > 0 && <span className="tab-bubble danger">{lowStockProducts.length}</span>}
          </button>
          <button 
            type="button"
            className={`seller-nav-btn ${activeTab === 'expiry' ? 'active' : ''}`}
            onClick={() => setActiveTab('expiry')}
          >
            <span>Expiry & Save Food</span>
            {expiringProducts.length > 0 && <span className="tab-bubble warning">{expiringProducts.length}</span>}
          </button>
          <button 
            type="button"
            className={`seller-nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <span>Orders Fulfillment</span>
            {pendingOrdersCount > 0 && <span className="tab-bubble success">{pendingOrdersCount}</span>}
          </button>
          <button 
            type="button"
            className={`seller-nav-btn ${activeTab === 'earnings' ? 'active' : ''}`}
            onClick={() => setActiveTab('earnings')}
          >
            <span>Gross Sales History</span>
            <span className="tab-bubble success">₹{(activeSeller.grossSales || 0).toLocaleString()}</span>
          </button>
        </div>
      </div>

      <div className="container seller-content-body">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="seller-tab-pane">
            {/* KPI Cards Row */}
            <div className="seller-kpi-grid">
              <div className="seller-kpi-card">
                <div className="kpi-icon-wrap primary">
                  <TrendingUp size={22} />
                </div>
                <div className="kpi-info">
                  <span className="kpi-label">Gross Sales</span>
                  <h3>₹{activeSeller.grossSales.toLocaleString()}</h3>
                  <span className="kpi-sub positive">Platform Fee: {activeSeller.commissionRate}%</span>
                </div>
              </div>

              <div className="seller-kpi-card">
                <div className="kpi-icon-wrap success">
                  <DollarSign size={22} />
                </div>
                <div className="kpi-info">
                  <span className="kpi-label">Net Earnings</span>
                  <h3>₹{activeSeller.netEarnings.toLocaleString()}</h3>
                  <span className="kpi-sub">Available: ₹{activeSeller.pendingPayout}</span>
                </div>
              </div>

              <div className="seller-kpi-card">
                <div className="kpi-icon-wrap info">
                  <Package size={22} />
                </div>
                <div className="kpi-info">
                  <span className="kpi-label">Active Listed</span>
                  <h3>{activeProductsCount} Items</h3>
                  <span className="kpi-sub">{pendingProductsCount} in moderation</span>
                </div>
              </div>

              <div className="seller-kpi-card">
                <div className="kpi-icon-wrap warning">
                  <Clock size={22} />
                </div>
                <div className="kpi-info">
                  <span className="kpi-label">Pending Orders</span>
                  <h3>{pendingOrdersCount} Orders</h3>
                  <span className="kpi-sub">Needs packing & handover</span>
                </div>
              </div>
            </div>

            {/* Smart Intelligence Alerts */}
            <div className="smart-alerts-section">
              <h3 className="section-subhead">
                <Sparkles size={18} className="sparkle-icon" />
                <span>GreenCart Smart Engine Recommendations</span>
              </h3>

              <div className="smart-recommendation-cards">
                {lowStockProducts.length > 0 && (
                  <div className="recommendation-card warning">
                    <div className="rec-header">
                      <AlertTriangle size={20} className="rec-icon" />
                      <strong>Stock Prediction Alert</strong>
                    </div>
                    <p>
                      <strong>{lowStockProducts[0].name}</strong> is selling fast (~{lowStockProducts[0].avgDailySales} units/day) with only {lowStockProducts[0].stock} units left in stock.
                    </p>
                    <div className="rec-footer">
                      <span className="rec-tip">Predicted stock-out in ~1.5 days</span>
                      <button 
                        className="rec-action-btn"
                        onClick={() => {
                          onUpdateProductStock(lowStockProducts[0].id, lowStockProducts[0].stock + 25);
                          alert(`Restocked +25 units for ${lowStockProducts[0].name}!`);
                        }}
                      >
                        Restock +25 Units
                      </button>
                    </div>
                  </div>
                )}

                {expiringProducts.length > 0 && (
                  <div className="recommendation-card danger">
                    <div className="rec-header">
                      <Tag size={20} className="rec-icon" />
                      <strong>Smart Expiry / Food-Waste Prevention</strong>
                    </div>
                    <p>
                      <strong>{expiringProducts[0].name}</strong> approaches its fresh harvest expiry within 24-48 hours ({expiringProducts[0].stock} units left).
                    </p>
                    <div className="rec-footer">
                      <span className="rec-tip">Suggested discount: 15% OFF to avoid food waste</span>
                      <button 
                        className="rec-action-btn highlight"
                        onClick={() => {
                          onApplySaveFoodOffer(expiringProducts[0].id, Math.round(expiringProducts[0].price * 0.82));
                          alert(`Applied Save Food Offer to ${expiringProducts[0].name}! Live on Customer Store.`);
                        }}
                      >
                        Apply "Save Food Deal"
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Orders Table */}
            <div className="seller-table-section">
              <div className="table-header-row">
                <h4>Recent Orders Requiring Fulfillment</h4>
                <button className="table-link-btn" onClick={() => setActiveTab('orders')}>
                  View All Orders ({sellerSubOrdersList.length})
                </button>
              </div>

              {sellerSubOrdersList.length === 0 ? (
                <div className="empty-suborders">No orders received yet.</div>
              ) : (
                <div className="orders-table-wrapper">
                  <table className="seller-data-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Items to Pack</th>
                        <th>Subtotal</th>
                        <th>Commission ({activeSeller.commissionRate}%)</th>
                        <th>Your Net Payout</th>
                        <th>Fulfillment Stage</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sellerSubOrdersList.slice(0, 4).map((sub) => (
                        <tr key={sub.subOrderId}>
                          <td><strong>#{sub.parentOrderId}</strong> <br /><small>{sub.subOrderId}</small></td>
                          <td>{sub.customerName}</td>
                          <td>
                            {sub.items.map((it, idx) => (
                              <div key={idx} className="item-row-snippet">
                                • {it.quantity}x {it.name} ({it.unit})
                              </div>
                            ))}
                          </td>
                          <td>₹{sub.subtotal}</td>
                          <td>-₹{sub.commission}</td>
                          <td className="highlight-green">₹{sub.sellerPayout}</td>
                          <td>
                            <span className={`status-tag ${sub.status}`}>
                              {sub.status.replace(/_/g, ' ')}
                            </span>
                          </td>
                          <td>
                            {sub.status === 'placed' && (
                              <button 
                                className="action-step-btn"
                                onClick={() => onUpdateSubOrderStatus(sub.parentOrderId, sub.subOrderId, 'accepted')}
                              >
                                Accept Order
                              </button>
                            )}
                            {sub.status === 'accepted' && (
                              <button 
                                className="action-step-btn"
                                onClick={() => onUpdateSubOrderStatus(sub.parentOrderId, sub.subOrderId, 'preparing')}
                              >
                                Start Packing
                              </button>
                            )}
                            {sub.status === 'preparing' && (
                              <button 
                                className="action-step-btn highlight"
                                onClick={() => onUpdateSubOrderStatus(sub.parentOrderId, sub.subOrderId, 'ready_for_pickup')}
                              >
                                Ready for Pickup 🛵
                              </button>
                            )}
                            {['ready_for_pickup', 'out_for_delivery', 'delivered'].includes(sub.status) && (
                              <span className="done-pill">✓ Handed to Rider</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS */}
        {activeTab === 'products' && (
          <div className="seller-tab-pane">
            <div className="pane-header-actions">
              <div>
                <h3>Listed Products Catalog</h3>
                <p>Manage your grocery items, check admin approval status, and adjust prices.</p>
              </div>
              <button 
                type="button" 
                className="seller-add-prod-btn"
                onClick={() => setShowAddModal(true)}
              >
                <PlusCircle size={18} />
                <span>Add Product</span>
              </button>
            </div>

            <div className="seller-products-grid">
              {sellerProducts.map((p) => (
                <div key={p.id} className="seller-product-card">
                  <div className="card-thumb-wrap">
                    <img src={p.image} alt={p.name} />
                    <span className={`approval-badge ${p.status}`}>
                      {p.status === 'approved' ? '✓ Live on Store' : '⏳ Pending Admin Review'}
                    </span>
                    {p.saveFoodDiscount && (
                      <span className="save-food-tag">🌱 Save Food Offer</span>
                    )}
                  </div>
                  <div className="card-info">
                    <h4>{p.name}</h4>
                    <span className="unit-label">{p.unit} · {p.subCategory}</span>
                    <div className="price-stock-row">
                      <div className="price-col">
                        <span className="current-price">₹{p.saveFoodDiscount ? p.saveFoodPrice : p.price}</span>
                        {p.originalPrice && <span className="strike-price">₹{p.originalPrice}</span>}
                      </div>
                      <div className="stock-col">
                        <span className={`stock-badge ${p.stock < 10 ? 'low' : 'normal'}`}>
                          Stock: {p.stock}
                        </span>
                      </div>
                    </div>
                    <div className="quick-adjust-stock">
                      <button 
                        type="button"
                        onClick={() => onUpdateProductStock(p.id, Math.max(0, p.stock - 5))}
                        title="Reduce 5 units"
                      >
                        -5
                      </button>
                      <button 
                        type="button"
                        onClick={() => onUpdateProductStock(p.id, p.stock + 10)}
                        title="Add 10 units"
                      >
                        +10
                      </button>
                      <button 
                        type="button"
                        onClick={() => onUpdateProductStock(p.id, p.stock + 25)}
                        title="Add 25 units"
                      >
                        +25
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SMART STOCK PREDICTION */}
        {activeTab === 'inventory' && (
          <div className="seller-tab-pane">
            <div className="pane-header-actions">
              <div>
                <h3>🧠 Smart Stock Prediction Engine</h3>
                <p>Rule-based algorithmic demand analysis comparing current stock against average daily sales.</p>
              </div>
            </div>

            <div className="inventory-intelligence-table">
              <table className="seller-data-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Current Stock</th>
                    <th>Avg. Daily Sales</th>
                    <th>Expected Demand</th>
                    <th>Predicted Depletion</th>
                    <th>System Recommendation</th>
                    <th>1-Click Restock</th>
                  </tr>
                </thead>
                <tbody>
                  {sellerProducts.map((p) => {
                    const daysRemaining = (p.stock / (p.avgDailySales || 1)).toFixed(1);
                    const isUrgent = daysRemaining <= 1.5;
                    const recommendedRestock = Math.max(20, p.avgDailySales * 4);

                    return (
                      <tr key={p.id}>
                        <td>
                          <strong>{p.name}</strong>
                          <br /><small>{p.unit}</small>
                        </td>
                        <td>
                          <span className={`stock-number ${isUrgent ? 'danger' : ''}`}>
                            {p.stock} units
                          </span>
                        </td>
                        <td>{p.avgDailySales} units/day</td>
                        <td>~{Math.round(p.avgDailySales * 1.2)} units</td>
                        <td>
                          {isUrgent ? (
                            <span className="urgency-pill high">⚠️ {daysRemaining} days (Out of stock soon)</span>
                          ) : (
                            <span className="urgency-pill safe">✓ {daysRemaining} days healthy</span>
                          )}
                        </td>
                        <td>
                          {isUrgent ? (
                            <span className="restock-rec-text">Recommend +{recommendedRestock} units</span>
                          ) : (
                            <span className="normal-rec-text">Stock is optimal</span>
                          )}
                        </td>
                        <td>
                          <button 
                            type="button" 
                            className="btn-restock-now"
                            onClick={() => {
                              onUpdateProductStock(p.id, p.stock + recommendedRestock);
                              alert(`Restocked ${recommendedRestock} units for ${p.name}!`);
                            }}
                          >
                            + Restock {recommendedRestock}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: SMART EXPIRY & SAVE FOOD OFFERS */}
        {activeTab === 'expiry' && (
          <div className="seller-tab-pane">
            <div className="pane-header-actions">
              <div>
                <h3>🚨 Smart Expiry Manager & Food-Waste Prevention</h3>
                <p>Prevent perishables from being dumped. GreenCart automatically creates discounted offers to save food.</p>
              </div>
            </div>

            <div className="expiry-cards-container">
              {sellerProducts.map((p) => {
                const suggestedDiscountPrice = Math.round(p.price * 0.8);
                const isExpiring = p.expiryDays <= 2;

                return (
                  <div key={p.id} className={`expiry-item-card ${isExpiring ? 'urgent' : ''}`}>
                    <div className="expiry-left-col">
                      <img src={p.image} alt={p.name} />
                      <div>
                        <h4>{p.name}</h4>
                        <span className="expiry-meta">Stock: {p.stock} units · Price: ₹{p.price}</span>
                        <div className="days-chip">
                          <Calendar size={14} />
                          <span>Expires in: <strong>{p.expiryDays} {p.expiryDays === 1 ? 'day' : 'days'}</strong></span>
                        </div>
                      </div>
                    </div>

                    <div className="expiry-right-col">
                      {p.saveFoodDiscount ? (
                        <div className="offer-active-badge">
                          <CheckCircle2 size={18} />
                          <span>Active Save Food Deal (₹{p.saveFoodPrice})</span>
                        </div>
                      ) : isExpiring ? (
                        <div className="offer-suggest-box">
                          <div className="offer-suggest-text">
                            <strong>High Expiry Risk!</strong>
                            <span>Suggest: ₹{p.price} → ₹{suggestedDiscountPrice} (20% OFF)</span>
                          </div>
                          <button 
                            type="button"
                            className="btn-apply-savefood"
                            onClick={() => {
                              onApplySaveFoodOffer(p.id, suggestedDiscountPrice);
                              alert(`"Save Food Offer" activated at ₹${suggestedDiscountPrice}!`);
                            }}
                          >
                            Publish Save Food Offer
                          </button>
                        </div>
                      ) : (
                        <span className="safe-shelf-text">Fresh shelf life normal</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: ORDERS FULFILLMENT */}
        {activeTab === 'orders' && (
          <div className="seller-tab-pane">
            <div className="pane-header-actions">
              <div>
                <h3>Orders Dispatch & Fulfillment Pipeline</h3>
                <p>Pack customer orders containing your products and mark ready for GreenCart riders.</p>
              </div>
            </div>

            <div className="orders-pipeline-grid">
              {sellerSubOrdersList.map((sub) => (
                <div key={sub.subOrderId} className="seller-order-card">
                  <div className="order-card-head">
                    <div>
                      <span className="order-id-label">Order #{sub.parentOrderId}</span>
                      <span className="suborder-code">Sub-Order: {sub.subOrderId}</span>
                    </div>
                    <span className={`status-pill ${sub.status}`}>
                      {sub.status.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <div className="order-customer-box">
                    <strong>Customer: {sub.customerName}</strong>
                    <p>{sub.customerAddress}</p>
                    <span className="order-time-text">Ordered at: {sub.placedAt}</span>
                  </div>

                  <div className="order-items-pack-list">
                    <span className="items-pack-header">Pack these items:</span>
                    {sub.items.map((it, i) => (
                      <div key={i} className="pack-item-row">
                        <span className="item-qty-circle">{it.quantity}x</span>
                        <div className="item-desc">
                          <strong>{it.name}</strong>
                          <span>{it.unit} · ₹{it.price} each</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="order-card-financials">
                    <span>Subtotal: ₹{sub.subtotal}</span>
                    <span>Fee ({activeSeller.commissionRate}%): -₹{sub.commission}</span>
                    <strong>Your Payout: ₹{sub.sellerPayout}</strong>
                  </div>

                  <div className="order-action-footer">
                    {sub.status === 'placed' && (
                      <button 
                        type="button" 
                        className="btn-pipeline-action"
                        onClick={() => onUpdateSubOrderStatus(sub.parentOrderId, sub.subOrderId, 'accepted')}
                      >
                        Accept Order
                      </button>
                    )}
                    {sub.status === 'accepted' && (
                      <button 
                        type="button" 
                        className="btn-pipeline-action"
                        onClick={() => onUpdateSubOrderStatus(sub.parentOrderId, sub.subOrderId, 'preparing')}
                      >
                        Start Packing Items
                      </button>
                    )}
                    {sub.status === 'preparing' && (
                      <button 
                        type="button" 
                        className="btn-pipeline-action ready"
                        onClick={() => onUpdateSubOrderStatus(sub.parentOrderId, sub.subOrderId, 'ready_for_pickup')}
                      >
                        Mark Ready for Rider Pickup 🛵
                      </button>
                    )}
                    {['ready_for_pickup', 'out_for_delivery', 'delivered'].includes(sub.status) && (
                      <div className="rider-handed-box">
                        <Truck size={16} />
                        <span>Dispatched to GreenCart Fleet</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: GROSS SALES HISTORY & SETTLEMENTS LEDGER */}
        {activeTab === 'earnings' && (
          <div className="seller-tab-pane">
            <div className="gross-history-container">
              <div className="pane-header-actions">
                <div>
                  <h3>Gross Sales History &amp; Settlements Ledger</h3>
                  <p>Transparent accounting of customer gross payments, GreenCart platform take-rate, and verified bank payouts.</p>
                </div>
                <button 
                  type="button"
                  className="btn-payout-request"
                  onClick={() => {
                    const currentBal = Math.max(0, (activeSeller.pendingPayout || 0) - withdrawnAmount);
                    if (currentBal <= 0) {
                      alert('No pending balance to withdraw. All earnings are already settled to your bank!');
                      return;
                    }
                    setWithdrawnAmount(activeSeller.pendingPayout || 0);
                    setShowWithdrawSuccess(true);
                  }}
                >
                  <Wallet size={16} />
                  <span>Withdraw Available ₹{Math.max(0, (activeSeller.pendingPayout || 0) - withdrawnAmount).toLocaleString()}</span>
                </button>
              </div>

              {/* Financial KPI Cards */}
              <div className="gross-kpi-grid">
                <div className="gross-kpi-card emerald-highlight">
                  <span className="kpi-sub-title">Lifetime Gross Sales</span>
                  <h2>
                    <TrendingUp size={24} className="text-emerald" />
                    ₹{(activeSeller.grossSales || 0).toLocaleString()}
                  </h2>
                  <span className="kpi-note positive">✓ Cumulative customer order volume</span>
                </div>

                <div className="gross-kpi-card">
                  <span className="kpi-sub-title">Platform Fee ({activeSeller.commissionRate}%)</span>
                  <h2>
                    <DollarSign size={24} className="text-blue" />
                    -₹{(activeSeller.commissionPaid || 0).toLocaleString()}
                  </h2>
                  <span className="kpi-note">GreenCart cloud dispatch &amp; payment fee</span>
                </div>

                <div className="gross-kpi-card blue-highlight">
                  <span className="kpi-sub-title">Total Net Earnings</span>
                  <h2>
                    <CheckCircle2 size={24} className="text-navy" />
                    ₹{(activeSeller.netEarnings || 0).toLocaleString()}
                  </h2>
                  <span className="kpi-note positive">Credited to: {activeSeller.bankAccount}</span>
                </div>

                <div className="gross-kpi-card">
                  <span className="kpi-sub-title">Settlement Account</span>
                  <h2 style={{ fontSize: '18px' }}>
                    <CreditCard size={20} />
                    {activeSeller.bankAccount}
                  </h2>
                  <span className="kpi-note">Automated T+1 banking clearing cycle</span>
                </div>
              </div>

              {/* Toolbar */}
              <div className="gross-toolbar">
                <div className="toolbar-left">
                  <div className="search-box-wrap">
                    <Search size={16} />
                    <input 
                      type="text" 
                      placeholder="Search Sub-Order, Customer, Product..." 
                      value={grossSearchQuery}
                      onChange={(e) => setGrossSearchQuery(e.target.value)}
                    />
                  </div>

                  <select 
                    className="gross-select-filter"
                    value={grossStatusFilter}
                    onChange={(e) => setGrossStatusFilter(e.target.value)}
                  >
                    <option value="all">All Fulfillment Stages ({sellerSubOrdersList.length})</option>
                    <option value="delivered">Delivered (Settled)</option>
                    <option value="out_for_delivery">In Transit (Escrow)</option>
                    <option value="ready_for_pickup">Ready for Pickup</option>
                    <option value="preparing">Packing / In Kitchen</option>
                  </select>
                </div>

                <button 
                  type="button" 
                  className="btn-export-csv"
                  onClick={() => {
                    alert(`Exporting complete Gross Sales Statement for ${activeSeller.businessName} as GreenCart-Seller-Statement-${new Date().toISOString().slice(0, 10)}.csv!`);
                  }}
                >
                  <Download size={14} />
                  <span>Download Sales Ledger (CSV)</span>
                </button>
              </div>

              {/* Detailed Orders Ledger Table */}
              <div className="gross-ledger-card">
                <div className="gross-ledger-header">
                  <h4>Itemized Gross Orders &amp; Settlement Ledger</h4>
                  <span className="text-muted text-xs">Showing {sellerSubOrdersList.length} sub-order entries</span>
                </div>

                <div className="gross-table-scroll">
                  <table className="gross-ledger-table">
                    <thead>
                      <tr>
                        <th>Order &amp; Sub-Order</th>
                        <th>Order Time</th>
                        <th>Customer &amp; Area</th>
                        <th>Items Sold</th>
                        <th>Gross Subtotal</th>
                        <th>Commission ({activeSeller.commissionRate}%)</th>
                        <th>Net Merchant Payout</th>
                        <th>Settlement Status</th>
                        <th>Tax Invoice</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sellerSubOrdersList
                        .filter(sub => {
                          const q = grossSearchQuery.toLowerCase().trim();
                          const matchesSearch = !q || 
                            sub.parentOrderId.toLowerCase().includes(q) ||
                            sub.subOrderId.toLowerCase().includes(q) ||
                            sub.customerName.toLowerCase().includes(q) ||
                            sub.items.some(it => it.name.toLowerCase().includes(q));
                          const matchesStatus = grossStatusFilter === 'all' || sub.status === grossStatusFilter;
                          return matchesSearch && matchesStatus;
                        })
                        .map((sub) => {
                          const isDelivered = sub.status === 'delivered';
                          const isTransit = sub.status === 'out_for_delivery';

                          return (
                            <tr key={sub.subOrderId}>
                              <td>
                                <span className="order-badge-id">#{sub.parentOrderId}</span>
                                <br />
                                <small className="text-muted">{sub.subOrderId}</small>
                              </td>
                              <td>
                                <strong>{sub.placedAt || 'Today'}</strong>
                              </td>
                              <td>
                                <strong>{sub.customerName}</strong>
                                <br />
                                <small className="text-muted">{sub.customerAddress}</small>
                              </td>
                              <td>
                                {sub.items.map((it, idx) => (
                                  <div key={idx} style={{ fontSize: '12px' }}>
                                    • {it.quantity}x {it.name} ({it.unit})
                                  </div>
                                ))}
                              </td>
                              <td>
                                <span className="amount-gross">₹{sub.subtotal}</span>
                              </td>
                              <td>
                                <span className="amount-commission">-₹{sub.commission}</span>
                              </td>
                              <td>
                                <span className="amount-payout">₹{sub.sellerPayout}</span>
                              </td>
                              <td>
                                <span className={`settlement-status-badge ${isDelivered ? 'settled' : isTransit ? 'escrow' : 'clearing'}`}>
                                  {isDelivered ? '✓ Paid to Bank' : isTransit ? '⏳ In Escrow' : '⚡ Handover'}
                                </span>
                              </td>
                              <td>
                                <button 
                                  type="button" 
                                  className="btn-receipt-action"
                                  onClick={() => setSelectedSellerReceipt(sub)}
                                >
                                  <Receipt size={13} />
                                  <span>Invoice</span>
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
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="add-product-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top-header">
              <h3>Upload New Product to GreenCart</h3>
              <button onClick={() => setShowAddModal(false)}><X size={20} /></button>
            </div>

            <form onSubmit={handleProductSubmit} className="add-prod-form">
              <div className="form-group">
                <label>Product Title / Name *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Crisp Mountain Cauliflower"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Category</label>
                  <select 
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                  >
                    <option>Vegetables & Fruits</option>
                    <option>Dairy Products</option>
                    <option>Bakery & Breakfast</option>
                    <option>Meat & Seafood</option>
                    <option>Groceries & Spices</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Unit / Weight (e.g. 500g, 1 kg, 1 L)</label>
                  <input 
                    type="text" 
                    value={productForm.unit}
                    onChange={(e) => setProductForm({ ...productForm, unit: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row-3">
                <div className="form-group">
                  <label>Selling Price (₹) *</label>
                  <input 
                    type="number" 
                    required 
                    placeholder="45"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>MRP / Strike Price (₹)</label>
                  <input 
                    type="number" 
                    placeholder="55"
                    value={productForm.originalPrice}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Initial Stock (units)</label>
                  <input 
                    type="number" 
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Expected Expiry (Days from harvest)</label>
                  <input 
                    type="number" 
                    value={productForm.expiryDays}
                    onChange={(e) => setProductForm({ ...productForm, expiryDays: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Avg. Estimated Daily Sales</label>
                  <input 
                    type="number" 
                    value={productForm.avgDailySales}
                    onChange={(e) => setProductForm({ ...productForm, avgDailySales: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Photo URL (High-res grocery photo)</label>
                <input 
                  type="text" 
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                />
              </div>

              <div className="form-group checkbox-row">
                <label>
                  <input 
                    type="checkbox" 
                    checked={productForm.organic}
                    onChange={(e) => setProductForm({ ...productForm, organic: e.target.checked })}
                  />
                  <span>100% Certified Organic / Farm Direct</span>
                </label>
              </div>

              <div className="modal-actions-bar">
                <button type="button" className="btn-cancel" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit-prod">
                  Submit for Admin Moderation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Seller Tax Invoice Modal */}
      {selectedSellerReceipt && (
        <div className="receipt-modal-backdrop" onClick={() => setSelectedSellerReceipt(null)}>
          <div className="receipt-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="receipt-card-header">
              <div className="receipt-brand-title">
                <Receipt size={20} />
                <span>Vendor Tax Invoice &amp; Settlement Statement</span>
              </div>
              <button className="receipt-close-btn" onClick={() => setSelectedSellerReceipt(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="receipt-card-body">
              <div className="receipt-info-grid">
                <div>
                  <span className="text-muted">Sub-Order Reference:</span>
                  <strong>{selectedSellerReceipt.subOrderId} (Main #{selectedSellerReceipt.parentOrderId})</strong>
                </div>
                <div>
                  <span className="text-muted">Order Date &amp; Time:</span>
                  <strong>{selectedSellerReceipt.placedAt || 'Today'}</strong>
                </div>
                <div>
                  <span className="text-muted">Merchant Business:</span>
                  <strong>{activeSeller.businessName}</strong>
                </div>
                <div>
                  <span className="text-muted">FSSAI Registration:</span>
                  <strong>{activeSeller.fssaiLicense}</strong>
                </div>
                <div>
                  <span className="text-muted">Customer Drop Area:</span>
                  <small>{selectedSellerReceipt.customerAddress}</small>
                </div>
                <div>
                  <span className="text-muted">Direct Payout Account:</span>
                  <strong>{activeSeller.bankAccount}</strong>
                </div>
              </div>

              <div className="receipt-vendors-section">
                <h5 style={{ margin: '0 0 8px 0', fontSize: '11px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>
                  Itemized Goods Supplied
                </h5>
                <table className="receipt-items-table">
                  <thead>
                    <tr>
                      <th>Product Description</th>
                      <th>Unit Weight</th>
                      <th>Quantity</th>
                      <th>Unit Price</th>
                      <th>Total Gross</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedSellerReceipt.items.map((it, idx) => (
                      <tr key={idx}>
                        <td><strong>{it.name}</strong></td>
                        <td>{it.unit}</td>
                        <td>{it.quantity}</td>
                        <td>₹{it.price}</td>
                        <td><strong>₹{it.total}</strong></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="receipt-financial-math-box">
                <div className="receipt-math-row">
                  <span>Gross Item Total (GMV):</span>
                  <strong>₹{selectedSellerReceipt.subtotal}</strong>
                </div>
                <div className="receipt-math-row">
                  <span>GreenCart Platform Commission ({activeSeller.commissionRate}%):</span>
                  <span style={{ color: '#059669' }}>-₹{selectedSellerReceipt.commission}</span>
                </div>
                <div className="receipt-math-row highlight-total">
                  <span>Net Disbursed to Merchant:</span>
                  <span style={{ color: '#047857' }}>₹{selectedSellerReceipt.sellerPayout}</span>
                </div>
              </div>

              <div className="receipt-stamp-badge">
                ✓ Commercial Settlement Reconciled · Disbursed via GreenCart Automated Clearing
              </div>
            </div>

            <div className="receipt-card-actions">
              <button 
                type="button" 
                className="btn-download-pdf"
                onClick={() => {
                  alert(`Vendor invoice for Sub-Order ${selectedSellerReceipt.subOrderId} downloaded successfully!`);
                  setSelectedSellerReceipt(null);
                }}
              >
                <Download size={15} />
                <span>Download Tax Invoice (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Withdrawal Success Modal */}
      {showWithdrawSuccess && (
        <div className="receipt-modal-backdrop" onClick={() => setShowWithdrawSuccess(false)}>
          <div className="receipt-modal-card" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
            <div className="receipt-card-header" style={{ background: '#059669' }}>
              <div className="receipt-brand-title">
                <CheckCircle2 size={22} />
                <span>Instant Bank Payout Initiated</span>
              </div>
              <button className="receipt-close-btn" onClick={() => setShowWithdrawSuccess(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="receipt-card-body" style={{ textAlign: 'center' }}>
              <div style={{ padding: '16px', background: '#ecfdf5', borderRadius: '12px', border: '1px solid #a7f3d0' }}>
                <h2 style={{ fontSize: '28px', color: '#047857', margin: '0 0 6px 0', fontWeight: 800 }}>
                  ₹{(activeSeller.pendingPayout || 0).toLocaleString()}
                </h2>
                <span style={{ fontSize: '13px', color: '#065f46', fontWeight: 600 }}>
                  Transferred via IMPS Direct to Bank
                </span>
              </div>

              <div style={{ textAlign: 'left', fontSize: '12px', background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0', marginTop: '12px' }}>
                <div><strong>Beneficiary Account:</strong> {activeSeller.bankAccount}</div>
                <div style={{ marginTop: '4px' }}><strong>Merchant Name:</strong> {activeSeller.businessName}</div>
                <div style={{ marginTop: '4px' }}><strong>IMPS Reference ID:</strong> IMPS{Date.now().toString().slice(-8)}</div>
                <div style={{ marginTop: '4px' }}><strong>Settlement Time:</strong> Instant (T+0 Automated)</div>
              </div>
            </div>

            <div className="receipt-card-actions">
              <button 
                type="button" 
                className="btn-download-pdf" 
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => setShowWithdrawSuccess(false)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
