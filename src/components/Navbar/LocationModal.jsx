import React from 'react';
import { MapPin, X, Check } from 'lucide-react';
import { locationsList } from '../../data/mockData';

export default function LocationModal({ isOpen, onClose, currentLocation, onSelectLocation }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="location-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <MapPin size={18} style={{ color: '#f57224' }} />
            <h3>Select Delivery Location</h3>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">
          <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 8px 0' }}>
            Choose your city and address to see accurate delivery speed & product availability:
          </p>
          {locationsList.map((loc, idx) => {
            const isSelected =
              currentLocation.city === loc.city && currentLocation.area === loc.area;
            return (
              <div
                key={idx}
                className={`location-option-card ${isSelected ? 'selected' : ''}`}
                onClick={() => {
                  onSelectLocation(loc);
                  onClose();
                }}
              >
                <div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#1e293b' }}>
                    {loc.area}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                    {loc.city}, Nepal
                  </div>
                </div>
                {isSelected && <Check size={18} style={{ color: '#f57224' }} />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
