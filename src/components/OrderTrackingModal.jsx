import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  ShieldCheck,
  Star,
  Copy,
  Sparkles,
  RefreshCw,
  Award,
  CreditCard,
  ChevronDown,
  Navigation
} from 'lucide-react';
import LiveDeliveryMap from './DeliveryMap/LiveDeliveryMap';
import DeliveryChatModal from './DeliveryMap/DeliveryChatModal';
import RiderCallModal from './DeliveryMap/RiderCallModal';
import './DeliveryMap/DeliveryMap.css';

export default function OrderTrackingModal() {
  const {
    isOrderTrackingOpen,
    setIsOrderTrackingOpen,
    orderHistory,
    showToast
  } = useShop();

  const [selectedOrderId, setSelectedOrderId] = useState(
    orderHistory.length > 0 ? orderHistory[0].orderId : null
  );
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [selectedTip, setSelectedTip] = useState(null);
  const [riderRating, setRiderRating] = useState(5);
  const [hasRated, setHasRated] = useState(false);

  if (!isOrderTrackingOpen) return null;

  // Active selected order
  const currentOrder =
    orderHistory.find((o) => o.orderId === selectedOrderId) || orderHistory[0] || {};

  const rider = currentOrder.rider || {
    name: 'Bikash Shrestha',
    title: 'Daraz Express Hero Rider',
    rating: 4.95,
    vehicle: 'Hero Splendor Pro',
    plateNumber: 'BA 99 PA 4201',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  };

  const isLiveTrackingActive =
    currentOrder.status === 'Out for Delivery' ||
    currentOrder.status === 'Confirmed & Processing' ||
    !currentOrder.status;

  const handleCopyOTP = (code) => {
    navigator.clipboard?.writeText(code || '4821');
    showToast('Delivery OTP copied to clipboard!', 'info');
  };

  const handleTipRider = (amount) => {
    setSelectedTip(amount);
    showToast(`Rs. ${amount} tip added for ${rider.name}! Thank you! ❤️`, 'success');
  };

  const handleSubmitRating = () => {
    setHasRated(true);
    showToast(`Thank you for rating ${rider.name} ${riderRating} Stars! ⭐`, 'success');
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsOrderTrackingOpen(false)}>
      <div
        className="side-drawer tracking-drawer tracking-drawer-wide"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="drawer-header">
          <div className="drawer-title-row">
            <div className="tracking-header-icon-box">
              <Truck size={22} style={{ color: '#f57224' }} />
            </div>
            <div>
              <h2>Live Delivery & Order Tracker</h2>
              <p className="drawer-subheading">Real-time GPS route tracking and courier updates</p>
            </div>
          </div>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={() => setIsOrderTrackingOpen(false)}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Orders Switcher Tabs if multiple orders */}
        {orderHistory.length > 1 && (
          <div className="tracking-order-tabs-bar">
            <span>Your Orders:</span>
            <div className="order-tabs-scroll">
              {orderHistory.map((ord) => (
                <button
                  key={ord.orderId}
                  type="button"
                  className={`order-tab-btn ${ord.orderId === (currentOrder.orderId || selectedOrderId) ? 'active' : ''}`}
                  onClick={() => setSelectedOrderId(ord.orderId)}
                >
                  <span className="tab-ord-id">#{ord.orderId}</span>
                  <span className="tab-ord-status">{ord.status}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Drawer Body Scroll */}
        <div className="drawer-body-scroll">
          {orderHistory.length === 0 ? (
            <div className="drawer-empty-state">
              <Package size={48} style={{ color: '#94a3b8' }} />
              <h3>No orders yet</h3>
              <p>When you complete a purchase, you can track real-time delivery status here.</p>
            </div>
          ) : (
            <div className="tracking-main-content">
              {/* 1. Live Map Section (Only for active deliveries) */}
              {isLiveTrackingActive && (
                <div className="tracking-map-container-card">
                  <div className="map-card-header">
                    <div className="map-title-row">
                      <Navigation size={18} style={{ color: '#f57224' }} />
                      <h3>Real-Time Courier GPS Location</h3>
                    </div>
                    <span className="map-live-tag">
                      <span className="pulsing-green-dot"></span> LIVE
                    </span>
                  </div>

                  <LiveDeliveryMap
                    cityName={currentOrder.selectedCity || 'Kathmandu'}
                    riderInfo={rider}
                    onOpenChat={() => setIsChatOpen(true)}
                    onOpenCall={() => setIsCallOpen(true)}
                  />
                </div>
              )}

              {/* 2. Rider Profile & Contact Action Bar */}
              <div className="tracking-rider-card">
                <div className="rider-card-top">
                  <div className="rider-profile-left">
                    <img
                      src={rider.avatar}
                      alt={rider.name}
                      className="rider-avatar-img"
                    />
                    <div>
                      <h4 className="rider-name-heading">{rider.name}</h4>
                      <div className="rider-badges-line">
                        <span className="rating-badge">
                          <Star size={12} fill="#b45309" color="#b45309" /> {rider.rating || '4.9'}
                        </span>
                        <span>•</span>
                        <span>{rider.vehicle} ({rider.plateNumber})</span>
                      </div>
                    </div>
                  </div>

                  <div className="rider-actions-right">
                    <button
                      type="button"
                      className="btn-contact-action call-btn"
                      onClick={() => setIsCallOpen(true)}
                      title="Call Rider"
                    >
                      <Phone size={15} />
                      <span>Call</span>
                    </button>
                    <button
                      type="button"
                      className="btn-contact-action chat-btn"
                      onClick={() => setIsChatOpen(true)}
                      title="Chat with Rider"
                    >
                      <MessageSquare size={15} />
                      <span>Message</span>
                    </button>
                  </div>
                </div>

                {/* Secure Handover OTP */}
                <div className="delivery-security-box">
                  <div className="security-otp-label">
                    <ShieldCheck size={18} style={{ color: '#10b981' }} />
                    <div>
                      <strong>Delivery Handover OTP:</strong>
                      <span style={{ display: 'block', fontSize: '0.72rem', color: '#64748b' }}>
                        Share this 4-digit code with rider upon delivery
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="otp-number-highlight"
                    onClick={() => handleCopyOTP(currentOrder.otpCode || '4821')}
                    title="Click to copy OTP"
                  >
                    {currentOrder.otpCode || '4821'} <Copy size={13} style={{ marginLeft: 4 }} />
                  </button>
                </div>
              </div>

              {/* 3. Order Details Summary Card */}
              <div className="tracking-order-card">
                <div className="tracking-order-header">
                  <div>
                    <span className="order-id-label">Tracking ID</span>
                    <strong className="order-id-val">#{currentOrder.orderId}</strong>
                  </div>
                  <span className="order-status-badge">{currentOrder.status}</span>
                </div>

                <div className="order-meta-grid">
                  <div>
                    <span>Order Date:</span>
                    <strong>{currentOrder.date}</strong>
                  </div>
                  <div>
                    <span>Estimated Arrival:</span>
                    <strong style={{ color: '#10b981' }}>
                      {currentOrder.deliveryEstimate || 'Today by 5:00 PM'}
                    </strong>
                  </div>
                  <div>
                    <span>Amount:</span>
                    <strong>Rs. {currentOrder.totalAmount?.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span>Payment:</span>
                    <span>{currentOrder.paymentMethod}</span>
                  </div>
                </div>

                {/* Tracking Stepper */}
                <div className="tracking-timeline">
                  {currentOrder.trackingSteps &&
                    currentOrder.trackingSteps.map((step, sIdx) => (
                      <div
                        key={sIdx}
                        className={`timeline-step ${step.completed ? 'completed' : ''} ${step.current ? 'current-active' : ''}`}
                      >
                        <div className="timeline-dot">
                          {step.completed ? (
                            <CheckCircle2 size={15} />
                          ) : (
                            <Clock size={15} />
                          )}
                        </div>
                        <div className="timeline-content">
                          <span className="timeline-label">{step.label}</span>
                          <span className="timeline-time">{step.time}</span>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Delivery Destination */}
                {currentOrder.deliveryAddress && (
                  <div className="tracking-dest">
                    <MapPin size={16} style={{ color: '#f57224' }} />
                    <div>
                      <strong>Delivery Destination:</strong>
                      <p>{currentOrder.deliveryAddress}</p>
                    </div>
                  </div>
                )}

                {/* Package Items List */}
                {currentOrder.items && currentOrder.items.length > 0 && (
                  <div className="tracking-package-items">
                    <span className="package-heading">Package Items ({currentOrder.items.length})</span>
                    <div className="package-items-list">
                      {currentOrder.items.map((item, i) => (
                        <div key={i} className="package-item-row">
                          <img src={item.image} alt={item.title} className="package-thumb" />
                          <div className="package-info">
                            <h5>{item.title}</h5>
                            <span>Qty: {item.quantity} • Rs. {item.price?.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Tip & Rate Delivery Hero */}
                <div className="rider-tip-section">
                  <div className="tip-header">
                    <Sparkles size={16} style={{ color: '#f59e0b' }} />
                    <strong>Tip & Appreciate {rider.name.split(' ')[0]}</strong>
                  </div>
                  <p className="tip-subtext">
                    100% of tips go directly to the courier hero for swift delivery.
                  </p>

                  <div className="tip-buttons-row">
                    {[20, 50, 100].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        className={`tip-btn ${selectedTip === amt ? 'active' : ''}`}
                        onClick={() => handleTipRider(amt)}
                      >
                        Rs. {amt}
                      </button>
                    ))}
                  </div>

                  {/* Rating Stars */}
                  {!hasRated ? (
                    <div className="rider-rating-bar">
                      <span>Rate delivery experience:</span>
                      <div className="rating-stars-row">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className="star-rate-btn"
                            onClick={() => setRiderRating(star)}
                          >
                            <Star
                              size={18}
                              fill={star <= riderRating ? '#f59e0b' : '#e2e8f0'}
                              color={star <= riderRating ? '#f59e0b' : '#cbd5e1'}
                            />
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        className="btn-submit-rating"
                        onClick={handleSubmitRating}
                      >
                        Submit Feedback
                      </button>
                    </div>
                  ) : (
                    <div className="rated-confirmation">
                      <CheckCircle2 size={16} style={{ color: '#10b981' }} />
                      <span>Feedback submitted! Thank you.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Live Chat Modal */}
        <DeliveryChatModal
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          rider={rider}
          onOpenCall={() => setIsCallOpen(true)}
        />

        {/* Voice Call Modal */}
        <RiderCallModal
          isOpen={isCallOpen}
          onClose={() => setIsCallOpen(false)}
          rider={rider}
        />
      </div>
    </div>
  );
}
