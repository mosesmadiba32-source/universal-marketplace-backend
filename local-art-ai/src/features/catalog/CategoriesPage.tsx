import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../shared/lib/categories';
import { ArrowRight, Grid } from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  return (
    <div className="py-10 px-6 max-w-7xl mx-auto space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <span className="text-xs font-bold text-gold-500 uppercase tracking-widest">
            Complete Directory
          </span>
          <h1 className="text-3xl font-extrabold text-navy-900 tracking-tight mt-1">
            Browse All Categories
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Explore curated collections across technology, fashion, artisan living, and bespoke commissions
          </p>
        </div>

        <Link
          to="/marketplace"
          className="inline-flex items-center gap-1.5 bg-navy-900 hover:bg-navy-800 text-white font-bold px-5 py-2.5 rounded-btn text-xs transition-colors shadow-sm"
        >
          <span>All Marketplace Items</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 9 Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="group bg-surface rounded-[12px] border border-border overflow-hidden shadow-sm hover:shadow-xl hover:border-gold-500 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Category Image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gold-500 text-navy-900 flex items-center justify-center">
                      <Icon className="w-4 h-4 stroke-[2]" />
                    </div>
                    <span className="text-base font-bold drop-shadow">{cat.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-white/80 bg-navy-900/60 px-2 py-0.5 rounded-full backdrop-blur-sm">
                    {cat.itemCount} items
                  </span>
                </div>
              </div>

              {/* Description & Action */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-text-secondary leading-relaxed">
                  {cat.description}
                </p>

                <div className="pt-3 border-t border-border flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-gold-600 transition-colors">
                  <span>Explore {cat.name}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
