import { apiClient } from '../../shared/lib/apiClient';
import { Address, ApiResponse } from '../../shared/types/api';

export interface CreateAddressPayload {
  country: string;
  city: string;
  state: string;
  postalCode: string;
  street: string;
  isDefault?: boolean;
}

export const addressApi = {
  getAddresses: async () => {
    const res = await apiClient.get<ApiResponse<Address[]>>('/api/addresses');
    return res.data.data;
  },

  getAddress: async (id: string) => {
    const res = await apiClient.get<ApiResponse<Address>>(`/api/addresses/${id}`);
    return res.data.data;
  },

  createAddress: async (data: CreateAddressPayload) => {
    const res = await apiClient.post<ApiResponse<Address>>('/api/addresses', data);
    return res.data.data;
  },

  updateAddress: async (id: string, data: Partial<CreateAddressPayload>) => {
    const res = await apiClient.patch<ApiResponse<Address>>(`/api/addresses/${id}`, data);
    return res.data.data;
  },

  setDefaultAddress: async (id: string) => {
    const res = await apiClient.patch<ApiResponse<Address>>(`/api/addresses/${id}/default`);
    return res.data.data;
  },

  deleteAddress: async (id: string) => {
    const res = await apiClient.delete<ApiResponse<Address>>(`/api/addresses/${id}`);
    return res.data.data;
  },
};
