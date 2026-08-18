import React, { useState } from 'react';
import { Menu, X, ShoppingBag, Search, User, MapPin, Heart, Flame, Gift, Truck } from 'lucide-react';
import { categoriesData } from '../../data/mockData';
import { useShop } from '../../context/ShopContext';

export default function MobileNavbar() {
  const {
    setIsLocationModalOpen,
    cartItemsCount,
    setIsCheckoutOpen,
    wishlist,
    setIsWishlistOpen,
    setIsAuthOpen,
    setIsOrderTrackingOpen,
    user,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory
  } = useShop();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    setSearchQuery('');
    setIsDrawerOpen(false);
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="mobile-navbar">
      {/* Mobile Top Row */}
      <div className="mobile-top-row">
        <button
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          className="mobile-icon-btn"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <a href="/" className="mobile-brand-link">
          <div className="mobile-brand-icon">
            <ShoppingBag size={16} />
          </div>
          <span className="mobile-brand-title">
            daraz<span>express</span>
          </span>
        </a>

        <div className="mobile-actions-cluster">
          <button
            type="button"
            onClick={() => setIsLocationModalOpen(true)}
            className="mobile-icon-btn"
            title="Location"
            aria-label="Select location"
          >
            <MapPin size={19} />
          </button>

          <button
            type="button"
            onClick={() => setIsWishlistOpen(true)}
            className="mobile-icon-btn relative"
            title="Wishlist"
            aria-label="Wishlist"
          >
            <Heart size={19} />
            {wishlist.length > 0 && <span className="badge-count">{wishlist.length}</span>}
          </button>

          <button
            type="button"
            onClick={() => setIsCheckoutOpen(true)}
            className="mobile-icon-btn relative"
            title="Cart"
            aria-label="Cart"
          >
            <ShoppingBag size={21} style={{ color: '#f57224' }} />
            {cartItemsCount > 0 && <span className="badge-count">{cartItemsCount}</span>}
          </button>
        </div>
      </div>

      {/* Mobile Search Row */}
      <form onSubmit={handleSearchSubmit} className="mobile-search-row">
        <div className="mobile-search-box">
          <Search size={16} style={{ color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search in Daraz Express..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-mini"
              onClick={() => setSearchQuery('')}
            >
              <X size={14} />
            </button>
          )}
        </div>
      </form>

      {/* Mobile Slide Drawer Overlay */}
      {isDrawerOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setIsDrawerOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-top-banner">
              <div className="drawer-brand-row">
                <span className="drawer-brand-text">
                  daraz<span>express</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="mobile-icon-btn"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* User Profile / Login Box */}
              <div className="drawer-user-card">
                <div className="drawer-user-info">
                  <div className="user-circle">
                    <User size={20} />
                  </div>
                  <div>
                    <strong>{user.isLoggedIn ? user.name : 'Welcome to Daraz!'}</strong>
                    <span>
                      {user.isLoggedIn
                        ? `Wallet: Rs. ${user.walletBalance}`
                        : 'Sign in for member perks'}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-drawer-login"
                  onClick={() => {
                    setIsDrawerOpen(false);
                    setIsAuthOpen(true);
                  }}
                >
                  {user.isLoggedIn ? 'MY PROFILE' : 'SIGN IN / REGISTER'}
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="drawer-nav-section">
              <div className="drawer-section-heading">Quick Actions</div>
              <button
                type="button"
                className="drawer-nav-item"
                onClick={() => {
                  setIsDrawerOpen(false);
                  setIsOrderTrackingOpen(true);
                }}
              >
                <Truck size={18} style={{ color: '#f57224' }} />
                <span>Live Delivery Tracking 🛵</span>
              </button>
              <button
                type="button"
                className="drawer-nav-item"
                onClick={() => {
                  setIsDrawerOpen(false);
                  const el = document.getElementById('flash-sale-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Flame size={18} style={{ color: '#f57224' }} />
                <span>Flash Sale & Deals</span>
              </button>
              <button
                type="button"
                className="drawer-nav-item"
                onClick={() => {
                  setIsDrawerOpen(false);
                  setIsWishlistOpen(true);
                }}
              >
                <Heart size={18} style={{ color: '#ef4444' }} />
                <span>My Wishlist ({wishlist.length})</span>
              </button>
              <button
                type="button"
                className="drawer-nav-item"
                onClick={() => {
                  setIsDrawerOpen(false);
                  const el = document.getElementById('vouchers-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Gift size={18} style={{ color: '#10b981' }} />
                <span>Collect Vouchers</span>
              </button>
            </div>

            {/* Categories List */}
            <div className="drawer-nav-section">
              <div className="drawer-section-heading">Categories</div>
              <ul className="drawer-category-list">
                {categoriesData.map((cat) => {
                  const Icon = cat.icon || ShoppingBag;
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <li key={cat.id}>
                      <button
                        type="button"
                        className={`drawer-cat-btn ${isSelected ? 'active' : ''}`}
                        onClick={() => handleCategoryClick(cat.id)}
                      >
                        <Icon size={16} />
                        <span>{cat.name}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
