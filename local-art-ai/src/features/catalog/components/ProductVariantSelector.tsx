import React from 'react';
import { ProductVariant } from '../../../shared/types/api';
import { formatPrice } from '../../../shared/lib/utils';

export interface ProductVariantSelectorProps {
  variants?: ProductVariant[];
  selectedVariantId: string | null;
  onSelect: (variant: ProductVariant | null) => void;
}

export const ProductVariantSelector: React.FC<ProductVariantSelectorProps> = ({
  variants = [],
  selectedVariantId,
  onSelect,
}) => {
  if (variants.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
          Select Option / Variant
        </label>
        {selectedVariantId && (
          <button
            onClick={() => onSelect(null)}
            className="text-xs text-accent hover:underline"
          >
            Reset to Base Option
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2.5">
        {variants.map((v) => {
          const isSelected = selectedVariantId === v.id;
          const isOutOfStock = v.stockQuantity === 0;

          return (
            <button
              key={v.id}
              onClick={() => onSelect(isSelected ? null : v)}
              disabled={isOutOfStock}
              className={`px-3.5 py-2 rounded-btn text-xs font-semibold border text-left transition-all flex flex-col gap-0.5 ${
                isSelected
                  ? 'border-primary bg-primary text-white shadow-sm ring-1 ring-primary'
                  : isOutOfStock
                  ? 'border-neutral-200 bg-neutral-100 text-neutral-400 cursor-not-allowed line-through'
                  : 'border-neutral-300 bg-white text-neutral-800 hover:border-neutral-400 hover:bg-neutral-50'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span>{v.name}</span>
                <span className={`text-[11px] ${isSelected ? 'text-neutral-200' : 'text-neutral-500'}`}>
                  {formatPrice(v.price)}
                </span>
              </div>
              <span className={`text-[10px] ${isSelected ? 'text-neutral-300' : 'text-neutral-400'}`}>
                {isOutOfStock ? 'Out of stock' : `${v.stockQuantity} in stock`}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
