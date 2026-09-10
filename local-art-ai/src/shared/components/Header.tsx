import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { CATEGORIES } from '../lib/categories';
import { INITIAL_PRODUCTS } from '../lib/mockData';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { useAuthStore } from '../store/authStore';
import {
  Search,
  User,
  Package,
  Heart,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  Globe,
  DollarSign,
  HelpCircle,
  Bell,
  Grid,
  Check,
} from 'lucide-react';

interface HeaderProps {
  onHeightChange?: (height: number) => void;
}

export const Header: React.FC<HeaderProps> = ({ onHeightChange }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { getItemCount, openDrawer } = useCartStore();
  const { getItemCount: getWishlistCount } = useWishlistStore();
  const { user, isAuthenticated } = useAuthStore();

  const cartCount = getItemCount();
  const wishlistCount = getWishlistCount();

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [autocompleteResults, setAutocompleteResults] = useState<typeof INITIAL_PRODUCTS>([]);
  
  // Dropdown states & Region/Currency
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedLang, setSelectedLang] = useState({ code: 'EN', name: 'English (US)', flag: '🇺🇸' });
  const [selectedCurr, setSelectedCurr] = useState({ code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸' });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Measure rendered header height dynamically
  useEffect(() => {
    const updateHeight = () => {
      if (headerRef.current && onHeightChange) {
        onHeightChange(headerRef.current.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [onHeightChange]);

  // Debounced search autocomplete
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const timer = setTimeout(() => {
        const q = searchQuery.toLowerCase();
        const filtered = INITIAL_PRODUCTS.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.brand?.toLowerCase().includes(q) ||
            p.category?.name.toLowerCase().includes(q)
        ).slice(0, 5);
        setAutocompleteResults(filtered);
        setShowAutocomplete(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setShowAutocomplete(false);
      setAutocompleteResults([]);
    }
  }, [searchQuery]);

  // Handle outside click for dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
        setShowAutocomplete(false);
        setShowCategoryDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const catParam = selectedCategory !== 'all' ? `&category=${selectedCategory}` : '';
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}${catParam}`);
      setShowAutocomplete(false);
    }
  };

  const languages = [
    { code: 'EN', name: 'English (US)', flag: '🇺🇸' },
    { code: 'EN-GB', name: 'English (UK)', flag: '🇬🇧' },
    { code: 'FR', name: 'Français', flag: '🇫🇷' },
    { code: 'ES', name: 'Español', flag: '🇪🇸' },
    { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'AR', name: 'العربية', flag: '🇦🇪' },
  ];

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
    { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺' },
    { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧' },
    { code: 'CAD', symbol: '$', name: 'Canadian Dollar', flag: '🇨🇦' },
    { code: 'AUD', symbol: '$', name: 'Australian Dollar', flag: '🇦🇺' },
  ];

  const selectedCategoryLabel =
    selectedCategory === 'all'
      ? 'All Categories'
      : CATEGORIES.find((c) => c.slug === selectedCategory)?.name || 'All Categories';

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full bg-navy-900 text-white shadow-md select-none"
      style={{ backgroundColor: '#0A1830' }}
    >
      {/* ========================================================================= */}
      {/* DESKTOP HEADER (3 Rows) — Visible >640px                                 */}
      {/* ========================================================================= */}
      <div className="hidden sm:block">
        {/* ROW 1: Utility Bar (~32px tall) */}
        <div className="border-b border-white/10 text-[12px] text-white/70 h-8 flex items-center justify-end px-6 max-w-7xl mx-auto gap-6">
          {/* Language Selector with SVG Flag */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'lang' ? null : 'lang')}
              className="flex items-center gap-1.5 hover:text-white transition-colors icon-interactive px-1.5 py-0.5 rounded"
            >
              <span className="text-sm leading-none">{selectedLang.flag}</span>
              <span className="font-semibold text-white/90">{selectedLang.code}</span>
              <ChevronDown className="w-3 h-3 text-white/50" />
            </button>
            {openDropdown === 'lang' && (
              <div className="absolute right-0 top-full mt-1 w-44 bg-surface text-text-primary rounded-md shadow-2xl py-1 z-50 border border-border animate-in fade-in duration-150">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setSelectedLang(lang);
                      setOpenDropdown(null);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-neutral-100 ${
                      selectedLang.code === lang.code ? 'bg-gold-500/10 font-bold text-gold-600' : ''
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </span>
                    {selectedLang.code === lang.code && <Check className="w-3.5 h-3.5 text-gold-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Currency Selector with Flag */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'currency' ? null : 'currency')}
              className="flex items-center gap-1.5 hover:text-white transition-colors icon-interactive px-1.5 py-0.5 rounded"
            >
              <span className="text-sm leading-none">{selectedCurr.flag}</span>
              <span className="font-semibold text-white/90">{selectedCurr.code} ({selectedCurr.symbol})</span>
              <ChevronDown className="w-3 h-3 text-white/50" />
            </button>
            {openDropdown === 'currency' && (
              <div className="absolute right-0 top-full mt-1 w-44 bg-surface text-text-primary rounded-md shadow-2xl py-1 z-50 border border-border animate-in fade-in duration-150">
                {currencies.map((curr) => (
                  <button
                    key={curr.code}
                    type="button"
                    onClick={() => {
                      setSelectedCurr(curr);
                      setOpenDropdown(null);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-neutral-100 ${
                      selectedCurr.code === curr.code ? 'bg-gold-500/10 font-bold text-gold-600' : ''
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{curr.flag}</span>
                      <span>{curr.code} — {curr.name}</span>
                    </span>
                    {selectedCurr.code === curr.code && <Check className="w-3.5 h-3.5 text-gold-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Help Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'help' ? null : 'help')}
              className="flex items-center gap-1 hover:text-white transition-colors icon-interactive px-1.5 py-0.5 rounded"
            >
              <span>Help</span>
              <ChevronDown className="w-3 h-3 text-white/50" />
            </button>
            {openDropdown === 'help' && (
              <div className="absolute right-0 top-full mt-1 w-44 bg-surface text-text-primary rounded-md shadow-2xl py-1.5 z-50 border border-border text-xs animate-in fade-in duration-150">
                <Link
                  to="/help"
                  onClick={() => setOpenDropdown(null)}
                  className="block px-3 py-1.5 hover:bg-neutral-100 font-medium"
                >
                  Help Center
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setOpenDropdown(null)}
                  className="block px-3 py-1.5 hover:bg-neutral-100 font-medium"
                >
                  Contact Us
                </Link>
                <Link
                  to="/track-order"
                  onClick={() => setOpenDropdown(null)}
                  className="block px-3 py-1.5 hover:bg-neutral-100 font-medium"
                >
                  Track Order
                </Link>
                <Link
                  to="/returns"
                  onClick={() => setOpenDropdown(null)}
                  className="block px-3 py-1.5 hover:bg-neutral-100 font-medium"
                >
                  Returns & Refunds
                </Link>
                <Link
                  to="/faqs"
                  onClick={() => setOpenDropdown(null)}
                  className="block px-3 py-1.5 hover:bg-neutral-100 font-medium"
                >
                  FAQs
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* ROW 2: Main Header (~72px tall) */}
        <div className="h-[72px] px-6 max-w-7xl mx-auto flex items-center justify-between gap-6">
          {/* Logo */}
          <Logo size="md" />

          {/* Center Search Bar */}
          <div className="relative flex-1 max-w-2xl">
            <form onSubmit={handleSearchSubmit} className="flex items-center h-11 bg-surface rounded-[8px] overflow-hidden border border-border shadow-inner">
              {/* Category selector dropdown */}
              <div className="relative border-r border-border h-full flex items-center">
                <button
                  type="button"
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="h-full px-3 text-xs text-text-primary font-medium flex items-center gap-1.5 hover:bg-neutral-50 transition-colors whitespace-nowrap"
                >
                  <span className="max-w-[110px] truncate">{selectedCategoryLabel}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-text-secondary flex-shrink-0" />
                </button>

                {showCategoryDropdown && (
                  <div className="absolute left-0 top-full mt-1 w-52 bg-surface text-text-primary rounded-md shadow-2xl py-1 z-50 border border-border max-h-64 overflow-y-auto animate-in fade-in duration-150">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory('all');
                        setShowCategoryDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-semibold ${selectedCategory === 'all' ? 'bg-gold-500/10 text-gold-600' : 'hover:bg-neutral-100'}`}
                    >
                      All Categories
                    </button>
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(cat.slug);
                          setShowCategoryDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs ${selectedCategory === cat.slug ? 'bg-gold-500/10 text-gold-600 font-semibold' : 'hover:bg-neutral-100'}`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Text Input */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim().length >= 2 && setShowAutocomplete(true)}
                placeholder="Search for products, brands and more..."
                className="flex-1 h-full px-3.5 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none bg-transparent"
              />

              {/* Gold Search Button with Glow */}
              <button
                type="submit"
                aria-label="Search"
                className="h-full px-4 bg-gold-500 hover:bg-gold-600 active:bg-gold-600 text-navy-900 flex items-center justify-center transition-colors flex-shrink-0 icon-interactive"
              >
                <Search className="w-[22px] h-[22px] stroke-[2]" />
              </button>
            </form>

            {/* Live Autocomplete Dropdown */}
            {showAutocomplete && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-surface text-text-primary rounded-[8px] shadow-2xl border border-border z-50 overflow-hidden animate-in fade-in duration-150">
                {autocompleteResults.length > 0 ? (
                  <div className="py-2 divide-y divide-border">
                    {autocompleteResults.map((p) => (
                      <Link
                        key={p.id}
                        to={`/product/${p.slug || p.id}`}
                        onClick={() => setShowAutocomplete(false)}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-neutral-50 transition-colors"
                      >
                        <img
                          src={p.images?.[0]?.url}
                          alt={p.name}
                          className="w-10 h-10 object-contain rounded bg-neutral-100 p-0.5"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-text-primary truncate">{p.name}</p>
                          <p className="text-[11px] text-text-secondary">{p.brand} • ${Number(p.salePrice ?? p.basePrice).toFixed(2)}</p>
                        </div>
                      </Link>
                    ))}
                    <Link
                      to={`/search?q=${encodeURIComponent(searchQuery)}`}
                      onClick={() => setShowAutocomplete(false)}
                      className="block px-4 py-2 text-center text-xs font-bold text-blue-600 hover:bg-neutral-50"
                    >
                      View all results for "{searchQuery}" →
                    </Link>
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-text-secondary">
                    No results found for "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Utility Icons (Account, Orders, Wishlist, Cart) with Interactive Glows */}
          <div className="flex items-center gap-6">
            {/* Account */}
            <Link
              to={isAuthenticated ? '/account' : '/login'}
              className="flex flex-col items-center gap-1 group text-white/90 hover:text-gold-500 transition-colors icon-interactive p-1 rounded"
            >
              <User className="w-[22px] h-[22px] stroke-[1.8]" />
              <span className="text-[12px] font-medium leading-none whitespace-nowrap">
                {isAuthenticated ? user?.firstName || 'Account' : 'Account'}
              </span>
            </Link>

            {/* Orders */}
            <Link
              to="/account/orders"
              className="flex flex-col items-center gap-1 group text-white/90 hover:text-gold-500 transition-colors icon-interactive p-1 rounded"
            >
              <Package className="w-[22px] h-[22px] stroke-[1.8]" />
              <span className="text-[12px] font-medium leading-none whitespace-nowrap">Orders</span>
            </Link>

            {/* Wishlist */}
            <Link
              to="/account/wishlist"
              className="relative flex flex-col items-center gap-1 group text-white/90 hover:text-gold-500 transition-colors icon-interactive p-1 rounded"
            >
              <Heart className="w-[22px] h-[22px] stroke-[1.8]" />
              <span className="text-[12px] font-medium leading-none whitespace-nowrap">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-md animate-scale">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart (Opens Drawer, does not navigate) */}
            <button
              type="button"
              onClick={openDrawer}
              className="relative flex flex-col items-center gap-1 group text-white/90 hover:text-gold-500 transition-colors icon-interactive p-1 rounded"
              aria-label="Open Cart Drawer"
            >
              <div className="relative">
                <ShoppingCart className="w-[22px] h-[22px] stroke-[1.8]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-[12px] font-medium leading-none whitespace-nowrap">Cart</span>
            </button>
          </div>
        </div>

        {/* ROW 3: Category Nav Bar (~44px tall) */}
        <div className="border-t border-white/10 h-11 px-6 max-w-7xl mx-auto flex items-center justify-between text-xs font-medium text-white/90">
          {/* Mega Menu / All Categories Trigger */}
          <Link
            to="/categories"
            className="flex items-center gap-2 pr-4 font-bold text-gold-500 hover:text-white transition-colors border-r border-white/10 icon-interactive"
          >
            <Menu className="w-4 h-4" />
            <span>All Categories</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </Link>

          {/* Main Category Links with 16x16px icons */}
          <nav className="flex items-center gap-6 overflow-x-auto no-scrollbar py-1">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = location.pathname === `/category/${cat.slug}`;

              return (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  className={`flex items-center gap-1.5 whitespace-nowrap transition-colors pb-0.5 border-b-2 icon-interactive ${
                    isActive
                      ? 'text-gold-500 border-gold-500 font-bold'
                      : 'border-transparent text-white/90 hover:text-gold-500'
                  }`}
                >
                  <Icon className="w-4 h-4 stroke-[1.8]" />
                  <span>{cat.name}</span>
                </Link>
              );
            })}

            {/* Overflow 'More' dropdown linking to /categories */}
            <Link
              to="/categories"
              className="flex items-center gap-1 text-white/70 hover:text-gold-500 transition-colors whitespace-nowrap pl-2 icon-interactive"
            >
              <span>More</span>
              <ChevronDown className="w-3 h-3" />
            </Link>
          </nav>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE HEADER (≤640px) — Compact Single Row + Search Bar                  */}
      {/* ========================================================================= */}
      <div className="sm:hidden px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Hamburger Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="p-1 text-white hover:text-gold-500 tap-target"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Centered / Left Logo */}
          <Logo size="sm" />

          {/* Right utility icons: Notification & Cart */}
          <div className="flex items-center gap-3">
            <Link
              to="/account/notifications"
              className="p-1 text-white/90 hover:text-gold-500 tap-target"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
            </Link>

            <button
              type="button"
              onClick={openDrawer}
              className="relative p-1 text-white/90 hover:text-gold-500 tap-target"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Full-width Search Bar beneath mobile header */}
        <form onSubmit={handleSearchSubmit} className="mt-2.5 flex items-center h-10 bg-surface rounded-[8px] overflow-hidden border border-border shadow-inner">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products, brands..."
            className="flex-1 h-full px-3 text-xs text-text-primary placeholder:text-text-secondary focus:outline-none bg-transparent"
          />
          <button
            type="submit"
            className="h-full px-3.5 bg-gold-500 text-navy-900 flex items-center justify-center flex-shrink-0"
            aria-label="Search"
          >
            <Search className="w-4 h-4 stroke-[2]" />
          </button>
        </form>
      </div>

      {/* Mobile Slide-out Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">
          <div
            className="fixed inset-0 bg-navy-900/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-xs bg-navy-900 text-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <Logo size="sm" />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-white/70 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <p className="text-xs font-bold text-gold-500 uppercase tracking-wider mb-3">
                Categories
              </p>
              <div className="space-y-1 mb-6">
                <Link
                  to="/categories"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-2 text-sm font-semibold text-white hover:text-gold-500"
                >
                  <Grid className="w-4 h-4 text-gold-500" />
                  <span>All Categories</span>
                </Link>
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 py-2 text-sm text-white/80 hover:text-gold-500"
                    >
                      <Icon className="w-4 h-4 text-white/60" />
                      <span>{cat.name}</span>
                    </Link>
                  );
                })}
              </div>

              <p className="text-xs font-bold text-gold-500 uppercase tracking-wider mb-3">
                Region & Language
              </p>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs text-white/80">{selectedLang.flag} {selectedLang.name}</span>
                <span className="text-xs text-gold-500 font-bold">•</span>
                <span className="text-xs text-white/80">{selectedCurr.flag} {selectedCurr.code}</span>
              </div>

              <p className="text-xs font-bold text-gold-500 uppercase tracking-wider mb-3">
                Account & Help
              </p>
              <div className="space-y-2 text-sm text-white/80">
                <Link
                  to={isAuthenticated ? '/account' : '/login'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 hover:text-gold-500"
                >
                  {isAuthenticated ? 'My Account' : 'Sign In / Register'}
                </Link>
                <Link
                  to="/account/orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 hover:text-gold-500"
                >
                  My Orders
                </Link>
                <Link
                  to="/account/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 hover:text-gold-500"
                >
                  Wishlist ({wishlistCount})
                </Link>
                <Link
                  to="/help"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 hover:text-gold-500"
                >
                  Help Center
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 hover:text-gold-500"
                >
                  Contact Support
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 text-xs text-white/50">
              © {new Date().getFullYear()} Local Art AI
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
