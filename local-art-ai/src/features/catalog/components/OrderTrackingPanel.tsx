import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../shared/store/authStore';
import { formatPrice } from '../../../shared/lib/utils';
import { Check, Clock, PackageCheck, Truck, CheckCircle2, ArrowRight } from 'lucide-react';

export const OrderTrackingPanel: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  const mockOrder = {
    orderNumber: 'LA-89421',
    createdAt: 'Sep 08, 2026, 14:22',
    total: 239.99,
    product: {
      name: 'Artisan Wireless Studio Pro Headphones',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',
      price: 239.99,
    },
    currentStepIndex: 3,
  };

  const steps = [
    { title: 'Order Placed', timestamp: 'Sep 08, 2026, 14:22', completed: true },
    { title: 'Processing', timestamp: 'Sep 08, 2026, 18:45', completed: true },
    { title: 'Packed', timestamp: 'Sep 09, 2026, 09:15', completed: true },
    { title: 'Shipped', timestamp: 'Sep 10, 2026, 11:30', completed: true },
    { title: 'Delivered', timestamp: 'Expected Sep 12, 2026', completed: false },
  ];

  return (
    <div className="w-full bg-page-warm py-space-10 md:py-space-16 select-none">
      <section className="px-6 max-w-7xl mx-auto">
        {/* Heading Row (§2 Fraunces H2) */}
        <div className="flex items-center justify-between mb-space-8">
          <div>
            <h2 className="font-serif font-medium text-[28px] md:text-[34px] leading-[40px] text-ink-900 tracking-[-0.25px]">
              Live Order Fulfillment
            </h2>
            <p className="text-xs text-ink-600 mt-1 font-sans">
              Real-time carrier tracking and milestone timeline for your dispatched artisanal pieces
            </p>
          </div>
          <Link
            to="/account/orders"
            className="inline-flex items-center gap-space-1 text-sm font-sans font-semibold text-gold-700 hover:text-gold-900 transition-colors"
          >
            <span>View All Orders</span>
            <ArrowRight className="w-4 h-4 stroke-2" />
          </Link>
        </div>

        {/* Main Tracking Card */}
        <div className="bg-surface rounded-card border border-border p-space-5 md:p-space-8 shadow-card-hover">
          {/* Card Header Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-space-5 border-b border-border">
            <div>
              <span className="text-[11px] font-semibold text-gold-700 uppercase tracking-wider block">
                Dispatched Courier Shipment
              </span>
              <h3 className="text-lg font-bold text-navy-700 mt-0.5">
                Tracking Order #{mockOrder.orderNumber}
              </h3>
              <p className="text-xs text-ink-600 mt-0.5">
                Carrier: <span className="font-medium text-ink-900">DHL Express Global</span> • Tracking #{' '}
                <span className="font-mono text-navy-700 font-semibold">DHL-89421-US</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-300/40">
                <Truck className="w-3.5 h-3.5 stroke-2" />
                <span>In Transit (On Schedule)</span>
              </span>
            </div>
          </div>

          {/* Timeline Milestones (§10 Motion: 150ms transitions) */}
          <div className="py-space-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative">
              {steps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-start relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        step.completed
                          ? 'bg-green-500 text-white'
                          : 'bg-page border-2 border-border text-ink-300'
                      }`}
                    >
                      {step.completed ? <Check className="w-3.5 h-3.5 stroke-2" /> : idx + 1}
                    </div>
                  </div>
                  <p
                    className={`text-xs font-semibold ${
                      step.completed ? 'text-ink-900' : 'text-ink-300'
                    }`}
                  >
                    {step.title}
                  </p>
                  <span className="text-[11px] text-ink-600 mt-0.5">{step.timestamp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Item Preview inside Card */}
          <div className="mt-space-4 pt-space-4 border-t border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={mockOrder.product.image}
                alt={mockOrder.product.name}
                className="w-12 h-12 object-contain rounded bg-page p-1 border border-border shrink-0"
              />
              <div>
                <p className="text-xs font-bold text-ink-900 line-clamp-1">
                  {mockOrder.product.name}
                </p>
                <p className="text-[11px] text-ink-600">
                  Total: <span className="font-semibold text-ink-900">{formatPrice(mockOrder.total)}</span>
                </p>
              </div>
            </div>

            <Link
              to="/track-order"
              className="text-xs font-semibold text-blue-500 hover:text-blue-700 hover:underline"
            >
              Full Timeline Details →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
