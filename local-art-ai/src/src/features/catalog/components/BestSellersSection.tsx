import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../../shared/store/cartStore';
import { useAuthStore } from '../../../shared/store/authStore';
import { formatPrice } from '../../../shared/lib/utils';
import { ArrowRight, MapPin, Truck, CreditCard, CheckCircle, ShoppingBag } from 'lucide-react';

export const BestSellersSection: React.FC = () => {
  const navigate = useNavigate();
  const { items, getSubtotal, getShipping, getTax, getTotal, getItemCount } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');

  const subtotal = getSubtotal();
  const shippingFee = shippingMethod === 'express' ? 9.99 : (subtotal >= 50 ? 0 : 9.99);
  const tax = getTax();
  const total = subtotal + shippingFee + tax;
  const itemCount = getItemCount();

  const steps = [
    { num: 1, label: 'Shipping', active: true },
    { num: 2, label: 'Payment', active: false },
    { num: 3, label: 'Review', active: false },
    { num: 4, label: 'Confirmation', active: false },
  ];

  return (
    <section className="py-space-10 md:py-space-16 px-6 max-w-7xl mx-auto select-none">
      {/* Heading Row (§2 Fraunces H2) */}
      <div className="flex items-center justify-between mb-space-8">
        <div>
          <h2 className="font-serif font-medium text-[28px] md:text-[34px] leading-[40px] text-ink-900 tracking-[-0.25px]">
            Curator Best Sellers
          </h2>
          <p className="text-xs text-ink-600 mt-1 font-sans">
            Top-rated collector favorites & express checkout preview
          </p>
        </div>
        <Link
          to="/marketplace?sort=bestsellers"
          className="inline-flex items-center gap-space-1 text-sm font-sans font-semibold text-gold-700 hover:text-gold-900 transition-colors"
        >
          <span>View All</span>
          <ArrowRight className="w-4 h-4 stroke-2" />
        </Link>
      </div>

      {/* Stepper Header */}
      <div className="bg-surface rounded-[12px] border border-border p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between max-w-2xl mx-auto mb-8 relative">
          {/* Connector Line */}
          <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-[2px] bg-border z-0" />

          {steps.map((step) => (
            <div key={step.num} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  step.active
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-surface border-2 border-border text-text-secondary'
                }`}
              >
                {step.num}
              </div>
              <span
                className={`text-xs mt-1.5 font-medium ${
                  step.active ? 'text-blue-600 font-bold' : 'text-text-secondary'
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* Dynamic State: If cart has items vs prompt state */}
        {items.length === 0 ? (
          <div className="text-center py-8 space-y-3 bg-neutral-50 rounded-lg p-6 border border-dashed border-border">
            <ShoppingBag className="w-10 h-10 text-neutral-400 mx-auto" />
            <h3 className="text-sm font-bold text-text-primary">
              Start shopping to see your order here
            </h3>
            <p className="text-xs text-text-secondary max-w-sm mx-auto">
              Add trending items or best sellers to preview express checkout and free shipping status.
            </p>
            <Link
              to="/marketplace?sort=bestsellers"
              className="inline-flex items-center gap-1.5 bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold px-5 py-2 rounded-btn text-xs transition-colors"
            >
              <span>Explore Best Sellers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          /* 3 Cards Beneath Stepper */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Card 1: Shipping Address */}
            <div className="bg-neutral-50 rounded-lg p-4 border border-border flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-text-primary flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span>Shipping Address</span>
                  </span>
                  <Link
                    to="/account/addresses"
                    className="text-xs text-blue-600 hover:underline font-medium"
                  >
                    Change
                  </Link>
                </div>

                <div className="text-xs text-text-secondary space-y-1">
                  <p className="font-semibold text-text-primary">
                    {isAuthenticated ? `${user?.firstName} ${user?.lastName || ''}` : 'Artisan Collector'}
                  </p>
                  <p>742 Evergreen Terrace</p>
                  <p>San Francisco, CA 94107</p>
                  <p>United States</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-border/80 text-[11px] text-green-600 font-medium flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Verified delivery location</span>
              </div>
            </div>

            {/* Card 2: Shipping Method */}
            <div className="bg-neutral-50 rounded-lg p-4 border border-border space-y-3">
              <span className="text-xs font-bold text-text-primary flex items-center gap-1.5 mb-1">
                <Truck className="w-4 h-4 text-blue-600" />
                <span>Shipping Method</span>
              </span>

              <label className="flex items-start gap-2.5 p-2 rounded bg-surface border border-border cursor-pointer">
                <input
                  type="radio"
                  name="shipping"
                  checked={shippingMethod === 'standard'}
                  onChange={() => setShippingMethod('standard')}
                  className="mt-0.5 text-blue-600 focus:ring-blue-500"
                />
                <div className="text-xs">
                  <p className="font-semibold text-text-primary">
                    Standard Shipping {subtotal >= 50 ? '— Free' : '— $9.99'}
                  </p>
                  <p className="text-[11px] text-text-secondary">3–5 business days</p>
                </div>
              </label>

              <label className="flex items-start gap-2.5 p-2 rounded bg-surface border border-border cursor-pointer">
                <input
                  type="radio"
                  name="shipping"
                  checked={shippingMethod === 'express'}
                  onChange={() => setShippingMethod('express')}
                  className="mt-0.5 text-blue-600 focus:ring-blue-500"
                />
                <div className="text-xs">
                  <p className="font-semibold text-text-primary">Express Shipping — $9.99</p>
                  <p className="text-[11px] text-text-secondary">1–2 business days</p>
                </div>
              </label>
            </div>

            {/* Card 3: Order Summary */}
            <div className="bg-neutral-50 rounded-lg p-4 border border-border flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-text-primary flex items-center gap-1.5 mb-3">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  <span>Order Summary</span>
                </span>

                <div className="space-y-1.5 text-xs text-text-secondary">
                  <div className="flex justify-between">
                    <span>Items ({itemCount})</span>
                    <span className="font-semibold text-text-primary">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold text-text-primary">
                      {shippingFee === 0 ? <span className="text-green-600 font-bold">Free</span> : formatPrice(shippingFee)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span className="font-semibold text-text-primary">{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-text-primary pt-2 border-t border-border">
                    <span>Total</span>
                    <span className="text-navy-900">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate('/checkout')}
                className="mt-space-4 w-full bg-gold-500 hover:bg-gold-600 active:bg-gold-600 text-navy-700 font-sans font-semibold h-12 px-6 rounded-btn text-sm flex items-center justify-center gap-space-2 transition-colors duration-120 hover:shadow-btn-hover cursor-pointer"
              >
                <span>Continue to Secure Payment</span>
                <ArrowRight className="w-4 h-4 stroke-2" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
