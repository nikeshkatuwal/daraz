import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, X, Check, Search, Navigation } from 'lucide-react';

const popularLandmarks = [
  { name: 'New Road Gate, Kathmandu', coords: [27.7032, 85.3129] },
  { name: 'Thamel Chowk / Marg, Kathmandu', coords: [27.7153, 85.3123] },
  { name: 'Baneshwor Chowk (Near Parliament), Kathmandu', coords: [27.6915, 85.342] },
  { name: 'Patan Durbar Square / Jawalakhel, Lalitpur', coords: [27.6744, 85.324] },
  { name: 'Jhamsikhel Restaurant Street, Lalitpur', coords: [27.6785, 85.312] },
  { name: 'Lakeside Baidam, Pokhara', coords: [28.2096, 83.9592] },
  { name: 'Sallaghari / Suryabinayak, Bhaktapur', coords: [27.671, 85.429] }
];

export default function AddressMapPicker({ isOpen, onClose, onConfirmLocation, initialAddress }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  const [selectedCoords, setSelectedCoords] = useState([27.7058, 85.3168]);
  const [addressTitle, setAddressTitle] = useState(initialAddress || 'House 42, New Road, Kathmandu');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      if (!mapContainerRef.current) return;

      if (!mapInstanceRef.current) {
        const map = L.map(mapContainerRef.current, {
          center: selectedCoords,
          zoom: 15,
          zoomControl: true
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; OpenStreetMap &copy; CARTO',
          maxZoom: 19
        }).addTo(map);

        const pinIcon = L.divIcon({
          className: 'picker-pin-marker',
          html: `
            <div class="picker-animated-pin">
              <div class="pin-head">📍</div>
              <div class="pin-shadow"></div>
            </div>
          `,
          iconSize: [40, 40],
          iconAnchor: [20, 38]
        });

        const marker = L.marker(selectedCoords, {
          icon: pinIcon,
          draggable: true
        }).addTo(map);

        marker.on('dragend', (e) => {
          const latlng = e.target.getLatLng();
          setSelectedCoords([latlng.lat, latlng.lng]);
          setAddressTitle(`Pinned Location (${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}), Kathmandu`);
        });

        map.on('click', (e) => {
          marker.setLatLng(e.latlng);
          setSelectedCoords([e.latlng.lat, e.latlng.lng]);
          setAddressTitle(`Pinned Location (${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}), Nepal`);
        });

        markerRef.current = marker;
        mapInstanceRef.current = map;
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectLandmark = (landmark) => {
    setSelectedCoords(landmark.coords);
    setAddressTitle(landmark.name);
    if (mapInstanceRef.current && markerRef.current) {
      mapInstanceRef.current.flyTo(landmark.coords, 16, { animate: true });
      markerRef.current.setLatLng(landmark.coords);
    }
  };

  const handleConfirm = () => {
    onConfirmLocation({
      address: addressTitle,
      coords: selectedCoords
    });
    onClose();
  };

  return (
    <div className="modal-backdrop picker-modal-backdrop" onClick={onClose}>
      <div className="address-picker-card" onClick={(e) => e.stopPropagation()}>
        <div className="picker-header">
          <div className="picker-title">
            <MapPin size={22} style={{ color: '#f57224' }} />
            <div>
              <h3>Pinpoint Exact Delivery Location</h3>
              <p>Drag marker or tap map to ensure rider arrives directly at your gate</p>
            </div>
          </div>
          <button type="button" className="btn-close-picker" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Quick Landmark Suggestions */}
        <div className="picker-landmarks-row">
          <span className="landmark-label">Popular Spots:</span>
          <div className="landmark-chips-scroll">
            {popularLandmarks.map((lm, i) => (
              <button
                key={i}
                type="button"
                className="landmark-chip"
                onClick={() => handleSelectLandmark(lm)}
              >
                {lm.name.split(',')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Map Container */}
        <div className="picker-map-box">
          <div ref={mapContainerRef} className="picker-leaflet-map" />
        </div>

        {/* Footer with confirmed address & button */}
        <div className="picker-footer">
          <div className="picked-address-info">
            <MapPin size={18} style={{ color: '#10b981' }} />
            <div>
              <strong>Selected Address:</strong>
              <span>{addressTitle}</span>
            </div>
          </div>
          <div className="picker-btn-row">
            <button type="button" className="btn-picker-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="btn-picker-confirm" onClick={handleConfirm}>
              <Check size={18} /> Confirm Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
