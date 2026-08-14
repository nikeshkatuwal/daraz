import React from 'react';
import { useShop } from '../context/ShopContext';
import { Home, LayoutGrid, Flame, ShoppingBag, User } from 'lucide-react';

export default function MobileBottomNav({ onOpenMobileDrawer }) {
  const {
    cartItemsCount,
    setIsCheckoutOpen,
    setIsAuthOpen,
    setSelectedCategory,
    setSearchQuery
  } = useShop();

  const handleHomeClick = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDealsClick = () => {
    const el = document.getElementById('flash-sale-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="mobile-bottom-nav">
      <button type="button" className="mobile-nav-item" onClick={handleHomeClick}>
        <Home size={20} />
        <span>Home</span>
      </button>

      <button type="button" className="mobile-nav-item" onClick={onOpenMobileDrawer}>
        <LayoutGrid size={20} />
        <span>Categories</span>
      </button>

      <button type="button" className="mobile-nav-item" onClick={handleDealsClick}>
        <Flame size={20} style={{ color: '#f57224' }} />
        <span>Deals</span>
      </button>

      <button
        type="button"
        className="mobile-nav-item cart-btn"
        onClick={() => setIsCheckoutOpen(true)}
      >
        <div className="mobile-cart-icon-wrap">
          <ShoppingBag size={20} />
          {cartItemsCount > 0 && (
            <span className="mobile-nav-badge">{cartItemsCount}</span>
          )}
        </div>
        <span>Cart</span>
      </button>

      <button
        type="button"
        className="mobile-nav-item"
        onClick={() => setIsAuthOpen(true)}
      >
        <User size={20} />
        <span>Account</span>
      </button>
    </div>
  );
}
