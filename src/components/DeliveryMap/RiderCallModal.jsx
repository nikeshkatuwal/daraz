import React, { useState, useEffect } from 'react';
import { PhoneOff, Mic, MicOff, Volume2, VolumeX, ShieldCheck } from 'lucide-react';

export default function RiderCallModal({ isOpen, onClose, rider }) {
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);
  const [callStatus, setCallStatus] = useState('Connecting...');

  useEffect(() => {
    let timer;
    if (isOpen) {
      setCallDuration(0);
      setCallStatus('Ringing rider...');
      
      const connectTimeout = setTimeout(() => {
        setCallStatus('Connected (HD Voice)');
        timer = setInterval(() => {
          setCallDuration((prev) => prev + 1);
        }, 1000);
      }, 2000);

      return () => {
        clearTimeout(connectTimeout);
        if (timer) clearInterval(timer);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const formatDuration = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(remainingSecs).padStart(2, '0')}`;
  };

  return (
    <div className="modal-backdrop call-modal-backdrop" onClick={onClose}>
      <div className="call-card-container" onClick={(e) => e.stopPropagation()}>
        {/* Animated Sound Wave Rings */}
        <div className="call-pulse-wrapper">
          <div className="call-pulse-ring ring-1"></div>
          <div className="call-pulse-ring ring-2"></div>
          <img
            src={rider?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
            alt={rider?.name}
            className="call-avatar-photo"
          />
        </div>

        <div className="call-info-box">
          <h3>{rider?.name || 'Bikash Shrestha'}</h3>
          <span className="call-status-label">{callStatus}</span>
          {callDuration > 0 && <span className="call-timer">{formatDuration(callDuration)}</span>}
          <div className="call-rider-badge">
            <ShieldCheck size={14} style={{ color: '#10b981' }} />
            <span>Daraz Express Courier • {rider?.plateNumber}</span>
          </div>
        </div>

        {/* Call Action Controls */}
        <div className="call-actions-row">
          <button
            type="button"
            className={`call-action-btn ${isMuted ? 'active-toggled' : ''}`}
            onClick={() => setIsMuted(!isMuted)}
            title="Mute / Unmute"
          >
            {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
            <span>{isMuted ? 'Unmute' : 'Mute'}</span>
          </button>

          <button
            type="button"
            className="call-end-btn"
            onClick={onClose}
            title="End Voice Call"
          >
            <PhoneOff size={24} />
          </button>

          <button
            type="button"
            className={`call-action-btn ${isSpeaker ? 'active-toggled' : ''}`}
            onClick={() => setIsSpeaker(!isSpeaker)}
            title="Speakerphone"
          >
            {isSpeaker ? <Volume2 size={20} /> : <VolumeX size={20} />}
            <span>Speaker</span>
          </button>
        </div>
      </div>
    </div>
  );
}
