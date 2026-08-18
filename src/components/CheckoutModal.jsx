import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  ShieldCheck,
  CreditCard,
  Banknote,
  CheckCircle2,
  Tag,
  MapPin,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Clock,
  Zap,
  Navigation,
  Truck
} from 'lucide-react';
import AddressMapPicker from './DeliveryMap/AddressMapPicker';
import { soundManager } from '../utils/audioEffects';
import { launchConfetti } from '../utils/confetti';

export default function CheckoutModal() {
  const {
    cart,
    cartSubtotal,
    voucherDiscountAmount,
    shippingFee,
    cartGrandTotal,
    appliedVoucherCode,
    applyVoucher,
    removeAppliedVoucher,
    collectibleVouchers,
    collectedVoucherIds,
    currentLocation,
    user,
    placeOrder,
    isCheckoutOpen,
    setIsCheckoutOpen,
    latestOrderPlaced,
    setLatestOrderPlaced,
    setIsOrderTrackingOpen
  } = useShop();

  const [paymentMethod, setPaymentMethod] = useState('esewa');
  const [deliverySlot, setDeliverySlot] = useState('⚡ Express Priority (20-30 Mins)');
  const [voucherInput, setVoucherInput] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState(
    `${currentLocation.area}, ${currentLocation.city}, Nepal`
  );
  const [pinnedCoords, setPinnedCoords] = useState(null);
  const [isMapPickerOpen, setIsMapPickerOpen] = useState(false);
  const [phone, setPhone] = useState(user?.phone || '+977 9841-234567');
  const [orderNotes, setOrderNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen && !latestOrderPlaced) return null;

  // Handle Order Placement
  const handleConfirmOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      let paymentLabel = 'eSewa Mobile Wallet';
      if (paymentMethod === 'khalti') paymentLabel = 'Khalti Digital Wallet';
      else if (paymentMethod === 'cod') paymentLabel = 'Cash on Delivery';
      else if (paymentMethod === 'card') paymentLabel = 'Credit/Debit Card (Visa/Mastercard)';
      else if (paymentMethod === 'imepay') paymentLabel = 'IME Pay';

      placeOrder({
        paymentMethod: paymentLabel,
        deliveryAddress,
        contactPhone: phone,
        notes: orderNotes,
        deliverySlot,
        coords: pinnedCoords
      });
      soundManager.playSuccessFanfare();
      launchConfetti();
      setIsSubmitting(false);
    }, 900);
  };

  const handleApplyVoucherCode = () => {
    if (voucherInput.trim()) {
      applyVoucher(voucherInput.trim());
      setVoucherInput('');
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setLatestOrderPlaced(null);
  };

  const handleOpenLiveTracking = () => {
    setIsCheckoutOpen(false);
    setLatestOrderPlaced(null);
    setIsOrderTrackingOpen(true);
  };

  // 1. Order Success Screen
  if (latestOrderPlaced) {
    return (
      <div className="modal-backdrop" onClick={handleClose}>
        <div className="checkout-success-card" onClick={(e) => e.stopPropagation()}>
          <div className="success-icon-wrap">
            <CheckCircle2 size={48} className="success-icon" />
          </div>
          <h2>Thank You! Order Confirmed</h2>
          <p className="success-subtitle">
            Your package has been dispatched and assigned to a Daraz Express Hero Courier!
          </p>

          <div className="order-receipt-box">
            <div className="receipt-row">
              <span>Order Tracking ID:</span>
              <strong>#{latestOrderPlaced.orderId}</strong>
            </div>
            <div className="receipt-row">
              <span>Estimated Delivery:</span>
              <strong style={{ color: '#10b981' }}>{latestOrderPlaced.deliveryEstimate}</strong>
            </div>
            <div className="receipt-row">
              <span>Delivery Address:</span>
              <span>{latestOrderPlaced.deliveryAddress}</span>
            </div>
            <div className="receipt-row">
              <span>Courier Hero:</span>
              <span>{latestOrderPlaced.rider?.name || 'Bikash Shrestha'} ({latestOrderPlaced.rider?.plateNumber || 'BA 99 PA 4201'})</span>
            </div>
            <div className="receipt-row">
              <span>Handover OTP:</span>
              <strong style={{ color: '#f57224', letterSpacing: 2 }}>{latestOrderPlaced.otpCode || '4821'}</strong>
            </div>
            <div className="receipt-row">
              <span>Payment Method:</span>
              <span>{latestOrderPlaced.paymentMethod}</span>
            </div>
            <div className="receipt-divider" />
            <div className="receipt-row total-highlight">
              <span>Total Paid:</span>
              <span>Rs. {latestOrderPlaced.totalAmount?.toLocaleString()}</span>
            </div>
          </div>

          <div className="success-actions">
            <button
              type="button"
              className="btn-success-primary track-live-btn"
              onClick={handleOpenLiveTracking}
            >
              <Navigation size={18} /> Track Live Rider on Map
            </button>
            <button type="button" className="btn-success-secondary" onClick={handleClose}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Checkout Screen
  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="checkout-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="checkout-header">
          <div className="checkout-title-cluster">
            <ShoppingBag size={22} style={{ color: '#f57224' }} />
            <div>
              <h2>Daraz Express Checkout</h2>
              <p>Review items, pinpoint delivery address, and select payment</p>
            </div>
          </div>
          <button type="button" className="modal-close-round-btn" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleConfirmOrder} className="checkout-grid-layout">
          {/* Left Column: Delivery & Payment Details */}
          <div className="checkout-main-form">
            {/* Delivery Address Box */}
            <div className="checkout-section-card">
              <div className="section-title-row" style={{ justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <MapPin size={18} style={{ color: '#f57224' }} />
                  <h3>1. Delivery Address & Pinpoint</h3>
                </div>
                <button
                  type="button"
                  className="btn-open-map-picker"
                  onClick={() => setIsMapPickerOpen(true)}
                >
                  <Navigation size={14} /> Pin on Map
                </button>
              </div>

              <div className="form-group-row">
                <div className="form-field">
                  <label>Full Address / Landmark</label>
                  <input
                    type="text"
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="House no, Street, Landmark"
                  />
                </div>
              </div>

              {/* Delivery Speed / Slot Selector */}
              <div className="form-field delivery-slots-field">
                <label>Delivery Speed & Time Slot</label>
                <div className="delivery-slots-grid">
                  {[
                    {
                      id: 'express',
                      title: '⚡ 20-30 Mins Express',
                      desc: 'HyperLocal priority dispatch',
                      value: '⚡ Express Priority (20-30 Mins)'
                    },
                    {
                      id: 'standard',
                      title: '📦 Standard Next-Day',
                      desc: 'Daraz Express van delivery',
                      value: 'Standard Next-Day Express'
                    },
                    {
                      id: 'evening',
                      title: '🌙 Evening Slot (5 - 8 PM)',
                      desc: 'Convenient after-office delivery',
                      value: 'Evening Slot (5:00 - 8:00 PM)'
                    }
                  ].map((slot) => (
                    <div
                      key={slot.id}
                      className={`slot-card ${deliverySlot === slot.value ? 'selected' : ''}`}
                      onClick={() => setDeliverySlot(slot.value)}
                    >
                      <strong>{slot.title}</strong>
                      <span>{slot.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group-grid">
                <div className="form-field">
                  <label>Contact Phone</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+977 98XXXXXXXX"
                  />
                </div>
                <div className="form-field">
                  <label>Recipient Name</label>
                  <input type="text" defaultValue={user?.name || 'Shopper'} />
                </div>
              </div>

              <div className="form-field">
                <label>Delivery Notes for Courier Hero (Optional)</label>
                <input
                  type="text"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="e.g. Call before delivery, gate code 4092, leave with security"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="checkout-section-card">
              <div className="section-title-row">
                <CreditCard size={18} style={{ color: '#f57224' }} />
                <h3>2. Select Payment Method</h3>
              </div>

              <div className="payment-options-grid">
                {/* eSewa */}
                <label
                  className={`payment-choice-card ${paymentMethod === 'esewa' ? 'active' : ''}`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="esewa"
                    checked={paymentMethod === 'esewa'}
                    onChange={() => setPaymentMethod('esewa')}
                  />
                  <div className="payment-choice-content">
                    <div className="payment-logo esewa">eSewa</div>
                    <div>
                      <strong>eSewa Mobile Wallet</strong>
                      <span>Instant zero-fee payment</span>
                    </div>
                  </div>
                </label>

                {/* Khalti */}
                <label
                  className={`payment-choice-card ${paymentMethod === 'khalti' ? 'active' : ''}`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="khalti"
                    checked={paymentMethod === 'khalti'}
                    onChange={() => setPaymentMethod('khalti')}
                  />
                  <div className="payment-choice-content">
                    <div className="payment-logo khalti">Khalti</div>
                    <div>
                      <strong>Khalti Digital Wallet</strong>
                      <span>Pay with Khalti balance / mBank</span>
                    </div>
                  </div>
                </label>

                {/* Cash on Delivery */}
                <label
                  className={`payment-choice-card ${paymentMethod === 'cod' ? 'active' : ''}`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                  />
                  <div className="payment-choice-content">
                    <div className="payment-logo cod">
                      <Banknote size={16} />
                    </div>
                    <div>
                      <strong>Cash on Delivery (COD)</strong>
                      <span>Pay with cash when order arrives</span>
                    </div>
                  </div>
                </label>

                {/* Cards */}
                <label
                  className={`payment-choice-card ${paymentMethod === 'card' ? 'active' : ''}`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                  />
                  <div className="payment-choice-content">
                    <div className="payment-logo card">VISA</div>
                    <div>
                      <strong>Debit / Credit Card</strong>
                      <span>Visa, Mastercard & SCT cards</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Voucher */}
          <div className="checkout-summary-col">
            <div className="checkout-summary-card">
              <h3>Order Summary</h3>

              {/* Items Scroll */}
              <div className="checkout-items-list">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.color}`} className="checkout-item-row">
                    <img src={item.image} alt={item.title} />
                    <div className="checkout-item-details">
                      <h4>{item.title}</h4>
                      <span>Qty: {item.quantity} | Variant: {item.color}</span>
                    </div>
                    <span className="checkout-item-subtotal">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Voucher Code Input Box */}
              <div className="checkout-voucher-section">
                <div className="voucher-input-group">
                  <Tag size={16} style={{ color: '#f57224' }} />
                  <input
                    type="text"
                    placeholder="Enter Voucher Code"
                    value={voucherInput}
                    onChange={(e) => setVoucherInput(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn-apply-voucher"
                    onClick={handleApplyVoucherCode}
                  >
                    Apply
                  </button>
                </div>

                {appliedVoucherCode ? (
                  <div className="applied-voucher-alert">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Sparkles size={14} /> Voucher <strong>{appliedVoucherCode}</strong> applied!
                    </div>
                    <button
                      type="button"
                      className="btn-remove-voucher"
                      onClick={removeAppliedVoucher}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  collectedVoucherIds.length > 0 && (
                    <div className="quick-voucher-pills">
                      <span className="quick-vouch-label">Your Vouchers:</span>
                      {collectibleVouchers
                        .filter((v) => collectedVoucherIds.includes(v.id))
                        .map((v) => (
                          <button
                            key={v.id}
                            type="button"
                            className="vouch-pill-btn"
                            onClick={() => applyVoucher(v.code)}
                          >
                            🏷️ {v.code} ({v.title})
                          </button>
                        ))}
                    </div>
                  )
                )}
              </div>

              {/* Cost Calculations Breakdown */}
              <div className="cost-breakdown">
                <div className="breakdown-row">
                  <span>Items Subtotal:</span>
                  <span>Rs. {cartSubtotal.toLocaleString()}</span>
                </div>
                {voucherDiscountAmount > 0 && (
                  <div className="breakdown-row discount-row">
                    <span>Voucher Discount:</span>
                    <span>- Rs. {voucherDiscountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="breakdown-row">
                  <span>Shipping Fee:</span>
                  <span>
                    {shippingFee === 0 ? (
                      <strong style={{ color: '#10b981' }}>FREE</strong>
                    ) : (
                      `Rs. ${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="receipt-divider" />
                <div className="breakdown-row total-row">
                  <span>Grand Total:</span>
                  <span className="grand-total-amount">
                    Rs. {cartGrandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-place-order"
                disabled={isSubmitting || cart.length === 0}
              >
                {isSubmitting ? (
                  'Assigning Express Courier...'
                ) : (
                  <>
                    Confirm & Place Order <ArrowRight size={18} />
                  </>
                )}
              </button>

              <div className="checkout-trust-badge">
                <ShieldCheck size={16} style={{ color: '#10b981' }} />
                <span>256-Bit SSL Encrypted & Verified Seller Protection</span>
              </div>
            </div>
          </div>
        </form>

        {/* Pinpoint Address Map Picker Modal */}
        <AddressMapPicker
          isOpen={isMapPickerOpen}
          onClose={() => setIsMapPickerOpen(false)}
          initialAddress={deliveryAddress}
          onConfirmLocation={({ address, coords }) => {
            setDeliveryAddress(address);
            setPinnedCoords(coords);
          }}
        />
      </div>
    </div>
  );
}
