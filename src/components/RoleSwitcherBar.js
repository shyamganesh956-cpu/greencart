import React from 'react';
import { 
  User, 
  Store, 
  Bike, 
  ShieldCheck, 
  ArrowRightLeft,
  Sparkles
} from 'lucide-react';

export default function RoleSwitcherBar({
  currentRole = 'customer',
  onSelectRole,
  onOpenAuthModal,
  activeSeller,
  activeRider
}) {
  return (
    <div className="role-switcher-banner">
      <div className="container role-switcher-container">
        {/* Left: Branding & Current Role Status */}
        <div className="role-switcher-left">
          <span className="role-engine-badge">
            <Sparkles size={13} className="engine-icon" />
            <span>Smart Multi-Vendor Engine</span>
          </span>
          <div className="active-role-indicator">
            <span className="active-dot" />
            <span className="active-role-text">
              Active Portal: 
              <strong>
                {currentRole === 'customer' && ' Customer Store (Shyam)'}
                {currentRole === 'seller' && ` Seller Hub (${activeSeller ? activeSeller.businessName : 'Vendor'})`}
                {currentRole === 'delivery' && ` Delivery Partner (${activeRider ? activeRider.name : 'Rider'})`}
                {currentRole === 'admin' && ' Super Admin Center'}
              </strong>
            </span>
          </div>
        </div>

        {/* Right: Fast 1-Click Role Switcher */}
        <div className="role-switcher-right">
          <div className="role-quick-buttons">
            <button
              type="button"
              className={`role-btn ${currentRole === 'customer' ? 'active' : ''}`}
              onClick={() => onSelectRole('customer')}
              title="Switch to Customer Store"
            >
              <User size={14} />
              <span>Customer</span>
            </button>

            <button
              type="button"
              className={`role-btn ${currentRole === 'seller' ? 'active' : ''}`}
              onClick={() => onSelectRole('seller')}
              title="Switch to Seller Portal"
            >
              <Store size={14} />
              <span>Seller</span>
            </button>

            <button
              type="button"
              className={`role-btn ${currentRole === 'delivery' ? 'active' : ''}`}
              onClick={() => onSelectRole('delivery')}
              title="Switch to Delivery Partner View"
            >
              <Bike size={14} />
              <span>Delivery</span>
            </button>

            <button
              type="button"
              className={`role-btn ${currentRole === 'admin' ? 'active' : ''}`}
              onClick={() => onSelectRole('admin')}
              title="Switch to Admin Center"
            >
              <ShieldCheck size={14} />
              <span>Admin</span>
            </button>
          </div>

          <button
            type="button"
            className="role-switch-more-btn"
            onClick={onOpenAuthModal}
            title="Switch Profiles or Register"
          >
            <ArrowRightLeft size={13} />
            <span>Switch Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
