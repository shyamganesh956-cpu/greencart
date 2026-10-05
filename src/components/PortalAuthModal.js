import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Store, 
  Bike, 
  User, 
  ArrowRight, 
  Building2 
} from 'lucide-react';

export default function PortalAuthModal({
  isOpen,
  onClose,
  currentRole = 'customer',
  onSelectRole,
  sellers = [],
  riders = [],
  activeSellerId,
  activeRiderId,
  onSetActiveSellerId,
  onSetActiveRiderId,
  onRegisterSeller
}) {
  const [selectedTab, setSelectedTab] = useState(currentRole);
  
  // Seller registration form state
  const [isRegisteringSeller, setIsRegisteringSeller] = useState(false);
  const [regForm, setRegForm] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    category: 'Vegetables & Fruits',
    address: '',
    pincode: '641012',
    description: '',
    fssaiLicense: ''
  });

  if (!isOpen) return null;

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regForm.businessName || !regForm.ownerName || !regForm.phone) {
      alert('Please fill in required fields (Business Name, Owner, Phone)');
      return;
    }
    const newSeller = {
      id: `seller-${Date.now()}`,
      businessName: regForm.businessName,
      ownerName: regForm.ownerName,
      email: regForm.email || 'seller@greencart.in',
      phone: regForm.phone,
      category: regForm.category,
      address: regForm.address || 'Coimbatore Hub',
      pincode: regForm.pincode,
      description: regForm.description || 'Specialty grocery vendor on GreenCart',
      fssaiLicense: regForm.fssaiLicense || 'FSSAI-APPLIED-2026',
      status: 'pending_approval',
      rating: 5.0,
      commissionRate: 8,
      grossSales: 0,
      commissionPaid: 0,
      netEarnings: 0,
      pendingPayout: 0,
      joinedDate: 'Just now',
      bankAccount: 'HDFC •••• 9901'
    };
    if (onRegisterSeller) {
      onRegisterSeller(newSeller);
    }
    setIsRegisteringSeller(false);
    alert('Application submitted! Your account is in "Pending Approval" status. Admin must approve before you can sell.');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="portal-auth-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="portal-modal-header">
          <div className="portal-brand-intro">
            <span className="portal-chip">GREEN CART ECOSYSTEM</span>
            <h2>Select Portal or Sign In</h2>
            <p>Switch between customer, seller, delivery agent, or admin command centers.</p>
          </div>
          <button className="tracker-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Role Tabs */}
        <div className="portal-role-tabs">
          <button 
            type="button"
            className={`portal-tab-btn ${selectedTab === 'customer' ? 'active' : ''}`}
            onClick={() => { setSelectedTab('customer'); setIsRegisteringSeller(false); }}
          >
            <User size={18} />
            <span>Customer</span>
          </button>

          <button 
            type="button"
            className={`portal-tab-btn ${selectedTab === 'seller' ? 'active' : ''}`}
            onClick={() => setSelectedTab('seller')}
          >
            <Store size={18} />
            <span>Seller / Vendor</span>
          </button>

          <button 
            type="button"
            className={`portal-tab-btn ${selectedTab === 'delivery' ? 'active' : ''}`}
            onClick={() => { setSelectedTab('delivery'); setIsRegisteringSeller(false); }}
          >
            <Bike size={18} />
            <span>Delivery Agent</span>
          </button>

          <button 
            type="button"
            className={`portal-tab-btn ${selectedTab === 'admin' ? 'active' : ''}`}
            onClick={() => { setSelectedTab('admin'); setIsRegisteringSeller(false); }}
          >
            <ShieldCheck size={18} />
            <span>Admin Center</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="portal-modal-body">
          {/* CUSTOMER TAB */}
          {selectedTab === 'customer' && (
            <div className="portal-role-panel">
              <div className="portal-info-box">
                <div className="portal-info-avatar customer-avatar">
                  <User size={28} />
                </div>
                <div>
                  <h4>Customer Shopping Experience</h4>
                  <p>Browse fresh farm groceries, cook meals with 1-click recipes, track delivery live with OTP.</p>
                </div>
              </div>

              <div className="quick-account-card active">
                <div className="account-details">
                  <strong>Shyam Sundar (Active Customer)</strong>
                  <span>Phone: +91 98765 43210 · Gandhipuram, Coimbatore</span>
                </div>
                <span className="badge-verified">Verified</span>
              </div>

              <button 
                type="button" 
                className="portal-action-primary-btn"
                onClick={() => {
                  onSelectRole('customer');
                  onClose();
                }}
              >
                <span>Enter as Customer</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}

          {/* SELLER TAB */}
          {selectedTab === 'seller' && (
            <div className="portal-role-panel">
              {!isRegisteringSeller ? (
                <>
                  <div className="portal-info-box">
                    <div className="portal-info-avatar seller-avatar">
                      <Store size={28} />
                    </div>
                    <div>
                      <h4>Seller & Merchant Portal</h4>
                      <p>Upload products, manage stock, view expiry alerts, and pack orders for riders.</p>
                    </div>
                  </div>

                  <label className="portal-select-label">Select Active Seller Account for Demo:</label>
                  <div className="seller-accounts-list">
                    {sellers.map((s) => (
                      <div 
                        key={s.id} 
                        className={`seller-account-choice ${activeSellerId === s.id ? 'selected' : ''}`}
                        onClick={() => onSetActiveSellerId(s.id)}
                      >
                        <div className="choice-meta">
                          <strong>{s.businessName}</strong>
                          <span className="seller-sub">{s.category} · {s.ownerName}</span>
                        </div>
                        <span className={`status-pill ${s.status}`}>
                          {s.status === 'approved' ? 'Active Seller' : 'Pending Approval'}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="portal-actions-row">
                    <button 
                      type="button"
                      className="portal-action-outline-btn"
                      onClick={() => setIsRegisteringSeller(true)}
                    >
                      <Building2 size={16} />
                      <span>Apply as New Seller</span>
                    </button>

                    <button 
                      type="button" 
                      className="portal-action-primary-btn"
                      onClick={() => {
                        onSelectRole('seller');
                        onClose();
                      }}
                    >
                      <span>Open Seller Dashboard</span>
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </>
              ) : (
                /* Seller Registration Form */
                <form className="seller-reg-form" onSubmit={handleRegisterSubmit}>
                  <div className="form-head-title">
                    <h4>🏪 Seller Partnership Application</h4>
                    <p>Apply to list and sell your farm produce or grocery products on GreenCart.</p>
                  </div>

                  <div className="reg-form-grid">
                    <div className="form-group">
                      <label>Business / Farm Name *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Bhavani Organic Harvest"
                        value={regForm.businessName}
                        onChange={(e) => setRegForm({ ...regForm, businessName: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Owner / Contact Name *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. R. Murugesan"
                        value={regForm.ownerName}
                        onChange={(e) => setRegForm({ ...regForm, ownerName: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Primary Category</label>
                      <select 
                        value={regForm.category}
                        onChange={(e) => setRegForm({ ...regForm, category: e.target.value })}
                      >
                        <option>Vegetables & Fruits</option>
                        <option>Dairy Products</option>
                        <option>Bakery & Breakfast</option>
                        <option>Meat & Seafood</option>
                        <option>Groceries & Spices</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Contact Mobile *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="+91 98432 00000"
                        value={regForm.phone}
                        onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Store / Farm Address</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Sathy Main Road, Annur, Coimbatore"
                        value={regForm.address}
                        onChange={(e) => setRegForm({ ...regForm, address: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Pincode</label>
                      <input 
                        type="text" 
                        value={regForm.pincode}
                        onChange={(e) => setRegForm({ ...regForm, pincode: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>FSSAI License / Certificate</label>
                      <input 
                        type="text" 
                        placeholder="FSSAI-12423..."
                        value={regForm.fssaiLicense}
                        onChange={(e) => setRegForm({ ...regForm, fssaiLicense: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="portal-actions-row">
                    <button 
                      type="button" 
                      className="portal-action-outline-btn"
                      onClick={() => setIsRegisteringSeller(false)}
                    >
                      Back to Sellers
                    </button>
                    <button type="submit" className="portal-action-primary-btn">
                      Submit for Admin Approval
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* DELIVERY AGENT TAB */}
          {selectedTab === 'delivery' && (
            <div className="portal-role-panel">
              <div className="portal-info-box">
                <div className="portal-info-avatar delivery-avatar">
                  <Bike size={28} />
                </div>
                <div>
                  <h4>Delivery Partner App</h4>
                  <p>Accept order pickups, navigate to store & doorstep, verify OTP, and track daily trip earnings.</p>
                </div>
              </div>

              <label className="portal-select-label">Select Delivery Partner Profile:</label>
              <div className="rider-accounts-list">
                {riders.map((r) => (
                  <div 
                    key={r.id} 
                    className={`seller-account-choice ${activeRiderId === r.id ? 'selected' : ''}`}
                    onClick={() => onSetActiveRiderId(r.id)}
                  >
                    <div className="choice-meta">
                      <strong>{r.name} ({r.agentCode})</strong>
                      <span className="seller-sub">{r.vehicle} · {r.currentArea}</span>
                    </div>
                    <span className={`status-pill ${r.dutyStatus}`}>
                      {r.dutyStatus === 'online' ? '🟢 Online' : '⚪ Offline'}
                    </span>
                  </div>
                ))}
              </div>

              <button 
                type="button" 
                className="portal-action-primary-btn"
                onClick={() => {
                  onSelectRole('delivery');
                  onClose();
                }}
              >
                <span>Launch Delivery Partner View</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}

          {/* ADMIN TAB */}
          {selectedTab === 'admin' && (
            <div className="portal-role-panel">
              <div className="portal-info-box">
                <div className="portal-info-avatar admin-avatar">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <h4>Super Admin Control Center</h4>
                  <p>Approve sellers and products, track multi-vendor dispatch, adjust commissions, monitor food waste.</p>
                </div>
              </div>

              <div className="admin-demo-creds">
                <div className="cred-row">
                  <span className="cred-title">Admin Email:</span>
                  <code>admin@greencart.com</code>
                </div>
                <div className="cred-row">
                  <span className="cred-title">Role Authorization:</span>
                  <span className="auth-chip">Super Admin (All Access)</span>
                </div>
              </div>

              <button 
                type="button" 
                className="portal-action-primary-btn admin-btn"
                onClick={() => {
                  onSelectRole('admin');
                  onClose();
                }}
              >
                <ShieldCheck size={18} />
                <span>Launch Admin Command Center</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
