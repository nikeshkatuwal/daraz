import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Navigation,
  Play,
  Pause,
  RotateCcw,
  Compass,
  Clock,
  Gauge,
  Maximize2
} from 'lucide-react';
import { cityRoutes } from '../../data/trackingData';

// Helper to calculate bearing/heading angle between two lat/lng points
function calculateBearing(startLat, startLng, destLat, destLng) {
  const startLatRad = (startLat * Math.PI) / 180;
  const startLngRad = (startLng * Math.PI) / 180;
  const destLatRad = (destLat * Math.PI) / 180;
  const destLngRad = (destLng * Math.PI) / 180;

  const y = Math.sin(destLngRad - startLngRad) * Math.cos(destLatRad);
  const x =
    Math.cos(startLatRad) * Math.sin(destLatRad) -
    Math.sin(startLatRad) * Math.cos(destLatRad) * Math.cos(destLngRad - startLngRad);
  let brng = (Math.atan2(y, x) * 180) / Math.PI;
  return (brng + 360) % 360;
}

// Linear interpolate between two coordinates
function interpolateCoord(coord1, coord2, factor) {
  return [
    coord1[0] + (coord2[0] - coord1[0]) * factor,
    coord1[1] + (coord2[1] - coord1[1]) * factor
  ];
}

