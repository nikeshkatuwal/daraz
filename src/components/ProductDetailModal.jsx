import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Heart,
  ShoppingBag,
  Zap,
  Check,
  MapPin
} from 'lucide-react';

export default function ProductDetailModal() {
  const {
    quickViewProduct,
    closeQuickView,
    addToCart,
    toggleWishlist,
    isInWishlist,
    currentLocation,
    setIsCheckoutOpen
  } = useShop();

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedImageIdx(0);
      setSelectedColor(quickViewProduct.colors ? quickViewProduct.colors[0] : '');
      setSelectedSize(quickViewProduct.sizes ? quickViewProduct.sizes[0] : '');
      setQuantity(1);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const images = quickViewProduct.images || [quickViewProduct.image];
  const isSaved = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, selectedColor, selectedSize);
  };

  const handleBuyNow = () => {
    addToCart(quickViewProduct, quantity, selectedColor, selectedSize);
    closeQuickView();
    setIsCheckoutOpen(true);
  };

  return (
    <div className="modal-backdrop" onClick={closeQuickView}>
      <div className="product-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          className="modal-close-round-btn"
          onClick={closeQuickView}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="product-modal-grid">
          {/* Left: Images Gallery */}
          <div className="modal-gallery-col">
            <div className="modal-main-image-wrap">
              <img
                src={images[selectedImageIdx] || images[0]}
                alt={quickViewProduct.title}
                className="modal-main-img"
              />
              {quickViewProduct.discount && (
                <span className="modal-discount-tag">{quickViewProduct.discount}</span>
              )}
            </div>

            {images.length > 1 && (
              <div className="modal-thumbnails-strip">
                {images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`thumb-btn ${selectedImageIdx === idx ? 'selected' : ''}`}
                    onClick={() => setSelectedImageIdx(idx)}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}

            {/* Guarantees Box */}
            <div className="modal-guarantees-card">
              <div className="guarantee-item">
                <ShieldCheck size={18} className="guarantee-icon" />
                <div>
                  <strong>100% Genuine Guaranteed</strong>
                  <span>{quickViewProduct.warranty || 'Verified Daraz Authenticity'}</span>
                </div>
              </div>
              <div className="guarantee-item">
                <RotateCcw size={18} className="guarantee-icon" />
                <div>
                  <strong>7 Days Return Policy</strong>
                  <span>Hassle-free 100% refund guarantee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Product Details & Purchase Form */}
          <div className="modal-details-col">
            {/* Header tags */}
            <div className="modal-header-tags">
              {quickViewProduct.isDarazMall && (
                <span className="badge-mall">
                  <ShieldCheck size={12} /> Daraz Mall Verified
                </span>
              )}
              <span className="badge-seller-name">
                Brand: <strong>{quickViewProduct.seller}</strong>
              </span>
            </div>

            {/* Title */}
            <h1 className="modal-product-title">{quickViewProduct.title}</h1>

            {/* Rating and Reviews */}
            <div className="modal-rating-row">
              <div className="stars-cluster">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < Math.floor(quickViewProduct.rating) ? '#f59e0b' : '#e2e8f0'}
                    color={i < Math.floor(quickViewProduct.rating) ? '#f59e0b' : '#e2e8f0'}
                  />
                ))}
                <span className="rating-num">{quickViewProduct.rating}</span>
              </div>
              <span className="dot-divider">•</span>
              <span className="reviews-num">{quickViewProduct.reviews} Ratings & Reviews</span>
              <span className="dot-divider">•</span>
              <span className="stock-status in-stock">
                <Check size={14} /> In Stock ({quickViewProduct.stock} available)
              </span>
            </div>

            {/* Price Box */}
            <div className="modal-price-box">
              <div className="price-main-group">
                <span className="modal-current-price">
                  Rs. {quickViewProduct.price.toLocaleString()}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="modal-original-price">
                    Rs. {quickViewProduct.originalPrice.toLocaleString()}
                  </span>
                )}
                {quickViewProduct.discount && (
                  <span className="modal-savings-pill">
                    Save {quickViewProduct.discount}
                  </span>
                )}
              </div>
              <p className="price-inclusive-text">Inclusive of all local taxes</p>
            </div>

            {/* Delivery Destination Notice */}
            <div className="modal-delivery-preview">
              <div className="delivery-loc-row">
                <MapPin size={16} style={{ color: '#f57224' }} />
                <span>
                  Delivery to: <strong>{currentLocation.area}, {currentLocation.city}</strong>
                </span>
              </div>
              <div className="delivery-speed-row">
                <Truck size={16} style={{ color: '#10b981' }} />
                <span>
                  Estimated Delivery: <strong>{currentLocation.deliveryDays}</strong> ({quickViewProduct.isFreeShipping ? 'FREE Shipping' : 'Standard Rs. 150'})
                </span>
              </div>
            </div>

            {/* Description Summary */}
            <div className="modal-description-box">
              <h3>Product Overview</h3>
              <p>{quickViewProduct.description}</p>
            </div>

            {/* Color Variants */}
            {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
              <div className="variant-selection-group">
                <label className="variant-label">
                  Select Color: <strong>{selectedColor}</strong>
                </label>
                <div className="variant-pills-row">
                  {quickViewProduct.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`variant-pill ${selectedColor === color ? 'active' : ''}`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Variants */}
            {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
              <div className="variant-selection-group">
                <label className="variant-label">
                  Select Size: <strong>{selectedSize}</strong>
                </label>
                <div className="variant-pills-row">
                  {quickViewProduct.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`variant-pill ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="modal-quantity-row">
              <span className="variant-label">Quantity:</span>
              <div className="qty-picker">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="qty-display">{quantity}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQuantity(Math.min(quickViewProduct.stock, quantity + 1))}
                  disabled={quantity >= quickViewProduct.stock}
                >
                  +
                </button>
              </div>
              <span className="total-for-qty">
                Total: <strong>Rs. {(quickViewProduct.price * quantity).toLocaleString()}</strong>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="modal-cta-group">
              <button
                type="button"
                className="btn-modal-add-cart"
                onClick={handleAddToCart}
              >
                <ShoppingBag size={18} /> Add to Cart
              </button>

              <button
                type="button"
                className="btn-modal-buy-now"
                onClick={handleBuyNow}
              >
                <Zap size={18} /> Buy Now
              </button>

              <button
                type="button"
                className={`btn-modal-wishlist ${isSaved ? 'saved' : ''}`}
                onClick={() => toggleWishlist(quickViewProduct)}
                title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart size={20} fill={isSaved ? '#ef4444' : 'none'} color={isSaved ? '#ef4444' : '#64748b'} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
