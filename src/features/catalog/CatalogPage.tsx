import React, { useState } from 'react';
import { useSearchParams, useParams, Link } from 'react-router-dom';
import { ProductCard } from './components/ProductCard';
import { CATEGORIES } from '../../shared/lib/categories';
import { INITIAL_PRODUCTS } from '../../shared/lib/mockData';
import { useSearch } from './useCatalog';
import { SlidersHorizontal, ChevronRight, PackageOpen } from 'lucide-react';

export const CatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { slug } = useParams<{ slug?: string }>();

  const categorySlug = slug || searchParams.get('category') || undefined;
  const q = searchParams.get('q') || '';
  const sort = searchParams.get('sort') || 'featured';

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(categorySlug);
  const [priceFilter, setPriceFilter] = useState<number | undefined>(undefined);

  // Filter products from initial catalog dataset (or API)
  let filtered = [...INITIAL_PRODUCTS];

  if (categorySlug) {
    filtered = filtered.filter((p) => p.categoryId === categorySlug || p.category?.slug === categorySlug);
  }

  if (q) {
    const query = q.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.brand?.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query)
    );
  }

  if (priceFilter) {
    filtered = filtered.filter((p) => Number(p.salePrice ?? p.basePrice) <= priceFilter);
  }

  if (sort === 'trending') {
    filtered.sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0));
  } else if (sort === 'bestsellers') {
    filtered.sort((a, b) => (b.averageRating ?? 0) - (a.averageRating ?? 0));
  } else if (sort === 'price-low') {
    filtered.sort((a, b) => Number(a.salePrice ?? a.basePrice) - Number(b.salePrice ?? b.basePrice));
  } else if (sort === 'price-high') {
    filtered.sort((a, b) => Number(b.salePrice ?? b.basePrice) - Number(a.salePrice ?? a.basePrice));
  }

  const currentCategoryObj = CATEGORIES.find((c) => c.slug === categorySlug);

  return (
    <div className="py-8 px-6 max-w-7xl mx-auto space-y-8 select-none">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-text-secondary">
        <Link to="/" className="hover:text-gold-500">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <Link to="/marketplace" className="hover:text-gold-500">Marketplace</Link>
        {currentCategoryObj && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-text-primary font-semibold">{currentCategoryObj.name}</span>
          </>
        )}
      </nav>

      {/* Header Banner */}
      <div className="bg-surface rounded-[12px] border border-border p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
            {currentCategoryObj
              ? currentCategoryObj.name
              : q
              ? `Search Results for "${q}"`
              : sort === 'trending'
              ? 'Trending Products'
              : sort === 'bestsellers'
              ? 'Best Sellers'
              : 'Explore Marketplace'}
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            {currentCategoryObj
              ? currentCategoryObj.description
              : `Showing ${filtered.length} authentic curated products available for immediate delivery`}
          </p>
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-text-secondary">Sort By:</span>
          <select
            value={sort}
            onChange={(e) => {
              const p = new URLSearchParams(searchParams);
              p.set('sort', e.target.value);
              setSearchParams(p);
            }}
            className="px-3 py-1.5 text-xs font-semibold border border-border rounded-[8px] bg-surface focus:outline-none focus:border-blue-600"
          >
            <option value="featured">Featured</option>
            <option value="trending">Trending</option>
            <option value="bestsellers">Best Sellers</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Main Grid + Filter Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Filter Sidebar */}
        <aside className="lg:col-span-3 bg-surface rounded-[12px] border border-border p-5 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <h3 className="text-xs font-bold text-navy-900 uppercase tracking-wider flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-gold-500" />
              <span>Filters</span>
            </h3>
            {(categorySlug || priceFilter) && (
              <Link
                to="/marketplace"
                className="text-[11px] text-blue-600 font-semibold hover:underline"
              >
                Reset All
              </Link>
            )}
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-navy-900">Categories</h4>
            <div className="space-y-1 text-xs">
              <Link
                to="/marketplace"
                className={`block py-1 px-2 rounded font-medium transition-colors ${
                  !categorySlug ? 'bg-gold-500/15 text-gold-600 font-bold' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                All Categories
              </Link>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  className={`block py-1 px-2 rounded font-medium transition-colors ${
                    categorySlug === cat.slug
                      ? 'bg-gold-500/15 text-gold-600 font-bold'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2 pt-4 border-t border-border">
            <h4 className="text-xs font-bold text-navy-900">Max Price: {priceFilter ? `$${priceFilter}` : 'Any'}</h4>
            <input
              type="range"
              min="50"
              max="600"
              step="25"
              value={priceFilter || 600}
              onChange={(e) => setPriceFilter(Number(e.target.value))}
              className="w-full accent-gold-500"
            />
            <div className="flex justify-between text-[10px] text-text-secondary">
              <span>$50</span>
              <span>$600</span>
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-9">
          {filtered.length === 0 ? (
            <div className="bg-surface rounded-[12px] border border-border p-12 text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
                <PackageOpen className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-text-primary">
                No Products Available
              </h3>
              <p className="text-xs text-text-secondary max-w-sm mx-auto">
                No items match your selected filters. Try resetting the search terms or exploring all collections.
              </p>
              <Link
                to="/marketplace"
                className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold px-6 py-2.5 rounded-btn text-xs transition-colors"
              >
                Browse All Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
