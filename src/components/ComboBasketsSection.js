import React, { useState } from 'react';
import { 
  Package, 
  ShoppingBag, 
  CheckCircle2
} from 'lucide-react';

const COMBO_BASKETS = [
  {
    id: 'combo-breakfast',
    title: 'Morning Breakfast Power Pack',
    emoji: '🍳',
    tagline: 'Fresh morning staples for a wholesome start to the day',
    badge: 'Save 22%',
    prepTime: 'Instant Ready',
    mrp: 260,
    price: 199,
    items: [
      { id: 'combo-bf-bread', name: 'Whole Wheat Brown Bread', unit: '400 g', price: 45 },
      { id: 'combo-bf-milk', name: 'Organic Cow Milk', unit: '1 L', price: 65 },
      { id: 'combo-bf-eggs', name: 'Farm Brown Eggs', unit: '6 pcs', price: 54 },
      { id: 'combo-bf-banana', name: 'Robusta Bananas', unit: '1 kg', price: 45 },
      { id: 'combo-bf-butter', name: 'Table Butter', unit: '100 g', price: 56 }
    ]
  },
  {
    id: 'combo-family-veg',
    title: 'Weekly Family Veggie Basket',
    emoji: '🥗',
    tagline: '5 daily cooking essentials directly harvested from local farms',
    badge: 'Bestseller',
    prepTime: 'Farm Fresh 6 AM',
    mrp: 245,
    price: 189,
    items: [
      { id: 'combo-veg-potato', name: 'Organic Mountain Potatoes', unit: '1 kg', price: 32 },
      { id: 'combo-veg-onion', name: 'Nashik Red Onions', unit: '1 kg', price: 35 },
      { id: 'combo-veg-tomato', name: 'Farm Country Tomatoes', unit: '1 kg', price: 30 },
      { id: 'combo-veg-carrot', name: 'Tender Ooty Carrots', unit: '500 g', price: 38 },
      { id: 'combo-veg-spinach', name: 'Palak / Fresh Spinach', unit: '2 bunches', price: 30 }
    ]
  },
  {
    id: 'combo-biryani-fest',
    title: 'Sunday Biryani & Feast Box',
    emoji: '🍲',
    tagline: 'Everything you need for restaurant-grade fragrant biryani',
    badge: 'Chef Choice',
    prepTime: 'Curated Spices',
    mrp: 440,
    price: 349,
    items: [
      { id: 'combo-by-rice', name: 'Daawat Rozana Basmati Rice', unit: '1 kg', price: 120 },
      { id: 'combo-by-ghee', name: 'Pure Cow Desi Ghee', unit: '200 ml', price: 165 },
      { id: 'combo-by-mint', name: 'Mint & Coriander Bundle', unit: '2 bunches', price: 25 },
      { id: 'combo-by-onion', name: 'Crisp Onions for Barista', unit: '1 kg', price: 35 },
      { id: 'combo-by-spice', name: 'Shahi Biryani Spice Pack', unit: '1 pc', price: 45 }
    ]
  },
  {
    id: 'combo-monthly-staples',
    title: 'Monthly Kitchen Grocery Box',
    emoji: '📦',
    tagline: 'Heavy monthly staples delivered right inside your kitchen',
    badge: 'Heavy Savings',
    prepTime: 'Zero Carry Hassle',
    mrp: 980,
    price: 799,
    items: [
      { id: 'combo-st-atta', name: 'Aashirvaad Shudh Chakki Atta', unit: '5 kg', price: 235 },
      { id: 'combo-st-rice', name: 'Premium Sona Masoori Rice', unit: '5 kg', price: 295 },
      { id: 'combo-st-toordal', name: 'Unpolished Toor Dal', unit: '1 kg', price: 155 },
      { id: 'combo-st-oil', name: 'Sunflower Cooking Oil Pouch', unit: '1 L', price: 115 },
      { id: 'combo-st-salt', name: 'Tata Iodized Salt', unit: '1 kg', price: 28 }
    ]
  }
];

export default function ComboBasketsSection({ onAddToCart }) {
  const [addedBasketId, setAddedBasketId] = useState(null);

  const handleAddBasket = (basket) => {
    if (onAddToCart) {
      basket.items.forEach(item => {
        onAddToCart({
          id: item.id,
          name: item.name,
          unit: item.unit,
          price: item.price,
          originalPrice: Math.round(item.price * 1.25),
          image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80',
          inStock: true
        });
      });
      setAddedBasketId(basket.id);
      setTimeout(() => setAddedBasketId(null), 2500);
    }
  };

  return (
    <section className="section-block combo-baskets-section" id="combos">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-centered">
          <div className="section-badge">
            <Package size={15} className="section-badge-icon" />
            <span>VALUE COMBO PACKS</span>
          </div>
          <h2 className="section-title">🧺 Ready-Made Smart Combo Baskets</h2>
          <p className="section-subtitle">
            Curated combinations of everyday essentials bundled together with extra bulk discounts and single-click cart additions.
          </p>
        </div>

        {/* Combos Grid */}
        <div className="combos-grid">
          {COMBO_BASKETS.map((basket) => {
            const isAdded = addedBasketId === basket.id;
            const savings = basket.mrp - basket.price;

            return (
              <div key={basket.id} className="combo-basket-card">
                <div className="combo-card-top">
                  <div className="combo-icon-circle">{basket.emoji}</div>
                  <span className="combo-badge">{basket.badge}</span>
                </div>

                <div className="combo-card-body">
                  <h3 className="combo-title">{basket.title}</h3>
                  <p className="combo-tagline">{basket.tagline}</p>

                  <div className="combo-items-preview">
                    <span className="preview-label">Includes {basket.items.length} items:</span>
                    <div className="preview-chips-wrap">
                      {basket.items.map((item, idx) => (
                        <span key={idx} className="preview-item-chip">
                          {item.name} ({item.unit})
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="combo-pricing-row">
                    <div className="price-block">
                      <span className="combo-final-price">₹{basket.price}</span>
                      <span className="combo-mrp">₹{basket.mrp}</span>
                    </div>
                    <span className="combo-save-pill">Save ₹{savings}</span>
                  </div>

                  <button
                    type="button"
                    className={`combo-add-btn ${isAdded ? 'success' : ''}`}
                    onClick={() => handleAddBasket(basket)}
                  >
                    {isAdded ? (
                      <>
                        <CheckCircle2 size={18} />
                        <span>Added All {basket.items.length} Items!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={18} />
                        <span>Add Entire Basket (₹{basket.price})</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
