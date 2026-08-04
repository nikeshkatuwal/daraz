import React from 'react';
import {
    Share2,
    Mail,
    Phone,
    MapPin,
    ShieldCheck,
    ShoppingBag
} from 'lucide-react';
import './Footer.css';

const quickLinks = ['Daraz Mall', 'Flash Sale', 'Daily Deals', 'Daraz Wallet', 'Coupons'];
const customerCareLinks = ['Track Order', 'Returns', 'Payment Options', 'Help Center', 'Contact Us'];
const companyLinks = ['About Us', 'Careers', 'Daraz Policies', 'Privacy Policy', 'Terms of Use'];

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-inner">
                <div className="footer-col footer-branding">
                    <div className="footer-logo">
                        <div className="footer-logo-mark">
                            <ShoppingBag size={18} />
                        </div>
                        <div>
                            <h2>Daraz Express</h2>
                            <p>Shop trusted brands, discover daily deals, and enjoy fast local delivery across Nepal.</p>
                        </div>
                    </div>

                    <div className="footer-contact">
                        <div>
                            <Mail size={16} /> <span>support@darazexpress.com</span>
                        </div>
                        <div>
                            <Phone size={16} /> <span>+977 980-000-0000</span>
                        </div>
                        <div>
                            <MapPin size={16} /> <span>Kathmandu, Nepal</span>
                        </div>
                    </div>
                </div>

                <div className="footer-col">
                    <div className="footer-heading">Quick Links</div>
                    <ul className="footer-link-list">
                        {quickLinks.map((link) => (
                            <li key={link}>
                                <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}>{link}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="footer-col">
                    <div className="footer-heading">Customer Care</div>
                    <ul className="footer-link-list">
                        {customerCareLinks.map((link) => (
                            <li key={link}>
                                <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}>{link}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="footer-col">
                    <div className="footer-heading">Connect & Download</div>
                    <div className="footer-social-icons">
                        <a href="#share" aria-label="Share">
                            <Share2 size={18} />
                        </a>
                        <a href="#mail" aria-label="Email">
                            <Mail size={18} />
                        </a>
                        <a href="#phone" aria-label="Phone">
                            <Phone size={18} />
                        </a>
                        <a href="#location" aria-label="Location">
                            <MapPin size={18} />
                        </a>
                    </div>
                    <div className="footer-app-badges">
                        <div className="footer-badge">App Store</div>
                        <div className="footer-badge">Google Play</div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <span>
                    <ShieldCheck size={14} /> Secure shopping with verified sellers & safe checkout.
                </span>
                <span>© 2026 Daraz Express. All rights reserved.</span>
            </div>
        </footer>
    );
}
