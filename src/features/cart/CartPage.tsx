import React from 'react';
import { Link } from 'react-router-dom';
import { useCart, useCartMutations } from './useCart';
import { formatPrice, getImageUrl } from '../../shared/lib/utils';
import { Button } from '../../shared/components/Button';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';

export const CartPage: React.FC = () => {
  const { data: cart, isLoading } = useCart();
  const { updateItem, removeItem, clearCart, isUpdating, isRemoving } = useCartMutations();

  const items = cart?.items || [];
  const subtotal = cart?.subtotal || 0;
  const totalItems = cart?.totalItems || 0;

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-6">
        <h1 className="text-2xl font-extrabold text-neutral-900">Your Shopping Cart</h1>
        <div className="h-64 bg-white rounded-card animate-pulse border border-neutral-200" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <ShoppingBag className="w-16 h-16 text-neutral-300 mx-auto" />
        <h2 className="text-2xl font-extrabold text-neutral-900">Your cart is empty</h2>
        <p className="text-sm text-neutral-500 max-w-sm mx-auto">
          Explore the store to discover items and add them to your shopping cart.
        </p>
        <div className="pt-4">
          <Link to="/products">
            <Button variant="accent" size="lg">
              Explore Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Shopping Cart ({totalItems})
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">Review items before checkout</p>
        </div>
        <button
          onClick={() => clearCart()}
          className="text-xs text-neutral-500 hover:text-status-danger underline font-medium"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart Items Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-card border border-neutral-200 divide-y divide-neutral-200 shadow-sm overflow-hidden">
            {items.map((item) => (
              <div key={item.itemId} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.name}
                    className="w-20 h-20 rounded-btn object-cover bg-neutral-100 border border-neutral-200 shrink-0"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/placeholder-product.svg';
                    }}
                  />
                  <div className="min-w-0">
                    <Link
                      to={`/products/${item.productId}`}
                      className="text-sm font-bold text-neutral-900 hover:text-accent line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-neutral-500 mt-0.5">SKU: {item.sku}</p>
                    <p className="text-xs font-semibold text-neutral-700 mt-1">
                      {formatPrice(item.price)} each
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                  {/* Stepper */}
                  <div className="inline-flex items-center border border-neutral-300 rounded-btn bg-white">
                    <button
                      onClick={() => updateItem({ itemId: item.itemId, quantity: item.quantity - 1 })}
                      disabled={item.quantity <= 1 || isUpdating}
                      className="p-1.5 text-neutral-600 hover:text-neutral-900 disabled:opacity-30"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-neutral-900 min-w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateItem({ itemId: item.itemId, quantity: item.quantity + 1 })}
                      disabled={item.quantity >= item.stock || isUpdating}
                      className="p-1.5 text-neutral-600 hover:text-neutral-900 disabled:opacity-30"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-sm font-bold text-neutral-900 min-w-20 text-right">
                    {formatPrice(item.price * item.quantity)}
                  </span>

                  <button
                    onClick={() => removeItem(item.itemId)}
                    disabled={isRemoving}
                    className="text-neutral-400 hover:text-status-danger p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/products"
            className="inline-flex items-center text-xs font-semibold text-neutral-600 hover:text-neutral-900"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Continue Shopping
          </Link>
        </div>

        {/* Order Summary Box */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-card border border-neutral-200 p-6 shadow-sm space-y-6 sticky top-24">
            <h3 className="text-base font-bold text-neutral-900 border-b border-neutral-200 pb-3">
              Order Summary
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span className="font-bold text-neutral-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>Estimated Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>Estimated Tax</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-neutral-950 pt-3 border-t border-neutral-200">
                <span>Estimated Total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
            </div>

            <Link to="/checkout" className="block w-full">
              <Button variant="accent" size="lg" className="w-full">
                Proceed to Checkout <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
