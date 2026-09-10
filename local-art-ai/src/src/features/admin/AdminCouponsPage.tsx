import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../shared/lib/apiClient';
import { Coupon, ApiResponse, PaginatedResult } from '../../shared/types/api';
import { Button } from '../../shared/components/Button';
import { Input } from '../../shared/components/Input';
import { Select } from '../../shared/components/Select';
import { Modal } from '../../shared/components/Modal';
import { Badge } from '../../shared/components/Badge';
import { Skeleton } from '../../shared/components/Skeleton';
import { Tag, Plus, Trash2, ToggleLeft, ToggleRight, Pencil } from 'lucide-react';
import clsx from 'clsx';

// ── API helpers ─────────────────────────────────────────────────────────────

async function fetchCoupons(page = 1): Promise<PaginatedResult<Coupon>> {
  const res = await apiClient.get<ApiResponse<PaginatedResult<Coupon>>>('/api/coupons', {
    params: { page, limit: 20 },
  });
  return res.data.data;
}

async function createCoupon(payload: Omit<Coupon, 'id' | 'usedCount'>): Promise<Coupon> {
  const res = await apiClient.post<ApiResponse<Coupon>>('/api/coupons', payload);
  return res.data.data;
}

async function toggleCoupon(id: string, isActive: boolean): Promise<Coupon> {
  const res = await apiClient.patch<ApiResponse<Coupon>>(`/api/coupons/${id}`, { isActive });
  return res.data.data;
}

async function deleteCoupon(id: string): Promise<void> {
  await apiClient.delete(`/api/coupons/${id}`);
}

// ── Coupon Form ─────────────────────────────────────────────────────────────

