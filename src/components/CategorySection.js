import React from 'react';
import { Sparkles, Layers } from 'lucide-react';
import CategoryCard from './CategoryCard';

export default function CategorySection({ 
  categories = [], 
  selectedCategory, 
  onSelectCategory,
  onOpenCategoryPage
}) {
  return (
    <section className="category-section" id="categories">
      <div className="container">
        <div className="section-header-row">
          <div>
            <div className="section-badge">
              <Sparkles size={14} className="section-badge-icon" />
              <span>EXPLORE AISLES</span>
            </div>
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">
              Select a category to filter or explore our dedicated 15-department catalog
            </p>
          </div>

          <div className="cat-section-header-actions">
            {onOpenCategoryPage && (
              <button 
                type="button" 
                className="view-category-page-btn"
                onClick={() => onOpenCategoryPage(null)}
                title="Go to dedicated Category Page"
              >
                <span>View All 15 Categories Page</span>
                <span className="btn-arrow">&rarr;</span>
              </button>
            )}

            <button 
              type="button" 
              className={`all-depts-btn ${!selectedCategory ? 'active' : ''}`}
              onClick={() => onSelectCategory(null)}
            >
              <Layers size={16} />
              <span>All Departments</span>
            </button>
          </div>
        </div>

        <div className="category-grid">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              isSelected={selectedCategory === cat.name}
              onClick={onSelectCategory}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
