import React, { useState } from 'react';
import { Menu, X, ShoppingBag, Search, User, MapPin, Heart } from 'lucide-react';
import { categoriesData } from '../../data/mockData';

export default function MobileNavbar({
  currentLocation,
  cartCount,
  onOpenLocationModal
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="mobile-navbar">
      {/* Mobile Top Row */}
      <div className="mobile-top-row">
        <button
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          style={{ background: 'none', border: 'none', color: '#0f172a', padding: 4 }}
        >
          <Menu size={22} />
        </button>

        <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
          <div
            style={{
              background: '#f57224',
              color: 'white',
              borderRadius: 8,
              width: 28,
              height: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ShoppingBag size={16} />
          </div>
          <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e293b' }}>
            daraz<span style={{ color: '#f57224' }}>express</span>
          </span>
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            type="button"
            onClick={onOpenLocationModal}
            style={{ background: 'none', border: 'none', color: '#64748b' }}
          >
            <MapPin size={20} />
          </button>
          <div style={{ position: 'relative' }}>
            <ShoppingBag size={22} style={{ color: '#f57224' }} />
            {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
          </div>
        </div>
      </div>

      {/* Mobile Search Row */}
      <div className="mobile-search-row">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: '#f1f5f9',
            borderRadius: 20,
            padding: '6px 14px',
            gap: 8
          }}
        >
          <Search size={16} style={{ color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search items in Daraz..."
            style={{
              border: 'none',
              background: 'transparent',
              outline: 'none',
              width: '100%',
              fontSize: '0.84rem'
            }}
          />
        </div>
      </div>

      {/* Mobile Slide Drawer Overlay */}
      {isDrawerOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setIsDrawerOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: 12,
                borderBottom: '1px solid #e2e8f0'
              }}
            >
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f57224' }}>
                Daraz Menu
              </span>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                style={{ background: 'none', border: 'none', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '16px 0', borderBottom: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b' }}>
                Welcome to Daraz!
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', margin: '4px 0 12px 0' }}>
                Sign in to manage orders & vouchers
              </div>
              <button
                type="button"
                style={{
                  width: '100%',
                  background: '#f57224',
                  color: 'white',
                  border: 'none',
                  padding: 8,
                  borderRadius: 6,
                  fontWeight: 700,
                  fontSize: '0.84rem'
                }}
              >
                SIGN IN / REGISTER
              </button>
            </div>

            <div style={{ padding: '12px 0' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 8 }}>
                Categories
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {categoriesData.map((cat) => (
                  <li
                    key={cat.id}
                    style={{
                      padding: '8px 0',
                      fontSize: '0.86rem',
                      fontWeight: 600,
                      color: '#334155',
                      borderBottom: '1px solid #f8fafc'
                    }}
                  >
                    {cat.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
