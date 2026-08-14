import React, { useState } from 'react';
import { Smartphone, HelpCircle, Store, Truck, Globe, ChevronDown, Check } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function TopBar() {
  const { setIsOrderTrackingOpen, showToast } = useShop();
  const [selectedCurrency, setSelectedCurrency] = useState('NPR');
  const [isLangOpen, setIsLangOpen] = useState(false);

  const handleSellerClick = (e) => {
    e.preventDefault();
    showToast('Redirecting to Daraz Seller Center portal! 🏪', 'info');
  };

  const handleHelpClick = (e) => {
    e.preventDefault();
    showToast('Daraz 24/7 Live Support is available in Help Center!', 'info');
  };

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
          <a href="#seller" className="top-bar-link" onClick={handleSellerClick}>
            <Store size={13} />
            <span>Become a Seller</span>
          </a>
          <div className="top-bar-divider" />
          <button
            type="button"
            className="top-bar-link top-bar-btn"
            onClick={() => setIsOrderTrackingOpen(true)}
          >
            <Truck size={13} />
            <span>Track Order</span>
          </button>
        </div>

        <div className="top-bar-right">
          <a href="#help" className="top-bar-link" onClick={handleHelpClick}>
            <HelpCircle size={13} />
            <span>Help & Support</span>
          </a>
          <div className="top-bar-divider" />
          <div className="lang-curr-selector" onClick={() => setIsLangOpen(!isLangOpen)}>
            <Globe size={13} />
            <span>🇳🇵 NP / EN / {selectedCurrency}</span>
            <ChevronDown size={11} />

            {isLangOpen && (
              <div className="lang-popover" onClick={(e) => e.stopPropagation()}>
                <div
                  className={`lang-option ${selectedCurrency === 'NPR' ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCurrency('NPR');
                    setIsLangOpen(false);
                  }}
                >
                  <span>🇳🇵 Nepali Rupee (NPR / Rs.)</span>
                  {selectedCurrency === 'NPR' && <Check size={14} />}
                </div>
                <div
                  className={`lang-option ${selectedCurrency === 'USD' ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCurrency('USD');
                    setIsLangOpen(false);
                    showToast('Currency set to USD ($)', 'info');
                  }}
                >
                  <span>🇺🇸 US Dollar (USD / $)</span>
                  {selectedCurrency === 'USD' && <Check size={14} />}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
