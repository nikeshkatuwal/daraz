import React from 'react';
import { X, CheckCircle2, ShieldCheck, Camera, MapPin, Calendar, Clock } from 'lucide-react';

export default function ProofOfDeliveryModal({ isOpen, onClose, order }) {
  if (!isOpen || !order) return null;

  return (
    <div className="modal-backdrop pod-modal-backdrop" onClick={onClose}>
      <div className="pod-card-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="pod-header">
          <div className="pod-title-group">
            <CheckCircle2 size={20} style={{ color: '#10b981' }} />
            <div>
              <h3>Official Proof of Delivery (POD)</h3>
              <p>Handover confirmation and doorstep photo record</p>
            </div>
          </div>
          <button type="button" className="btn-close-pod" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Body Content */}
        <div className="pod-body">
          {/* Delivered Doorstep Photo */}
          <div className="pod-photo-box">
            <img
              src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=80"
              alt="Parcel Handover Proof"
              className="pod-photo-img"
            />
            <div className="pod-photo-overlay-tag">
              <Camera size={14} />
              <span>Doorstep Geotagged Photo (Kathmandu, Nepal)</span>
            </div>
          </div>

          {/* Verification Details */}
          <div className="pod-details-grid">
            <div className="pod-detail-item">
              <Calendar size={15} style={{ color: '#f57224' }} />
              <div>
                <span>Delivery Date & Time</span>
                <strong>{order.date || 'Today'}, 12:04 PM</strong>
              </div>
            </div>

            <div className="pod-detail-item">
              <MapPin size={15} style={{ color: '#10b981' }} />
              <div>
                <span>GPS Drop-off Coordinate</span>
                <strong>27.7058° N, 85.3168° E (New Road)</strong>
              </div>
            </div>

            <div className="pod-detail-item">
              <ShieldCheck size={15} style={{ color: '#3b82f6' }} />
              <div>
                <span>Security Handover OTP</span>
                <strong>OTP #{order.otpCode || '4821'} Verified</strong>
              </div>
            </div>

            <div className="pod-detail-item">
              <span style={{ fontSize: '1rem' }}>✍️</span>
              <div>
                <span>Customer Signature</span>
                <strong style={{ fontFamily: 'cursive', color: '#1e3a8a', fontSize: '1.05rem' }}>
                  Nikesh Katuwal
                </strong>
              </div>
            </div>
          </div>

          <div className="pod-courier-sign-off">
            <span>Delivered by Courier Hero:</span>
            <strong>{order.rider?.name || 'Bikash Shrestha'} ({order.rider?.plateNumber || 'BA 99 PA 4201'})</strong>
          </div>
        </div>

        {/* Footer */}
        <div className="pod-footer">
          <button type="button" className="btn-pod-done" onClick={onClose}>
            Close Proof Record
          </button>
        </div>
      </div>
    </div>
  );
}
