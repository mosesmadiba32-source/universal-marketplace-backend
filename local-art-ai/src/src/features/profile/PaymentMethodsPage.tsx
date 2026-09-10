import React, { useState } from 'react';
import { CreditCard, Plus, Trash2, CheckCircle2, ShieldCheck } from 'lucide-react';

export const PaymentMethodsPage: React.FC = () => {
  const [methods, setMethods] = useState([
    {
      id: 'pm-1',
      brand: 'Visa',
      last4: '4242',
      exp: '08/28',
      holder: 'Artisan Collector',
      isDefault: true,
    },
    {
      id: 'pm-2',
      brand: 'Mastercard',
      last4: '8812',
      exp: '11/27',
      holder: 'Artisan Collector',
      isDefault: false,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExp, setCardExp] = useState('');

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || cardNumber.length < 4) return;

    setMethods([
      ...methods,
      {
        id: `pm-${Date.now()}`,
        brand: 'Visa',
        last4: cardNumber.slice(-4),
        exp: cardExp || '12/29',
        holder: cardHolder || 'Artisan Collector',
        isDefault: methods.length === 0,
      },
    ]);
    setShowAddForm(false);
    setCardNumber('');
    setCardHolder('');
    setCardExp('');
  };

  const handleSetDefault = (id: string) => {
    setMethods(methods.map((m) => ({ ...m, isDefault: m.id === id })));
  };

  const handleRemove = (id: string) => {
    setMethods(methods.filter((m) => m.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-[12px] border border-border p-6 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-navy-900">Payment Methods</h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Manage your saved credit cards, billing profiles, and payment tokens
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-btn text-xs transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Payment Method</span>
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddCard} className="bg-surface rounded-[12px] border border-blue-200 p-6 shadow-md space-y-4">
          <h3 className="text-sm font-bold text-navy-900">Add New Card</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1">Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="4242 •••• •••• 4242"
                required
                className="w-full px-3 py-2 text-xs border border-border rounded-input focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1">Cardholder Name</label>
              <input
                type="text"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                placeholder="Full Name"
                required
                className="w-full px-3 py-2 text-xs border border-border rounded-input focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1">Expiry Date</label>
              <input
                type="text"
                value={cardExp}
                onChange={(e) => setCardExp(e.target.value)}
                placeholder="MM/YY"
                required
                className="w-full px-3 py-2 text-xs border border-border rounded-input focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1">Security Code (CVC)</label>
              <input
                type="password"
                maxLength={4}
                placeholder="•••"
                required
                className="w-full px-3 py-2 text-xs border border-border rounded-input focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-xs text-text-secondary hover:bg-neutral-100 rounded-btn"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-gold-500 hover:bg-gold-600 text-navy-900 rounded-btn transition-colors"
            >
              Save Card
            </button>
          </div>
        </form>
      )}

      {/* Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {methods.map((method) => (
          <div
            key={method.id}
            className="bg-surface rounded-[12px] border border-border p-5 shadow-sm space-y-4 relative"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-7 rounded bg-navy-900 text-white font-black text-[10px] flex items-center justify-center tracking-tighter">
                  {method.brand.toUpperCase()}
                </div>
                <div>
                  <p className="text-xs font-bold text-navy-900">
                    {method.brand} ending in {method.last4}
                  </p>
                  <p className="text-[11px] text-text-secondary">Expires {method.exp}</p>
                </div>
              </div>

              {method.isDefault ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Default</span>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => handleSetDefault(method.id)}
                  className="text-xs text-blue-600 hover:underline font-medium"
                >
                  Set as default
                </button>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border text-xs">
              <span className="text-text-secondary">{method.holder}</span>
              <button
                type="button"
                onClick={() => handleRemove(method.id)}
                className="text-text-secondary hover:text-red-600 p-1 transition-colors"
                aria-label="Remove card"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
