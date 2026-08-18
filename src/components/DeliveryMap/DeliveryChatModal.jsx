import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Phone, ShieldCheck, CheckCheck, Sparkles } from 'lucide-react';
import { cannedDeliveryMessages } from '../../data/trackingData';

export default function DeliveryChatModal({ isOpen, onClose, rider, onOpenCall }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'rider',
      text: `Namaste! I am ${rider?.name || 'Bikash'}, your Daraz Express delivery hero. I have picked up your order and am heading towards your location.`,
      time: '11:42 AM'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = (textToSend) => {
    const txt = textToSend || inputVal;
    if (!txt.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: txt.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');

    // Simulate Rider intelligent reply after short delay
    setIsTyping(true);
    setTimeout(() => {
      let replyText = 'Understood! I will follow your instructions carefully.';
      const lower = txt.toLowerCase();
      if (lower.includes('gate') || lower.includes('security')) {
        replyText = 'Sure sir, I will hand over the parcel to the security guard and verify the OTP.';
      } else if (lower.includes('call') || lower.includes('phone')) {
        replyText = 'Noted! I will ring your phone 2 minutes before reaching your doorstep.';
      } else if (lower.includes('floor') || lower.includes('flat')) {
        replyText = 'Got it! I will bring it directly upstairs to your flat.';
      } else if (lower.includes('where') || lower.includes('time') || lower.includes('eta')) {
        replyText = 'I am currently crossing the main intersection, arriving in about 8-10 minutes!';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'rider',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="modal-backdrop chat-modal-backdrop" onClick={onClose}>
      <div className="delivery-chat-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="chat-header">
          <div className="chat-rider-profile">
            <div className="rider-avatar-wrap">
              <img
                src={rider?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                alt={rider?.name}
                className="chat-avatar-img"
              />
              <span className="online-indicator-dot"></span>
            </div>
            <div>
              <div className="rider-name-title">
                <h4>{rider?.name || 'Bikash Shrestha'}</h4>
                <span className="verified-pill">
                  <ShieldCheck size={13} /> Verified Rider
                </span>
              </div>
              <span className="rider-plate-sub">{rider?.vehicle} • {rider?.plateNumber}</span>
            </div>
          </div>

          <div className="chat-header-actions">
            {onOpenCall && (
              <button
                type="button"
                className="btn-call-icon"
                onClick={() => {
                  onClose();
                  onOpenCall();
                }}
                title="Voice Call Rider"
              >
                <Phone size={18} />
              </button>
            )}
            <button type="button" className="btn-close-chat" onClick={onClose} aria-label="Close">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Quick Canned Instruction Prompts */}
        <div className="chat-canned-prompts">
          <div className="canned-scroll">
            {cannedDeliveryMessages.map((msg, i) => (
              <button
                key={i}
                type="button"
                className="canned-chip"
                onClick={() => handleSend(msg)}
              >
                {msg}
              </button>
            ))}
          </div>
        </div>

        {/* Messages Body */}
        <div className="chat-messages-body">
          <div className="chat-security-banner">
            🔒 Direct encrypted delivery communication between customer and courier hero.
          </div>

          {messages.map((m) => (
            <div
              key={m.id}
              className={`chat-bubble-row ${m.sender === 'user' ? 'user-side' : 'rider-side'}`}
            >
              <div className="chat-bubble">
                <p>{m.text}</p>
                <div className="bubble-meta">
                  <span className="bubble-time">{m.time}</span>
                  {m.sender === 'user' && <CheckCheck size={14} className="seen-icon" />}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="chat-bubble-row rider-side">
              <div className="typing-bubble">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Footer */}
        <form
          className="chat-input-footer"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            type="text"
            placeholder="Type instructions for delivery hero..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
          <button type="submit" className="btn-send-chat" disabled={!inputVal.trim()}>
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
