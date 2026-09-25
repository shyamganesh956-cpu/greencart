import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  X, 
  Check, 
  ShoppingBag, 
  ArrowRight, 
  DollarSign, 
  Search, 
  CheckCircle2, 
  ChefHat 
} from 'lucide-react';

// Preset intelligent knowledge base for recipes, ingredients, and basket ideas
const SMART_RECIPE_KNOWLEDGE = [
  {
    keywords: ['dosa', 'dosai', 'idli', 'south indian breakfast'],
    title: 'Crispy Golden Dosa & Chutney Kit',
    category: 'Breakfast Recipe',
    time: '20 mins',
    servings: '4 servings',
    icon: '🥞',
    description: 'Fresh fermented batter essentials and south indian chutney ingredients.',
    ingredients: [
      { id: 'smart-dosa-rice', name: 'Premium Sona Masoori Rice', unit: '1 kg', price: 62, inCart: true },
      { id: 'smart-dosa-urad', name: 'Organic Urad Dal (White Whole)', unit: '500 g', price: 78, inCart: true },
      { id: 'smart-dosa-fenugreek', name: 'Fenugreek / Methi Seeds', unit: '100 g', price: 18, inCart: true },
      { id: 'smart-dosa-oil', name: 'Cold Pressed Sesame / Gingelly Oil', unit: '500 ml', price: 145, inCart: true },
      { id: 'smart-dosa-coconut', name: 'Fresh Grated Coconut', unit: '1 pc', price: 35, inCart: true },
      { id: 'smart-dosa-chilli', name: 'Spicy Green Chillies', unit: '100 g', price: 15, inCart: true }
    ]
  },
  {
    keywords: ['biryani', 'chicken biryani', 'briyani'],
    title: 'Royal Dum Biryani Ingredients',
    category: 'Dinner Feast',
    time: '45 mins',
    servings: '4-5 people',
    icon: '🍗',
    description: 'Aromatic long-grain basmati, fresh farm chicken cuts & whole spices.',
    ingredients: [
      { id: 'smart-biryani-rice', name: 'Daawat Rozana Basmati Rice', unit: '1 kg', price: 120, inCart: true },
      { id: 'smart-biryani-chicken', name: 'Fresh Farm Tender Chicken Curry Cut', unit: '1 kg', price: 220, inCart: true },
      { id: 'smart-biryani-onion', name: 'Crisp Red Hybrid Onions', unit: '1 kg', price: 35, inCart: true },
      { id: 'smart-biryani-tomato', name: 'Vine Fresh Country Tomatoes', unit: '500 g', price: 20, inCart: true },
      { id: 'smart-biryani-mint', name: 'Aromatic Mint & Coriander Bunch', unit: '2 bunches', price: 25, inCart: true },
      { id: 'smart-biryani-ghee', name: 'Pure Desi Cow Ghee', unit: '200 ml', price: 165, inCart: true },
      { id: 'smart-biryani-masala', name: 'Shahi Biryani Whole Spices Pack', unit: '50 g', price: 45, inCart: true }
    ]
  },
  {
    keywords: ['healthy breakfast', 'under 200', 'under 300', 'morning'],
    title: 'High-Protein Healthy Breakfast Kit',
    category: 'Healthy Diet',
    time: '10 mins',
    servings: '2 people',
    icon: '🥑',
    description: 'Energizing fiber-rich breakfast packed with vitamins and protein.',
    ingredients: [
      { id: 'smart-health-bread', name: '100% Whole Wheat Brown Bread', unit: '400 g', price: 45, inCart: true },
      { id: 'smart-health-eggs', name: 'Farm Fresh Brown Eggs (Pack of 6)', unit: '6 pcs', price: 54, inCart: true },
      { id: 'smart-health-banana', name: 'Robusta Golden Bananas', unit: '1 kg (6-7 pcs)', price: 48, inCart: true },
      { id: 'smart-health-milk', name: 'Pure Organic Cow Milk', unit: '1 L', price: 65, inCart: true }
    ]
  },
  {
    keywords: ['paneer', 'paneer butter masala', 'veg curry'],
    title: 'Rich Paneer Butter Masala Kit',
    category: 'Vegetarian Classic',
    time: '25 mins',
    servings: '3-4 people',
    icon: '🧀',
    description: 'Soft malai paneer, fresh cream, ripe tomatoes, and rich butter gravy ingredients.',
    ingredients: [
      { id: 'smart-paneer-block', name: 'Fresh Malai Paneer Block', unit: '200 g', price: 95, inCart: true },
      { id: 'smart-paneer-butter', name: 'Amul Salted Table Butter', unit: '100 g', price: 56, inCart: true },
      { id: 'smart-paneer-tomato', name: 'Ripe Red Plum Tomatoes', unit: '500 g', price: 22, inCart: true },
      { id: 'smart-paneer-cream', name: 'Fresh Cooking Cream', unit: '200 ml', price: 65, inCart: true },
      { id: 'smart-paneer-cashew', name: 'Whole Cashew Nuts', unit: '100 g', price: 85, inCart: true },
      { id: 'smart-paneer-kasuri', name: 'Kasuri Methi (Dried Fenugreek)', unit: '50 g', price: 28, inCart: true }
    ]
  },
  {
    keywords: ['pasta', 'italian', 'quick dinner'],
    title: 'Cheesy White Sauce Veggie Pasta Kit',
    category: 'Quick Dinner',
    time: '20 mins',
    servings: '2-3 people',
    icon: '🍝',
    description: 'Durum wheat penne, fresh sweetcorn, broccoli, and cheese sauce essentials.',
    ingredients: [
      { id: 'smart-pasta-penne', name: 'Durum Wheat Penne Pasta', unit: '500 g', price: 75, inCart: true },
      { id: 'smart-pasta-broccoli', name: 'Fresh Green Broccoli Floret', unit: '250 g', price: 45, inCart: true },
      { id: 'smart-pasta-corn', name: 'Sweet American Corn Kernels', unit: '250 g', price: 35, inCart: true },
      { id: 'smart-pasta-cheese', name: 'Mozzarella & Cheddar Cheese Blend', unit: '200 g', price: 120, inCart: true },
      { id: 'smart-pasta-herb', name: 'Oregano & Chilli Flakes Shaker', unit: '70 g', price: 55, inCart: true }
    ]
  },
  {
    keywords: ['salad', 'detox', 'diet', 'weight loss'],
    title: 'Fresh Farm Detox Salad & Juice Kit',
    category: 'Fitness & Clean Eating',
    time: '5 mins',
    servings: '2 servings',
    icon: '🥗',
    description: 'Hydrating crisp English cucumber, carrots, spinach, and fresh lemon for weight loss & digestion.',
    ingredients: [
      { id: 'smart-detox-cuke', name: 'Crisp English Seedless Cucumbers', unit: '500 g', price: 28, inCart: true },
      { id: 'smart-detox-carrot', name: 'Tender Ooty Carrots', unit: '500 g', price: 38, inCart: true },
      { id: 'smart-detox-spinach', name: 'Farm Fresh Organic Baby Spinach', unit: '250 g', price: 26, inCart: true },
      { id: 'smart-detox-lemon', name: 'Juicy Yellow Lemons (Pack of 4)', unit: '4 pcs', price: 24, inCart: true },
      { id: 'smart-detox-chia', name: 'Raw Organic Chia Seeds', unit: '150 g', price: 79, inCart: true }
    ]
  }
];

