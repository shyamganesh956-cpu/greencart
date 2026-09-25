import React, { useState } from 'react';
import { MapPin, X, Check, Navigation } from 'lucide-react';

const POPULAR_LOCATIONS = [
  { area: 'Gandhipuram', city: 'Coimbatore (628001)', eta: '23 mins', default: true },
  { area: 'RS Puram', city: 'Coimbatore (641002)', eta: '25 mins' },
  { area: 'Peelamedu', city: 'Coimbatore (641004)', eta: '28 mins' },
  { area: 'Saibaba Colony', city: 'Coimbatore (641011)', eta: '24 mins' },
  { area: 'Saravanampatti', city: 'Coimbatore (641035)', eta: '30 mins' },
];

export default function LocationModal({ isOpen, onClose, selectedLocation, onSelectLocation }) {
  const [customInput, setCustomInput] = useState('');

  if (!isOpen) return null;

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (customInput.trim()) {
      onSelectLocation({
        area: customInput.trim(),
        city: 'Coimbatore',
        eta: '25-30 mins',
      });
      setCustomInput('');
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="modal-icon-badge">
              <MapPin size={20} color="#059669" />
            </div>
            <div>
              <h3>Choose Delivery Location</h3>
              <p>Select your address for 30-min express grocery delivery</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleCustomSubmit} className="modal-search-form">
          <div className="modal-search-input-wrap">
            <Navigation size={18} className="modal-input-icon" />
            <input
              type="text"
              placeholder="Enter your street, pincode or area..."
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              autoFocus
            />
          </div>
          <button type="submit" className="modal-submit-btn">
            Apply
          </button>
        </form>

        <div className="modal-popular-section">
          <h4>Popular Delivery Zones</h4>
          <div className="location-list">
            {POPULAR_LOCATIONS.map((loc) => {
              const isSelected = selectedLocation?.area === loc.area;
              return (
                <div
                  key={loc.area}
                  className={`location-item ${isSelected ? 'active' : ''}`}
                  onClick={() => {
                    onSelectLocation(loc);
                    onClose();
                  }}
                >
                  <div className="loc-left">
                    <MapPin size={18} className="loc-icon" />
                    <div>
                      <div className="loc-area">{loc.area}</div>
                      <div className="loc-city">{loc.city}</div>
                    </div>
                  </div>
                  <div className="loc-right">
                    <span className="loc-eta">⚡ {loc.eta}</span>
                    {isSelected && <Check size={18} className="loc-check" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
