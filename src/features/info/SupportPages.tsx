import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Search, Truck, ShieldCheck, RotateCcw, CreditCard, User, ChevronDown, MessageSquare, Mail } from 'lucide-react';

export const HelpCenterPage: React.FC = () => {
  const [query, setQuery] = useState('');

  const categories = [
    { title: 'Shipping & Delivery', icon: Truck, desc: 'Tracking, shipping rates, carrier options & delivery timelines.' },
    { title: 'Returns & Refunds', icon: RotateCcw, desc: '30-day hassle-free return policy, return labels & refund status.' },
    { title: 'Payments & Pricing', icon: CreditCard, desc: 'Accepted payment methods, invoices, currency conversion & sales tax.' },
    { title: 'Authenticity & Warranty', icon: ShieldCheck, desc: 'Artisan verification, certificates of authenticity & 2-year warranty.' },
    { title: 'Account & Security', icon: User, desc: 'Profile management, password reset, 2FA & data privacy.' },
    { title: 'Custom Commissions', icon: HelpCircle, desc: 'Commissioning custom art, interior styling & bespoke hardware.' },
  ];

  return (
    <div className="py-10 px-6 max-w-7xl mx-auto space-y-12 select-none">
      {/* Hero Search */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs font-bold text-gold-500 uppercase tracking-widest">Customer Concierge</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
          How can we assist you today?
        </h1>
        <p className="text-sm text-text-secondary">
          Search our knowledgebase or select a help topic below
        </p>

        <div className="relative max-w-lg mx-auto">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search help topics (e.g. shipping, returns, warranty)..."
            className="w-full pl-11 pr-4 py-3 text-xs bg-surface border border-border rounded-[8px] shadow-sm focus:outline-none focus:border-blue-600"
          />
          <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Help Topic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div
              key={idx}
              className="bg-surface rounded-[12px] border border-border p-6 shadow-sm hover:shadow-md hover:border-gold-500 transition-all space-y-3"
            >
              <div className="w-10 h-10 rounded-full bg-gold-500/15 text-gold-600 flex items-center justify-center">
                <Icon className="w-5 h-5 stroke-[1.8]" />
              </div>
              <h3 className="text-base font-bold text-navy-900">{cat.title}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{cat.desc}</p>
              <Link to="/faqs" className="inline-block text-xs font-bold text-blue-600 hover:underline pt-1">
                View related articles →
              </Link>
            </div>
          );
        })}
      </div>

      {/* Still need help */}
      <div className="bg-navy-900 text-white rounded-[12px] p-8 text-center max-w-3xl mx-auto space-y-4">
        <h2 className="text-xl font-bold">Still have questions?</h2>
        <p className="text-xs text-white/70 max-w-md mx-auto">
          Our specialized team of collectors, engineers, and concierge staff are available 24/7.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold px-6 py-2.5 rounded-btn text-xs transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Support</span>
          </Link>
          <Link
            to="/faqs"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-2.5 rounded-btn text-xs transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Browse FAQs</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const ContactUsPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="py-10 px-6 max-w-4xl mx-auto space-y-8 select-none">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-navy-900">Contact Local Art AI</h1>
        <p className="text-xs text-text-secondary">
          We’re here to help with any inquiries, order updates, or custom commissions.
        </p>
      </div>

      <div className="bg-surface rounded-[12px] border border-border p-6 sm:p-8 shadow-sm">
        {submitted ? (
          <div className="text-center py-8 space-y-2 text-green-700">
            <h3 className="text-lg font-bold">Message Dispatched!</h3>
            <p className="text-xs text-text-secondary">
              Thank you for reaching out. A senior concierge will respond within 2 business hours.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  className="w-full px-3 py-2 text-xs border border-border rounded-input focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full px-3 py-2 text-xs border border-border rounded-input focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1">Subject</label>
              <input
                type="text"
                required
                placeholder="Inquiry regarding..."
                className="w-full px-3 py-2 text-xs border border-border rounded-input focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1">Message</label>
              <textarea
                rows={5}
                required
                placeholder="How can our team assist you?"
                className="w-full px-3 py-2 text-xs border border-border rounded-input focus:outline-none focus:border-blue-600"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold py-3 rounded-btn text-xs transition-colors shadow-sm"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export const TrackOrderPage: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [tracked, setTracked] = useState(false);

  return (
    <div className="py-10 px-6 max-w-3xl mx-auto space-y-8 select-none">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-navy-900">Track Your Shipment</h1>
        <p className="text-xs text-text-secondary">
          Enter your Local Art AI Order ID or Carrier Tracking Number to view real-time transit status
        </p>
      </div>

      <div className="bg-surface rounded-[12px] border border-border p-6 shadow-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setTracked(true);
          }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="e.g. LA-89421"
            required
            className="flex-1 px-4 py-2.5 text-xs border border-border rounded-input focus:outline-none focus:border-blue-600"
          />
          <button
            type="submit"
            className="bg-navy-900 hover:bg-navy-800 text-white font-bold px-6 py-2.5 rounded-btn text-xs transition-colors shadow-sm"
          >
            Track Order
          </button>
        </form>
      </div>

      {tracked && (
        <div className="bg-surface rounded-[12px] border border-border p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div>
              <p className="text-xs text-gold-600 font-bold uppercase">Status: In Transit</p>
              <h3 className="text-base font-bold text-navy-900">Order #{orderId || 'LA-89421'}</h3>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
              On Schedule
            </span>
          </div>
          <p className="text-xs text-text-secondary">
            Estimated Delivery: <strong>September 12, 2026 by 8:00 PM</strong> via Express Courier.
          </p>
        </div>
      )}
    </div>
  );
};

