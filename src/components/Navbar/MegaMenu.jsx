import React, { useState } from 'react';
import { categoriesData } from '../../data/mockData';
import { useShop } from '../../context/ShopContext';
import { ChevronRight, Sparkles, ShoppingBag } from 'lucide-react';

export default function MegaMenu({ isOpen, onClose }) {
  const [activeCategoryId, setActiveCategoryId] = useState('electronics');
  const { setSelectedCategory, setSearchQuery } = useShop();

  if (!isOpen) return null;

  const validCategories = categoriesData.filter((c) => c.id !== 'all');
  const currentCategory =
    validCategories.find((cat) => cat.id === activeCategoryId) || validCategories[0];

  const handleSubItemClick = (itemText) => {
    setSearchQuery(itemText);
    setSelectedCategory('all');
    onClose();
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    setSearchQuery('');
    onClose();
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="mega-menu-overlay" onMouseLeave={onClose}>
      {/* Category Sidebar */}
      <div className="mega-menu-sidebar">
        {validCategories.map((cat) => {
          const isActive = cat.id === activeCategoryId;
          const Icon = cat.icon || ShoppingBag;
          return (
            <div
              key={cat.id}
              className={`sidebar-category-item ${isActive ? 'active' : ''}`}
              onMouseEnter={() => setActiveCategoryId(cat.id)}
              onClick={() => handleCategorySelect(cat.id)}
            >
              <div className="sidebar-item-left">
                <Icon size={16} style={{ color: isActive ? '#f57224' : '#64748b' }} />
                <span>{cat.name}</span>
                {cat.badge && (
                  <span className="sidebar-cat-badge">
                    {cat.badge}
                  </span>
                )}
              </div>
              <ChevronRight size={14} style={{ opacity: 0.6 }} />
            </div>
          );
        })}
      </div>

      {/* Category Subcontent Grid */}
      <div className="mega-menu-content">
        {currentCategory.subcategories && currentCategory.subcategories.length > 0 ? (
          currentCategory.subcategories.map((subGroup, idx) => (
            <div key={idx} className="subcat-column">
              <div className="subcat-group-title">{subGroup.title}</div>
              <ul className="subcat-item-list">
                {subGroup.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <button
                      type="button"
                      className="subcat-item-link"
                      onClick={() => handleSubItemClick(item)}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <div style={{ color: '#94a3b8', fontSize: '0.84rem' }}>
            Explore high quality items in {currentCategory.name}
          </div>
        )}

        {/* Featured Category Card */}
        <div className="mega-menu-promo-box">
          <div>
            <div className="promo-badge-mini">
              <Sparkles size={12} /> SPECIAL PROMO
            </div>
            <h4>{currentCategory.name} Fest</h4>
            <p>Up to 50% OFF with official verified seller vouchers.</p>
          </div>
          <button
            type="button"
            className="btn-mega-promo"
            onClick={() => handleCategorySelect(currentCategory.id)}
          >
            Explore All Deals
          </button>
        </div>
      </div>
    </div>
  );
}
