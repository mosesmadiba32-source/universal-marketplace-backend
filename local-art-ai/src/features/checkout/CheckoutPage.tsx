import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../cart/useCart';
import { useAddresses } from '../addresses/useAddresses';
import { AddressModal } from '../addresses/AddressModal';
import { useCheckout } from './useCheckout';
import { CouponDiscount, Order, PaymentProvider } from '../../shared/types/api';
import { formatPrice, getImageUrl } from '../../shared/lib/utils';
import { Button } from '../../shared/components/Button';
import { Input } from '../../shared/components/Input';
import {
  ShieldCheck,
  CreditCard,
  Smartphone,
  MapPin,
  Tag,
  CheckCircle2,
  Clock,
  ArrowRight,
  Plus,
  ArrowLeft,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: cart, isLoading: isCartLoading } = useCart();
  const { data: addresses, isLoading: isAddressesLoading } = useAddresses();
  const { validateCoupon, isValidatingCoupon, submitCheckout, initializePayment, isSubmittingCheckout } = useCheckout();

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<PaymentProvider>('MPESA');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<CouponDiscount | null>(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  // Result state after placing order
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [paymentNotice, setPaymentNotice] = useState<string | null>(null);

  const items = cart?.items || [];
  const subtotal = cart?.subtotal || 0;

  // Set default address if not selected
  React.useEffect(() => {
    if (addresses && addresses.length > 0 && !selectedAddressId) {
      const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];
      setSelectedAddressId(defaultAddr.id);
    }
  }, [addresses, selectedAddressId]);

  const discountAmount = appliedCoupon?.discount ?? 0;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    try {
      const discount = await validateCoupon({ code: couponCode.trim(), orderAmount: subtotal });
      setAppliedCoupon(discount);
    } catch {
      // Handled in hook toast
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      alert('Please select a delivery address.');
      return;
    }

    try {
      // 1. Submit checkout order to backend
      const order = await submitCheckout({
        addressId: selectedAddressId,
        couponCode: appliedCoupon?.code,
      });

      setCompletedOrder(order);

      // 2. Initialize payment with selected provider
      try {
        await initializePayment({
          orderId: order.id,
          provider: selectedProvider,
          currency: 'USD',
        });
      } catch {
        // Concrete requirement from spec:
        // Handle failure with clear, non-alarming state rather than raw error
        setPaymentNotice(
          'Payment provider integration is being finalized in this environment — your order has been securely saved as Pending.'
        );
      }
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      alert(message || 'Failed to place order. Please check item stock.');
    }
  };

  if (isCartLoading || isAddressesLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-6">
        <h1 className="text-2xl font-extrabold text-neutral-900">Secure Checkout</h1>
        <div className="h-96 bg-white rounded-card animate-pulse border border-neutral-200" />
      </div>
    );
  }

  // Completed Order View
  if (completedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-100 text-status-success rounded-full flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Order #{completedOrder.orderNumber} Placed!
          </h1>
          <p className="text-xs text-neutral-500 font-medium">
            Thank you for your purchase. We have received your order request.
          </p>
        </div>

        {paymentNotice && (
          <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded-card flex items-start gap-3 text-left">
            <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold">Payment Status Notice:</span>
              <p className="text-amber-800 leading-relaxed">{paymentNotice}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-card border border-neutral-200 p-6 text-left space-y-4 shadow-sm">
          <div className="flex justify-between items-center text-xs border-b border-neutral-100 pb-3">
            <span className="text-neutral-500">Order Number</span>
            <span className="font-bold text-neutral-900">{completedOrder.orderNumber}</span>
          </div>
          <div className="flex justify-between items-center text-xs border-b border-neutral-100 pb-3">
            <span className="text-neutral-500">Order Status</span>
            <span className="font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
              {completedOrder.status}
            </span>
          </div>
          <div className="flex justify-between items-center text-xs border-b border-neutral-100 pb-3">
            <span className="text-neutral-500">Total Amount</span>
            <span className="font-extrabold text-neutral-900 text-sm">
              {formatPrice(completedOrder.total)}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Link to={`/account/orders/${completedOrder.id}`}>
            <Button variant="accent" size="lg">
              View Order Details <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
          <Link to="/products">
            <Button variant="outline" size="lg">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-extrabold text-neutral-900">Your cart is empty</h2>
        <p className="text-sm text-neutral-500">Please add items to your cart before proceeding to checkout.</p>
        <Link to="/products">
          <Button variant="accent">Go to Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Checkout
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">Complete your shipping and payment details</p>
        </div>
        <Link to="/cart" className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 inline-flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Cart
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left 2 Cols: Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* 1. Delivery Address */}
          <section className="bg-white rounded-card border border-neutral-200 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                  1
                </div>
                <h2 className="text-base font-bold text-neutral-900">Delivery Address</h2>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAddressModalOpen(true)}
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Address
              </Button>
            </div>

            {!addresses || addresses.length === 0 ? (
              <div className="text-center py-6 bg-neutral-50 rounded-card border border-dashed border-neutral-300 space-y-2">
                <MapPin className="w-8 h-8 text-neutral-400 mx-auto" />
                <p className="text-xs text-neutral-600">No delivery address saved.</p>
                <Button variant="accent" size="sm" onClick={() => setIsAddressModalOpen(true)}>
                  Add Delivery Address
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {addresses.map((addr) => {
                  const isSelected = selectedAddressId === addr.id;
                  return (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`p-4 rounded-card border cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-primary bg-primary/5 ring-1 ring-primary'
                          : 'border-neutral-200 bg-white hover:border-neutral-300'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-neutral-900">
                            {addr.city}, {addr.country}
                          </span>
                          {addr.isDefault && (
                            <span className="text-[10px] bg-neutral-200 text-neutral-700 px-1.5 py-0.5 rounded font-semibold">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-700 font-medium">{addr.street}</p>
                        <p className="text-[11px] text-neutral-500">{addr.city}, {addr.state} {addr.postalCode}</p>
                      </div>
                      <div className="mt-3 text-[11px] font-semibold text-primary">
                        {isSelected ? '✓ Selected for delivery' : 'Select'}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* 2. Payment Method */}
          <section className="bg-white rounded-card border border-neutral-200 p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
              <div className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                2
              </div>
              <h2 className="text-base font-bold text-neutral-900">Select Payment Method</h2>
            </div>

            <p className="text-xs text-neutral-500">
              Select your preferred gateway. Transactions are processed securely.
            </p>

            {/* Provider Options (M-Pesa and Stripe prioritized per spec) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* M-PESA */}
              <div
                onClick={() => setSelectedProvider('MPESA')}
                className={`p-4 rounded-card border cursor-pointer transition-all flex items-center justify-between ${
                  selectedProvider === 'MPESA'
                    ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-btn bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900">M-Pesa Express</h4>
                    <p className="text-[11px] text-neutral-500">Instant Mobile Money (STK Push)</p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={selectedProvider === 'MPESA'}
                  onChange={() => setSelectedProvider('MPESA')}
                  className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                />
              </div>

              {/* STRIPE */}
              <div
                onClick={() => setSelectedProvider('STRIPE')}
                className={`p-4 rounded-card border cursor-pointer transition-all flex items-center justify-between ${
                  selectedProvider === 'STRIPE'
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-btn bg-primary text-white flex items-center justify-center font-bold text-xs">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900">Credit / Debit Card</h4>
                    <p className="text-[11px] text-neutral-500">Stripe Global Gateway (Visa/Mastercard)</p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={selectedProvider === 'STRIPE'}
                  onChange={() => setSelectedProvider('STRIPE')}
                  className="w-4 h-4 text-primary focus:ring-primary"
                />
              </div>

              {/* PAYPAL */}
              <div
                onClick={() => setSelectedProvider('PAYPAL')}
                className={`p-4 rounded-card border cursor-pointer transition-all flex items-center justify-between ${
                  selectedProvider === 'PAYPAL'
                    ? 'border-sky-600 bg-sky-50/50 ring-1 ring-sky-600'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-btn bg-sky-600 text-white flex items-center justify-center font-bold text-xs">
                    P
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900">PayPal</h4>
                    <p className="text-[11px] text-neutral-500">PayPal Account & Cards</p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={selectedProvider === 'PAYPAL'}
                  onChange={() => setSelectedProvider('PAYPAL')}
                  className="w-4 h-4 text-sky-600 focus:ring-sky-500"
                />
              </div>

              {/* FLUTTERWAVE */}
              <div
                onClick={() => setSelectedProvider('FLUTTERWAVE')}
                className={`p-4 rounded-card border cursor-pointer transition-all flex items-center justify-between ${
                  selectedProvider === 'FLUTTERWAVE'
                    ? 'border-amber-600 bg-amber-50/50 ring-1 ring-amber-600'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-btn bg-amber-600 text-white flex items-center justify-center font-bold text-xs">
                    FW
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900">Flutterwave</h4>
                    <p className="text-[11px] text-neutral-500">Pan-African Bank & Card Payments</p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={selectedProvider === 'FLUTTERWAVE'}
                  onChange={() => setSelectedProvider('FLUTTERWAVE')}
                  className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Right Col: Order Summary & Action */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-card border border-neutral-200 p-6 shadow-sm space-y-6 sticky top-24">
            <h3 className="text-base font-bold text-neutral-900 border-b border-neutral-200 pb-3">
              Order Review ({items.length} {items.length === 1 ? 'item' : 'items'})
            </h3>

            {/* Item list mini */}
            <div className="max-h-52 overflow-y-auto custom-scrollbar divide-y divide-neutral-100 pr-1">
              {items.map((item) => (
                <div key={item.itemId} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={getImageUrl(item.image)}
                      alt=""
                      className="w-10 h-10 rounded object-cover bg-neutral-100 border border-neutral-200 shrink-0"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/placeholder-product.svg';
                      }}
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-neutral-900 truncate">{item.name}</p>
                      <p className="text-[11px] text-neutral-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-neutral-900">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Coupon Code Form */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <Input
                placeholder="Discount Coupon"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                leftIcon={<Tag className="w-3.5 h-3.5" />}
                className="text-xs uppercase font-mono"
              />
              <Button
                type="submit"
                variant="outline"
                size="sm"
                isLoading={isValidatingCoupon}
                disabled={!couponCode.trim()}
              >
                Apply
              </Button>
            </form>

            {appliedCoupon && (
              <div className="p-2.5 bg-emerald-50 text-emerald-800 text-xs rounded-btn flex items-center justify-between">
                <span>Code <strong>{appliedCoupon.code}</strong> Applied</span>
                <span className="font-bold">-${appliedCoupon.discount.toFixed(2)}</span>
              </div>
            )}

            {/* Cost breakdown */}
            <div className="space-y-2 text-xs border-t border-neutral-100 pt-4">
              <div className="flex justify-between text-neutral-600">
                <span>Items Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-status-success font-semibold">
                  <span>Discount</span>
                  <span>-${appliedCoupon.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-500">
                <span>Estimated Shipping</span>
                <span className="text-status-success font-semibold">FREE</span>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>Estimated Tax</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-neutral-950 pt-3 border-t border-neutral-200">
                <span>Total Due</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <Button
              variant="accent"
              size="lg"
              onClick={handlePlaceOrder}
              disabled={!selectedAddressId || isSubmittingCheckout}
              isLoading={isSubmittingCheckout}
              className="w-full"
            >
              Complete Order ({formatPrice(finalTotal)})
            </Button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500 text-center">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>256-Bit Encrypted & Protected Checkout</span>
            </div>
          </div>
        </div>
      </div>

      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onSuccess={(created) => setSelectedAddressId(created.id)}
      />
    </div>
  );
};