export default function SmartAssistantModal({
  isOpen,
  onClose,
  onAddToCart,
  onOpenBudgetModal
}) {
  const [query, setQuery] = useState('');
  const [activePlan, setActivePlan] = useState(SMART_RECIPE_KNOWLEDGE[0]);
  const [selectedItems, setSelectedItems] = useState(
    SMART_RECIPE_KNOWLEDGE[0].ingredients.reduce((acc, curr) => ({ ...acc, [curr.id]: true }), {})
  );
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSelectRecipe = (recipe) => {
    setActivePlan(recipe);
    setSelectedItems(
      recipe.ingredients.reduce((acc, curr) => ({ ...acc, [curr.id]: true }), {})
    );
    setAddedSuccess(false);
  };

  const handleSearch = (text) => {
    setQuery(text);
    const q = text.toLowerCase().trim();
    if (!q) return;

    // Search through knowledge base keywords
    const match = SMART_RECIPE_KNOWLEDGE.find(item => 
      item.keywords.some(k => q.includes(k) || k.includes(q)) ||
      item.title.toLowerCase().includes(q)
    );

    if (match) {
      handleSelectRecipe(match);
    }
  };

  const toggleItemCheckbox = (id) => {
    setSelectedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const activeIngredientsList = activePlan.ingredients.filter(item => selectedItems[item.id]);
  const estimatedCost = activeIngredientsList.reduce((sum, item) => sum + item.price, 0);

  const handleAddAllToCart = () => {
    if (onAddToCart) {
      activeIngredientsList.forEach(item => {
        onAddToCart({
          id: item.id,
          name: item.name,
          unit: item.unit,
          price: item.price,
          originalPrice: Math.round(item.price * 1.2),
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

  return (
    <div className="modal-backdrop-fade" onClick={onClose}>
      <div 
        className="smart-assistant-modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="assistant-modal-header">
          <div className="assistant-badge-title">
            <div className="assistant-avatar-pill">
              <Bot size={22} className="assistant-bot-icon" />
              <span className="assistant-status-dot" />
            </div>
            <div>
              <div className="assistant-tagline-row">
                <h3>GreenCart Smart Assistant</h3>
                <span className="smart-ai-chip">
                  <Sparkles size={12} /> AI Powered
                </span>
              </div>
              <p>Tell me what you want to cook or your dietary goal, and I'll assemble the exact ingredients!</p>
            </div>
          </div>
          <button 
            type="button" 
            className="assistant-close-btn" 
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search / Input Box */}
        <div className="assistant-search-container">
          <div className="assistant-input-wrap">
            <Search size={18} className="assistant-search-icon" />
            <input 
              type="text"
              placeholder="e.g. 'I want to make dosa', 'Biryani kit', 'Healthy breakfast'..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="assistant-text-input"
            />
            {query && (
              <button 
                type="button" 
                className="clear-query-btn"
                onClick={() => setQuery('')}
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Quick Prompt Pills */}
          <div className="assistant-quick-prompts">
            <span className="prompt-label">Quick Prompts:</span>
            {SMART_RECIPE_KNOWLEDGE.map((r, idx) => (
              <button
                key={idx}
                type="button"
                className={`prompt-chip ${activePlan.title === r.title ? 'active' : ''}`}
                onClick={() => handleSelectRecipe(r)}
              >
                <span>{r.icon}</span>
                <span>{r.keywords[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Assistant Recommendation Body */}
        <div className="assistant-result-body">
          <div className="recipe-hero-card">
            <div className="recipe-hero-left">
              <div className="recipe-icon-big">{activePlan.icon}</div>
              <div>
                <span className="recipe-category-pill">{activePlan.category}</span>
                <h4 className="recipe-name-title">{activePlan.title}</h4>
                <p className="recipe-desc-text">{activePlan.description}</p>
                <div className="recipe-quick-meta">
                  <span>⏱️ {activePlan.time}</span>
                  <span>👥 {activePlan.servings}</span>
                  <span>🥬 {activePlan.ingredients.length} items suggested</span>
                </div>
              </div>
            </div>

            <div className="recipe-hero-cost-box">
              <span className="cost-label">Estimated Total:</span>
              <span className="cost-amount">₹{estimatedCost}</span>
              <span className="cost-savings-tag">Includes 15% Fresh Savings</span>
            </div>
          </div>

          {/* Ingredients Checklist */}
          <div className="ingredients-checklist-wrap">
            <div className="checklist-heading-row">
              <h5>
                <ChefHat size={16} /> Recipe Ingredients Checklist
              </h5>
              <span className="checklist-hint">
                Uncheck any items you already have in your kitchen!
              </span>
            </div>

            <div className="ingredients-grid-list">
              {activePlan.ingredients.map((item) => {
                const isChecked = !!selectedItems[item.id];
                return (
                  <div 
                    key={item.id}
                    className={`ingredient-select-card ${isChecked ? 'selected' : 'unselected'}`}
                    onClick={() => toggleItemCheckbox(item.id)}
                  >
                    <div className="ingredient-checkbox">
                      {isChecked && <Check size={14} color="#ffffff" strokeWidth={3} />}
                    </div>
                    <div className="ingredient-details-col">
                      <span className="ingredient-title">{item.name}</span>
                      <span className="ingredient-unit-price">
                        {item.unit} • ₹{item.price}
                      </span>
                    </div>
                    <span className={`ingredient-status-tag ${isChecked ? 'adding' : 'have-it'}`}>
                      {isChecked ? '+ To Cart' : 'Have at home'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="assistant-modal-footer">
          <div className="assistant-footer-left">
            <button
              type="button"
              className="assistant-budget-link-btn"
              onClick={() => {
                onClose();
                if (onOpenBudgetModal) onOpenBudgetModal();
              }}
            >
              <DollarSign size={16} />
              <span>Need a custom budget basket instead? (Under ₹500)</span>
            </button>
          </div>

          <div className="assistant-footer-right">
            <button
              type="button"
              className="assistant-cancel-btn"
              onClick={onClose}
            >
              Close
            </button>

            <button
              type="button"
              className={`assistant-add-cart-btn ${addedSuccess ? 'success' : ''}`}
              onClick={handleAddAllToCart}
              disabled={activeIngredientsList.length === 0}
            >
              {addedSuccess ? (
                <>
                  <CheckCircle2 size={18} />
                  <span>Added {activeIngredientsList.length} Items to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={18} />
                  <span>
                    Add {activeIngredientsList.length} Selected to Cart (₹{estimatedCost})
                  </span>
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
