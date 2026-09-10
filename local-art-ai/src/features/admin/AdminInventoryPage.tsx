import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from './adminApi';
import { catalogApi } from '../catalog/catalogApi';
import { formatDate } from '../../shared/lib/utils';
import { Button } from '../../shared/components/Button';
import { Input } from '../../shared/components/Input';
import { Select } from '../../shared/components/Select';
import { Badge } from '../../shared/components/Badge';
import { Modal } from '../../shared/components/Modal';
import { useUiStore } from '../../shared/store/uiStore';
import { Sliders, History, AlertTriangle, Plus, Minus } from 'lucide-react';

export const AdminInventoryPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { addToast } = useUiStore();

  const [page, setPage] = useState(1);
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);

  const { data: logsData, isLoading: isLogsLoading } = useQuery({
    queryKey: ['admin-inventory-logs', page],
    queryFn: () => adminApi.getInventoryLogs({ page, limit: 15 }),
  });

  const { data: productsData } = useQuery({
    queryKey: ['admin-products-list'],
    queryFn: () => catalogApi.getProducts({ limit: 100 }),
  });

  const [form, setForm] = useState({
    productId: '',
    action: 'INCREASE' as 'INCREASE' | 'DECREASE',
    quantity: 10,
    reason: 'Restock received from supplier',
  });

  const adjustMutation = useMutation({
    mutationFn: adminApi.adjustStock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-inventory-logs'] });
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      addToast({
        type: 'success',
        title: 'Inventory Updated',
        message: 'Stock adjustment applied and logged.',
      });
      setIsAdjustModalOpen(false);
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      addToast({
        type: 'error',
        title: 'Adjustment Failed',
        message: error.response?.data?.message || 'Stock cannot be decreased below zero.',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.productId || form.quantity <= 0) {
      alert('Please select a product and enter a valid quantity.');
      return;
    }
    adjustMutation.mutate(form);
  };

  const logs = logsData?.logs || [];
  const products = productsData?.products || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-neutral-900 tracking-tight">
            Inventory Tracking & Audit Logs
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Audit inventory movements, restock levels, and manual adjustments
          </p>
        </div>
        <Button
          variant="accent"
          size="sm"
          onClick={() => {
            if (products.length > 0) setForm((prev) => ({ ...prev, productId: products[0].id }));
            setIsAdjustModalOpen(true);
          }}
        >
          <Sliders className="w-4 h-4 mr-1.5" /> Adjust Stock
        </Button>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-card border border-neutral-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-neutral-200 bg-neutral-50 flex items-center gap-2">
          <History className="w-4 h-4 text-neutral-600" />
          <h3 className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
            Inventory Change History
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 text-neutral-700 uppercase font-bold border-b border-neutral-200">
              <tr>
                <th className="px-5 py-3">Timestamp</th>
                <th className="px-4 py-3">Product ID</th>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Before $\to$ After</th>
                <th className="px-4 py-3">Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {isLogsLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-neutral-400">
                    Loading inventory logs...
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-neutral-500">
                    No inventory movements recorded yet.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-5 py-3 text-neutral-500">{formatDate(log.createdAt)}</td>
                    <td className="px-4 py-3 font-mono text-neutral-600 truncate max-w-[120px]">
                      {log.productId}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={
                          log.action === 'INCREASE' || log.action === 'RELEASE'
                            ? 'success'
                            : 'danger'
                        }
                        size="sm"
                      >
                        {log.action}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 font-bold text-neutral-900">
                      {log.action === 'INCREASE' || log.action === 'RELEASE' ? '+' : '-'}
                      {log.quantity}
                    </td>
                    <td className="px-4 py-3 text-neutral-700 font-semibold">
                      {log.beforeStock} $\to$ {log.afterStock}
                    </td>
                    <td className="px-4 py-3 text-neutral-600 max-w-xs truncate">{log.reason}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Adjust Stock Modal */}
      <Modal
        isOpen={isAdjustModalOpen}
        onClose={() => setIsAdjustModalOpen(false)}
        title="Manual Stock Adjustment"
        description="Record an increase or decrease in product physical inventory."
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Target Product *"
            value={form.productId}
            onChange={(e) => setForm({ ...form, productId: e.target.value })}
            options={
              products.map((p) => ({
                value: p.id,
                label: `${p.name} (Current Stock: ${p.stockQuantity})`,
              })) || [{ value: '', label: 'No Products' }]
            }
          />

          <Select
            label="Adjustment Action *"
            value={form.action}
            onChange={(e) => setForm({ ...form, action: e.target.value as 'INCREASE' | 'DECREASE' })}
            options={[
              { value: 'INCREASE', label: 'INCREASE (Add Stock / Restock)' },
              { value: 'DECREASE', label: 'DECREASE (Damaged / Audited Reduction)' },
            ]}
          />

          <Input
            label="Quantity Units *"
            type="number"
            min="1"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: Math.max(1, Number(e.target.value)) })}
            required
          />

          <Input
            label="Reason / Reference *"
            placeholder="e.g. Warehouse Batch #409 Restocked"
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
            required
          />

          <div className="flex justify-end gap-2 pt-4 border-t border-neutral-100">
            <Button type="button" variant="outline" onClick={() => setIsAdjustModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="accent" isLoading={adjustMutation.isPending}>
              Apply Stock Adjustment
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
