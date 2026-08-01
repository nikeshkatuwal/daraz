import React, { useState } from 'react';
import { ShoppingBag, Heart, User, MapPin, ChevronDown, CheckCircle2, ShieldCheck } from 'lucide-react';
import SearchBar from './SearchBar';
import CartPreview from './CartPreview';

export default function PrimaryHeader({
  currentLocation,
  onOpenLocationModal,
  cartItems,
  wishlistCount,
  onUpdateQuantity,
  onRemoveItem
}) {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
          onClick={onOpenLocationModal}
          title="Change location"
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
            <button type="button" className="action-btn">
              <div className="action-icon-box">
                <User size={20} />
              </div>
              <div className="action-label-box">
                <span className="action-subtext">Welcome</span>
                <span className="action-maintext">
                  Sign In / Join <ChevronDown size={12} />
                </span>
              </div>
            </button>

            {/* Account Popover Menu */}
            <div className="account-popover">
              <div className="account-header-box">
                <div className="account-welcome-title">Hello, Shopper!</div>
                <div className="account-welcome-subtitle">Access your orders & rewards</div>
                <div className="auth-btn-group">
                  <button type="button" className="btn-auth-primary">
                    SIGN IN
                  </button>
                  <button type="button" className="btn-auth-secondary">
                    REGISTER
                  </button>
                </div>
              </div>
              <ul className="account-menu-list">
                <li className="account-menu-item">📦 My Orders & Tracking</li>
                <li className="account-menu-item">❤️ My Wishlist & Saved</li>
                <li className="account-menu-item">🎟️ My Vouchers & Coins</li>
                <li className="account-menu-item">⚙️ Account Settings</li>
              </ul>
            </div>
          </div>

          {/* Wishlist Button */}
          <a href="#wishlist" className="action-btn" title="View Wishlist">
            <div className="action-icon-box">
              <Heart size={20} />
              {wishlistCount > 0 && <span className="badge-count">{wishlistCount}</span>}
            </div>
            <div className="action-label-box">
              <span className="action-subtext">Saved Items</span>
              <span className="action-maintext">Wishlist</span>
            </div>
          </a>

          {/* Cart Button & Interactive Cart Preview */}
          <div className="cart-dropdown-wrapper">
            <button type="button" className="action-btn" title="View Cart">
              <div className="action-icon-box">
                <ShoppingBag size={22} style={{ color: '#f57224' }} />
                {totalCartCount > 0 && <span className="badge-count">{totalCartCount}</span>}
              </div>
              <div className="action-label-box">
                <span className="action-subtext">My Cart</span>
                <span className="action-maintext" style={{ color: '#f57224' }}>
                  Rs. {totalCartPrice.toLocaleString()}
                </span>
              </div>
            </button>

            {/* Hover / Click Cart Preview Overlay */}
            <CartPreview
              cartItems={cartItems}
              onUpdateQuantity={onUpdateQuantity}
              onRemoveItem={onRemoveItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
