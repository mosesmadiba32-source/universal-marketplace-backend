import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useOrders } from './useOrders';
import { formatPrice, formatDate } from '../../shared/lib/utils';
import { Badge } from '../../shared/components/Badge';
import { Button } from '../../shared/components/Button';
import { Package, ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';

export const OrderListPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useOrders({ page, limit: 10 });

  const orders = data?.orders || [];
  const totalPages = data?.pagination.totalPages ?? 1;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-neutral-900 tracking-tight">Order History</h2>
          <p className="text-xs text-neutral-500 mt-0.5">Track and view all your past purchases</p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-32 bg-white rounded-card animate-pulse border border-neutral-200" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-card border border-neutral-200 p-12 text-center space-y-3">
          <Package className="w-12 h-12 text-neutral-300 mx-auto" />
          <h3 className="text-base font-bold text-neutral-900">No orders placed yet</h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Once you check out with products, your order status and items will appear here.
          </p>
          <div className="pt-2">
            <Link to="/products">
              <Button variant="accent" size="sm">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-card border border-neutral-200 p-6 shadow-xs hover:border-neutral-300 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-neutral-900">
                    Order #{order.orderNumber}
                  </span>
                  <Badge status={order.status} size="sm" />
                </div>
                <span className="text-xs text-neutral-500">
                  Placed on {formatDate(order.createdAt)}
                </span>
              </div>

              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-xs">
                    <span className="text-neutral-700 font-medium">
                      {item.productName} {item.variantName && `(${item.variantName})`} × {item.quantity}
                    </span>
                    <span className="text-neutral-900 font-semibold">{formatPrice(item.subtotal)}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                <div className="text-xs">
                  <span className="text-neutral-500">Total: </span>
                  <span className="text-sm font-extrabold text-neutral-900">
                    {formatPrice(order.total)}
                  </span>
                </div>
                <Link to={`/account/orders/${order.id}`}>
                  <Button variant="outline" size="sm">
                    View Details <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
              </Button>
              <span className="text-xs text-neutral-600 font-medium">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
