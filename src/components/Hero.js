import React, { useState, useEffect } from 'react';
import { 
  Leaf, 
  Search, 
  ArrowRight, 
  Clock, 
  Sprout, 
  Percent, 
  RotateCcw,
  Zap,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import heroBg from '../assets/banners/hero-bg.jpg';
import { VALUE_PROPS } from '../data/productsData';

const POPULAR_TAGS = ['tomatoes', 'apples', 'cow milk', 'basmati rice', 'spinach', 'spices'];

const HERO_SLIDES = [
  {
    id: 1,
    bgImage: heroBg,
    badge: 'Direct From Certified Organic Farms',
    titleLine1: 'Fresh groceries,',
    titleLine2: 'delivered to you',
    accentColor: '#34d399',
    description: 'Crisp morning vegetables, handpicked fruits, pure farm milk, and daily kitchen essentials. Harvested at sunrise and delivered to your doorstep in 30 minutes.',
    ctaText: 'Shop Now',
    tagline: '30-Min Fast Delivery'
  },
  {
    id: 2,
    bgImage: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1400&q=80',
    badge: 'Summer Orchard Harvest 🔥 35% OFF',
    titleLine1: 'Juicy Seasonal Fruits',
    titleLine2: '& Crisp Greens',
    accentColor: '#fbbf24',
    description: 'Naturally ripened sweet mangoes, crisp royal apples, tender berries, and salad greens fresh from orchards.',
    ctaText: 'Explore Fresh Fruits',
    tagline: 'Up to 35% OFF Today'
  },
  {
    id: 3,
    bgImage: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1400&q=80',
    badge: '100% Antibiotic & Hormone Free',
    titleLine1: 'Pure Farm Milk, Eggs',
    titleLine2: '& Warm Bakery Loaves',
    accentColor: '#38bdf8',
    description: 'Unprocessed organic cow milk, free-range brown eggs, and soft multigrain artisan breads delivered daily.',
    ctaText: 'Order Daily Dairy',
    tagline: 'Fresh Every Morning'
  },
  {
    id: 4,
    bgImage: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=1400&q=80',
    badge: 'Direct Wholesale Farm Gate Prices',
    titleLine1: 'Premium Basmati Rice,',
    titleLine2: 'Atta & Spices',
    accentColor: '#f43f5e',
    description: 'Aged Himalayan Basmati, 100% whole wheat sharbati atta, and cold-pressed pure cooking oils with zero middleman markup.',
    ctaText: 'Stock Pantry Staples',
    tagline: 'Save ₹500 on Monthly Refills'
  }
];

export default function Hero({ onSearchSubmit, onShopNowClick }) {
  const [heroSearch, setHeroSearch] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-sliding interval
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearchSubmit) onSearchSubmit(heroSearch);
  };

  const handleTagClick = (tag) => {
    setHeroSearch(tag);
    if (onSearchSubmit) onSearchSubmit(tag);
  };

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'sprout':
        return <Sprout size={22} className="val-icon-sprout" />;
      case 'clock':
        return <Clock size={22} className="val-icon-clock" />;
      case 'percent':
        return <Percent size={22} className="val-icon-percent" />;
      case 'rotate-ccw':
        return <RotateCcw size={22} className="val-icon-returns" />;
      default:
        return <Zap size={22} />;
    }
  };

  const activeSlideData = HERO_SLIDES[currentSlide];

  return (
    <section className="hero-section" id="home">
      <div className="container">
        {/* Main Sliding Hero Box */}
        <div 
          className="hero-banner-card hero-slider-box"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{
            backgroundImage: `linear-gradient(to right, rgba(6, 40, 28, 0.94) 0%, rgba(6, 40, 28, 0.86) 55%, rgba(6, 40, 28, 0.72) 100%), url(${activeSlideData.bgImage})`,
          }}
        >
          {/* Previous / Next Arrow Controls */}
          <button 
            type="button" 
            className="hero-slider-arrow prev-arrow" 
            onClick={handlePrevSlide}
            aria-label="Previous Slide"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            type="button" 
            className="hero-slider-arrow next-arrow" 
            onClick={handleNextSlide}
            aria-label="Next Slide"
          >
            <ChevronRight size={24} />
          </button>

          <div className="hero-content">
            {/* Farm Pill Badge */}
            <div className="hero-farm-badge">
              <Leaf size={15} className="farm-badge-icon" />
              <span>{activeSlideData.badge}</span>
            </div>

            {/* Headline */}
            <h1 className="hero-title">
              {activeSlideData.titleLine1}<br />
              <span className="hero-title-accent" style={{ color: activeSlideData.accentColor }}>
                {activeSlideData.titleLine2}
              </span>
            </h1>

            {/* Sub-text */}
            <p className="hero-description">
              {activeSlideData.description}
            </p>

            {/* Hero Search Box */}
            <form onSubmit={handleSearchSubmit} className="hero-search-box">
              <Search size={18} className="hero-search-icon" />
              <input
                type="text"
                placeholder="Search for fruits, vegetables, dairy, rice, snacks..."
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
              />
              <button type="submit" className="hero-search-btn">
                Search
              </button>
            </form>

            {/* Popular Search Tags */}
            <div className="hero-popular-tags">
              <span className="popular-label">Popular:</span>
              <div className="popular-pill-list">
                {POPULAR_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className="popular-chip"
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="hero-actions-row">
              <button
                type="button"
                className="hero-shop-btn"
                onClick={onShopNowClick}
              >
                <span>{activeSlideData.ctaText}</span>
                <ArrowRight size={17} />
              </button>

              <div className="hero-slot-indicator">
                <Clock size={16} className="slot-clock-icon" />
                <span>Next slot: <strong>Within 30 mins</strong></span>
              </div>
            </div>

            {/* Slide Navigation Indicators (Dots) */}
            <div className="hero-slider-dots">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  className={`slider-dot ${currentSlide === idx ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 4 Value-Proposition Feature Badges below Hero */}
        <div className="hero-value-props-grid">
          {VALUE_PROPS.map((vp, i) => (
            <div key={i} className="value-prop-card">
              <div className="value-prop-icon-wrap">
                {renderIcon(vp.icon)}
              </div>
              <div className="value-prop-text">
                <h4 className="value-prop-title">{vp.title}</h4>
                <p className="value-prop-desc">{vp.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
