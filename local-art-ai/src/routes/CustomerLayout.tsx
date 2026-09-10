import React from 'react';
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../shared/store/authStore';
import { useCartStore } from '../shared/store/cartStore';
import { useWishlistStore } from '../shared/store/wishlistStore';
import { formatPrice } from '../shared/lib/utils';
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  Shield,
  Settings,
  HelpCircle,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export const CustomerLayout: React.FC = () => {
  const { user } = useAuthStore();
  const { getItemCount: getWishlistCount } = useWishlistStore();
  const location = useLocation();

  // Dynamic time of day greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const firstName = user?.firstName || 'Artisan';
  const greeting = `${getGreeting()}, ${firstName} 👋`;

  const navItems = [
    { label: 'Profile', path: '/account/profile', icon: User },
    { label: 'Orders', path: '/account/orders', icon: Package },
    { label: 'Wishlist', path: '/account/wishlist', icon: Heart },
    { label: 'Addresses', path: '/account/addresses', icon: MapPin },
    { label: 'Payment Methods', path: '/account/payment-methods', icon: CreditCard },
    { label: 'Notifications', path: '/account/notifications', icon: Bell },
    { label: 'Security', path: '/account/security', icon: Shield },
    { label: 'Settings', path: '/account/settings', icon: Settings },
    { label: 'Support', path: '/account/support', icon: HelpCircle },
  ];

  const isRootAccount = location.pathname === '/account' || location.pathname === '/account/';

  return (
    <div className="py-8 px-6 max-w-7xl mx-auto select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar (Navy #0A1830) */}
        <aside className="lg:col-span-3 bg-navy-900 text-white rounded-[12px] p-4 shadow-xl space-y-1">
          <div className="px-3 py-3 border-b border-white/10 mb-2">
            <p className="text-xs text-gold-500 font-bold uppercase tracking-wider">Account Portal</p>
            <p className="text-sm font-bold text-white truncate">{user?.email || 'user@localart.ai'}</p>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.path);

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-[8px] text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-white/80 hover:bg-navy-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0 stroke-[1.8]" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-9 space-y-6">
          {/* Main Dynamic Header */}
          <div className="bg-surface rounded-[12px] border border-border p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-navy-900">
                {greeting}
              </h1>
              <p className="text-xs text-text-secondary mt-0.5">
                Here's what's happening with your account today.
              </p>
            </div>

            <Link
              to="/marketplace"
              className="inline-flex items-center gap-1.5 bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold px-4 py-2 rounded-btn text-xs transition-colors shadow-sm"
            >
              <span>Shop Collections</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* If on `/account` main overview, render the 3 Stat Cards + Recent Orders */}
          {isRootAccount ? (
            <div className="space-y-6">
              {/* 3 Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Stat 1: Total Orders */}
                <div className="bg-surface rounded-[12px] border border-border p-5 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-text-secondary">Total Orders</p>
                    <p className="text-2xl font-extrabold text-navy-900 mt-1">4</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Package className="w-5 h-5" />
                  </div>
                </div>

                {/* Stat 2: Wishlist Items */}
                <div className="bg-surface rounded-[12px] border border-border p-5 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-text-secondary">Wishlist Items</p>
                    <p className="text-2xl font-extrabold text-navy-900 mt-1">
                      {getWishlistCount()}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
                    <Heart className="w-5 h-5" />
                  </div>
                </div>

                {/* Stat 3: Saved Addresses */}
                <div className="bg-surface rounded-[12px] border border-border p-5 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-text-secondary">Saved Addresses</p>
                    <p className="text-2xl font-extrabold text-navy-900 mt-1">2</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Recent Orders Card */}
              <div className="bg-surface rounded-[12px] border border-border p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <h3 className="text-base font-bold text-text-primary">Recent Orders</h3>
                  <Link
                    to="/account/orders"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="divide-y divide-border">
                  {[
                    {
                      id: 'LA-89421',
                      title: 'Artisan Wireless Studio Pro Headphones',
                      price: 239.99,
                      status: 'Shipped',
                      statusColor: 'bg-blue-50 text-blue-700 border-blue-200',
                      date: 'Sep 08, 2026',
                      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=80',
                    },
                    {
                      id: 'LA-87114',
                      title: 'Minimalist Titanium Automatic Chronograph',
                      price: 340.00,
                      status: 'Delivered',
                      statusColor: 'bg-green-50 text-green-700 border-green-200',
                      date: 'Aug 22, 2026',
                      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&auto=format&fit=crop&q=80',
                    },
                    {
                      id: 'LA-85092',
                      title: 'Nordic Sculptural Ceramic Table Lamp',
                      price: 132.00,
                      status: 'Processing',
                      statusColor: 'bg-amber-50 text-amber-700 border-amber-200',
                      date: 'Aug 14, 2026',
                      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=200&auto=format&fit=crop&q=80',
                    },
                  ].map((ord) => (
                    <div key={ord.id} className="py-3.5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={ord.image}
                          alt={ord.title}
                          className="w-12 h-12 rounded-[8px] object-contain bg-neutral-50 p-1 border border-border flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-text-primary truncate">{ord.title}</p>
                          <p className="text-[11px] text-text-secondary">Order #{ord.id} • {ord.date}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 flex-shrink-0">
                        <span className="text-xs font-bold text-text-primary">
                          {formatPrice(ord.price)}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${ord.statusColor}`}>
                          {ord.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};
