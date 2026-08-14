import React from 'react';
import { useShop } from '../context/ShopContext';
import { Gift, Check, Tag, Sparkles } from 'lucide-react';

export default function VoucherBanner() {
  const { collectibleVouchers, collectedVoucherIds, collectVoucher } = useShop();

  return (
    <section className="voucher-hub-section">
      <div className="voucher-hub-header">
        <div className="voucher-hub-title">
          <Gift size={20} style={{ color: '#f57224' }} />
          <div>
            <h3>Voucher Collection Hub</h3>
            <p>Collect coupons now & enjoy automatic savings during checkout</p>
          </div>
        </div>
        <div className="voucher-hub-badge">
          <Sparkles size={14} /> Mega Savings 2026
        </div>
      </div>

      <div className="voucher-cards-grid">
        {collectibleVouchers.map((voucher) => {
          const isCollected = collectedVoucherIds.includes(voucher.id);
          return (
            <div
              key={voucher.id}
              className={`voucher-card ${isCollected ? 'is-collected' : ''}`}
            >
              <div className="voucher-card-left" style={{ borderColor: voucher.color }}>
                <span className="voucher-tag-pill" style={{ color: voucher.color }}>
                  {voucher.tag}
                </span>
                <h4 className="voucher-title">{voucher.title}</h4>
                <p className="voucher-sub">{voucher.subtitle}</p>
                <div className="voucher-code-chip">
                  <Tag size={11} /> CODE: <strong>{voucher.code}</strong>
                </div>
              </div>

              <div className="voucher-card-right">
                <button
                  type="button"
                  className={`btn-voucher-collect ${isCollected ? 'collected' : ''}`}
                  onClick={() => collectVoucher(voucher)}
                  disabled={isCollected}
                >
                  {isCollected ? (
                    <>
                      <Check size={14} /> Collected
                    </>
                  ) : (
                    'COLLECT'
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
