import React from 'react';

export default function CategoryCard({ category, isSelected, onClick }) {
  return (
    <button
      type="button"
      className={`category-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onClick(category.name)}
      title={`Browse ${category.name}`}
    >
      <div className="category-img-container">
        <img
          src={category.image}
          alt={category.name}
          className="category-img"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80';
          }}
        />
      </div>
      <span className="category-name">{category.name}</span>
      <span className="category-count">{category.count}</span>
    </button>
  );
}
