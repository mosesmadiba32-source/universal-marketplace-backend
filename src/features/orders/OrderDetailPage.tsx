import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOrder, useOrderMutations } from './useOrders';
import { OrderStatusStepper } from './OrderStatusStepper';
import { formatPrice, formatDate } from '../../shared/lib/utils';
import { Badge } from '../../shared/components/Badge';
import { Button } from '../../shared/components/Button';
import { Skeleton } from '../../shared/components/Skeleton';
import { ArrowLeft, MapPin, AlertCircle, XCircle } from 'lucide-react';

export const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading, error } = useOrder(id);
  const { cancelOrder, isCancelling } = useOrderMutations();

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-40 w-full rounded-card" />
        <Skeleton className="h-64 w-full rounded-card" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-status-danger mx-auto" />
        <h2 className="text-xl font-extrabold text-neutral-900">Order Not Found</h2>
        <p className="text-xs text-neutral-500">The requested order could not be retrieved.</p>
        <Link to="/account/orders">
          <Button variant="accent">Back to Orders</Button>
        </Link>
      </div>
    );
  }

  const canCancel = order.status === 'PENDING' || order.status === 'PROCESSING';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4">
        <div>
          <Link
            to="/account/orders"
            className="inline-flex items-center text-xs font-semibold text-neutral-500 hover:text-neutral-900 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Order History
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-neutral-900 tracking-tight">
              Order #{order.orderNumber}
            </h1>
            <Badge status={order.status} size="sm" />
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Placed on {formatDate(order.createdAt)}
          </p>
        </div>

        {canCancel && (
          <Button
            variant="danger"
            size="sm"
            isLoading={isCancelling}
            onClick={() => {
              if (confirm('Are you sure you want to cancel this order?')) {
                cancelOrder(order.id);
              }
            }}
          >
            <XCircle className="w-4 h-4 mr-1.5" /> Cancel Order
          </Button>
        )}
      </div>

      {/* Generic Data-Driven Status Stepper */}
      <div className="bg-white rounded-card border border-neutral-200 p-6 shadow-sm">
        <h3 className="text-xs font-bold text-neutral-700 uppercase tracking-wide mb-2">
          Fulfillment Status
        </h3>
        <OrderStatusStepper status={order.status} />
      </div>

      {/* Items Breakdown */}
      <div className="bg-white rounded-card border border-neutral-200 overflow-hidden shadow-sm">
        <div className="p-5 border-b border-neutral-200 bg-neutral-50">
          <h3 className="text-sm font-bold text-neutral-900">Ordered Items ({order.items.length})</h3>
        </div>
        <div className="divide-y divide-neutral-100 p-6">
          {order.items.map((item) => (
            <div key={item.id} className="py-3.5 flex justify-between items-center first:pt-0 last:pb-0 text-xs">
              <div>
                <Link
                  to={item.productId ? `/products/${item.productId}` : '#'}
                  className="font-bold text-neutral-900 hover:text-accent"
                >
                  {item.productName}
                </Link>
                {item.variantName && (
                  <p className="text-[11px] text-neutral-500 mt-0.5">Option: {item.variantName}</p>
                )}
                <p className="text-[11px] text-neutral-400">SKU: {item.productSku}</p>
              </div>

              <div className="text-right">
                <span className="font-semibold text-neutral-700">
                  {formatPrice(item.unitPrice)} × {item.quantity}
                </span>
                <p className="font-bold text-neutral-950 text-sm mt-0.5">
                  {formatPrice(item.subtotal)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary & Shipping (with extension point) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shipping Extension Point */}
        <div className="bg-white rounded-card border border-neutral-200 p-6 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-neutral-900 border-b border-neutral-100 pb-2 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-accent" /> Shipping Destination
          </h3>
          {(order as any).shippingAddress ? (
            <div className="text-xs text-neutral-700 space-y-1">
              <p className="font-bold">{(order as any).shippingAddress.street}</p>
              <p>{(order as any).shippingAddress.city}, {(order as any).shippingAddress.state} {(order as any).shippingAddress.postalCode}</p>
              <p>{(order as any).shippingAddress.country}</p>
            </div>
          ) : (
            <p className="text-xs text-neutral-500 italic leading-relaxed">
              Standard delivery destination recorded with merchant at checkout.
            </p>
          )}
        </div>

        {/* Financial Summary */}
        <div className="bg-white rounded-card border border-neutral-200 p-6 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-neutral-900 border-b border-neutral-100 pb-2">
            Payment Summary
          </h3>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-neutral-600">
              <span>Items Subtotal</span>
              <span className="font-semibold">{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Shipping Fee</span>
              <span className="font-semibold">{formatPrice(order.shipping)}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Tax</span>
              <span className="font-semibold">{formatPrice(order.tax)}</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-neutral-950 pt-2 border-t border-neutral-200">
              <span>Total Paid / Due</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
