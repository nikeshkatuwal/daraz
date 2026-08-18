import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Truck, Navigation, ChevronRight, X, ShieldCheck } from 'lucide-react';

export default function FloatingDeliveryTracker() {
  const { isOrderTrackingOpen, setIsOrderTrackingOpen, orderHistory } = useShop();
  const [isDismissed, setIsDismissed] = useState(false);

  // Find active out for delivery order if any
  const activeOrder = orderHistory.find((o) => o.status === 'Out for Delivery') || orderHistory[0];

  if (!activeOrder || isDismissed || isOrderTrackingOpen) {
    return null;
  }

  return (
    <div className="floating-tracker-pill-wrap">
      <div
        className="floating-tracker-pill"
        onClick={() => setIsOrderTrackingOpen(true)}
        role="button"
        tabIndex={0}
      >
        {/* Animated Radar Pulse */}
        <div className="floating-radar-icon">
          <div className="radar-ping-ring"></div>
          <span className="scooter-emoji">🛵</span>
        </div>

        <div className="floating-tracker-info">
          <div className="floating-tracker-top">
            <span className="live-pill-tag">LIVE GPS</span>
            <strong className="rider-name-tag">Daraz Express Hero</strong>
          </div>
          <span className="floating-sub-status">
            Order #{activeOrder.orderId} • {activeOrder.deliveryEstimate || 'On the way'}
          </span>
        </div>

        <div className="floating-tracker-arrow">
          <span>Track Map</span>
          <ChevronRight size={16} />
        </div>
      </div>

      <button
        type="button"
        className="btn-dismiss-floating"
        onClick={(e) => {
          e.stopPropagation();
          setIsDismissed(true);
        }}
        title="Hide tracker widget"
      >
        <X size={13} />
      </button>
    </div>
  );
}
