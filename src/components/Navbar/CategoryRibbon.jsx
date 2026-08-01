import React, { useState } from 'react';
import { LayoutGrid, ChevronDown, Flame, Gem, Tag, Zap, Gift } from 'lucide-react';
import MegaMenu from './MegaMenu';

export default function CategoryRibbon() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

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
            <ChevronDown size={14} style={{ transform: isMegaMenuOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
          </button>

          {/* MegaMenu Dropdown Component */}
          <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
        </div>

        {/* Quick Category Navigation Pills */}
        <ul className="category-pills-list">
          <li>
            <a href="#flash" className="category-pill-item is-hot">
              <Flame size={14} style={{ color: '#f57224' }} />
              Flash Sale
            </a>
          </li>
          <li>
            <a href="#mall" className="category-pill-item">
              <Gem size={14} style={{ color: '#60a5fa' }} />
              Daraz Mall
            </a>
          </li>
          <li>
            <a href="#deals" className="category-pill-item">
              <Zap size={14} style={{ color: '#f59e0b' }} />
              Everyday Low Price
            </a>
          </li>
          <li>
            <a href="#global" className="category-pill-item">
              <Tag size={14} />
              Global Collection
            </a>
          </li>
          <li>
            <a href="#vouchers" className="category-pill-item">
              <Gift size={14} />
              Digital Vouchers
            </a>
          </li>
        </ul>

        {/* Right Promo Text Banner */}
        <div className="ribbon-promo-text">
          <span>🚚 FREE Delivery on orders over Rs. 999!</span>
        </div>
      </div>
    </div>
  );
}
