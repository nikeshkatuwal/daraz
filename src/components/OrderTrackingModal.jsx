import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Package, Truck, CheckCircle2, Clock, MapPin } from 'lucide-react';

export default function OrderTrackingModal() {
  const { isOrderTrackingOpen, setIsOrderTrackingOpen, orderHistory } = useShop();

  if (!isOrderTrackingOpen) return null;

  return (
    <div className="modal-backdrop" onClick={() => setIsOrderTrackingOpen(false)}>
      <div className="side-drawer tracking-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="drawer-header">
          <div className="drawer-title-row">
            <Truck size={20} style={{ color: '#f57224' }} />
            <h2>Order Tracking & History</h2>
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

        {/* Orders List */}
        <div className="drawer-body-scroll">
          {orderHistory.length === 0 ? (
            <div className="drawer-empty-state">
              <Package size={36} style={{ color: '#94a3b8' }} />
              <h3>No orders yet</h3>
              <p>When you complete a purchase, you can track real-time delivery status here.</p>
            </div>
          ) : (
            <div className="tracking-orders-list">
              {orderHistory.map((order, idx) => (
                <div key={order.orderId || idx} className="tracking-order-card">
                  <div className="tracking-order-header">
                    <div>
                      <span className="order-id-label">Tracking ID</span>
                      <strong className="order-id-val">{order.orderId}</strong>
                    </div>
                    <span className="order-status-badge">{order.status}</span>
                  </div>

                  <div className="order-meta-grid">
                    <div>
                      <span>Date Placed:</span>
                      <strong>{order.date}</strong>
                    </div>
                    <div>
                      <span>Estimated Delivery:</span>
                      <strong style={{ color: '#10b981' }}>{order.deliveryEstimate}</strong>
                    </div>
                    <div>
                      <span>Amount:</span>
                      <strong>Rs. {order.totalAmount.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span>Payment:</span>
                      <span>{order.paymentMethod}</span>
                    </div>
                  </div>

                  {/* Tracking Stepper */}
                  <div className="tracking-timeline">
                    {order.trackingSteps &&
                      order.trackingSteps.map((step, sIdx) => (
                        <div
                          key={sIdx}
                          className={`timeline-step ${step.completed ? 'completed' : ''}`}
                        >
                          <div className="timeline-dot">
                            {step.completed ? (
                              <CheckCircle2 size={14} />
                            ) : (
                              <Clock size={14} />
                            )}
                          </div>
                          <div className="timeline-content">
                            <span className="timeline-label">{step.label}</span>
                            <span className="timeline-time">{step.time}</span>
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Delivery destination */}
                  {order.deliveryAddress && (
                    <div className="tracking-dest">
                      <MapPin size={14} style={{ color: '#f57224' }} />
                      <span>{order.deliveryAddress}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
