import React, { useState, useEffect } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer';
import HeroCarousel from './components/HeroCarousel';
import VoucherBanner from './components/VoucherBanner';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import WishlistModal from './components/WishlistModal';
import CheckoutModal from './components/CheckoutModal';
import AuthModal from './components/AuthModal';
import OrderTrackingModal from './components/OrderTrackingModal';
import FloatingDeliveryTracker from './components/DeliveryMap/FloatingDeliveryTracker';
import ToastNotification from './components/ToastNotification';
import MobileBottomNav from './components/MobileBottomNav';
import { categoriesData, partnerBrands, customerReviews } from './data/mockData';
import {
  Flame,
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  Clock,
  Star,
  ShoppingBag,
  ArrowUpDown,
  X,
  Sparkles,
  Award,
  CheckCircle2
} from 'lucide-react';
import './App.css';

function StoreMain() {
  const {
    filteredProducts,
    allProducts,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    filterMallOnly,
    setFilterMallOnly,
    filterFreeShipping,
    setFilterFreeShipping
  } = useShop();

  // Flash Sale Live Countdown Timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 42,
    seconds: 18
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 6, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashSaleProducts = allProducts.filter((p) => p.isFlashSale).slice(0, 4);

  const formatDigits = (num) => String(num).padStart(2, '0');

  const activeCategoryObj = categoriesData.find((c) => c.id === selectedCategory) || {
    name: 'All Categories'
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setFilterMallOnly(false);
    setFilterFreeShipping(false);
    setSortBy('popular');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    searchQuery.trim() !== '' ||
    filterMallOnly ||
    filterFreeShipping ||
    sortBy !== 'popular';

  return (
    <main className="store-container">
      {/* 1. Trust & Value Proposition Bar */}
      <section className="trust-bar">
        <div className="trust-item">
          <div className="trust-icon-box">
            <ShieldCheck size={20} className="trust-icon" />
          </div>
          <div>
            <strong>100% Genuine Products</strong>
            <span>Direct from verified brand stores</span>
          </div>
        </div>
        <div className="trust-item">
          <div className="trust-icon-box">
            <Truck size={20} className="trust-icon" />
          </div>
          <div>
            <strong>Fast Express Delivery</strong>
            <span>Coverage in 60+ cities across Nepal</span>
          </div>
        </div>
        <div className="trust-item">
          <div className="trust-icon-box">
            <RotateCcw size={20} className="trust-icon" />
          </div>
          <div>
            <strong>7 Days Easy Returns</strong>
            <span>Hassle-free 100% refund policy</span>
          </div>
        </div>
        <div className="trust-item">
          <div className="trust-icon-box">
            <Zap size={20} className="trust-icon" />
          </div>
          <div>
            <strong>Safe Digital Payments</strong>
            <span>eSewa, Khalti, Cards & Cash on Delivery</span>
          </div>
        </div>
      </section>

      {/* 2. Dynamic Hero Carousel */}
      <HeroCarousel />

      {/* 3. Interactive Voucher Hub */}
      <div id="vouchers-section">
        <VoucherBanner />
      </div>

      {/* 4. Live Flash Sale Section */}
      <section id="flash-sale-section" className="flash-sale-section">
        <div className="flash-sale-header">
          <div className="flash-title">
            <div className="flame-icon-box">
              <Flame size={22} style={{ color: '#ffffff' }} />
            </div>
            <div>
              <h2>Flash Sale</h2>
              <span className="flash-sublabel">Limited stock lightning discounts</span>
            </div>

            {/* Countdown Box */}
            <div className="timer-box">
              <Clock size={15} />
              <span>Ends in</span>
              <div className="countdown-badges">
                <span className="digit-box">{formatDigits(timeLeft.hours)}</span>
                <span className="colon">:</span>
                <span className="digit-box">{formatDigits(timeLeft.minutes)}</span>
                <span className="colon">:</span>
                <span className="digit-box">{formatDigits(timeLeft.seconds)}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn-view-all"
            onClick={() => {
              setSelectedCategory('all');
              const el = document.getElementById('catalog-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            VIEW ALL DEALS &gt;
          </button>
        </div>

        {/* Flash Sale Product Cards Grid */}
        <div className="products-grid flash-products-grid">
          {flashSaleProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 5. Popular Categories Visual Navigator */}
      <section className="featured-categories-section">
        <div className="section-heading-row">
          <div>
            <span className="section-label">Browse By Department</span>
            <h2>Explore Top Categories</h2>
          </div>
        </div>

        <div className="category-card-grid">
          {categoriesData.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                className={`category-card-btn ${isSelected ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedCategory(category.id);
                  const el = document.getElementById('catalog-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <div className="category-card-icon">
                  <Icon size={22} />
                </div>
                <div className="category-card-text">
                  <h3>{category.name}</h3>
                  {category.badge && (
                    <span className="category-badge">{category.badge}</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 6. Main Catalog & Interactive Filtering Section */}
      <section id="catalog-section" className="catalog-section">
        {/* Catalog Filter Controls Header */}
        <div className="catalog-header-bar">
          <div className="catalog-title-group">
            <h2>
              {searchQuery ? `Search Results for "${searchQuery}"` : activeCategoryObj.name}
            </h2>
            <span className="results-count">
              Showing <strong>{filteredProducts.length}</strong> items
            </span>
          </div>

          {/* Controls Cluster (Sort, Filters, Reset) */}
          <div className="catalog-controls-cluster">
            {/* Mall Filter Toggle */}
            <button
              type="button"
              className={`filter-toggle-btn ${filterMallOnly ? 'active' : ''}`}
              onClick={() => setFilterMallOnly(!filterMallOnly)}
            >
              <ShieldCheck size={14} /> Daraz Mall Only
            </button>

            {/* Free Shipping Filter Toggle */}
            <button
              type="button"
              className={`filter-toggle-btn ${filterFreeShipping ? 'active' : ''}`}
              onClick={() => setFilterFreeShipping(!filterFreeShipping)}
            >
              <Truck size={14} /> Free Delivery
            </button>

            {/* Sort Dropdown */}
            <div className="sort-dropdown-wrap">
              <ArrowUpDown size={14} style={{ color: '#64748b' }} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Customer Rating</option>
                <option value="discount">Biggest Discount</option>
              </select>
            </div>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <button
                type="button"
                className="btn-clear-filters"
                onClick={handleResetFilters}
                title="Reset all active filters"
              >
                <X size={14} /> Reset
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="products-grid main-catalog-grid">
            {filteredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        ) : (
          <div className="catalog-empty-state">
            <ShoppingBag size={48} style={{ color: '#94a3b8', opacity: 0.5 }} />
            <h3>No products match your current filters</h3>
            <p>Try clearing your search query or selecting a different category.</p>
            <button
              type="button"
              className="btn-reset-large"
              onClick={handleResetFilters}
            >
              Reset Filters & Show All
            </button>
          </div>
        )}
      </section>

      {/* 7. Official Brand Partners Showcase */}
      <section className="brand-strip-section">
        <div className="section-heading-row">
          <div>
            <span className="section-label">Official Flagship Stores</span>
            <h2>Trusted Partner Brands</h2>
          </div>
          <div className="mall-guarantee-pill">
            <Award size={15} /> 100% Authentic Guarantee
          </div>
        </div>
        <div className="brand-strip">
          {partnerBrands.map((brand, index) => (
            <div
              key={`${brand}-${index}`}
              className="brand-pill"
              onClick={() => {
                setSearchQuery(brand);
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <ShieldCheck size={14} style={{ color: '#f57224' }} />
              <span>{brand}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Customer Reviews & Ratings */}
      <section className="reviews-section">
        <div className="section-heading-row">
          <div>
            <span className="section-label">Real Experiences</span>
            <h2>What Shoppers Across Nepal Are Saying</h2>
          </div>
        </div>
        <div className="review-card-grid">
          {customerReviews.map((review) => (
            <div key={review.name} className="review-card">
              <div className="review-header">
                <div className="review-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < Math.floor(review.rating) ? '#f59e0b' : '#e2e8f0'}
                      color={i < Math.floor(review.rating) ? '#f59e0b' : '#e2e8f0'}
                    />
                  ))}
                  <span className="rating-text">{review.rating.toFixed(1)}</span>
                </div>
                <span className="review-date">{review.date}</span>
              </div>
              <p className="review-body">"{review.message}"</p>
              <div className="review-author">
                <div>
                  <strong>{review.name}</strong>
                  <span className="review-loc">{review.location}, Nepal</span>
                </div>
                <div className="verified-badge">
                  <CheckCircle2 size={13} /> Verified Buyer
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Newsletter & App Discount Banner */}
      <section className="newsletter-section">
        <div className="newsletter-card">
          <div className="newsletter-text-block">
            <span className="newsletter-tag">
              <Sparkles size={14} /> VIP SHOPPER CLUB
            </span>
            <h2>Get Rs. 500 Welcome Discount On First Order</h2>
            <p>
              Join 1M+ smart shoppers. Receive secret coupon codes, early Flash Sale notifications & free delivery perks.
            </p>
          </div>
          <div className="newsletter-form-block">
            <div className="newsletter-form-row">
              <input type="email" placeholder="Enter your email address..." />
              <button type="button">Claim Rs. 500</button>
            </div>
            <span className="newsletter-note">
              🔒 Instant coupon code delivered to your email inbox. No spam ever.
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <div className="app-main-layout">
        {/* Dynamic Toast Feedback Overlay */}
        <ToastNotification />

        {/* 1. Feature-Rich Online Shopping Navbar */}
        <Navbar />

        {/* 2. Main Store Interactive Content */}
        <StoreMain />

        {/* 3. Rich Footer */}
        <Footer />

        {/* 4. Interactive Full Product Detail Modal */}
        <ProductDetailModal />

        {/* 5. Wishlist Slide Drawer */}
        <WishlistModal />

        {/* 6. Checkout & Order Success Modal */}
        <CheckoutModal />

        {/* 7. Auth & Profile Modal */}
        <AuthModal />

        {/* 8. Order Tracking Modal */}
        <OrderTrackingModal />

        {/* 9. Floating Live Courier Radar Tracker */}
        <FloatingDeliveryTracker />

        {/* 10. Mobile Bottom Sticky Navigation */}
        <MobileBottomNav />
      </div>
    </ShopProvider>
  );
}
