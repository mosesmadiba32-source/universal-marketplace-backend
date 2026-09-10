import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../../shared/lib/categories';
import { ChevronRight, Grid, ArrowRight } from 'lucide-react';

export const ShopByCategory: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 240, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-space-10 md:py-space-16 px-6 max-w-7xl mx-auto select-none">
      {/* Heading Row (§2 Section headline Fraunces 500 34px/40px) */}
      <div className="flex items-center justify-between mb-space-8">
        <h2 className="font-serif font-medium text-[28px] md:text-[34px] leading-[40px] text-ink-900 tracking-[-0.25px]">
          Shop by Category
        </h2>
        <Link
          to="/categories"
          className="inline-flex items-center gap-space-1 text-sm font-sans font-semibold text-gold-700 hover:text-gold-900 transition-colors"
        >
          <span>Browse all categories</span>
          <ArrowRight className="w-4 h-4 stroke-2" />
        </Link>
      </div>

      {/* Categories Row */}
      <div className="relative group">
        <div
          ref={scrollRef}
          className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-2 px-1 scroll-smooth"
        >
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className="flex flex-col items-center gap-2 group/item shrink-0"
              >
                {/* Circular icon container with gold hover (§9: 24px icon) */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-surface border border-border flex items-center justify-center text-ink-600 group-hover/item:border-gold-500 group-hover/item:text-gold-500 group-hover/item:shadow-card-hover transition-all duration-150">
                  <Icon className="w-6 h-6 stroke-2" />
                </div>
                <span className="text-[13px] font-sans font-medium text-ink-900 group-hover/item:text-gold-700 transition-colors whitespace-nowrap text-center max-w-[90px] truncate">
                  {cat.name}
                </span>
              </Link>
            );
          })}

          {/* Final 'More' circle */}
          <Link
            to="/categories"
            className="flex flex-col items-center gap-2 group/item shrink-0"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-surface border border-border flex items-center justify-center text-ink-600 group-hover/item:border-gold-500 group-hover/item:text-gold-500 group-hover/item:shadow-card-hover transition-all duration-150">
              <Grid className="w-5 h-5 stroke-2" />
            </div>
            <span className="text-[13px] font-sans font-medium text-ink-900 group-hover/item:text-gold-700 transition-colors whitespace-nowrap">
              Explore All
            </span>
          </Link>
        </div>

        {/* Floating Right Scroll Button for Desktop */}
        <button
          type="button"
          onClick={scrollRight}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface border border-border shadow-md items-center justify-center text-ink-600 hover:text-gold-700 hover:border-gold-500 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
          aria-label="Scroll Categories Right"
        >
          <ChevronRight className="w-5 h-5 stroke-2" />
        </button>
      </div>
    </section>
  );
};
