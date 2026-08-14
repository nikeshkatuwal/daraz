import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, User, Coins, Wallet, PackageCheck, LogOut } from 'lucide-react';

export default function AuthModal() {
  const { user, setUser, isAuthOpen, setIsAuthOpen, orderHistory, showToast, setIsOrderTrackingOpen } = useShop();
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  if (!isAuthOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setUser({
      name: fullName || 'Nikesh Katuwal',
      email: email || 'nikesh.katuwal@gmail.com',
      phone: '+977 9841-234567',
      isLoggedIn: true,
      walletBalance: 3200,
      coins: 1450
    });
    showToast(`Welcome back, ${fullName || 'Nikesh'}! 🎉`, 'success');
    setIsAuthOpen(false);
  };

  const handleQuickDemoLogin = () => {
    setUser({
      name: 'Nikesh Katuwal',
      email: 'nikesh.katuwal@gmail.com',
      phone: '+977 9841-234567',
      isLoggedIn: true,
      walletBalance: 3200,
      coins: 1450
    });
    showToast('Logged in as Demo Shopper! ✨', 'success');
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    setUser({
      name: 'Guest Shopper',
      email: '',
      phone: '',
      isLoggedIn: false,
      walletBalance: 0,
      coins: 0
    });
    showToast('You have been signed out.', 'info');
    setIsAuthOpen(false);
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsAuthOpen(false)}>
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-round-btn"
          onClick={() => setIsAuthOpen(false)}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {user.isLoggedIn ? (
          // Logged In Account Dashboard View
          <div className="auth-profile-view">
            <div className="profile-header-banner">
              <div className="profile-avatar">
                <User size={32} />
              </div>
              <div className="profile-details">
                <h3>{user.name}</h3>
                <span className="profile-email">{user.email}</span>
                <span className="profile-badge">👑 VIP Gold Member</span>
              </div>
            </div>

            {/* Wallet & Coins Card */}
            <div className="user-rewards-card">
              <div className="reward-box">
                <Wallet size={20} style={{ color: '#f57224' }} />
                <div>
                  <span className="reward-label">Daraz Wallet</span>
                  <strong className="reward-value">Rs. {user.walletBalance.toLocaleString()}</strong>
                </div>
              </div>
              <div className="reward-divider" />
              <div className="reward-box">
                <Coins size={20} style={{ color: '#f59e0b' }} />
                <div>
                  <span className="reward-label">Daraz Coins</span>
                  <strong className="reward-value">{user.coins.toLocaleString()} Pts</strong>
                </div>
              </div>
            </div>

            {/* Menu List */}
            <div className="profile-menu-group">
              <button
                type="button"
                className="profile-menu-item"
                onClick={() => {
                  setIsAuthOpen(false);
                  setIsOrderTrackingOpen(true);
                }}
              >
                <PackageCheck size={18} style={{ color: '#f57224' }} />
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <strong>My Orders & Tracking</strong>
                  <span>{orderHistory.length} orders on record</span>
                </div>
              </button>

              <button
                type="button"
                className="profile-menu-item logout"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                <span>Sign Out of Account</span>
              </button>
            </div>
          </div>
        ) : (
          // Login / Register Form
          <div className="auth-form-container">
            <div className="auth-tabs">
              <button
                type="button"
                className={`auth-tab-btn ${tab === 'login' ? 'active' : ''}`}
                onClick={() => setTab('login')}
              >
                Sign In
              </button>
              <button
                type="button"
                className={`auth-tab-btn ${tab === 'register' ? 'active' : ''}`}
                onClick={() => setTab('register')}
              >
                Create Account
              </button>
            </div>

            <div className="auth-body">
              <h2>{tab === 'login' ? 'Welcome Back!' : 'Join Daraz Express'}</h2>
              <p>Access member discounts, track live deliveries, and collect daily coins.</p>

              <form onSubmit={handleLoginSubmit}>
                {tab === 'register' && (
                  <div className="form-field">
                    <label>Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sagar Shrestha"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                )}

                <div className="form-field">
                  <label>Email Address or Phone</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter email or mobile number"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label>Password</label>
                  <input
                    type="password"
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn-auth-submit">
                  {tab === 'login' ? 'Sign In to Account' : 'Create Free Account'}
                </button>
              </form>

              <div className="auth-divider">
                <span>OR FAST ACCESS</span>
              </div>

              <button
                type="button"
                className="btn-demo-quick-login"
                onClick={handleQuickDemoLogin}
              >
                ✨ 1-Click Demo Login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
