import React, { useState, useMemo } from 'react';
import { 
  Coins, 
  X, 
  ShoppingBag, 
  ArrowRight, 
  CheckCircle2, 
  TrendingDown,
  Layers
} from 'lucide-react';

const BUDGET_PRESETS = [
  { label: '₹300 Quick Pick', value: 300 },
  { label: '₹500 Family Essentials', value: 500 },
  { label: '₹800 Weekly Fresh', value: 800 },
  { label: '₹1200 Monthly Saver', value: 1200 },
];

const BASKET_TYPES = [
  { id: 'all-essentials', name: 'Balanced Staples', icon: '🥗' },
  { id: 'pure-veg', name: 'Pure Veg & Greens', icon: '🥦' },
  { id: 'high-protein', name: 'Dairy & Protein', icon: '🥛' },
  { id: 'fruits-nuts', name: 'Fruits & Energy', icon: '🍎' },
];

// Catalog pool for algorithmic budget basket generation
const BUDGET_PRODUCT_POOL = [
  { id: 'bgt-rice', name: 'Sona Masoori Raw Rice', category: 'all-essentials', price: 65, unit: '1 kg', originalPrice: 80 },
  { id: 'bgt-atta', name: 'Chakki Fresh Whole Wheat Atta', category: 'all-essentials', price: 55, unit: '1 kg', originalPrice: 68 },
  { id: 'bgt-toordal', name: 'Desi Toor Dal Unpolished', category: 'all-essentials', price: 78, unit: '500 g', originalPrice: 95 },
  { id: 'bgt-oil', name: 'Refined Sunflower Cooking Oil', category: 'all-essentials', price: 115, unit: '1 L', originalPrice: 135 },
  { id: 'bgt-milk', name: 'Pure Organic Cow Milk', category: 'high-protein', price: 65, unit: '1 L', originalPrice: 75 },
  { id: 'bgt-eggs', name: 'Farm Fresh Brown Eggs', category: 'high-protein', price: 54, unit: '6 pcs', originalPrice: 65 },
  { id: 'bgt-paneer', name: 'Fresh Malai Paneer Cubes', category: 'high-protein', price: 95, unit: '200 g', originalPrice: 115 },
  { id: 'bgt-curd', name: 'Thick Natural Set Curd', category: 'high-protein', price: 35, unit: '400 g', originalPrice: 42 },
  { id: 'bgt-tomato', name: 'Farm Red Country Tomatoes', category: 'pure-veg', price: 28, unit: '1 kg', originalPrice: 38 },
  { id: 'bgt-onion', name: 'Crisp Nashik Red Onions', category: 'pure-veg', price: 34, unit: '1 kg', originalPrice: 45 },
  { id: 'bgt-potato', name: 'Organic Mountain Potatoes', category: 'pure-veg', price: 32, unit: '1 kg', originalPrice: 40 },
  { id: 'bgt-spinach', name: 'Palak / Fresh Baby Spinach', category: 'pure-veg', price: 22, unit: '1 bunch', originalPrice: 30 },
  { id: 'bgt-carrot', name: 'Tender Ooty Carrots', category: 'pure-veg', price: 38, unit: '500 g', originalPrice: 48 },
  { id: 'bgt-apple', name: 'Royal Himachal Crisp Apples', category: 'fruits-nuts', price: 140, unit: '1 kg', originalPrice: 175 },
  { id: 'bgt-banana', name: 'Robusta Golden Bananas', category: 'fruits-nuts', price: 45, unit: '1 kg', originalPrice: 55 },
  { id: 'bgt-orange', name: 'Nagpur Sweet Juicy Oranges', category: 'fruits-nuts', price: 80, unit: '1 kg', originalPrice: 100 },
  { id: 'bgt-papaya', name: 'Ripe Sweet Farm Papaya', category: 'fruits-nuts', price: 42, unit: '1 pc', originalPrice: 55 },
];

