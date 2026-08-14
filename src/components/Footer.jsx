import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  ShoppingBag,
  Send
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import './Footer.css';

const quickLinks = [
  { name: 'Daraz Mall', action: 'mall' },
  { name: 'Flash Sale', action: 'flash' },
  { name: 'Everyday Low Price', action: 'deals' },
  { name: 'Collect Vouchers', action: 'vouchers' },
  { name: 'Digital Wallet', action: 'wallet' }
];

const customerCareLinks = [
  { name: 'Track Order', action: 'track' },
  { name: '7 Days Return Policy', action: 'returns' },
  { name: 'Payment Security', action: 'payment' },
  { name: 'Help & FAQ', action: 'help' },
  { name: 'Contact Support', action: 'contact' }
];

export default function Footer() {
  const {
    showToast,
    setIsOrderTrackingOpen,
    setFilterMallOnly,
    setIsAuthOpen
  } = useShop();

  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    showToast(`Subscribed ${newsletterEmail}! Check your inbox for Rs. 300 voucher 🎉`, 'success');
    setNewsletterEmail('');
  };

  const handleQuickLink = (action) => {
    if (action === 'mall') {
      setFilterMallOnly(true);
      const el = document.getElementById('catalog-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'flash') {
      const el = document.getElementById('flash-sale-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'vouchers') {
      const el = document.getElementById('vouchers-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'wallet') {
      setIsAuthOpen(true);
    } else if (action === 'track') {
      setIsOrderTrackingOpen(true);
    } else {
      showToast(`Information page for "${action}" opened`, 'info');
    }
  };

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        {/* Col 1: Branding & Contact */}
        <div className="footer-col footer-branding">
          <div className="footer-logo">
            <div className="footer-logo-mark">
              <ShoppingBag size={20} />
            </div>
            <div>
              <h2>daraz<span>express</span></h2>
              <p>Nepal’s premier online shopping destination with authentic verified brands & countrywide express delivery.</p>
            </div>
          </div>

          <div className="footer-contact">
            <a href="mailto:support@daraz.np" className="contact-line">
              <Mail size={15} /> <span>support@darazexpress.np</span>
            </a>
            <a href="tel:+9779800000000" className="contact-line">
              <Phone size={15} /> <span>+977 01-5970000 / 980-1234567</span>
            </a>
            <div className="contact-line">
              <MapPin size={15} /> <span>Tinkune, Kathmandu, Nepal</span>
            </div>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="footer-col">
          <div className="footer-heading">Shop & Discover</div>
          <ul className="footer-link-list">
            {quickLinks.map((item) => (
              <li key={item.name}>
                <button
                  type="button"
                  className="footer-text-btn"
                  onClick={() => handleQuickLink(item.action)}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Customer Care */}
        <div className="footer-col">
          <div className="footer-heading">Customer Care</div>
          <ul className="footer-link-list">
            {customerCareLinks.map((item) => (
              <li key={item.name}>
                <button
                  type="button"
                  className="footer-text-btn"
                  onClick={() => handleQuickLink(item.action)}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Newsletter & Mobile App */}
        <div className="footer-col footer-newsletter-col">
          <div className="footer-heading">Stay in the Loop</div>
          <p className="newsletter-p">Subscribe to get secret discount vouchers & weekly flash deals.</p>
          <form onSubmit={handleNewsletterSubmit} className="footer-newsletter-form">
            <input
              type="email"
              required
              placeholder="Enter email address..."
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
            />
            <button type="submit" aria-label="Subscribe">
              <Send size={16} />
            </button>
          </form>

          <div className="footer-heading" style={{ marginTop: 20 }}>
            Payment & Trust
          </div>
          <div className="payment-badge-strip">
            <span className="pay-tag">eSewa</span>
            <span className="pay-tag">Khalti</span>
            <span className="pay-tag">VISA</span>
            <span className="pay-tag">Mastercard</span>
            <span className="pay-tag">COD</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-trust-notes">
          <ShieldCheck size={16} style={{ color: '#10b981' }} />
          <span>100% Genuine Products • 7 Days Hassle-Free Returns • Safe & Encrypted Checkout</span>
        </div>
        <div className="footer-copy">
          © 2026 Daraz Express Nepal. Designed with ❤️ for pair programming excellence.
        </div>
      </div>
    </footer>
  );
}
