import React from 'react';
import { X, Printer, Download, ShieldCheck, Truck, QrCode } from 'lucide-react';

export default function DeliveryInvoiceModal({ isOpen, onClose, order }) {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-backdrop invoice-modal-backdrop" onClick={onClose}>
      <div className="invoice-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Invoice Actions Toolbar */}
        <div className="invoice-toolbar no-print">
          <div className="invoice-toolbar-title">
            <Truck size={18} style={{ color: '#f57224' }} />
            <span>Official Daraz Express Airway Bill (AWB) & Tax Invoice</span>
          </div>
          <div className="invoice-toolbar-btns">
            <button type="button" className="btn-invoice-action" onClick={handlePrint}>
              <Printer size={15} /> Print / Save PDF
            </button>
            <button type="button" className="btn-close-invoice" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Invoice Sheet */}
        <div className="invoice-sheet-container" id="printable-invoice">
          {/* Header */}
          <div className="inv-header-row">
            <div className="inv-brand-box">
              <h2 className="inv-brand-name">
                daraz<span>express</span>
              </h2>
              <span className="inv-tagline">Daraz Nepal E-Commerce Logistics Pvt. Ltd.</span>
              <span className="inv-vat-pan">PAN/VAT: 601249821 • Kathmandu, Nepal</span>
            </div>

            <div className="inv-awb-barcode-box">
              <div className="fake-barcode-lines">
                <span>||||||||||||||||||||||||||||||||||||||||||||||||||||||||||</span>
              </div>
              <strong className="inv-tracking-code">AWB #{order.orderId}</strong>
              <span className="inv-status-stamp">VERIFIED & PREPAID</span>
            </div>
          </div>

          <div className="inv-divider-thick" />

          {/* Sender / Receiver Grid */}
          <div className="inv-parties-grid">
            <div className="inv-party-card">
              <span className="inv-party-label">SHIP FROM (ORIGIN):</span>
              <strong>Daraz Central Logistics Hub</strong>
              <span>Ring Road Balaju Distribution Center</span>
              <span>Kathmandu, Bagmati Province, Nepal</span>
              <span>Hub Helpline: +977 1-5970000</span>
            </div>

            <div className="inv-party-card">
              <span className="inv-party-label">DELIVER TO (CONSIGNEE):</span>
              <strong>Nikesh Katuwal</strong>
              <span>{order.deliveryAddress || 'New Road, Kathmandu'}</span>
              <span>Phone: {order.contactPhone || '+977 9841-234567'}</span>
              <span>Delivery Slot: {order.deliveryEstimate || 'Express Priority'}</span>
            </div>
          </div>

          {/* Courier & Security Meta */}
          <div className="inv-courier-meta-row">
            <div>
              <span>Assigned Courier Hero:</span>
              <strong>{order.rider?.name || 'Bikash Shrestha'} ({order.rider?.plateNumber || 'BA 99 PA 4201'})</strong>
            </div>
            <div>
              <span>Handover OTP Code:</span>
              <strong style={{ letterSpacing: 2 }}>{order.otpCode || '4821'}</strong>
            </div>
            <div>
              <span>Payment Gateway:</span>
              <strong>{order.paymentMethod || 'eSewa Mobile Wallet'}</strong>
            </div>
          </div>

          {/* Itemized Table */}
          <table className="inv-items-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Item Description & Specification</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Total (NPR)</th>
              </tr>
            </thead>
            <tbody>
              {order.items && order.items.length > 0 ? (
                order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>
                      <strong>{item.title}</strong>
                      <span className="inv-item-sub">SKU: DZ-{item.id || 100 + idx} • Verified Authentic</span>
                    </td>
                    <td>{item.quantity || 1}</td>
                    <td>Rs. {item.price?.toLocaleString()}</td>
                    <td>Rs. {((item.price || 0) * (item.quantity || 1)).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>1</td>
                  <td>Express Delivery Package Order</td>
                  <td>1</td>
                  <td>Rs. {order.totalAmount?.toLocaleString()}</td>
                  <td>Rs. {order.totalAmount?.toLocaleString()}</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Summary & QR Code */}
          <div className="inv-summary-row">
            <div className="inv-qr-col">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=https://daraz.com.np/track/${order.orderId}`}
                alt="AWB QR"
                className="inv-qr-code"
              />
              <span>Scan QR to verify delivery signature</span>
            </div>

            <div className="inv-calc-col">
              <div className="inv-calc-row">
                <span>Subtotal:</span>
                <span>Rs. {order.subtotal?.toLocaleString() || order.totalAmount?.toLocaleString()}</span>
              </div>
              {order.voucherDiscount > 0 && (
                <div className="inv-calc-row" style={{ color: '#10b981' }}>
                  <span>Voucher Discount:</span>
                  <span>- Rs. {order.voucherDiscount.toLocaleString()}</span>
                </div>
              )}
              <div className="inv-calc-row">
                <span>Express Shipping Fee:</span>
                <span>{order.shippingFee === 0 ? 'FREE' : `Rs. ${order.shippingFee || 0}`}</span>
              </div>
              <div className="inv-calc-row grand-total">
                <span>Grand Total Paid:</span>
                <span>Rs. {order.totalAmount?.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Footer Terms */}
          <div className="inv-footer-notes">
            <p>
              Thank you for shopping with Daraz Express! 7-day hassle-free returns policy applicable.
              For assistance, visit helpcenter.daraz.com.np or call 01-5970000.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
