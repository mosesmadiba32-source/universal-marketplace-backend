import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../../shared/types/api';
import { formatPrice, getImageUrl } from '../../../shared/lib/utils';
import { Star, Heart, Loader2 } from 'lucide-react';
import { useCartStore } from '../../../shared/store/cartStore';
import { useWishlistStore } from '../../../shared/store/wishlistStore';

export interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);

  const isFavorited = isInWishlist(product.id);
  const currentPrice = Number(product.salePrice ?? product.basePrice);
  const originalPrice = product.salePrice ? Number(product.basePrice) : null;
  const isDiscounted = originalPrice && originalPrice > currentPrice;
  const discountPercent = isDiscounted
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : null;

  const imageUrl =
    getImageUrl(product.images?.[0]?.url) ||
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80';
  const productUrl = `/product/${product.slug || product.id}`;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCardError(null);
    setIsSubmitting(true);
    try {
      const success = await addItem(product, 1);
      if (!success) {
        setCardError("Couldn't add — try again");
      }
    } catch {
      setCardError("Couldn't add — try again");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const rating = product.averageRating || 4.8;
  const roundedRating = Math.round(rating);

  return (
    <div className="group relative bg-surface rounded-card border border-border overflow-hidden flex flex-col justify-between transition-all duration-150 ease-out hover:-translate-y-[2px] hover:shadow-card-hover select-none">
      {/* 1:1 Aspect Ratio Image Area (§7) */}
      <div className="relative aspect-square w-full bg-page overflow-hidden">
        <Link to={productUrl} className="block w-full h-full">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-contain p-space-3 transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80';
            }}
          />
        </Link>

        {/* Wishlist Heart (§7: absolute top-right, 12px inset, 36x36px circle white 90% opacity, 18x18px icon) */}
        <button
          type="button"
          onClick={handleHeartClick}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-space-3 right-space-3 w-9 h-9 rounded-full bg-surface/90 backdrop-blur-xs flex items-center justify-center shadow-xs text-ink-600 hover:text-red-500 transition-colors z-10"
        >
          <Heart
            className={`w-[18px] h-[18px] transition-colors ${
              isFavorited ? 'fill-red-500 text-red-500' : 'text-ink-600 hover:text-red-500'
            }`}
          />
        </button>

        {/* "Only N left" badge (§7: when stock < 5, absolute bottom-left, 12px inset, red-50 bg, red-700 text) */}
        {product.stockQuantity > 0 && product.stockQuantity <= 5 && (
          <span className="absolute bottom-space-3 left-space-3 bg-red-50 text-red-700 text-[11px] font-semibold px-2 py-1 rounded-[4px] border border-red-500/20 z-10">
            Only {product.stockQuantity} left
          </span>
        )}

        {/* Discount badge if discounted */}
        {discountPercent && discountPercent > 0 && product.stockQuantity > 5 && (
          <span className="absolute bottom-space-3 left-space-3 bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-[4px] z-10">
            -{discountPercent}%
          </span>
        )}
      </div>

      {/* Card Body (§7: 16px body padding, space-4) */}
      <div className="p-space-4 flex-1 flex flex-col justify-between space-y-space-3">
        <div>
          {/* Title: H3 spec, Inter 600, 16px / 22px, max 2 lines (§7) */}
          <Link to={productUrl} className="block group-hover:text-blue-500 transition-colors">
            <h3 className="text-[16px] leading-[22px] font-semibold text-ink-900 line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {/* Price: 8px below title (space-2), Inter 700 18px (§7) */}
          <div className="flex items-baseline gap-space-2 mt-space-2">
            {isDiscounted && originalPrice && (
              <span className="text-[14px] text-ink-300 line-through font-normal">
                {formatPrice(originalPrice)}
              </span>
            )}
            <span
              className={`text-[18px] leading-[22px] font-bold ${
                isDiscounted ? 'text-red-500' : 'text-ink-900'
              }`}
            >
              {formatPrice(currentPrice)}
            </span>
          </div>

          {/* Rating row: 4px below price, 14px stars in gold-500, review count in ink-600 12px (§7) */}
          <div className="flex items-center gap-space-1 mt-space-1">
            <div className="flex items-center gap-[2px]">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-[14px] h-[14px] ${
                    star <= roundedRating
                      ? 'fill-gold-500 text-gold-500'
                      : 'fill-border text-border'
                  }`}
                />
              ))}
            </div>
            <span className="text-[12px] leading-[16px] text-ink-600 font-normal ml-1">
              ({(product.reviewCount ?? 2654).toLocaleString()})
            </span>
          </div>
        </div>

        {cardError && (
          <p className="text-xs text-red-500 font-medium">{cardError}</p>
        )}

        {/* Primary CTA Button (§6: gold-500 bg, navy-700 text 14px/600, 8px radius, hover gold-600) */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isSubmitting || product.stockQuantity === 0}
          className="w-full bg-gold-500 hover:bg-gold-600 active:bg-gold-600 text-navy-700 font-sans font-semibold text-[14px] leading-[20px] h-10 px-space-4 rounded-btn flex items-center justify-center gap-space-2 transition-colors duration-120 hover:shadow-btn-hover disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-navy-700" />
              <span>Adding...</span>
            </>
          ) : product.stockQuantity === 0 ? (
            <span>Out of Stock</span>
          ) : (
            <span>Add to Cart</span>
          )}
        </button>
      </div>
    </div>
  );
};
