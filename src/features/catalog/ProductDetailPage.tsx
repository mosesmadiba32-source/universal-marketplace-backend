import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Product } from '../../shared/types/api';
import { INITIAL_PRODUCTS } from '../../shared/lib/mockData';
import { formatPrice, getImageUrl } from '../../shared/lib/utils';
import { useCartStore } from '../../shared/store/cartStore';
import { useWishlistStore } from '../../shared/store/wishlistStore';
import {
  Star,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Minus,
  Plus,
  Info,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  X,
  Loader2,
} from 'lucide-react';

import { Product3DViewer } from './components/Product3DViewer';

export const ProductDetailPage: React.FC = () => {
  const { id, slug } = useParams<{ id?: string; slug?: string }>();
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'gallery' | '3d'>('gallery');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');
  const [showSellerInfo, setShowSellerInfo] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const reviewsRef = useRef<HTMLDivElement>(null);

  // Find product by id or slug from mock data (or fallback)
  const product: Product = INITIAL_PRODUCTS.find(
    (p: Product) => p.id === id || p.slug === id || p.slug === slug || p.id === slug
  ) || INITIAL_PRODUCTS[0];

  const isFavorited = isInWishlist(product.id);
  const currentPrice = Number(product.salePrice ?? product.basePrice);
  const originalPrice = product.salePrice ? Number(product.basePrice) : null;
  const discountPercent = originalPrice
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : null;

  const images: string[] = product.images && product.images.length > 0
    ? product.images.map((img: { url: string }) => img.url)
    : [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
      ];

  // Arrow key navigation between thumbnails
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length]);

  const handleAddToCart = async () => {
    setActionError(null);
    setIsAddingToCart(true);
    try {
      await addItem(product, quantity);
    } catch {
      setActionError("Couldn't add item to cart. Please try again.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    setActionError(null);
    await addItem(product, quantity);
    navigate('/checkout');
  };

  const scrollToReviews = () => {
    setActiveTab('reviews');
    if (reviewsRef.current) {
      reviewsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="py-8 px-6 max-w-7xl mx-auto select-none">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-text-secondary mb-6 flex-wrap">
        <Link to="/" className="hover:text-gold-500 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <Link
          to={`/category/${product.category?.slug || 'electronics'}`}
          className="hover:text-gold-500 transition-colors"
        >
          {product.category?.name || 'Electronics'}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <span className="text-text-primary font-semibold truncate max-w-xs">
          {product.name}
        </span>
      </nav>

      {/* Main 2-Column Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-12">
        {/* Left Column: Vertical Thumbnails Strip + Primary Large Image / 3D Studio */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          {/* View Mode Toggle Pill Bar */}
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-1.5 bg-neutral-100 p-1 rounded-full border border-neutral-200">
              <button
                type="button"
                onClick={() => setViewMode('gallery')}
                className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all ${
                  viewMode === 'gallery'
                    ? 'bg-white text-navy-900 shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                📸 Photo Gallery
              </button>
              <button
                type="button"
                onClick={() => setViewMode('3d')}
                className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === '3d'
                    ? 'bg-navy-900 text-gold-400 shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping inline-block" />
                360° 3D Studio
              </button>
            </div>
          </div>

          {viewMode === '3d' ? (
            <Product3DViewer
              productName={product.name}
              images={images}
              category={product.category?.name}
            />
          ) : (
            <div className="flex flex-col-reverse md:flex-row gap-4 items-start">
              {/* Vertical Thumbnail Strip */}
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0 w-full md:w-20 flex-shrink-0">
                {images.slice(0, 4).map((imgUrl: string, idx: number) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-[8px] bg-surface p-1 border-2 overflow-hidden transition-all flex-shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-blue-600 shadow-md scale-105'
                        : 'border-border hover:border-neutral-400'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>

              {/* Large Primary Image */}
              <div className="flex-1 w-full aspect-square bg-surface rounded-[12px] border border-border p-6 flex items-center justify-center relative overflow-hidden shadow-sm">
                <img
                  src={images[activeImageIndex]}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-110 cursor-zoom-in"
                />
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-surface/90 backdrop-blur-sm border border-border text-neutral-400 hover:text-red-600 shadow-sm transition-all"
                  aria-label="Wishlist"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFavorited ? 'fill-red-600 text-red-600' : 'text-neutral-400'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Details, Pricing, Controls */}
        <div className="lg:col-span-5 space-y-5">
          {/* Title & Descriptor */}
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-navy-900 leading-tight">
              {product.name}
            </h1>
            <p className="text-sm font-medium text-text-secondary mt-1">
              {product.shortDescription || 'Artisan Engineered | Precision Quality | Sustainable Craft'}
            </p>
          </div>

          {/* Star Rating + Review Count Link */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className="w-4 h-4 fill-gold-500 text-gold-500"
                />
              ))}
            </div>
            <button
              type="button"
              onClick={scrollToReviews}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              4.9 ({(product.reviewCount ?? 2654).toLocaleString()} reviews)
            </button>
          </div>

          {/* Price Row */}
          <div className="flex items-center gap-3">
            <span className="text-2xl md:text-3xl font-extrabold text-navy-900">
              {formatPrice(currentPrice)}
            </span>
            {originalPrice && (
              <span className="text-base text-strikethrough line-through font-normal">
                {formatPrice(originalPrice)}
              </span>
            )}
            {discountPercent && discountPercent > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white bg-red-600">
                Save {discountPercent}%
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2 text-xs font-bold">
            {product.stockQuantity > 0 ? (
              <span className="flex items-center gap-1.5 text-green-600">
                <span className="w-2.5 h-2.5 rounded-full bg-green-600 animate-pulse" />
                <span>In Stock ({product.stockQuantity} available)</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-red-600">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                <span>Out of Stock</span>
              </span>
            )}
          </div>

          {/* Bullet Key Features */}
          <ul className="space-y-1.5 text-xs text-text-primary border-t border-b border-border py-4">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-gold-500 flex-shrink-0" />
              <span>Certified authentic and verified artisan build quality</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-gold-500 flex-shrink-0" />
              <span>Includes 2-year international warranty & dedicated customer concierge</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-gold-500 flex-shrink-0" />
              <span>Carbon-neutral insured shipping in recycled protective packaging</span>
            </li>
          </ul>

          {/* Quantity Stepper */}
          <div className="flex items-center gap-4 pt-1">
            <span className="text-xs font-bold text-text-primary">Quantity:</span>
            <div className="inline-flex items-center border border-border rounded-[8px] overflow-hidden bg-surface">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                className="px-3 py-2 text-text-secondary hover:bg-neutral-100 disabled:opacity-40 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-4 py-2 text-sm font-bold text-text-primary min-w-[36px] text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(product.stockQuantity || 99, q + 1))}
                disabled={quantity >= product.stockQuantity}
                className="px-3 py-2 text-text-secondary hover:bg-neutral-100 disabled:opacity-40 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Error Message */}
          {actionError && (
            <p className="text-xs text-red-600 font-medium">
              {actionError}
            </p>
          )}

          {/* Action Buttons: Add to Cart (Blue) & Buy Now (Gold) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isAddingToCart || product.stockQuantity === 0}
              className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-700 text-white font-bold py-3 px-4 rounded-[8px] text-sm flex items-center justify-center gap-2 transition-colors shadow-sm disabled:opacity-50"
            >
              {isAddingToCart ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Adding...</span>
                </>
              ) : (
                <span>Add to Cart</span>
              )}
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              disabled={product.stockQuantity === 0}
              className="w-full bg-gold-500 hover:bg-gold-600 active:bg-gold-600 text-navy-900 font-bold py-3 px-4 rounded-[8px] text-sm flex items-center justify-center transition-colors shadow-sm disabled:opacity-50"
            >
              Buy Now
            </button>
          </div>

          {/* Ships from & Seller info popover */}
          <div className="pt-2 text-xs text-text-secondary space-y-1 relative">
            <p>Ships from <strong>Local Art AI Express Hub</strong></p>
            <div className="flex items-center gap-1">
              <span>Sold by <strong>Local Art AI Official Store</strong></span>
              <button
                type="button"
                onClick={() => setShowSellerInfo(!showSellerInfo)}
                className="text-blue-600 hover:text-blue-700"
                aria-label="Seller information"
              >
                <Info className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Seller Info Popover */}
            {showSellerInfo && (
              <div className="absolute left-0 bottom-full mb-2 w-72 bg-surface text-text-primary p-4 rounded-[10px] shadow-2xl border border-border z-30">
                <div className="flex items-center justify-between pb-2 border-b border-border mb-2">
                  <span className="font-bold text-xs">Seller Details</span>
                  <button
                    type="button"
                    onClick={() => setShowSellerInfo(false)}
                    className="text-neutral-400 hover:text-neutral-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Verified Local Art AI direct fulfillment partner. High 99.4% positive ratings over the last 12 months with 24-hour dispatch guarantee.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tab Strip: Description, Specifications, Reviews */}
      <div ref={reviewsRef} className="pt-8 border-t border-border">
        <div className="flex items-center gap-8 border-b border-border">
          {(['description', 'specifications', 'reviews'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-bold capitalize transition-colors relative ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {tab === 'reviews' ? `Reviews (${(product.reviewCount ?? 2654).toLocaleString()})` : tab}
            </button>
          ))}
        </div>

        {/* Tab Panels */}
        <div className="py-6">
          {activeTab === 'description' && (
            <div className="prose max-w-none text-sm text-text-secondary space-y-4">
              <p>{product.description}</p>
              <p>
                Each unit undergoes rigorous multi-point inspection to ensure flawless aesthetic alignment, structural durability, and optimal acoustic or functional performance before shipment.
              </p>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="max-w-2xl bg-surface rounded-[8px] border border-border overflow-hidden">
              <table className="w-full text-xs text-left">
                <tbody>
                  <tr className="border-b border-border bg-neutral-50">
                    <td className="p-3 font-semibold text-text-primary w-1/3">SKU</td>
                    <td className="p-3 text-text-secondary">{product.sku}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-text-primary">Brand</td>
                    <td className="p-3 text-text-secondary">{product.brand || 'Local Art AI'}</td>
                  </tr>
                  <tr className="border-b border-border bg-neutral-50">
                    <td className="p-3 font-semibold text-text-primary">Category</td>
                    <td className="p-3 text-text-secondary">{product.category?.name || 'General'}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-text-primary">Materials</td>
                    <td className="p-3 text-text-secondary">Grade A Sustainable Alloys & Archival Elements</td>
                  </tr>
                  <tr className="bg-neutral-50">
                    <td className="p-3 font-semibold text-text-primary">Warranty</td>
                    <td className="p-3 text-text-secondary">2-Year Limited Global Manufacturer Warranty</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {/* Customer Reviews List */}
              <div className="space-y-4">
                {[
                  {
                    author: 'Marcus Vance',
                    date: 'September 4, 2026',
                    rating: 5,
                    title: 'Phenomenal build quality and soundstage',
                    comment: 'Exceeded every expectation. The materials feel solid, premium, and look stunning on display. Shipping was impressively fast.',
                  },
                  {
                    author: 'Elena Rostova',
                    date: 'August 28, 2026',
                    rating: 5,
                    title: 'True collector quality piece',
                    comment: 'The packaging and presentation are world-class. You can tell real artisans crafted this. Highly recommended!',
                  },
                ].map((rev, idx) => (
                  <div key={idx} className="bg-surface rounded-[8px] border border-border p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                          ))}
                        </div>
                        <span className="text-xs font-bold text-text-primary">{rev.title}</span>
                      </div>
                      <span className="text-[11px] text-text-secondary">{rev.date}</span>
                    </div>
                    <p className="text-xs text-text-secondary">{rev.comment}</p>
                    <p className="text-[11px] font-semibold text-text-primary">— {rev.author}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
