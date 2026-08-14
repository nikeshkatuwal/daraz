import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export default function CartPreview() {
  const {
    cart,
    cartItemsCount,
    cartSubtotal,
    updateCartQuantity,
    removeFromCart,
    setIsCheckoutOpen
  } = useShop();

  const freeShippingThreshold = 10000;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  return (
    <div className="cart-preview-popover">
      {/* Header */}
      <div className="cart-preview-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <ShoppingBag size={16} style={{ color: '#f57224' }} />
          <span className="cart-preview-title">Shopping Cart</span>
        </div>
        <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
          {cartItemsCount} {cartItemsCount === 1 ? 'Item' : 'Items'}
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
        {cart.length === 0 ? (
          <div style={{ padding: '28px 0', textAlign: 'center', color: '#94a3b8' }}>
            <ShoppingBag size={36} style={{ marginBottom: 8, opacity: 0.4 }} />
            <p style={{ margin: 0, fontSize: '0.86rem', fontWeight: 600 }}>
              Your shopping cart is empty
            </p>
            <span style={{ fontSize: '0.74rem', color: '#cbd5e1' }}>
              Explore hot deals & flash sales
            </span>
          </div>
        ) : (
          cart.map((item) => (
            <div key={`${item.id}-${item.color}`} className="cart-item-card">
              <img src={item.image} alt={item.title} className="cart-item-img" />
              <div className="cart-item-details">
                <span className="cart-item-name">{item.title}</span>
                <span className="cart-item-meta">
                  Variant: {item.color} {item.size ? `• Size: ${item.size}` : ''}
                </span>
                <div className="cart-item-price-qty">
                  <span className="cart-item-price">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </span>
                  <div className="qty-control">
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="qty-num">{item.quantity}</span>
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFromCart(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: 4,
                  alignSelf: 'flex-start'
                }}
                title="Remove item"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer & Checkout */}
      {cart.length > 0 && (
        <div className="cart-preview-footer">
          <div className="cart-subtotal-row">
            <span className="subtotal-label">Subtotal</span>
            <span className="subtotal-amount">Rs. {cartSubtotal.toLocaleString()}</span>
          </div>
          <div className="cart-footer-actions">
            <button
              type="button"
              className="btn-checkout"
              onClick={() => setIsCheckoutOpen(true)}
            >
              Proceed to Checkout <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