export default function BudgetShoppingModal({
  isOpen,
  onClose,
  onAddToCart
}) {
  const [targetBudget, setTargetBudget] = useState(500);
  const [customBudgetInput, setCustomBudgetInput] = useState('');
  const [selectedBasketType, setSelectedBasketType] = useState('all-essentials');
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Compute optimized items that fit comfortably under the target budget
  const budgetBasket = useMemo(() => {
    let pool = [...BUDGET_PRODUCT_POOL];
    
    // Sort pool prioritizing selected basket preference
    pool.sort((a, b) => {
      if (a.category === selectedBasketType && b.category !== selectedBasketType) return -1;
      if (b.category === selectedBasketType && a.category !== selectedBasketType) return 1;
      return a.price - b.price;
    });

    let currentSum = 0;
    const selected = [];

    for (const item of pool) {
      if (currentSum + item.price <= targetBudget) {
        selected.push(item);
        currentSum += item.price;
      }
    }

    return {
      items: selected,
      total: currentSum,
      remaining: targetBudget - currentSum,
      mrpTotal: selected.reduce((sum, i) => sum + i.originalPrice, 0)
    };
  }, [targetBudget, selectedBasketType]);

  if (!isOpen) return null;

  const handleSetPreset = (val) => {
    setTargetBudget(val);
    setCustomBudgetInput('');
  };

  const handleCustomInputChange = (e) => {
    const val = e.target.value;
    setCustomBudgetInput(val);
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed > 50) {
      setTargetBudget(parsed);
    }
  };

  const handleAddAllBudgetItems = () => {
    if (onAddToCart) {
      budgetBasket.items.forEach(item => {
        onAddToCart({
          id: item.id,
          name: item.name,
          unit: item.unit,
          price: item.price,
          originalPrice: item.originalPrice,
          image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80',
          inStock: true
        });
      });
      setAddedSuccess(true);
      setTimeout(() => {
        setAddedSuccess(false);
        onClose();
      }, 1600);
    }
  };

  const savings = Math.max(0, budgetBasket.mrpTotal - budgetBasket.total);

  return (
    <div className="modal-backdrop-fade" onClick={onClose}>
      <div 
        className="budget-modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="budget-modal-header">
          <div className="budget-badge-title">
            <div className="budget-icon-circle">
              <Coins size={22} className="budget-coin-icon" />
            </div>
            <div>
              <div className="budget-heading-row">
                <h3>Smart Budget Shopper</h3>
                <span className="budget-savings-pill">
                  <TrendingDown size={13} /> Saves Money
                </span>
              </div>
              <p>Set your grocery budget and GreenCart creates a complete basket to maximize nutrition and savings!</p>
            </div>
          </div>
          <button 
            type="button" 
            className="budget-close-btn" 
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Budget Setting Controls */}
        <div className="budget-controls-section">
          <div className="budget-presets-row">
            <span className="control-label">Quick Budget:</span>
            {BUDGET_PRESETS.map((preset) => (
              <button
                key={preset.value}
                type="button"
                className={`budget-preset-pill ${targetBudget === preset.value && !customBudgetInput ? 'active' : ''}`}
                onClick={() => handleSetPreset(preset.value)}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="budget-custom-row">
            <div className="budget-input-field">
              <span className="currency-prefix">₹</span>
              <input
                type="number"
                min="100"
                max="5000"
                step="50"
                placeholder="Enter custom budget (e.g. 650)"
                value={customBudgetInput}
                onChange={handleCustomInputChange}
                className="custom-budget-input"
              />
            </div>
            <span className="budget-slider-helper">
              Current Target: <strong>₹{targetBudget}</strong>
            </span>
          </div>

          {/* Basket Preference Tabs */}
          <div className="budget-type-tabs">
            {BASKET_TYPES.map((type) => (
              <button
                key={type.id}
                type="button"
                className={`budget-type-chip ${selectedBasketType === type.id ? 'active' : ''}`}
                onClick={() => setSelectedBasketType(type.id)}
              >
                <span>{type.icon}</span>
                <span>{type.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Calculation Meter Card */}
        <div className="budget-meter-card">
          <div className="meter-col">
            <span className="meter-label">Your Budget</span>
            <span className="meter-val">₹{targetBudget}</span>
          </div>

          <div className="meter-divider" />

          <div className="meter-col">
            <span className="meter-label">Basket Cost</span>
            <span className="meter-val text-green">₹{budgetBasket.total}</span>
          </div>

          <div className="meter-divider" />

          <div className="meter-col">
            <span className="meter-label">Remaining Balance</span>
            <span className="meter-val text-muted">₹{budgetBasket.remaining}</span>
          </div>

          <div className="meter-divider" />

          <div className="meter-col">
            <span className="meter-label">Total Savings</span>
            <span className="meter-val text-orange">₹{savings}</span>
          </div>
        </div>

        {/* Itemized Recommended Basket */}
        <div className="budget-items-container">
          <div className="budget-items-heading">
            <h5>
              <Layers size={16} /> Recommended Grocery Basket ({budgetBasket.items.length} items)
            </h5>
            <span className="budget-under-badge">
              ✓ Under ₹{targetBudget} limit
            </span>
          </div>

          <div className="budget-items-table">
            {budgetBasket.items.map((item, idx) => (
              <div key={item.id} className="budget-item-row">
                <span className="item-index">{idx + 1}.</span>
                <div className="item-name-info">
                  <span className="item-title">{item.name}</span>
                  <span className="item-unit">{item.unit}</span>
                </div>
                <div className="item-price-wrap">
                  <span className="item-strike-price">₹{item.originalPrice}</span>
                  <span className="item-final-price">₹{item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="budget-modal-footer">
          <div className="budget-footer-summary">
            <span>
              Total: <strong>₹{budgetBasket.total}</strong> ({budgetBasket.items.length} items)
            </span>
            <span className="budget-wallet-note">
              (₹{budgetBasket.remaining} left in your ₹{targetBudget} budget)
            </span>
          </div>

          <div className="budget-footer-actions">
            <button
              type="button"
              className="budget-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="button"
              className={`budget-add-cart-btn ${addedSuccess ? 'success' : ''}`}
              onClick={handleAddAllBudgetItems}
              disabled={budgetBasket.items.length === 0}
            >
              {addedSuccess ? (
                <>
                  <CheckCircle2 size={18} />
                  <span>Added {budgetBasket.items.length} Items to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={18} />
                  <span>Add Recommended Basket (₹{budgetBasket.total})</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
