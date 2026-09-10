import React, { useState } from 'react';
import {
  Users,
  Search,
  Download,
  Mail,
  Phone,
  Calendar,
  ShoppingBag,
  ShieldCheck,
  Star,
  ExternalLink,
  MoreVertical,
  Filter,
} from 'lucide-react';
import { Badge } from '../../shared/components/Badge';
import { Button } from '../../shared/components/Button';
import { Input } from '../../shared/components/Input';
import { Modal } from '../../shared/components/Modal';
import { formatPrice, formatDate } from '../../shared/lib/utils';
import { useUiStore } from '../../shared/store/uiStore';

interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  totalOrders: number;
  totalSpent: number;
  status: 'ACTIVE' | 'VIP' | 'INACTIVE';
  joinedAt: string;
  lastOrderAt: string;
  city: string;
  country: string;
}

const MOCK_CUSTOMERS: CustomerRecord[] = [
  {
    id: 'cust-1',
    name: 'Elena Rostova',
    email: 'elena.rostova@artisan.io',
    phone: '+1 (555) 234-8901',
    totalOrders: 14,
    totalSpent: 1845.5,
    status: 'VIP',
    joinedAt: '2025-08-14T10:00:00Z',
    lastOrderAt: '2026-03-01T14:20:00Z',
    city: 'New York',
    country: 'United States',
  },
  {
    id: 'cust-2',
    name: 'Marcus Vance',
    email: 'marcus.v@studiohorizon.com',
    phone: '+1 (555) 789-1234',
    totalOrders: 8,
    totalSpent: 920.0,
    status: 'ACTIVE',
    joinedAt: '2025-11-02T16:45:00Z',
    lastOrderAt: '2026-02-27T09:12:00Z',
    city: 'San Francisco',
    country: 'United States',
  },
  {
    id: 'cust-3',
    name: 'Amara Chen',
    email: 'amara.chen@designcraft.org',
    phone: '+44 20 7946 0912',
    totalOrders: 21,
    totalSpent: 3450.75,
    status: 'VIP',
    joinedAt: '2025-05-19T11:20:00Z',
    lastOrderAt: '2026-03-08T18:40:00Z',
    city: 'London',
    country: 'United Kingdom',
  },
  {
    id: 'cust-4',
    name: 'Liam O\'Connor',
    email: 'liam.oc@celticart.ie',
    phone: '+353 1 496 0123',
    totalOrders: 3,
    totalSpent: 285.0,
    status: 'ACTIVE',
    joinedAt: '2026-01-10T08:30:00Z',
    lastOrderAt: '2026-01-28T12:00:00Z',
    city: 'Dublin',
    country: 'Ireland',
  },
  {
    id: 'cust-5',
    name: 'Sophia Dubois',
    email: 'sophia.d@galeriemoderne.fr',
    phone: '+33 1 42 68 55 00',
    totalOrders: 11,
    totalSpent: 1680.2,
    status: 'VIP',
    joinedAt: '2025-09-04T14:15:00Z',
    lastOrderAt: '2026-03-05T16:30:00Z',
    city: 'Paris',
    country: 'France',
  },
  {
    id: 'cust-6',
    name: 'David Kim',
    email: 'david.kim@seoulcreative.kr',
    phone: '+82 2 555 0199',
    totalOrders: 1,
    totalSpent: 65.0,
    status: 'INACTIVE',
    joinedAt: '2025-10-15T09:00:00Z',
    lastOrderAt: '2025-10-15T09:30:00Z',
    city: 'Seoul',
    country: 'South Korea',
  },
];

