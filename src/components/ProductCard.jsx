import React from 'react';
import { useShop } from '../context/ShopContext';
import { Star, Heart, Eye, ShoppingBag, Truck, ShieldCheck } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist, openQuickView } = useShop();

  const isSaved = isInWishlist(product.id);
  const primaryImage = product.images ? product.images[0] : product.image;

  return (
    <div className="product-card group">
      {/* Product Image Wrapper */}
      <div className="product-img-wrapper">
        <img
          src={primaryImage}
          alt={product.title}
          loading="lazy"
          className="product-img"
          onClick={() => openQuickView(product)}
        />

        {/* Badges */}
        <div className="product-badges-top">
          {product.isDarazMall && (
            <span className="badge-mall">
              <ShieldCheck size={11} /> Mall
            </span>
          )}
          {product.tag && !product.isDarazMall && (
            <span className="product-tag">{product.tag}</span>
          )}
          {product.discount && (
            <span className="discount-badge">{product.discount}</span>
          )}
        </div>

        {/* Quick Action Overlay Buttons */}
        <div className="product-quick-actions">
          <button
            type="button"
            className={`action-icon-btn ${isSaved ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            title={isSaved ? 'Remove from Wishlist' : 'Add to Wishlist'}
            aria-label="Wishlist"
          >
            <Heart size={16} fill={isSaved ? '#ef4444' : 'none'} color={isSaved ? '#ef4444' : '#1e293b'} />
          </button>
          <button
            type="button"
            className="action-icon-btn"
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            title="Quick View Details"
            aria-label="Quick View"
          >
            <Eye size={16} color="#1e293b" />
          </button>
        </div>

        {/* Free Shipping Tag */}
        {product.isFreeShipping && (
          <div className="free-shipping-tag">
            <Truck size={12} /> Free Express Delivery
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="product-info">
        {/* Category / Seller */}
        <div className="product-seller-label">
          {product.seller || 'Daraz Verified'}
        </div>

        {/* Title */}
        <h3
          className="product-title"
          title={product.title}
          onClick={() => openQuickView(product)}
        >
          {product.title}
        </h3>

        {/* Rating and Reviews */}
        <div className="product-rating-row">
          <div className="star-box">
            <Star size={12} fill="#f59e0b" color="#f59e0b" />
            <span className="rating-score">{product.rating}</span>
          </div>
          <span className="review-count">({product.reviews} reviews)</span>
          {product.stock <= 10 && (
            <span className="low-stock-pill">Only {product.stock} left!</span>
          )}
        </div>

        {/* Price Row */}
        <div className="product-price-row">
          <span className="current-price">Rs. {product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="original-price">
              Rs. {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <div className="product-card-actions">
          <button
            type="button"
            className="btn-add-cart"
            onClick={() => addToCart(product, 1)}
          >
            <ShoppingBag size={15} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
