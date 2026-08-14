import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastNotification() {
  const { toasts, removeToast } = useShop();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let iconColor = '#10b981';

        if (toast.type === 'error') {
          Icon = AlertCircle;
          iconColor = '#ef4444';
        } else if (toast.type === 'info') {
          Icon = Info;
          iconColor = '#3b82f6';
        }

        return (
          <div key={toast.id} className={`toast-card toast-${toast.type || 'success'}`}>
            <Icon size={18} style={{ color: iconColor, flexShrink: 0 }} />
            <span className="toast-message">{toast.message}</span>
            <button
              type="button"
              className="toast-close-btn"
              onClick={() => removeToast(toast.id)}
              aria-label="Dismiss notification"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
