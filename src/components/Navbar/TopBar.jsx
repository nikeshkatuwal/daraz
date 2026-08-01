import React from 'react';
import { Smartphone, HelpCircle, Store, Truck, Globe, ChevronDown } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="top-bar">
      <div className="top-bar-inner">
        <div className="top-bar-left">
          <div className="top-bar-link app-download-trigger">
            <Smartphone size={13} />
            <span>Save More on App</span>
            <div className="app-qr-popover">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://daraz.com.np/app"
                alt="Daraz App QR"
              />
              <span>Scan to Download Daraz App</span>
            </div>
          </div>
          <div className="top-bar-divider" />
          <a href="#seller" className="top-bar-link">
            <Store size={13} />
            <span>Become a Seller</span>
          </a>
          <div className="top-bar-divider" />
          <a href="#track" className="top-bar-link">
            <Truck size={13} />
            <span>Track Order</span>
          </a>
        </div>

        <div className="top-bar-right">
          <a href="#help" className="top-bar-link">
            <HelpCircle size={13} />
            <span>Help & Support</span>
          </a>
          <div className="top-bar-divider" />
          <div className="lang-curr-selector">
            <Globe size={13} />
            <span>🇳🇵 NP / EN / NPR</span>
            <ChevronDown size={11} />
          </div>
        </div>
      </div>
    </div>
  );
}
