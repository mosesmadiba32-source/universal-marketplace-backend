import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, Headphones, RotateCcw, ArrowRight } from 'lucide-react';

export const TrustPanel: React.FC<{ className?: string }> = ({ className = '' }) => {
  const trustItems = [
    {
      icon: Truck,
      title: 'Free Shipping',
      subtitle: 'On orders over $50',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Payments',
      subtitle: '100% secure transactions',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      subtitle: "We're here to help",
    },
    {
      icon: RotateCcw,
      title: 'Easy Returns',
      subtitle: 'Hassle-free returns',
    },
  ];

  return (
    <div
      className={`bg-surface rounded-modal border border-border p-space-5 shadow-trust-panel select-none cursor-default w-full sm:w-[320px] shrink-0 space-y-space-4 ${className}`}
    >
      {trustItems.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div key={idx} className="flex items-center gap-space-3">
            <div className="text-gold-500 shrink-0">
              <Icon className="w-5 h-5 stroke-2" />
            </div>
            <div>
              <p className="text-sm font-bold text-ink-900 leading-snug">
                {item.title}
              </p>
              <p className="text-xs text-ink-600">
                {item.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const HeroBanner: React.FC = () => {
  return (
    <section className="relative w-full bg-navy-700 text-white overflow-hidden min-h-[420px] md:min-h-[560px] flex items-center px-6 md:px-space-6 py-space-10 md:py-space-16">
      {/* Background Lifestyle Image + Gradient Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&auto=format&fit=crop&q=80"
          alt="Warm artisan gallery interior"
          className="w-full h-full object-cover object-center opacity-40"
        />
        {/* Navy Gradient Overlay (§5): Navy-700 base with subtle radial gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(10,24,48,0.75) 0%, rgba(4,9,20,0.95) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-space-8 lg:gap-space-12">
        {/* Left Column: Headings & CTA (§5 Text block max-width 480px) */}
        <div className="max-w-[480px] text-left space-y-space-3">
          <span className="inline-block text-[13px] font-semibold text-gold-500 tracking-wide font-sans">
            Handcrafted with Passion
          </span>

          <h1 className="font-serif font-semibold text-[34px] leading-[38px] md:text-[56px] md:leading-[60px] tracking-[-0.5px]">
            <span className="block text-white">Discover Everything</span>
            <span className="block text-gold-500">In One Place</span>
          </h1>

          <p className="text-base text-navy-100 font-sans font-normal pt-1">
            Authentic handcrafted ceramics, woodwork, textiles, and fine goods directly from independent master artisans.
          </p>

          <div className="pt-space-4">
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-space-2 bg-gold-500 hover:bg-gold-600 active:bg-gold-600 text-navy-700 font-sans font-semibold text-sm px-6 h-12 rounded-btn transition-colors duration-120 hover:shadow-btn-hover"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="w-4 h-4 stroke-2" />
            </Link>
          </div>
        </div>

        {/* Right Column: Overlapping Trust Panel Card (§5) */}
        <div className="w-full lg:w-auto flex justify-end shrink-0">
          <TrustPanel />
        </div>
      </div>
    </section>
  );
};
