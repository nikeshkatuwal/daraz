import React, { useState, useEffect } from 'react';
import { heroSlidesData } from '../data/mockData';
import { useShop } from '../context/ShopContext';
import { ChevronLeft, ChevronRight, Sparkles, Gift } from 'lucide-react';

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { setSelectedCategory, collectVoucher, collectibleVouchers } = useShop();

  const totalSlides = heroSlidesData.length;

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const activeSlide = heroSlidesData[currentSlide];

  const handlePrimaryClick = (idx) => {
    if (idx === 0) setSelectedCategory('electronics');
    else if (idx === 1) setSelectedCategory('fashion');
    else if (idx === 2) setSelectedCategory('home');
    
    // Scroll smoothly to catalog
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSecondaryClick = () => {
    if (collectibleVouchers.length > 0) {
      collectVoucher(collectibleVouchers[0]);
    }
  };

  return (
    <div
      className="hero-carousel-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="hero-slide-card"
        style={{ background: activeSlide.bgGradient }}
      >
        <div className="hero-slide-content">
          <span className="hero-badge" style={{ backgroundColor: activeSlide.badgeColor }}>
            {activeSlide.tag}
          </span>
          <h1 className="hero-slide-title">{activeSlide.title}</h1>
          <p className="hero-slide-desc">{activeSlide.description}</p>
          <div className="hero-slide-actions">
            <button
              type="button"
              className="btn-hero-primary"
              onClick={() => handlePrimaryClick(currentSlide)}
            >
              <Sparkles size={16} /> {activeSlide.ctaPrimary}
            </button>
            <button
              type="button"
              className="btn-hero-secondary"
              onClick={handleSecondaryClick}
            >
              <Gift size={16} /> {activeSlide.ctaSecondary}
            </button>
          </div>
        </div>

        <div className="hero-slide-image-wrapper">
          <img
            src={activeSlide.image}
            alt={activeSlide.title}
            className="hero-slide-img"
          />
          <div className="hero-image-glow" />
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        type="button"
        className="carousel-nav-btn prev"
        onClick={handlePrev}
        aria-label="Previous Slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        className="carousel-nav-btn next"
        onClick={handleNext}
        aria-label="Next Slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots Indicator */}
      <div className="carousel-dots-cluster">
        {heroSlidesData.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`carousel-dot ${currentSlide === idx ? 'active' : ''}`}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
