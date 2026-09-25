import React from 'react';
import { 
  Leaf, 
  ShoppingCart, 
  Tag, 
  Zap, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { PROMISES } from '../data/productsData';

export default function WhyChooseUs() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'leaf':
        return <Leaf size={22} className="promise-icon icon-green" />;
      case 'shopping-bag':
        return <ShoppingCart size={22} className="promise-icon icon-blue" />;
      case 'tag':
        return <Tag size={22} className="promise-icon icon-orange" />;
      case 'zap':
        return <Zap size={22} className="promise-icon icon-purple" />;
      default:
        return <Leaf size={22} />;
    }
  };

  return (
    <section className="why-us-section" id="why-us">
      <div className="container">
        <div className="why-us-header">
          <div className="section-badge badge-green-glow">
            <Sparkles size={14} className="section-badge-icon" />
            <span>THE GREENCART PROMISE</span>
          </div>
          <h2 className="why-us-title">Why Choose GreenCart?</h2>
          <p className="why-us-subtitle">
            We are redefining everyday grocery shopping with farm-direct freshness,
            transparent pricing, and instant doorstep delivery.
          </p>
        </div>

        <div className="why-us-grid">
          {PROMISES.map((item) => (
            <div key={item.id} className="promise-card">
              <div className="promise-card-top">
                <div className="promise-icon-container">
                  {getIcon(item.icon)}
                </div>
                <span className="promise-badge">{item.badge}</span>
              </div>

              <div className="promise-card-body">
                <div className="promise-card-title-row">
                  <CheckCircle2 size={16} className="promise-check-icon" />
                  <h3>{item.title}</h3>
                </div>
                <div className="promise-card-subtitle">{item.subtitle}</div>
                <p className="promise-card-desc">{item.description}</p>
              </div>

              <div className="promise-card-footer">
                <ShieldCheck size={14} className="quality-shield-icon" />
                <span>Guaranteed Quality</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
