import React, { useState } from 'react';
import { HelpCircle, Mail, MessageSquare, Phone, CheckCircle2 } from 'lucide-react';

export const SupportPage: React.FC = () => {
  const [topic, setTopic] = useState('order');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-[12px] border border-border p-6 shadow-sm">
        <h2 className="text-xl font-bold text-navy-900">Concierge & Help Support</h2>
        <p className="text-xs text-text-secondary mt-0.5">
          Submit an inquiry, open a support ticket, or connect directly with our curator team
        </p>
      </div>

      {/* Quick Contact Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface rounded-[12px] border border-border p-5 shadow-sm space-y-1">
          <div className="w-8 h-8 rounded-full bg-gold-500/15 text-gold-600 flex items-center justify-center mb-2">
            <Mail className="w-4 h-4" />
          </div>
          <p className="text-xs font-bold text-navy-900">Email Support</p>
          <p className="text-xs text-text-secondary">support@localart.ai</p>
          <p className="text-[11px] text-text-secondary pt-1">Response time: ~2 hours</p>
        </div>

        <div className="bg-surface rounded-[12px] border border-border p-5 shadow-sm space-y-1">
          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
            <MessageSquare className="w-4 h-4" />
          </div>
          <p className="text-xs font-bold text-navy-900">Live Concierge</p>
          <p className="text-xs text-text-secondary">Available 24/7 in-app</p>
          <p className="text-[11px] text-green-600 font-semibold pt-1">● Agents Online</p>
        </div>

        <div className="bg-surface rounded-[12px] border border-border p-5 shadow-sm space-y-1">
          <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-2">
            <Phone className="w-4 h-4" />
          </div>
          <p className="text-xs font-bold text-navy-900">Phone Hotline</p>
          <p className="text-xs text-text-secondary">+1 (800) 555-0199</p>
          <p className="text-[11px] text-text-secondary pt-1">Mon–Fri 8am–8pm EST</p>
        </div>
      </div>

      {/* Support Form */}
      <div className="bg-surface rounded-[12px] border border-border p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-navy-900">Open a Support Request</h3>

        {submitted ? (
          <div className="p-6 bg-green-50 text-green-800 rounded-lg text-center space-y-2 border border-green-200">
            <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto" />
            <p className="text-sm font-bold">Ticket #TKT-8942 Created Successfully!</p>
            <p className="text-xs text-green-700">
              A support specialist has been assigned to your ticket and will respond via email shortly.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setSubject('');
                setMessage('');
              }}
              className="mt-2 text-xs font-bold text-green-800 underline"
            >
              Submit another inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">Inquiry Topic</label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-border rounded-input focus:outline-none focus:border-blue-600 bg-surface"
                >
                  <option value="order">Order & Shipment Tracking</option>
                  <option value="return">Returns, Refunds & Exchanges</option>
                  <option value="product">Product Authenticity & Specs</option>
                  <option value="billing">Billing & Payment Questions</option>
                  <option value="general">General Marketplace Question</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Question regarding delivery date"
                  required
                  className="w-full px-3 py-2 text-xs border border-border rounded-input focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1">Detailed Message</label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Please describe your question or issue in detail..."
                required
                className="w-full px-3 py-2 text-xs border border-border rounded-input focus:outline-none focus:border-blue-600"
              />
            </div>

            <button
              type="submit"
              className="bg-navy-900 hover:bg-navy-800 text-white font-bold px-6 py-2.5 rounded-btn text-xs transition-colors shadow-sm"
            >
              Submit Ticket
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