// Calculate approximate distance in km
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function LiveDeliveryMap({
  cityName = 'Kathmandu',
  riderInfo,
  customDestination
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const riderMarkerRef = useRef(null);
  const traversedPolylineRef = useRef(null);
  const remainingPolylineRef = useRef(null);

  // Active route definition
  const routeData = cityRoutes[cityName] || cityRoutes.Kathmandu;
  const waypoints = routeData.waypoints;

  // Simulation State: progress 0.0 to 1.0 along the whole waypoints path
  const [progress, setProgress] = useState(0.45); // Start mid-way
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [currentSpeedKmh, setCurrentSpeedKmh] = useState(28);
  const [etaMinutes, setEtaMinutes] = useState(11);
  const [distanceKm, setDistanceKm] = useState(1.4);
  const [isArrived, setIsArrived] = useState(false);
  const [headingAngle, setHeadingAngle] = useState(45);

  // Compute current exact position along waypoints from progress (0 to 1)
  const getCurrentPosition = useCallback((prog) => {
    const totalSegments = waypoints.length - 1;
    const scaledProg = Math.max(0, Math.min(1, prog)) * totalSegments;
    const segmentIdx = Math.min(Math.floor(scaledProg), totalSegments - 1);
    const subProg = scaledProg - segmentIdx;

    const startPt = waypoints[segmentIdx];
    const endPt = waypoints[segmentIdx + 1];

    const currentCoords = interpolateCoord(startPt, endPt, subProg);
    const angle = calculateBearing(startPt[0], startPt[1], endPt[0], endPt[1]);

    return { coords: currentCoords, angle, segmentIdx, subProg };
  }, [waypoints]);

  // 1. Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const initialPos = waypoints[Math.floor(waypoints.length * 0.45)];
      const map = L.map(mapContainerRef.current, {
        center: initialPos,
        zoom: 14,
        zoomControl: false
      });

      // Sleek modern CartoDB / OSM voyager tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        maxZoom: 19
      }).addTo(map);

      // Custom Zoom control in bottom right
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // 1. Hub / Warehouse Marker
      const hubIcon = L.divIcon({
        className: 'custom-hub-marker',
        html: `
          <div class="hub-pin-bubble">
            <span class="hub-icon">🏬</span>
            <span class="hub-tooltip">Balaju Express Hub</span>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 36]
      });
      L.marker(waypoints[0], { icon: hubIcon })
        .addTo(map)
        .bindPopup(`<strong>Daraz Fulfillment Hub</strong><br>${routeData.hubName}`);

      // 2. Customer Destination Marker
      const destCoords = customDestination || waypoints[waypoints.length - 1];
      const destIcon = L.divIcon({
        className: 'custom-dest-marker',
        html: `
          <div class="dest-pin-bubble">
            <div class="pulse-ring"></div>
            <span class="dest-icon">🏠</span>
            <span class="dest-tooltip">Delivery Doorstep</span>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 38]
      });
      L.marker(destCoords, { icon: destIcon })
        .addTo(map)
        .bindPopup(`<strong>Your Delivery Address</strong><br>${routeData.destName}`);

      // 3. Traversed Route Polyline (Green/Solid)
      const traversedLine = L.polyline([], {
        color: '#10b981',
        weight: 6,
        opacity: 0.85,
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(map);
      traversedPolylineRef.current = traversedLine;

      // 4. Remaining Route Polyline (Daraz Orange / Dashed)
      const remainingLine = L.polyline(waypoints, {
        color: '#f57224',
        weight: 5,
        dashArray: '8, 8',
        opacity: 0.9,
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(map);
      remainingPolylineRef.current = remainingLine;

      // 5. Animated Rider Marker with Pulsing Radar
      const riderIcon = L.divIcon({
        className: 'custom-rider-marker',
        html: `
          <div id="rider-marker-container" class="rider-marker-wrapper">
            <div class="rider-radar-wave"></div>
            <div class="rider-radar-wave wave-2"></div>
            <div class="rider-vehicle-disc" id="rider-heading-disc">
              <span class="rider-vehicle-emoji">🛵</span>
            </div>
            <div class="rider-name-tag">
              <span class="live-dot"></span>
              <span>${riderInfo?.name?.split(' ')[0] || 'Bikash'} (Daraz Express)</span>
            </div>
          </div>
        `,
        iconSize: [50, 50],
        iconAnchor: [25, 25]
      });

      const riderMarker = L.marker(initialPos, {
        icon: riderIcon,
        zIndexOffset: 1000
      }).addTo(map);
      riderMarkerRef.current = riderMarker;

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [cityName]);

  // 2. Continuous Simulation Animation Loop
  useEffect(() => {
    if (!isPlaying || isArrived) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const step = 0.0035 * speedMultiplier;
        const next = prev + step;
        if (next >= 1) {
          setIsArrived(true);
          setIsPlaying(false);
          return 1;
        }
        return next;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isPlaying, speedMultiplier, isArrived]);

  // 3. Update Rider Marker, Heading, Polylines & Live Stats
  useEffect(() => {
    if (!mapInstanceRef.current || !riderMarkerRef.current) return;

    const { coords, angle, segmentIdx } = getCurrentPosition(progress);
    setHeadingAngle(angle);

    // Update marker location
    riderMarkerRef.current.setLatLng(coords);

    // Rotate the heading vehicle icon
    const discEl = document.getElementById('rider-heading-disc');
    if (discEl) {
      discEl.style.transform = `rotate(${angle - 45}deg)`;
    }

    // Split waypoints into traversed and remaining
    const traversedPts = [...waypoints.slice(0, segmentIdx + 1), coords];
    const remainingPts = [coords, ...waypoints.slice(segmentIdx + 1)];

    if (traversedPolylineRef.current) {
      traversedPolylineRef.current.setLatLngs(traversedPts);
    }
    if (remainingPolylineRef.current) {
      remainingPolylineRef.current.setLatLngs(remainingPts);
    }

    // Calculate remaining distance and ETA
    const destCoords = waypoints[waypoints.length - 1];
    const remDist = calculateDistanceKm(coords[0], coords[1], destCoords[0], destCoords[1]);
    setDistanceKm(parseFloat(remDist.toFixed(2)));

    // Simulated speed variance (22 - 38 km/h)
    const baseSpeed = isArrived ? 0 : Math.round(24 + Math.sin(progress * 20) * 8);
    setCurrentSpeedKmh(baseSpeed);

    // ETA calculation
    if (isArrived || remDist < 0.05) {
      setEtaMinutes(0);
      setIsArrived(true);
    } else {
      const mins = Math.max(1, Math.round((remDist / (baseSpeed || 25)) * 60));
      setEtaMinutes(mins);
    }
  }, [progress, isArrived, waypoints, getCurrentPosition]);

  // Map Controls Helpers
  const handleRecenterRider = () => {
    if (!mapInstanceRef.current) return;
    const { coords } = getCurrentPosition(progress);
    mapInstanceRef.current.flyTo(coords, 16, { animate: true, duration: 1 });
  };

  const handleFitAllRoute = () => {
    if (!mapInstanceRef.current) return;
    const bounds = L.latLngBounds(waypoints);
    mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40], animate: true });
  };

  const handleResetRoute = () => {
    setProgress(0.05);
    setIsArrived(false);
    setIsPlaying(true);
  };

  return (
    <div className="live-delivery-map-wrapper">
      {/* 1. Live Floating Status Header Overlay */}
      <div className="map-glass-header">
        <div className="status-indicator-badge">
          <span className="pulsing-green-dot"></span>
          <strong>{isArrived ? '🎉 Rider Arrived at Doorstep!' : '⚡ Live GPS Tracking Active'}</strong>
        </div>

        <div className="eta-badge-pill">
          <Clock size={15} style={{ color: '#f57224' }} />
          <span>{isArrived ? 'Delivered' : `ETA: ~${etaMinutes} mins (${distanceKm} km away)`}</span>
        </div>
      </div>

      {/* 2. Leaflet Map Render Node */}
      <div ref={mapContainerRef} className="leaflet-map-canvas" />

      {/* 3. Interactive Camera Quick Actions */}
      <div className="map-floating-camera-controls">
        <button
          type="button"
          className="map-action-btn"
          onClick={handleRecenterRider}
          title="Recenter on Rider"
        >
          <Navigation size={17} style={{ color: '#f57224' }} />
          <span>Rider</span>
        </button>
        <button
          type="button"
          className="map-action-btn"
          onClick={handleFitAllRoute}
          title="Fit Full Route"
        >
          <Maximize2 size={17} />
          <span>Route</span>
        </button>
      </div>

      {/* 4. Simulation & Control Toolbar */}
      <div className="map-simulation-bar">
        <div className="simulation-playback-group">
          <button
            type="button"
            className={`sim-btn ${isPlaying ? 'active-playing' : ''}`}
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pause Simulation' : 'Resume Simulation'}
          >
            {isPlaying ? <Pause size={15} /> : <Play size={15} />}
            <span>{isPlaying ? 'Pause' : 'Resume'}</span>
          </button>

          <button
            type="button"
            className="sim-btn"
            onClick={handleResetRoute}
            title="Restart Route from Hub"
          >
            <RotateCcw size={15} />
            <span>Restart</span>
          </button>

          <div className="speed-toggle-group">
            {[1, 2, 4].map((spd) => (
              <button
                key={spd}
                type="button"
                className={`speed-pill ${speedMultiplier === spd ? 'active' : ''}`}
                onClick={() => setSpeedMultiplier(spd)}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>

        {/* Live Metrics readout */}
        <div className="map-metrics-readout">
          <div className="metric-chip">
            <Gauge size={14} style={{ color: '#0ea5e9' }} />
            <span>Speed: <strong>{currentSpeedKmh} km/h</strong></span>
          </div>
          <div className="metric-chip">
            <Compass size={14} style={{ color: '#8b5cf6' }} />
            <span>Heading: <strong>{Math.round(headingAngle)}°</strong></span>
          </div>
          <div className="metric-chip progress-chip">
            <span>Route: <strong>{Math.round(progress * 100)}%</strong></span>
          </div>
        </div>
      </div>

      {/* 5. Live Progress Bar on bottom of map */}
      <div className="map-progress-track">
        <div
          className="map-progress-fill"
          style={{ width: `${Math.min(100, progress * 100)}%` }}
        />
      </div>
    </div>
  );
}
