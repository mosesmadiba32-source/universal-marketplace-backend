import { apiClient } from '../../shared/lib/apiClient';
import { ApiResponse, CouponDiscount, Order, Payment, PaymentProvider } from '../../shared/types/api';

export interface CheckoutPayload {
  addressId: string;
  couponCode?: string;
}

export interface InitializePaymentPayload {
  orderId: string;
  provider: PaymentProvider;
  currency: string;
}

export const checkoutApi = {
  validateCoupon: async (code: string, orderAmount: number) => {
    const res = await apiClient.post<ApiResponse<CouponDiscount>>('/api/coupons/validate', {
      code,
      orderAmount,
    });
    return res.data.data;
  },

  submitCheckout: async (payload: CheckoutPayload) => {
    const res = await apiClient.post<ApiResponse<Order>>('/api/orders/checkout', payload);
    return res.data.data;
  },

  initializePayment: async (payload: InitializePaymentPayload) => {
    const res = await apiClient.post<ApiResponse<Payment>>('/api/payments/initialize', payload);
    return res.data.data;
  },
};
