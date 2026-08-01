import React from 'react';
import { ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export default function CartPreview({ cartItems, onUpdateQuantity, onRemoveItem }) {
  const freeShippingThreshold = 10000;
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="cart-preview-popover">
      {/* Header */}
      <div className="cart-preview-header">
        <span className="cart-preview-title">Shopping Cart</span>
        <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
          {cartItems.reduce((sum, item) => sum + item.quantity, 0)} Items
        </span>
      </div>

      {/* Free Shipping Progress Indicator */}
      <div className="free-shipping-bar">
        {remainingForFreeShipping > 0 ? (
          <div>
            Add <strong>Rs. {remainingForFreeShipping.toLocaleString()}</strong> more to unlock{' '}
            <strong style={{ color: '#10b981' }}>FREE Express Shipping!</strong> 🚚
          </div>
        ) : (
          <div style={{ color: '#10b981', fontWeight: 700 }}>
            🎉 Congratulations! You unlocked FREE Express Shipping!
          </div>
        )}
        <div className="free-shipping-progress">
          <div className="free-shipping-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* Cart Items List */}
      <div className="cart-items-scroll">
        {cartItems.length === 0 ? (
          <div style={{ padding: '24px 0', textAlign: 'center', color: '#94a3b8' }}>
            <ShoppingBag size={36} style={{ marginBottom: 8, opacity: 0.5 }} />
            <p style={{ margin: 0, fontSize: '0.84rem' }}>Your shopping cart is empty</p>
          </div>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item-card">
              <img src={item.image} alt={item.name} className="cart-item-img" />
              <div className="cart-item-details">
                <span className="cart-item-name">{item.name}</span>
                <span className="cart-item-meta">
                  Variant: {item.color} | {item.seller}
                </span>
                <div className="cart-item-price-qty">
                  <span className="cart-item-price">Rs. {item.price.toLocaleString()}</span>
                  <div className="qty-control">
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="qty-num">{item.quantity}</span>
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onRemoveItem(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: 4
                }}
                title="Remove item"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer & Checkout */}
      {cartItems.length > 0 && (
        <div className="cart-preview-footer">
          <div className="cart-subtotal-row">
            <span className="subtotal-label">Subtotal</span>
            <span className="subtotal-amount">Rs. {subtotal.toLocaleString()}</span>
          </div>
          <div className="cart-footer-actions">
            <button type="button" className="btn-checkout">
              Proceed to Checkout <ArrowRight size={14} style={{ inlineSize: 'auto' }} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
