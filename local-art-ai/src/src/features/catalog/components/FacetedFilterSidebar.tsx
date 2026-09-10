import React from 'react';
import { SearchFacets } from '../../../shared/types/api';
import { Button } from '../../../shared/components/Button';
import { Star, RotateCcw } from 'lucide-react';

export interface FilterState {
  category?: string;
  brand?: string;
  priceMin?: number;
  priceMax?: number;
  stock?: boolean;
  rating?: number;
  sort?: 'newest' | 'price_asc' | 'price_desc' | 'rating' | 'popular';
}

export interface FacetedFilterSidebarProps {
  facets?: SearchFacets;
  filters: FilterState;
  onChange: (newFilters: FilterState) => void;
  onReset: () => void;
}

export const FacetedFilterSidebar: React.FC<FacetedFilterSidebarProps> = ({
  facets,
  filters,
  onChange,
  onReset,
}) => {
  const hasActiveFilters = Boolean(
    filters.category ||
    filters.brand ||
    filters.priceMin !== undefined ||
    filters.priceMax !== undefined ||
    filters.stock !== undefined ||
    filters.rating !== undefined
  );

  return (
    <aside className="w-full bg-white rounded-card border border-neutral-200 p-5 space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
        <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-xs text-accent hover:underline inline-flex items-center gap-1 font-semibold"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        )}
      </div>

      {/* Categories */}
      {facets?.categories && facets.categories.length > 0 && (
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-neutral-700 uppercase tracking-wide">Category</h4>
          <div className="space-y-1 max-h-48 overflow-y-auto custom-scrollbar pr-1">
            <button
              onClick={() => onChange({ ...filters, category: undefined })}
              className={`w-full text-left text-xs px-2.5 py-1.5 rounded-btn transition-colors ${
                !filters.category ? 'bg-primary text-white font-semibold' : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              All Categories
            </button>
            {facets.categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => onChange({ ...filters, category: cat.slug })}
                className={`w-full text-left text-xs px-2.5 py-1.5 rounded-btn transition-colors truncate ${
                  filters.category === cat.slug ? 'bg-primary text-white font-semibold' : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Brands */}
      {facets?.brands && facets.brands.length > 0 && (
        <div className="space-y-2.5 pt-4 border-t border-neutral-100">
          <h4 className="text-xs font-bold text-neutral-700 uppercase tracking-wide">Brand</h4>
          <div className="space-y-1 max-h-40 overflow-y-auto custom-scrollbar pr-1">
            <button
              onClick={() => onChange({ ...filters, brand: undefined })}
              className={`w-full text-left text-xs px-2.5 py-1.5 rounded-btn transition-colors ${
                !filters.brand ? 'bg-primary text-white font-semibold' : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              All Brands
            </button>
            {facets.brands.map((brand) => (
              <button
                key={brand}
                onClick={() => onChange({ ...filters, brand })}
                className={`w-full text-left text-xs px-2.5 py-1.5 rounded-btn transition-colors truncate ${
                  filters.brand === brand ? 'bg-primary text-white font-semibold' : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div className="space-y-2.5 pt-4 border-t border-neutral-100">
        <h4 className="text-xs font-bold text-neutral-700 uppercase tracking-wide">Price Range</h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] text-neutral-500 uppercase font-semibold">Min ($)</label>
            <input
              type="number"
              min="0"
              placeholder="0"
              value={filters.priceMin ?? ''}
              onChange={(e) =>
                onChange({ ...filters, priceMin: e.target.value ? Number(e.target.value) : undefined })
              }
              className="w-full bg-neutral-50 border border-neutral-200 rounded-input px-2.5 py-1.5 text-xs text-neutral-900 focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-[10px] text-neutral-500 uppercase font-semibold">Max ($)</label>
            <input
              type="number"
              min="0"
              placeholder="1000"
              value={filters.priceMax ?? ''}
              onChange={(e) =>
                onChange({ ...filters, priceMax: e.target.value ? Number(e.target.value) : undefined })
              }
              className="w-full bg-neutral-50 border border-neutral-200 rounded-input px-2.5 py-1.5 text-xs text-neutral-900 focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Availability Toggle */}
      <div className="pt-4 border-t border-neutral-100">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.stock === true}
            onChange={(e) => onChange({ ...filters, stock: e.target.checked ? true : undefined })}
            className="w-4 h-4 rounded text-accent focus:ring-accent border-neutral-300"
          />
          <span className="text-xs font-semibold text-neutral-800">In Stock Only</span>
        </label>
      </div>

      {/* Rating Filter */}
      <div className="space-y-2 pt-4 border-t border-neutral-100">
        <h4 className="text-xs font-bold text-neutral-700 uppercase tracking-wide">Customer Rating</h4>
        <div className="space-y-1">
          {[4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => onChange({ ...filters, rating: filters.rating === rating ? undefined : rating })}
              className={`w-full flex items-center justify-between text-xs px-2.5 py-1.5 rounded-btn transition-colors ${
                filters.rating === rating ? 'bg-primary text-white font-semibold' : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < rating
                        ? 'fill-amber-400 text-amber-400'
                        : filters.rating === rating
                        ? 'text-neutral-400'
                        : 'text-neutral-300'
                    }`}
                  />
                ))}
                <span className="ml-1">& up</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};
