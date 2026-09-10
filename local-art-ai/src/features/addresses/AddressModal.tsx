import React, { useState, useEffect } from 'react';
import { Address } from '../../shared/types/api';
import { useAddressMutations } from './useAddresses';
import { Modal } from '../../shared/components/Modal';
import { Input } from '../../shared/components/Input';
import { Button } from '../../shared/components/Button';

export interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  addressToEdit?: Address | null;
  onSuccess?: (createdAddress: Address) => void;
}

export const AddressModal: React.FC<AddressModalProps> = ({
  isOpen,
  onClose,
  addressToEdit,
  onSuccess,
}) => {
  const { createAddress, updateAddress, isCreating, isUpdating } = useAddressMutations();

  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Kenya',
    isDefault: false,
  });

  useEffect(() => {
    if (addressToEdit) {
      setFormData({
        street: addressToEdit.street,
        city: addressToEdit.city,
        state: addressToEdit.state,
        postalCode: addressToEdit.postalCode,
        country: addressToEdit.country,
        isDefault: addressToEdit.isDefault,
      });
    } else {
      setFormData({
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'Kenya',
        isDefault: false,
      });
    }
  }, [addressToEdit, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.street || !formData.city || !formData.country) return;

    try {
      if (addressToEdit) {
        const updated = await updateAddress({ id: addressToEdit.id, data: formData });
        onSuccess?.(updated);
      } else {
        const created = await createAddress(formData);
        onSuccess?.(created);
      }
      onClose();
    } catch {
      // Error handled by mutation
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={addressToEdit ? 'Edit Delivery Address' : 'Add New Delivery Address'}
      description="Enter accurate delivery details for physical shipment processing."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Street Address"
          placeholder="e.g. 123 Commerce Avenue, Suite 4B"
          value={formData.street}
          onChange={(e) => setFormData({ ...formData, street: e.target.value })}
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="City"
            placeholder="Nairobi"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
          />
          <Input
            label="State / County"
            placeholder="Nairobi County"
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Postal Code"
            placeholder="00100"
            value={formData.postalCode}
            onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
            required
          />
          <Input
            label="Country"
            placeholder="Kenya"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            required
          />
        </div>

        <label className="flex items-center gap-2 pt-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isDefault}
            onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
            className="w-4 h-4 rounded text-accent focus:ring-accent border-neutral-300"
          />
          <span className="text-xs font-semibold text-neutral-800">
            Set as default shipping address
          </span>
        </label>

        <div className="flex justify-end gap-2 pt-4 border-t border-neutral-100">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="accent" isLoading={isCreating || isUpdating}>
            {addressToEdit ? 'Save Changes' : 'Save Address'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
