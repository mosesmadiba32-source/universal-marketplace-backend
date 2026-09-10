import React, { useState } from 'react';
import { useAddresses, useAddressMutations } from './useAddresses';
import { Address } from '../../shared/types/api';
import { AddressModal } from './AddressModal';
import { Button } from '../../shared/components/Button';
import { Badge } from '../../shared/components/Badge';
import { MapPin, Plus, Edit2, Trash2, CheckCircle } from 'lucide-react';

export const AddressListPage: React.FC = () => {
  const { data: addresses, isLoading } = useAddresses();
  const { deleteAddress, setDefaultAddress } = useAddressMutations();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const handleOpenAdd = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (addr: Address) => {
    setEditingAddress(addr);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-neutral-900 tracking-tight">
            Saved Delivery Addresses
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Manage your delivery locations for fast checkout
          </p>
        </div>
        <Button variant="accent" size="sm" onClick={handleOpenAdd}>
          <Plus className="w-4 h-4 mr-1.5" /> Add New Address
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="h-40 bg-white rounded-card animate-pulse border border-neutral-200" />
          ))}
        </div>
      ) : !addresses || addresses.length === 0 ? (
        <div className="bg-white rounded-card border border-neutral-200 p-12 text-center space-y-3">
          <MapPin className="w-12 h-12 text-neutral-300 mx-auto" />
          <h3 className="text-base font-bold text-neutral-900">No addresses saved yet</h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Add a primary shipping address to streamline your checkout process.
          </p>
          <div className="pt-2">
            <Button variant="accent" size="sm" onClick={handleOpenAdd}>
              Add Address
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`bg-white rounded-card border p-5 flex flex-col justify-between space-y-4 transition-all shadow-xs ${
                addr.isDefault ? 'border-primary ring-1 ring-primary' : 'border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                      {addr.city}, {addr.country}
                    </span>
                  </div>
                  {addr.isDefault && (
                    <Badge variant="primary" size="sm">
                      Default
                    </Badge>
                  )}
                </div>

                <div className="text-xs text-neutral-700 space-y-0.5 pt-1">
                  <p className="font-semibold text-neutral-900">{addr.street}</p>
                  <p>{addr.city}, {addr.state} {addr.postalCode}</p>
                  <p>{addr.country}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-neutral-100 text-xs">
                {!addr.isDefault ? (
                  <button
                    onClick={() => setDefaultAddress(addr.id)}
                    className="text-neutral-500 hover:text-neutral-900 font-semibold inline-flex items-center gap-1"
                  >
                    <CheckCircle className="w-3.5 h-3.5" /> Set as Default
                  </button>
                ) : (
                  <span className="text-emerald-700 font-semibold text-[11px]">Primary Shipping Address</span>
                )}

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleOpenEdit(addr)}
                    className="text-neutral-500 hover:text-neutral-900 font-medium inline-flex items-center gap-1"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => deleteAddress(addr.id)}
                    className="text-neutral-400 hover:text-status-danger font-medium inline-flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        addressToEdit={editingAddress}
      />
    </div>
  );
};
