import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer';
import { categoriesData, partnerBrands, customerReviews } from './data/mockData';
import { Flame, Zap, ShieldCheck, Truck, RotateCcw, Clock, Star, ShoppingBag, Sparkles, Shield, CreditCard, Gift } from 'lucide-react';
import './App.css';

function App() {
  const benefitCards = [
    {
      title: 'Guaranteed Authenticity',
      description: 'Verified sellers and strict quality checks on every order.',
      icon: ShieldCheck
    },
    {
      title: 'Fast Express Delivery',
      description: 'Same-day and next-day delivery options in major cities.',
      icon: Truck
    },
    {
      title: 'Safe Payment Options',
      description: 'Cash on delivery, cards, e-wallets and secure checkout.',
      icon: CreditCard
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      title: 'Ultra-thin Noise Cancelling Wireless Headphones',
      price: 4999,
      originalPrice: 7999,
      discount: '-37%',
      rating: 4.8,
      reviews: 142,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',
      tag: 'Flash Sale'
    },
    {
      id: 2,
      title: 'Waterproof Smartwatch with Heart Rate Monitor',
      price: 2850,
      originalPrice: 4200,
      discount: '-32%',
      rating: 4.9,
      reviews: 98,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80',
      tag: 'Daraz Mall'
    },
    {
      id: 3,
      title: 'Pro Mechanical Gaming Keyboard RGB Backlit',
      price: 3490,
      originalPrice: 5990,
      discount: '-41%',
      rating: 4.7,
      reviews: 215,
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=80',
      tag: 'Best Seller'
    },
    {
      id: 4,
      title: 'Ergonomic Wireless Mouse with Silent Click',
      price: 1250,
      originalPrice: 2100,
      discount: '-40%',
      rating: 4.6,
      reviews: 87,
      image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=80',
      tag: 'Top Choice'
    }
  ];

  return (
    <div className="app-main-layout">
      {/* 1. Feature-Rich Online Shopping Navbar */}
      <Navbar />

      {/* 2. Main Store Body Demo Content */}
      <main className="store-container">
        {/* Trust Badges Bar */}
        <section className="trust-bar">
          <div className="trust-item">
            <ShieldCheck size={20} className="trust-icon" />
            <div>
              <strong>100% Genuine Products</strong>
              <span>Verified Direct Brand Distributors</span>
            </div>
          </div>
          <div className="trust-item">
            <Truck size={20} className="trust-icon" />
            <div>
              <strong>Fast Countrywide Delivery</strong>
              <span>Express Shipping to 60+ Cities</span>
            </div>
          </div>
          <div className="trust-item">
            <RotateCcw size={20} className="trust-icon" />
            <div>
              <strong>7 Days Easy Returns</strong>
              <span>Hassle-free 100% Refund Policy</span>
            </div>
          </div>
          <div className="trust-item">
            <Zap size={20} className="trust-icon" />
            <div>
              <strong>Safe & Secure Checkout</strong>
              <span>eSewa, Khalti, Cards & Cash on Delivery</span>
            </div>
          </div>
        </section>

        {/* Hero Banner Section */}
        <section className="hero-banner">
          <div className="hero-content">
            <span className="hero-badge">🔥 DARAZ MEGA SALE 2026</span>
            <h1>Up to 70% OFF on Top Electronics & Fashion</h1>
            <p>Enjoy extra Bank Voucher discounts + Free Express Delivery on selected items.</p>
            <div className="hero-actions">
              <button className="btn-hero-primary">Shop Mega Deals</button>
              <button className="btn-hero-secondary">Collect Vouchers</button>
            </div>
          </div>
        </section>

        {/* Flash Sale Section */}
        <section className="flash-sale-section">
          <div className="flash-sale-header">
            <div className="flash-title">
              <Flame size={24} style={{ color: '#f57224' }} />
              <h2>Flash Sale</h2>
              <div className="timer-box">
                <Clock size={14} />
                <span>Ends in <strong>04 : 28 : 12</strong></span>
              </div>
            </div>
            <button className="btn-view-all">SHOP MORE &gt;</button>
          </div>

          <div className="products-grid">
            {featuredProducts.map((prod) => (
              <div key={prod.id} className="product-card">
                <div className="product-img-wrapper">
                  <img src={prod.image} alt={prod.title} />
                  <span className="product-tag">{prod.tag}</span>
                  <span className="discount-badge">{prod.discount}</span>
                </div>
                <div className="product-info">
                  <h3 className="product-title">{prod.title}</h3>
                  <div className="product-rating">
                    <Star size={12} fill="#f59e0b" color="#f59e0b" />
                    <span>{prod.rating} ({prod.reviews})</span>
                  </div>
                  <div className="product-price-row">
                    <span className="current-price">Rs. {prod.price.toLocaleString()}</span>
                    <span className="original-price">Rs. {prod.originalPrice.toLocaleString()}</span>
                  </div>
                  <button className="btn-add-cart">
                    <ShoppingBag size={14} /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits Highlights */}
        <section className="benefits-grid">
          {benefitCards.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.title} className="benefit-card">
                <div className="benefit-icon-wrapper">
                  <Icon size={20} />
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            );
          })}
        </section>

        {/* Featured Categories */}
        <section className="featured-categories-section">
          <div className="section-heading-row">
            <div>
              <span className="section-label">Shop Collections</span>
              <h2>Popular Categories</h2>
            </div>
            <button className="btn-view-all alt">View All Categories</button>
          </div>

          <div className="category-card-grid">
            {categoriesData.slice(0, 6).map((category) => (
              <div key={category.id} className="category-card">
                <div className="category-card-header">
                  <div className="category-card-icon">{category.icon}</div>
                  <div>
                    <h3>{category.name}</h3>
                    {category.badge && <span className="category-badge">{category.badge}</span>}
                  </div>
                </div>
                <p>{category.subcategories.flatMap((group) => group.items).slice(0, 4).join(' · ')}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trusted Brands */}
        <section className="brand-strip-section">
          <div className="section-heading-row">
            <div>
              <span className="section-label">Trusted by Millions</span>
              <h2>Top Brands Available</h2>
            </div>
          </div>
          <div className="brand-strip">
            {partnerBrands.map((brand) => (
              <div key={brand} className="brand-pill">
                {brand}
              </div>
            ))}
          </div>
        </section>

        {/* Customer Reviews */}
        <section className="reviews-section">
          <div className="section-heading-row">
            <div>
              <span className="section-label">Customer Love</span>
              <h2>What Shoppers Are Saying</h2>
            </div>
          </div>
          <div className="review-card-grid">
            {customerReviews.map((review) => (
              <div key={review.name} className="review-card">
                <div className="review-rating">
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                  <span>{review.rating.toFixed(1)}</span>
                </div>
                <p>{review.message}</p>
                <div className="review-author">
                  <span>{review.name}</span>
                  <span>{review.location}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="newsletter-section">
          <div className="newsletter-card">
            <div>
              <span className="section-label">Stay Updated</span>
              <h2>Get the Latest Deals & Promo Codes</h2>
              <p>Subscribe for early access to sales, new arrivals, and app-only vouchers.</p>
            </div>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email address" />
              <button type="button">Subscribe Now</button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
