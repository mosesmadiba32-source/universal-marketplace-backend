import React, { useState } from 'react';
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Grid,
  ShoppingCart,
  BarChart3,
  Star,
  Tag,
  Users,
  Settings,
  Bell,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import { Logo } from '../shared/components/Logo';

const ADMIN_NAV = [
  { to: '/admin', label: 'Executive Dashboard', icon: LayoutDashboard, exact: true },
  { to: '/admin/products', label: 'Product Catalog', icon: Package },
  { to: '/admin/orders', label: 'Order Fulfillment', icon: ShoppingCart },
  { to: '/admin/inventory', label: 'Inventory Watchdog', icon: BarChart3 },
  { to: '/admin/reviews', label: 'Review Moderation', icon: Star },
  { to: '/admin/coupons', label: 'Coupons & Deals', icon: Tag },
  { to: '/admin/customers', label: 'Customer Registry', icon: Users },
  { to: '/admin/settings', label: 'System Settings', icon: Settings },
];

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-bg-page text-text-primary select-none antialiased">
      {/* Navy #0A1830 Admin Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 z-40 inset-y-0 left-0 flex flex-col bg-navy-900 text-white transition-all duration-300 shadow-2xl h-screen ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
        style={{ backgroundColor: '#0A1830' }}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-gold-500 text-navy-900 font-extrabold flex items-center justify-center text-xs flex-shrink-0">
              LA
            </div>
            {sidebarOpen && (
              <div className="min-w-0">
                <span className="font-bold text-xs tracking-wider text-gold-500 block truncate uppercase">
                  Admin Portal
                </span>
                <span className="text-[10px] text-white/50 block truncate">SuperAdmin Access</span>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle Sidebar"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto no-scrollbar">
          {ADMIN_NAV.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-[8px] text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-white/80 hover:bg-navy-800 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0 stroke-[1.8]" />
                {sidebarOpen && <span className="truncate">{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Back to Live Store */}
        <div className="p-3 border-t border-white/10 flex-shrink-0">
          <Link
            to="/"
            className="flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-xs font-medium text-white/70 hover:text-gold-500 hover:bg-white/5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
            {sidebarOpen && <span>View Live Storefront</span>}
          </Link>
        </div>
      </aside>

      {/* Main Admin Workspace */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Admin Workspace Bar */}
        <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-6 shadow-xs sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-navy-900 uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <span>Local Art AI Management Console</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Low-stock Watchdog Alert Badge */}
            <Link
              to="/admin/inventory"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold hover:bg-amber-100 transition-colors"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span>3 Low Stock Items</span>
            </Link>

            {/* Admin Profile */}
            <div className="flex items-center gap-2 pl-3 border-l border-border">
              <div className="w-7 h-7 rounded-full bg-navy-900 text-gold-500 flex items-center justify-center font-bold text-xs">
                SA
              </div>
              <span className="text-xs font-bold text-navy-900 hidden sm:inline">Lead Administrator</span>
            </div>
          </div>
        </header>

        {/* Workspace Canvas */}
        <main className="flex-1 p-6 md:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
