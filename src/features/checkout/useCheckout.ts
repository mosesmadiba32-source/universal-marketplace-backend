import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checkoutApi, CheckoutPayload, InitializePaymentPayload } from './checkoutApi';
import { useUiStore } from '../../shared/store/uiStore';

export function useCheckout() {
  const queryClient = useQueryClient();
  const { addToast } = useUiStore();

  const validateCouponMutation = useMutation({
    mutationFn: ({ code, orderAmount }: { code: string; orderAmount: number }) =>
      checkoutApi.validateCoupon(code, orderAmount),
    onSuccess: (data) => {
      addToast({
        type: 'success',
        title: 'Coupon Applied!',
        message: `Discount of $${data.discount.toFixed(2)} applied to order.`,
      });
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      addToast({
        type: 'error',
        title: 'Invalid Coupon',
        message: error.response?.data?.message || 'Coupon code is invalid, expired, or does not meet minimum order amount.',
      });
    },
  });

  const checkoutMutation = useMutation({
    mutationFn: (payload: CheckoutPayload) => checkoutApi.submitCheckout(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  const initializePaymentMutation = useMutation({
    mutationFn: (payload: InitializePaymentPayload) => checkoutApi.initializePayment(payload),
  });

  return {
    validateCoupon: validateCouponMutation.mutateAsync,
    isValidatingCoupon: validateCouponMutation.isPending,
    submitCheckout: checkoutMutation.mutateAsync,
    isSubmittingCheckout: checkoutMutation.isPending,
    initializePayment: initializePaymentMutation.mutateAsync,
    isInitializingPayment: initializePaymentMutation.isPending,
  };
}
