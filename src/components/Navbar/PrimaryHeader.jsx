import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { ShoppingBag, Heart, User, MapPin, ChevronDown, ShieldCheck } from 'lucide-react';
import SearchBar from './SearchBar';
import CartPreview from './CartPreview';

export default function PrimaryHeader() {
  const {
    currentLocation,
    setIsLocationModalOpen,
    cartItemsCount,
    cartSubtotal,
    wishlist,
    setIsWishlistOpen,
    setIsAuthOpen,
    user
  } = useShop();

  const [isCartPreviewVisible, setIsCartPreviewVisible] = useState(false);

  return (
    <div className="primary-header">
      <div className="primary-header-inner">
        {/* 1. Brand Logo & Tagline */}
        <a href="/" className="brand-logo-container">
          <div className="brand-badge">
            <ShoppingBag size={24} />
          </div>
          <div className="brand-name">
            <span className="title">
              daraz<span>express</span>
            </span>
            <span className="tagline">
              <ShieldCheck size={11} /> 100% Authentic Store
            </span>
          </div>
        </a>

        {/* 2. Deliver To Location Button */}
        <button
          type="button"
          className="location-btn"
          onClick={() => setIsLocationModalOpen(true)}
          title="Change delivery location"
        >
          <MapPin size={16} className="loc-icon" />
          <div className="loc-text">
            <span className="loc-label">Deliver to</span>
            <span className="loc-value">{currentLocation.area}</span>
          </div>
          <ChevronDown size={12} style={{ color: '#94a3b8' }} />
        </button>

        {/* 3. Smart Search Bar Component */}
        <SearchBar />

        {/* 4. Right User Actions (Account, Wishlist, Cart) */}
        <div className="user-actions-group">
          {/* User Account Popover */}
          <div className="account-dropdown-wrapper">
            <button
              type="button"
              className="action-btn"
              onClick={() => setIsAuthOpen(true)}
            >
              <div className="action-icon-box">
                <User size={20} />
              </div>
              <div className="action-label-box">
                <span className="action-subtext">
                  {user.isLoggedIn ? 'Hello,' : 'Welcome'}
                </span>
                <span className="action-maintext">
                  {user.isLoggedIn ? user.name.split(' ')[0] : 'Sign In / Join'}{' '}
                  <ChevronDown size={12} />
                </span>
              </div>
            </button>

            {/* Account Popover Menu */}
            <div className="account-popover">
              <div className="account-header-box">
                <div className="account-welcome-title">
                  {user.isLoggedIn ? `Hello, ${user.name}!` : 'Hello, Shopper!'}
                </div>
                <div className="account-welcome-subtitle">
                  {user.isLoggedIn
                    ? `Wallet: Rs. ${user.walletBalance} • ${user.coins} Coins`
                    : 'Access your orders, vouchers & rewards'}
                </div>
                <div className="auth-btn-group">
                  <button
                    type="button"
                    className="btn-auth-primary"
                    onClick={() => setIsAuthOpen(true)}
                  >
                    {user.isLoggedIn ? 'VIEW PROFILE' : 'SIGN IN'}
                  </button>
                  {!user.isLoggedIn && (
                    <button
                      type="button"
                      className="btn-auth-secondary"
                      onClick={() => setIsAuthOpen(true)}
                    >
                      REGISTER
                    </button>
                  )}
                </div>
              </div>
              <ul className="account-menu-list">
                <li className="account-menu-item" onClick={() => setIsAuthOpen(true)}>
                  📦 My Orders & Tracking
                </li>
                <li className="account-menu-item" onClick={() => setIsWishlistOpen(true)}>
                  ❤️ My Saved Items ({wishlist.length})
                </li>
                <li className="account-menu-item" onClick={() => setIsAuthOpen(true)}>
                  🎟️ My Vouchers & Rewards
                </li>
              </ul>
            </div>
          </div>

          {/* Wishlist Button */}
          <button
            type="button"
            className="action-btn"
            title="View Wishlist"
            onClick={() => setIsWishlistOpen(true)}
          >
            <div className="action-icon-box">
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="badge-count">{wishlist.length}</span>
              )}
            </div>
            <div className="action-label-box">
              <span className="action-subtext">Saved Items</span>
              <span className="action-maintext">Wishlist</span>
            </div>
          </button>

          {/* Cart Button & Interactive Cart Preview */}
          <div
            className="cart-dropdown-wrapper"
            onMouseEnter={() => setIsCartPreviewVisible(true)}
            onMouseLeave={() => setIsCartPreviewVisible(false)}
          >
            <button
              type="button"
              className="action-btn"
              title="View Cart"
              onClick={() => setIsCartPreviewVisible(!isCartPreviewVisible)}
            >
              <div className="action-icon-box">
                <ShoppingBag size={22} style={{ color: '#f57224' }} />
                {cartItemsCount > 0 && (
                  <span className="badge-count">{cartItemsCount}</span>
                )}
              </div>
              <div className="action-label-box">
                <span className="action-subtext">My Cart</span>
                <span className="action-maintext" style={{ color: '#f57224' }}>
                  Rs. {cartSubtotal.toLocaleString()}
                </span>
              </div>
            </button>

            {/* Hover / Click Cart Preview Overlay */}
            <CartPreview />
          </div>
        </div>
      </div>
    </div>
  );
}
