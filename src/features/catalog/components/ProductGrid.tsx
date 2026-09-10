import React from 'react';
import { Product } from '../../../shared/types/api';
import { ProductCard } from './ProductCard';
import { Skeleton } from '../../../shared/components/Skeleton';
import { PackageOpen } from 'lucide-react';

export interface ProductGridProps {
  products?: Product[];
  isLoading?: boolean;
  emptyMessage?: string;
  columns?: 2 | 3 | 4;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products = [],
  isLoading = false,
  emptyMessage = 'No products found matching your criteria.',
  columns = 4,
}) => {
  const colStyles = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  };

  if (isLoading) {
    return (
      <div className={`grid gap-5 ${colStyles[columns]}`}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white rounded-card border border-neutral-200 p-4 space-y-3">
            <Skeleton className="w-full aspect-square rounded-btn" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-5 w-4/5" />
            <div className="flex justify-between items-center pt-2">
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="h-9 w-9 rounded-btn" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-card border border-neutral-200 py-16 px-6 text-center">
        <PackageOpen className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
        <h3 className="text-base font-bold text-neutral-800">No Products Available</h3>
        <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`grid gap-5 ${colStyles[columns]}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
