import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export default function WishlistModal() {
  const {
    wishlist,
    allProducts,
    toggleWishlist,
    addToCart,
    isWishlistOpen,
    setIsWishlistOpen,
    openQuickView
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistProducts = allProducts.filter((p) => wishlist.includes(p.id));

  return (
    <div className="modal-backdrop" onClick={() => setIsWishlistOpen(false)}>
      <div className="side-drawer wishlist-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-row">
            <Heart size={20} style={{ color: '#ef4444' }} fill="#ef4444" />
            <h2>My Saved Items</h2>
            <span className="drawer-count-badge">{wishlistProducts.length} Items</span>
          </div>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={() => setIsWishlistOpen(false)}
            aria-label="Close wishlist"
          >
            <X size={20} />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="drawer-body-scroll">
          {wishlistProducts.length === 0 ? (
            <div className="drawer-empty-state">
              <div className="empty-icon-circle">
                <Heart size={36} style={{ color: '#94a3b8' }} />
              </div>
              <h3>Your wishlist is currently empty</h3>
              <p>Save items you like while browsing so you can easily find and purchase them later.</p>
              <button
                type="button"
                className="btn-drawer-action"
                onClick={() => setIsWishlistOpen(false)}
              >
                Start Shopping Now
              </button>
            </div>
          ) : (
            <div className="wishlist-items-list">
              {wishlistProducts.map((prod) => (
                <div key={prod.id} className="wishlist-item-card">
                  <img
                    src={prod.images ? prod.images[0] : prod.image}
                    alt={prod.title}
                    className="wishlist-item-img"
                    onClick={() => {
                      setIsWishlistOpen(false);
                      openQuickView(prod);
                    }}
                  />
                  <div className="wishlist-item-info">
                    <span className="wishlist-item-seller">{prod.seller}</span>
                    <h4
                      className="wishlist-item-title"
                      onClick={() => {
                        setIsWishlistOpen(false);
                        openQuickView(prod);
                      }}
                    >
                      {prod.title}
                    </h4>
                    <div className="wishlist-item-price-row">
                      <span className="wishlist-item-price">
                        Rs. {prod.price.toLocaleString()}
                      </span>
                      {prod.originalPrice && (
                        <span className="wishlist-item-orig-price">
                          Rs. {prod.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className="wishlist-card-buttons">
                      <button
                        type="button"
                        className="btn-wishlist-add-cart"
                        onClick={() => addToCart(prod, 1)}
                      >
                        <ShoppingBag size={14} /> Add to Cart
                      </button>
                      <button
                        type="button"
                        className="btn-wishlist-remove"
                        onClick={() => toggleWishlist(prod)}
                        title="Remove from saved"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlistProducts.length > 0 && (
          <div className="drawer-footer">
            <button
              type="button"
              className="btn-add-all-to-cart"
              onClick={() => {
                wishlistProducts.forEach((p) => addToCart(p, 1));
                setIsWishlistOpen(false);
              }}
            >
              Add All to Shopping Cart <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