export const ReturnsPage: React.FC = () => {
  return (
    <div className="py-10 px-6 max-w-4xl mx-auto space-y-8 select-none">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-navy-900">Returns & Refunds Policy</h1>
        <p className="text-xs text-text-secondary">
          30-day hassle-free returns on all verified products and art editions
        </p>
      </div>

      <div className="bg-surface rounded-[12px] border border-border p-8 shadow-sm prose max-w-none text-xs text-text-secondary space-y-4 leading-relaxed">
        <h3 className="text-sm font-bold text-navy-900">1. 30-Day Return Window</h3>
        <p>
          You may return any standard catalog item within 30 calendar days of delivery for a full refund or exchange. Items must be in their original packaging, unaltered, with all authenticity tags and accessories intact.
        </p>

        <h3 className="text-sm font-bold text-navy-900">2. Free Return Shipping</h3>
        <p>
          We provide prepaid return shipping labels for all domestic orders. Simply initiate a return request from your Account Orders dashboard to generate and print your label.
        </p>

        <h3 className="text-sm font-bold text-navy-900">3. Rapid Refund Processing</h3>
        <p>
          Once our fulfillment center receives and inspects your returned merchandise, refunds are automatically issued to your original payment method within 2–4 business days.
        </p>
      </div>
    </div>
  );
};

export const FaqsPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How are Local Art AI pieces authenticated?',
      a: 'Every artisan creation and custom hardware piece includes an archival certificate of authenticity with an immutable digital registry timestamp.',
    },
    {
      q: 'What are the shipping costs and delivery times?',
      a: 'All orders over $50 qualify for Free Standard Delivery (3–5 business days). Express shipping is available for $9.99 (1–2 business days).',
    },
    {
      q: 'Can I commission custom art or bespoke dimensions?',
      a: 'Yes! Our Services section connects you directly with featured generative and studio artists for 1-on-1 consultations and custom fabrications.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept Visa, Mastercard, American Express, PayPal, Google Pay, and Apple Pay through 256-bit encrypted checkout channels.',
    },
  ];

  return (
    <div className="py-10 px-6 max-w-4xl mx-auto space-y-8 select-none">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-navy-900">Frequently Asked Questions</h1>
        <p className="text-xs text-text-secondary">
          Find fast answers to common questions about orders, products, and shipping
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-surface rounded-[12px] border border-border overflow-hidden shadow-sm"
          >
            <button
              type="button"
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-navy-900 hover:bg-neutral-50"
            >
              <span>{faq.q}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${openIdx === idx ? 'rotate-180' : ''}`} />
            </button>
            {openIdx === idx && (
              <div className="px-6 pb-4 pt-1 text-xs text-text-secondary border-t border-border/50 bg-neutral-50/50 leading-relaxed">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
