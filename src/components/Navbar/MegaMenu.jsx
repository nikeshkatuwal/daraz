import React, { useState } from 'react';
import { categoriesData } from '../../data/mockData';
import { ChevronRight, Sparkles } from 'lucide-react';

export default function MegaMenu({ isOpen, onClose }) {
  const [activeCategoryId, setActiveCategoryId] = useState(categoriesData[0].id);

  if (!isOpen) return null;

  const currentCategory =
    categoriesData.find((cat) => cat.id === activeCategoryId) || categoriesData[0];

  return (
    <div className="mega-menu-overlay" onMouseLeave={onClose}>
      {/* Category Sidebar */}
      <div className="mega-menu-sidebar">
        {categoriesData.map((cat) => {
          const isActive = cat.id === activeCategoryId;
          return (
            <div
              key={cat.id}
              className={`sidebar-category-item ${isActive ? 'active' : ''}`}
              onMouseEnter={() => setActiveCategoryId(cat.id)}
            >
              <div className="sidebar-item-left">
                <span>{cat.name}</span>
                {cat.badge && (
                  <span
                    style={{
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      background: '#ffedd5',
                      color: '#f57224',
                      padding: '2px 6px',
                      borderRadius: 4
                    }}
                  >
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
        {currentCategory.subcategories ? (
          currentCategory.subcategories.map((subGroup, idx) => (
            <div key={idx} className="subcat-column">
              <div className="subcat-group-title">{subGroup.title}</div>
              <ul className="subcat-item-list">
                {subGroup.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <span className="subcat-item-link">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <div style={{ color: '#94a3b8', fontSize: '0.84rem' }}>
            Explore products in {currentCategory.name}
          </div>
        )}

        {/* Featured Category Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, #fff2eb 0%, #ffe4d6 100%)',
            padding: 16,
            borderRadius: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '1px solid #ffd0b8'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#f57224', fontSize: '0.72rem', fontWeight: 800 }}>
              <Sparkles size={12} /> SPECIAL DEAL
            </div>
            <h4 style={{ margin: '8px 0 4px 0', fontSize: '0.94rem', color: '#1e293b' }}>
              {currentCategory.name} Mega Sale
            </h4>
            <p style={{ margin: 0, fontSize: '0.74rem', color: '#475569' }}>
              Up to 60% OFF with official store vouchers.
            </p>
          </div>
          <button
            type="button"
            style={{
              background: '#f57224',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              borderRadius: 6,
              fontSize: '0.76rem',
              fontWeight: 700,
              cursor: 'pointer',
              marginTop: 12
            }}
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}
