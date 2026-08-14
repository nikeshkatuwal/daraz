import React, { useState } from 'react';
import { LayoutGrid, ChevronDown, Flame, Gem, Zap, Gift } from 'lucide-react';
import MegaMenu from './MegaMenu';
import { useShop } from '../../context/ShopContext';

export default function CategoryRibbon() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const {
    setSelectedCategory,
    setFilterMallOnly,
    filterMallOnly,
    setFilterFreeShipping,
    filterFreeShipping
  } = useShop();

  const handleFlashSaleClick = () => {
    setSelectedCategory('all');
    setFilterMallOnly(false);
    const el = document.getElementById('flash-sale-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMallClick = () => {
    setFilterMallOnly(!filterMallOnly);
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDealsClick = () => {
    setFilterFreeShipping(!filterFreeShipping);
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleVouchersClick = () => {
    const el = document.getElementById('vouchers-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="category-ribbon">
      <div className="category-ribbon-inner">
        {/* All Categories Button Trigger */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            className="categories-trigger-btn"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
          >
            <LayoutGrid size={18} />
            <span>ALL CATEGORIES</span>
            <ChevronDown
              size={14}
              style={{
                transform: isMegaMenuOpen ? 'rotate(180deg)' : 'rotate(0)',
                transition: 'transform 0.2s ease'
              }}
            />
          </button>

          {/* MegaMenu Dropdown Component */}
          <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
        </div>

        {/* Quick Category Navigation Pills */}
        <ul className="category-pills-list">
          <li>
            <button
              type="button"
              className="category-pill-item is-hot"
              onClick={handleFlashSaleClick}
            >
              <Flame size={14} style={{ color: '#f57224' }} />
              Flash Sale
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`category-pill-item ${filterMallOnly ? 'active-filter' : ''}`}
              onClick={handleMallClick}
            >
              <Gem size={14} style={{ color: '#60a5fa' }} />
              Daraz Mall {filterMallOnly && '✓'}
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`category-pill-item ${filterFreeShipping ? 'active-filter' : ''}`}
              onClick={handleDealsClick}
            >
              <Zap size={14} style={{ color: '#f59e0b' }} />
              Free Delivery Only {filterFreeShipping && '✓'}
            </button>
          </li>
          <li>
            <button
              type="button"
              className="category-pill-item"
              onClick={handleVouchersClick}
            >
              <Gift size={14} style={{ color: '#ec4899' }} />
              Collect Vouchers
            </button>
          </li>
        </ul>

        {/* Right Promo Text Banner */}
        <div className="ribbon-promo-text">
          <span>🚚 FREE Delivery on orders over Rs. 10,000!</span>
        </div>
      </div>
    </div>
  );
}
