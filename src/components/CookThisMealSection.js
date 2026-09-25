import React, { useState } from 'react';
import { Clock, Users, Check, ShoppingBag, Sparkles, ChefHat } from 'lucide-react';
import { COOK_THIS_MEAL_RECIPES } from '../data/productsData';

export default function CookThisMealSection({ onAddRecipeToCart, cartItems = {} }) {
  const [selectedRecipeId, setSelectedRecipeId] = useState(COOK_THIS_MEAL_RECIPES[0].id);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const activeRecipe = COOK_THIS_MEAL_RECIPES.find((r) => r.id === selectedRecipeId) || COOK_THIS_MEAL_RECIPES[0];

  const totalMealCost = activeRecipe.ingredients.reduce((sum, item) => sum + item.price, 0);

  const handleAddAll = () => {
    if (onAddRecipeToCart) {
      activeRecipe.ingredients.forEach((item) => {
        onAddRecipeToCart({
          id: item.id,
          name: item.name,
          unit: item.unit,
          price: item.price,
          image: item.image,
          inStock: true
        });
      });
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 3000);
    }
  };

  return (
    <section className="section-block cook-meal-section" id="recipes">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-centered">
          <div className="section-badge">
            <ChefHat size={15} className="section-badge-icon" />
            <span>INSTAMART SIGNATURE FEATURE</span>
          </div>
          <h2 className="section-title">🍛 What are you cooking today?</h2>
          <p className="section-subtitle">
            Pick your favourite recipe below and get all fresh farm ingredients delivered together in 30 minutes!
          </p>
        </div>

        {/* Recipe Selection Tabs */}
        <div className="meal-tabs-scroller">
          {COOK_THIS_MEAL_RECIPES.map((recipe) => {
            const isSelected = selectedRecipeId === recipe.id;
            return (
              <button
                key={recipe.id}
                type="button"
                className={`meal-recipe-tab ${isSelected ? 'active' : ''}`}
                onClick={() => {
                  setSelectedRecipeId(recipe.id);
                  setAddedSuccess(false);
                }}
              >
                <span className="meal-tab-emoji">{recipe.emoji}</span>
                <span className="meal-tab-name">{recipe.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Recipe Meal Kit Showcase */}
        <div className="meal-kit-card">
          <div className="meal-kit-header">
            <div className="meal-kit-info">
              <span className="meal-badge">{activeRecipe.badge}</span>
              <h3 className="meal-title">{activeRecipe.name}</h3>
              <p className="meal-tagline">{activeRecipe.tagline}</p>
              
              <div className="meal-meta-row">
                <span className="meal-meta-chip">
                  <Clock size={14} />
                  {activeRecipe.time}
                </span>
                <span className="meal-meta-chip">
                  <Users size={14} />
                  {activeRecipe.servings}
                </span>
                <span className="meal-meta-chip highlight">
                  <Sparkles size={14} />
                  {activeRecipe.ingredients.length} Fresh Ingredients
                </span>
              </div>
            </div>

            <div className="meal-kit-cta-box">
              <div className="meal-total-price-col">
                <span className="total-label">Complete Meal Kit:</span>
                <span className="total-amount">₹{totalMealCost}</span>
              </div>

              <button
                type="button"
                className={`meal-add-all-btn ${addedSuccess ? 'success' : ''}`}
                onClick={handleAddAll}
              >
                {addedSuccess ? (
                  <>
                    <Check size={18} />
                    <span>Added to Basket!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <span>Add All {activeRecipe.ingredients.length} Ingredients</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Ingredients Grid */}
          <div className="meal-ingredients-box">
            <h4 className="ingredients-heading">
              Ingredients Included ({activeRecipe.ingredients.length} items):
            </h4>
            <div className="ingredients-grid">
              {activeRecipe.ingredients.map((ing, idx) => (
                <div key={idx} className="ingredient-item-card">
                  <div className="ing-thumb-wrap">
                    <img
                      src={ing.image}
                      alt={ing.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80';
                      }}
                    />
                  </div>
                  <div className="ing-details">
                    <span className="ing-name">{ing.name}</span>
                    <span className="ing-unit">{ing.unit}</span>
                    <span className="ing-price">₹{ing.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