export const AdminCustomersPage: React.FC = () => {
  const { addToast } = useUiStore();
  const [customers, setCustomers] = useState<CustomerRecord[]>(MOCK_CUSTOMERS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'VIP' | 'INACTIVE'>('ALL');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerRecord | null>(null);

  const filtered = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Total Orders', 'Total Spent', 'Status', 'Joined Date', 'City', 'Country'];
    const rows = filtered.map((c) => [
      c.id,
      `"${c.name}"`,
      c.email,
      c.phone,
      c.totalOrders,
      c.totalSpent.toFixed(2),
      c.status,
      c.joinedAt,
      `"${c.city}"`,
      `"${c.country}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `local_art_customers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast({
      type: 'success',
      title: 'Customer Export Generated',
      message: `Exported ${filtered.length} customer records to CSV.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-neutral-900 tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" /> Customer Registry
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Manage registered clients, monitor customer lifetime value (LTV), and review purchase history
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            className="text-xs flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" /> Export CSV
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-card border border-neutral-200 shadow-xs">
          <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">
            Total Customers
          </span>
          <span className="text-2xl font-black text-navy-900 mt-1 block">1,842</span>
          <span className="text-[11px] text-green-600 font-semibold mt-0.5 block">+18% this month</span>
        </div>
        <div className="bg-white p-4 rounded-card border border-neutral-200 shadow-xs">
          <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">
            VIP Collectors
          </span>
          <span className="text-2xl font-black text-gold-600 mt-1 block">148</span>
          <span className="text-[11px] text-neutral-500 font-medium mt-0.5 block">&gt; $1,000 spend</span>
        </div>
        <div className="bg-white p-4 rounded-card border border-neutral-200 shadow-xs">
          <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">
            Avg Customer LTV
          </span>
          <span className="text-2xl font-black text-navy-900 mt-1 block">$342.80</span>
          <span className="text-[11px] text-green-600 font-semibold mt-0.5 block">+6.4% YoY</span>
        </div>
        <div className="bg-white p-4 rounded-card border border-neutral-200 shadow-xs">
          <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">
            Repeat Purchase Rate
          </span>
          <span className="text-2xl font-black text-blue-600 mt-1 block">42.8%</span>
          <span className="text-[11px] text-neutral-500 font-medium mt-0.5 block">High loyalty index</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-3 rounded-card border border-neutral-200">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client name, email, or city..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-neutral-200 rounded-button focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
        </div>
        <div className="flex items-center gap-1.5">
          {(['ALL', 'VIP', 'ACTIVE', 'INACTIVE'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-button text-xs font-bold transition-colors ${
                statusFilter === st
                  ? 'bg-navy-900 text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Customer List */}
      <div className="bg-white rounded-card border border-neutral-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 text-neutral-700 uppercase font-bold border-b border-neutral-200">
              <tr>
                <th className="px-5 py-3">Customer</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3 text-center">Orders</th>
                <th className="px-4 py-3">Total Spent</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Last Order</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-neutral-400">
                    No customers found matching current filters.
                  </td>
                </tr>
              ) : (
                filtered.map((customer) => (
                  <tr key={customer.id} className="hover:bg-neutral-50/80 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-navy-100 text-navy-900 font-bold flex items-center justify-center text-xs flex-shrink-0 border border-neutral-200">
                          {customer.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .toUpperCase()}
                        </div>
                        <div>
                          <span className="font-bold text-neutral-900 block">{customer.name}</span>
                          <span className="text-neutral-500 text-[11px] block">{customer.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-neutral-600 font-medium">
                      {customer.city}, {customer.country}
                    </td>
                    <td className="px-4 py-3.5 text-center font-bold text-neutral-800">
                      {customer.totalOrders}
                    </td>
                    <td className="px-4 py-3.5 font-bold text-navy-900">
                      {formatPrice(customer.totalSpent)}
                    </td>
                    <td className="px-4 py-3.5">
                      {customer.status === 'VIP' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-gold-100 text-gold-800 border border-gold-300">
                          <Star className="w-3 h-3 fill-gold-500 text-gold-500" /> VIP
                        </span>
                      )}
                      {customer.status === 'ACTIVE' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-800">
                          Active
                        </span>
                      )}
                      {customer.status === 'INACTIVE' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-neutral-100 text-neutral-600">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-neutral-500 text-[11px]">
                      {formatDate(customer.lastOrderAt)}
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedCustomer(customer)}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                      >
                        Inspect
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedCustomer(null)}
          title={`Customer Profile: ${selectedCustomer.name}`}
        >
          <div className="space-y-5 text-xs">
            <div className="flex items-center gap-4 p-4 bg-neutral-50 rounded-[10px] border border-neutral-200">
              <div className="w-12 h-12 rounded-full bg-navy-900 text-gold-400 font-extrabold flex items-center justify-center text-base">
                {selectedCustomer.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-neutral-900">{selectedCustomer.name}</h4>
                  {selectedCustomer.status === 'VIP' && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-gold-100 text-gold-800 border border-gold-300">
                      VIP Client
                    </span>
                  )}
                </div>
                <p className="text-neutral-500 text-[11px]">{selectedCustomer.email}</p>
                <p className="text-neutral-500 text-[11px]">{selectedCustomer.phone}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white border border-neutral-200 rounded-[8px]">
                <span className="text-[10px] font-bold text-neutral-400 uppercase block">Lifetime Value</span>
                <span className="text-base font-extrabold text-navy-900 mt-0.5 block">
                  {formatPrice(selectedCustomer.totalSpent)}
                </span>
              </div>
              <div className="p-3 bg-white border border-neutral-200 rounded-[8px]">
                <span className="text-[10px] font-bold text-neutral-400 uppercase block">Completed Orders</span>
                <span className="text-base font-extrabold text-navy-900 mt-0.5 block">
                  {selectedCustomer.totalOrders}
                </span>
              </div>
            </div>

            <div className="space-y-2 border-t border-neutral-200 pt-3">
              <div className="flex justify-between py-1">
                <span className="text-neutral-500">Member Since:</span>
                <span className="font-semibold text-neutral-800">{formatDate(selectedCustomer.joinedAt)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-neutral-500">Shipping Location:</span>
                <span className="font-semibold text-neutral-800">{selectedCustomer.city}, {selectedCustomer.country}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-neutral-500">Communication Status:</span>
                <span className="font-semibold text-green-600">Subscribed to Artisan Drops</span>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-200 flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  window.open(`mailto:${selectedCustomer.email}?subject=Local%20Art%20AI%20VIP%20Concierge`);
                }}
                className="flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" /> Send Direct Email
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setSelectedCustomer(null)}
              >
                Done
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
