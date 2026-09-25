import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Heart,
  Clock,
  Truck
} from 'lucide-react';
import Logo from './Logo';

export default function Footer({ onCategoryClick, onOpenTracker }) {
  return (
    <footer className="site-footer">
      <div className="container">

        {/* 4 Columns: Logo/About (Left) -> Categories -> Company -> Contact/Location (Right) */}
        <div className="footer-columns-grid">
          
          {/* Column 1: Logo & Brand Details on the LEFT (Before Fresh Categories) */}
          <div className="footer-col brand-col brand-col-left">
            <Logo height={44} />
            <p className="brand-description">
              GreenCart connects conscious households directly with certified local organic farms.
              Harvested at sunrise, cold-chain packed, and delivered in 30 minutes.
            </p>

            {/* Social Media Links */}
            <div className="social-links-row">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="Instagram" title="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="Twitter" title="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="Facebook" title="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="LinkedIn" title="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect width="4" height="12" x="2" y="9"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Fresh Categories */}
          <div className="footer-col">
            <h4>Fresh Categories</h4>
            <ul className="footer-links-list">
              <li><button type="button" onClick={() => onCategoryClick('Vegetables')}>Fresh Vegetables</button></li>
              <li><button type="button" onClick={() => onCategoryClick('Fruits')}>Handpicked Fruits</button></li>
              <li><button type="button" onClick={() => onCategoryClick('Dairy & Eggs')}>Dairy &amp; Farm Eggs</button></li>
              <li><button type="button" onClick={() => onCategoryClick('Snacks')}>Indian Snacks &amp; Munchies</button></li>
              <li><button type="button" onClick={() => onCategoryClick('Beverages')}>Desi Juices &amp; Drinks</button></li>
              <li><button type="button" onClick={() => onCategoryClick('Meat & Seafood')}>Meat &amp; Seafood</button></li>
              <li><button type="button" onClick={() => onCategoryClick('Grocery & Staples')}>Grocery &amp; Staples</button></li>
              <li><button type="button" onClick={() => onCategoryClick('Bakery & Breakfast')}>Bakery &amp; Breakfast</button></li>
            </ul>
          </div>

          {/* Column 3: About GreenCart */}
          <div className="footer-col">
            <h4>About GreenCart</h4>
            <ul className="footer-links-list">
              <li><a href="#about">About Our Vision</a></li>
              <li><a href="#farmers">Our Partner Farmers</a></li>
              <li><a href="#sustainability">Zero Waste Cold-Chain</a></li>
              <li><a href="#careers">Careers <span className="hiring-badge">Hiring</span></a></li>
              <li><a href="#press">Press &amp; Media</a></li>
              <li><a href="#impact">Farmer Welfare Program</a></li>
            </ul>
          </div>

          {/* Column 4: Location, Contact & Customer Care on the RIGHT */}
          <div className="footer-col contact-col-right">
            <h4>Contact &amp; Location</h4>
            
            <div className="footer-contact-info">
              <div className="contact-item">
                <MapPin size={16} className="contact-icon" />
                <span>Gandhipuram, Coimbatore, Tamil Nadu 628001</span>
              </div>
              <div className="contact-item">
                <Phone size={16} className="contact-icon" />
                <span>1800-473-3622 (Toll Free)</span>
              </div>
              <div className="contact-item">
                <Mail size={16} className="contact-icon" />
                <span>support@greencart.in</span>
              </div>
              <div className="contact-item">
                <Clock size={16} className="contact-icon" />
                <span>Delivery Hours: 6:00 AM – 11:30 PM</span>
              </div>
            </div>

            <div className="footer-action-wrap">
              <button 
                type="button" 
                onClick={onOpenTracker}
                className="footer-track-btn"
                title="Track your live grocery order"
              >
                <Truck size={15} />
                <span>Live Order Tracking</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-row">
          <div className="footer-copyright">
            © {new Date().getFullYear()} GreenCart E-Commerce Technologies Pvt Ltd. All rights reserved.
          </div>

          <div className="footer-trust-badges">
            <div className="trust-pill">
              <ShieldCheck size={16} color="#10B981" />
              <span>100% Organic Certified</span>
            </div>
            <div className="trust-pill">
              <Heart size={16} color="#EC4899" fill="#EC4899" />
              <span>Farm Direct Freshness</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
