import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlistStore } from '../../shared/store/wishlistStore';
import { ProductCard } from '../catalog/components/ProductCard';
import { INITIAL_PRODUCTS } from '../../shared/lib/mockData';
import { Heart, ArrowRight, Trash2 } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { items, clearWishlist } = useWishlistStore();

  // If store is empty, display preview/saved items from initial dataset
  const displayItems = items.length > 0 ? items : [INITIAL_PRODUCTS[0], INITIAL_PRODUCTS[1]];

  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-[12px] border border-border p-6 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-navy-900">
            Saved Wishlist ({displayItems.length})
          </h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Your saved artisan creations, watches, and smart hardware
          </p>
        </div>

        {displayItems.length > 0 && (
          <button
            type="button"
            onClick={clearWishlist}
            className="text-xs font-semibold text-text-secondary hover:text-red-600 transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Wishlist</span>
          </button>
        )}
      </div>

      {displayItems.length === 0 ? (
        <div className="bg-surface rounded-[12px] border border-border p-12 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-text-primary">
            Your wishlist is empty
          </h3>
          <p className="text-xs text-text-secondary max-w-sm mx-auto">
            Explore our curated catalog and tap the heart icon on any card to save your favorite items here.
          </p>
          <Link
            to="/marketplace"
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold px-6 py-2.5 rounded-btn text-xs transition-colors"
          >
            <span>Explore Collections</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {displayItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