interface CouponFormData {
  code: string;
  description: string;
  discountType: 'PERCENTAGE' | 'FIXED';
  discountValue: string;
  minimumOrderAmount: string;
  maximumDiscountAmount: string;
  usageLimit: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

const emptyForm: CouponFormData = {
  code: '',
  description: '',
  discountType: 'PERCENTAGE',
  discountValue: '',
  minimumOrderAmount: '',
  maximumDiscountAmount: '',
  usageLimit: '',
  startDate: new Date().toISOString().split('T')[0],
  endDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
  isActive: true,
};

function CouponForm({
  initial,
  onSave,
  isSaving,
}: {
  initial?: CouponFormData;
  onSave: (data: CouponFormData) => void;
  isSaving: boolean;
}) {
  const [form, setForm] = useState<CouponFormData>(initial ?? emptyForm);

  const set = (key: keyof CouponFormData, value: string | boolean) =>
    setForm((f) => ({ ...f, [key]: value }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(form);
      }}
      className="space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Coupon Code"
          placeholder="SUMMER20"
          value={form.code}
          onChange={(e) => set('code', e.target.value.toUpperCase())}
          required
          className="font-mono uppercase"
        />
        <Select
          label="Discount Type"
          value={form.discountType}
          onChange={(e) => set('discountType', e.target.value as 'PERCENTAGE' | 'FIXED')}
          options={[
            { value: 'PERCENTAGE', label: 'Percentage (%)' },
            { value: 'FIXED', label: 'Fixed Amount ($)' },
          ]}
        />
      </div>

      <Input
        label="Description (optional)"
        placeholder="20% off all summer items"
        value={form.description}
        onChange={(e) => set('description', e.target.value)}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label={form.discountType === 'PERCENTAGE' ? 'Discount %' : 'Discount Amount'}
          type="number"
          min="0"
          placeholder={form.discountType === 'PERCENTAGE' ? '20' : '10.00'}
          value={form.discountValue}
          onChange={(e) => set('discountValue', e.target.value)}
          required
        />
        <Input
          label="Usage Limit (blank = unlimited)"
          type="number"
          min="1"
          placeholder="100"
          value={form.usageLimit}
          onChange={(e) => set('usageLimit', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Min Order Amount"
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
          value={form.minimumOrderAmount}
          onChange={(e) => set('minimumOrderAmount', e.target.value)}
        />
        <Input
          label="Max Discount Cap"
          type="number"
          min="0"
          step="0.01"
          placeholder="50.00"
          value={form.maximumDiscountAmount}
          onChange={(e) => set('maximumDiscountAmount', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Start Date"
          type="date"
          value={form.startDate}
          onChange={(e) => set('startDate', e.target.value)}
          required
        />
        <Input
          label="End Date"
          type="date"
          value={form.endDate}
          onChange={(e) => set('endDate', e.target.value)}
          required
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          id="coupon-active"
          type="checkbox"
          checked={form.isActive}
          onChange={(e) => set('isActive', e.target.checked)}
          className="w-4 h-4 text-accent rounded focus:ring-accent"
        />
        <label htmlFor="coupon-active" className="text-sm font-medium text-neutral-700">
          Active immediately
        </label>
      </div>

      <div className="flex justify-end pt-2">
        <Button type="submit" variant="accent" isLoading={isSaving}>
          Save Coupon
        </Button>
      </div>
    </form>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

export function AdminCouponsPage() {
  const qc = useQueryClient();
  const [page] = useState(1);
  const [showCreate, setShowCreate] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-coupons', page],
    queryFn: () => fetchCoupons(page),
  });

  const createMutation = useMutation({
    mutationFn: createCoupon,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-coupons'] });
      setShowCreate(false);
    },
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) => toggleCoupon(id, isActive),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-coupons'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCoupon,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-coupons'] });
      setDeletingId(null);
    },
  });

  const handleCreate = (form: CouponFormData) => {
    createMutation.mutate({
      code: form.code,
      description: form.description || undefined,
      discountType: form.discountType,
      discountValue: parseFloat(form.discountValue),
      minimumOrderAmount: form.minimumOrderAmount ? parseFloat(form.minimumOrderAmount) : undefined,
      maximumDiscountAmount: form.maximumDiscountAmount ? parseFloat(form.maximumDiscountAmount) : undefined,
      usageLimit: form.usageLimit ? parseInt(form.usageLimit, 10) : undefined,
      startDate: new Date(form.startDate).toISOString(),
      endDate: new Date(form.endDate).toISOString(),
      isActive: form.isActive,
    } as unknown as Omit<Coupon, 'id' | 'usedCount'>);
  };

  const isExpired = (c: Coupon) => new Date(c.endDate) < new Date();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-neutral-900 flex items-center gap-2">
            <Tag className="w-5 h-5 text-accent" /> Coupon Management
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">Create and manage discount codes</p>
        </div>
        <Button
          id="create-coupon-btn"
          variant="accent"
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> New Coupon
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-card border border-neutral-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50">
                {['Code', 'Type', 'Value', 'Usage', 'Validity', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold text-neutral-500 uppercase tracking-widest whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      {Array.from({ length: 7 }).map((_, j) => (
                        <td key={j} className="px-4 py-3">
                          <Skeleton className="h-4 w-20" />
                        </td>
                      ))}
                    </tr>
                  ))
                : data?.items?.map((coupon) => (
                    <tr
                      key={coupon.id}
                      className={clsx(
                        'hover:bg-neutral-50 transition-colors',
                        isExpired(coupon) && 'opacity-60'
                      )}
                    >
                      <td className="px-4 py-3">
                        <span className="font-mono font-bold text-primary text-xs bg-neutral-100 px-2 py-1 rounded">
                          {coupon.code}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={coupon.discountType === 'PERCENTAGE' ? 'info' : 'success'}>
                          {coupon.discountType === 'PERCENTAGE' ? '%' : '$'} {coupon.discountType.toLowerCase()}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 font-semibold text-neutral-800">
                        {coupon.discountType === 'PERCENTAGE'
                          ? `${coupon.discountValue}%`
                          : `$${Number(coupon.discountValue).toFixed(2)}`}
                      </td>
                      <td className="px-4 py-3 text-neutral-600 text-xs">
                        {coupon.usedCount}
                        {coupon.usageLimit ? ` / ${coupon.usageLimit}` : ' (∞)'}
                      </td>
                      <td className="px-4 py-3 text-xs text-neutral-500 whitespace-nowrap">
                        <div>{new Date(coupon.startDate).toLocaleDateString()}</div>
                        <div>→ {new Date(coupon.endDate).toLocaleDateString()}</div>
                        {isExpired(coupon) && (
                          <span className="text-status-danger font-semibold">Expired</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={coupon.isActive && !isExpired(coupon) ? 'success' : 'default'}>
                          {coupon.isActive && !isExpired(coupon) ? 'Active' : 'Inactive'}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            title={coupon.isActive ? 'Deactivate' : 'Activate'}
                            onClick={() => toggleMutation.mutate({ id: coupon.id, isActive: !coupon.isActive })}
                            className="p-1.5 rounded hover:bg-neutral-100 text-neutral-500 hover:text-primary transition-colors"
                          >
                            {coupon.isActive ? (
                              <ToggleRight className="w-4 h-4 text-status-success" />
                            ) : (
                              <ToggleLeft className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            title="Delete coupon"
                            onClick={() => setDeletingId(coupon.id)}
                            className="p-1.5 rounded hover:bg-red-50 text-neutral-400 hover:text-status-danger transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

              {!isLoading && (!data?.items || data.items.length === 0) && (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-neutral-400">
                    <Pencil className="w-8 h-8 mx-auto mb-2 text-neutral-300" />
                    No coupons yet. Create your first promotional code.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create coupon modal */}
      <Modal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        title="Create New Coupon"
        size="lg"
      >
        <CouponForm onSave={handleCreate} isSaving={createMutation.isPending} />
      </Modal>

      {/* Delete confirmation modal */}
      <Modal
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        title="Delete Coupon"
      >
        <div className="space-y-4">
          <p className="text-sm text-neutral-600">
            This coupon will be permanently deleted and will no longer be redeemable. This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setDeletingId(null)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              isLoading={deleteMutation.isPending}
              onClick={() => deletingId && deleteMutation.mutate(deletingId)}
            >
              Delete Coupon
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
