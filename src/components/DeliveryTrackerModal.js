import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Package, 
  Truck, 
  Home, 
  X, 
  Phone, 
  ShieldCheck, 
  MapPin, 
  RefreshCw 
} from 'lucide-react';

const STAGES = [
  {
    id: 'placed',
    title: 'Order Placed',
    subtitle: 'We received your order & confirmed payment',
    time: 'Just now',
    icon: CheckCircle2,
  },
  {
    id: 'packed',
    title: 'Packed & Quality Inspected',
    subtitle: 'Harvest bagged in temperature-controlled crate',
    time: '2 mins ago',
    icon: Package,
  },
  {
    id: 'out',
    title: 'Out for Delivery',
    subtitle: 'Ravi Kumar is on an electric scooter with your basket',
    time: 'In transit',
    icon: Truck,
  },
  {
    id: 'delivered',
    title: 'Delivered',
    subtitle: 'Handed over at your doorstep with smile',
    time: 'Estimated 18 mins',
    icon: Home,
  },
];

export default function DeliveryTrackerModal({
  isOpen,
  onClose,
  orderDetails,
}) {
  const [currentStep, setCurrentStep] = useState(2); // Default to 'Out for Delivery' for rich demo!

  if (!isOpen) return null;

  const orderId = orderDetails?.orderId || 'GC-84920';
  const total = orderDetails?.total || 274;
  const itemsCount = orderDetails?.itemsCount || 3;
  const address = orderDetails?.address || 'Gandhipuram, Coimbatore (628001)';
  const eta = orderDetails?.deliveryEta || '18 MINS';

  const handleNextStep = () => {
    setCurrentStep((prev) => (prev < 3 ? prev + 1 : 0));
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="delivery-tracker-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="tracker-header">
          <div className="tracker-title-group">
            <span className="live-pulse-dot" />
            <div>
              <h3>Live Delivery Tracking</h3>
              <span className="tracker-order-id">Order #{orderId}</span>
            </div>
          </div>
          <button className="tracker-close-btn" onClick={onClose} aria-label="Close tracking">
            <X size={20} />
          </button>
        </div>

        {/* ETA Highlight Bar */}
        <div className="tracker-eta-card">
          <div className="tracker-eta-left">
            <Clock size={20} className="tracker-eta-clock" />
            <div>
              <span className="tracker-eta-label">ESTIMATED ARRIVAL</span>
              <div className="tracker-eta-time">
                {currentStep === 3 ? 'Delivered Just Now!' : `Within ${eta}`}
              </div>
            </div>
          </div>
          <div className="tracker-eta-status">
            {currentStep === 0 && <span className="status-badge placed">Order Placed</span>}
            {currentStep === 1 && <span className="status-badge packed">Packing</span>}
            {currentStep === 2 && <span className="status-badge out">On the Way 🚀</span>}
            {currentStep === 3 && <span className="status-badge delivered">Delivered 🎉</span>}
          </div>
        </div>

        {/* 4-Step Tracker Flow */}
        <div className="tracker-stepper">
          {STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isCompleted = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <div 
                key={stage.id} 
                className={`tracker-step-item ${isCompleted ? 'completed' : ''} ${isCurrent ? 'active' : ''}`}
              >
                <div className="step-marker-col">
                  <div className="step-circle">
                    <Icon size={18} />
                  </div>
                  {idx < STAGES.length - 1 && <div className="step-connector" />}
                </div>

                <div className="step-content-col">
                  <div className="step-title-row">
                    <h4>{stage.title}</h4>
                    <span className="step-time">{stage.time}</span>
                  </div>
                  <p className="step-desc">{stage.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Delivery Partner Card (when out for delivery or active) */}
        {currentStep >= 2 && (
          <div className="delivery-partner-card">
            <div className="partner-avatar">
              <span>RK</span>
            </div>
            <div className="partner-info">
              <h4>Ravi Kumar</h4>
              <p>GreenCart Cold-Chain Express &bull; EV Scooter</p>
              <span className="partner-vaccinated">
                <ShieldCheck size={13} /> Vaccinated &bull; Temp: 98.2°F
              </span>
            </div>
            <a href="tel:9876543210" className="partner-call-btn" title="Call Delivery Partner">
              <Phone size={16} />
              <span>Call</span>
            </a>
          </div>
        )}

        {/* Destination Address & Items */}
        <div className="tracker-meta-box">
          <div className="tracker-meta-row">
            <MapPin size={16} className="tracker-meta-icon" />
            <div>
              <span className="meta-label">Delivery Address</span>
              <div className="meta-val">{address}</div>
            </div>
          </div>
          <div className="tracker-meta-row">
            <Package size={16} className="tracker-meta-icon" />
            <div>
              <span className="meta-label">Basket Details</span>
              <div className="meta-val">{itemsCount} items &bull; ₹{total} (Paid via UPI)</div>
            </div>
          </div>
        </div>

        {/* Interactive Step Simulator */}
        <div className="tracker-actions">
          <button 
            type="button" 
            className="step-simulate-btn"
            onClick={handleNextStep}
          >
            <RefreshCw size={15} />
            <span>Simulate Next Stage ({currentStep < 3 ? `Step ${currentStep + 2}/4` : 'Reset to Step 1'})</span>
          </button>
          <button type="button" className="tracker-done-btn" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
