import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from './ProductCard';
import { INITIAL_PRODUCTS } from '../../../shared/lib/mockData';
import { ArrowRight, AlertCircle, RefreshCw } from 'lucide-react';
import { useTrendingProducts } from '../useCatalog';
import { Product } from '../../../shared/types/api';

export const TrendingProductsRail: React.FC = () => {
  const [retryKey, setRetryKey] = useState(0);
  const { data, isLoading, isError, refetch } = useTrendingProducts(4);

  const products: Product[] = (data && data.length > 0) ? data : INITIAL_PRODUCTS.slice(0, 4);

  const handleRetry = () => {
    setRetryKey((prev) => prev + 1);
    refetch();
  };

  return (
    <div className="w-full bg-page-warm py-space-10 md:py-space-16">
      <section className="px-6 max-w-7xl mx-auto">
        {/* Heading Row (§2 Fraunces H2 34px/40px) */}
        <div className="flex items-center justify-between mb-space-8">
          <h2 className="font-serif font-medium text-[28px] md:text-[34px] leading-[40px] text-ink-900 tracking-[-0.25px]">
            Trending Artisan Crafts
          </h2>
          <Link
            to="/marketplace?sort=trending"
            className="inline-flex items-center gap-space-1 text-sm font-sans font-semibold text-gold-700 hover:text-gold-900 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 stroke-2" />
          </Link>
        </div>

        {/* Loading Skeleton State */}
        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-space-4 md:gap-space-6">
            {[...Array(4)].map((_, idx) => (
              <div
                key={idx}
                className="bg-surface rounded-card border border-border p-space-4 animate-pulse space-y-space-3"
              >
                <div className="w-full aspect-square bg-page rounded-btn" />
                <div className="h-4 bg-page rounded w-3/4" />
                <div className="h-3 bg-page rounded w-1/2" />
                <div className="h-4 bg-page rounded w-1/3" />
                <div className="h-10 bg-page rounded-btn w-full mt-2" />
              </div>
            ))}
          </div>
        ) : isError && (!products || products.length === 0) ? (
          /* Error State with Retry */
          <div className="bg-surface rounded-card border border-red-500/20 p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-ink-900">
              Unable to load trending products
            </h3>
            <p className="text-xs text-ink-600 max-w-sm mx-auto">
              We encountered a connection error while fetching live inventory.
            </p>
            <button
              type="button"
              onClick={handleRetry}
              className="inline-flex items-center gap-2 bg-navy-700 text-white text-xs font-semibold px-4 py-2 rounded-btn hover:bg-navy-500 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        ) : (
          /* 4-column desktop / 2-column mobile grid per §7 */
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-space-4 md:gap-space-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
