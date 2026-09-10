import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../shared/lib/utils';
import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Package,
  Users,
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export const AdminDashboardOverview: React.FC = () => {
  const stats = [
    {
      title: 'Gross Merchandise Value (GMV)',
      value: '$128,450.00',
      change: '+14.8%',
      isPositive: true,
      icon: DollarSign,
      color: 'bg-green-50 text-green-700',
    },
    {
      title: 'Total Orders Processed',
      value: '1,420',
      change: '+8.2%',
      isPositive: true,
      icon: ShoppingCart,
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Average Order Value (AOV)',
      value: '$90.45',
      change: '+3.4%',
      isPositive: true,
      icon: TrendingUp,
      color: 'bg-purple-50 text-purple-700',
    },
    {
      title: 'Active Artisan Creators',
      value: '48',
      change: '+6 this month',
      isPositive: true,
      icon: Users,
      color: 'bg-amber-50 text-amber-700',
    },
  ];

  const recentOrders = [
    {
      id: 'LA-89421',
      customer: 'Marcus Vance',
      email: 'marcus.v@example.com',
      items: 'Artisan Wireless Studio Pro Headphones',
      total: 239.99,
      status: 'Shipped',
      statusColor: 'bg-blue-50 text-blue-700 border-blue-200',
      date: 'Sep 08, 2026',
    },
    {
      id: 'LA-89420',
      customer: 'Elena Rostova',
      email: 'elena.r@example.com',
      items: 'Minimalist Titanium Automatic Chronograph',
      total: 340.00,
      status: 'Processing',
      statusColor: 'bg-amber-50 text-amber-700 border-amber-200',
      date: 'Sep 09, 2026',
    },
    {
      id: 'LA-89419',
      customer: 'David Kim',
      email: 'david.k@example.com',
      items: 'Nordic Sculptural Ceramic Table Lamp',
      total: 132.00,
      status: 'Delivered',
      statusColor: 'bg-green-50 text-green-700 border-green-200',
      date: 'Sep 07, 2026',
    },
  ];

  const lowStockItems = [
    { name: 'Bespoke Curated Art Commission', sku: 'SRV-AC-009', stock: 8, threshold: 10 },
    { name: 'Minimalist Titanium Chronograph', sku: 'FSH-WT-002', stock: 12, threshold: 15 },
    { name: 'Architectural Monograph', sku: 'BK-ARC-006', stock: 15, threshold: 20 },
  ];

  return (
    <div className="space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-900">Executive Analytics</h1>
          <p className="text-xs text-text-secondary mt-1">
            Real-time platform revenue velocity, order throughput, and inventory health
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/products"
            className="inline-flex items-center gap-1.5 bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold px-4 py-2 rounded-btn text-xs transition-colors shadow-sm"
          >
            <span>+ Add New Product</span>
          </Link>
          <Link
            to="/admin/orders"
            className="inline-flex items-center gap-1.5 bg-navy-900 hover:bg-navy-800 text-white font-bold px-4 py-2 rounded-btn text-xs transition-colors shadow-sm"
          >
            <span>Fulfillment Board</span>
          </Link>
        </div>
      </div>

      {/* 4 Key Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="bg-surface rounded-[12px] border border-border p-5 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-text-secondary">{s.title}</span>
                <div className={`w-8 h-8 rounded-full ${s.color} flex items-center justify-center`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-extrabold text-navy-900">{s.value}</span>
                <span className="text-xs font-bold text-green-600 flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>{s.change}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid: Recent Orders Pipeline + Low Stock Watchdog */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Orders Pipeline (8 cols) */}
        <div className="lg:col-span-8 bg-surface rounded-[12px] border border-border p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div>
              <h3 className="text-sm font-bold text-navy-900">Recent Customer Orders</h3>
              <p className="text-[11px] text-text-secondary">Live orders synchronized across payment gateways</p>
            </div>
            <Link
              to="/admin/orders"
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
            >
              <span>View Kanban Board</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-border text-text-secondary uppercase text-[10px]">
                  <th className="py-2.5 px-3">Order ID</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Items</th>
                  <th className="py-2.5 px-3">Total</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="py-3 px-3 font-bold text-navy-900">{ord.id}</td>
                    <td className="py-3 px-3 font-medium text-text-primary">
                      <p className="leading-tight">{ord.customer}</p>
                      <p className="text-[10px] text-text-secondary">{ord.email}</p>
                    </td>
                    <td className="py-3 px-3 text-text-secondary truncate max-w-[180px]">
                      {ord.items}
                    </td>
                    <td className="py-3 px-3 font-bold text-navy-900">{formatPrice(ord.total)}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${ord.statusColor}`}>
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-text-secondary">{ord.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Watchdog (4 cols) */}
        <div className="lg:col-span-4 bg-surface rounded-[12px] border border-border p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <h3 className="text-sm font-bold text-navy-900 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Low Inventory Alerts</span>
            </h3>
            <Link
              to="/admin/inventory"
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              Manage
            </Link>
          </div>

          <div className="space-y-3">
            {lowStockItems.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-[8px] bg-neutral-50 border border-border flex items-center justify-between"
              >
                <div>
                  <p className="text-xs font-bold text-text-primary line-clamp-1">{item.name}</p>
                  <p className="text-[10px] text-text-secondary font-mono">SKU: {item.sku}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-800">
                    {item.stock} left
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              to="/admin/inventory"
              className="w-full bg-navy-900 hover:bg-navy-800 text-white font-bold py-2 px-3 rounded-btn text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Bulk Restock Engine</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
