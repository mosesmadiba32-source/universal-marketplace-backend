import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCartStore } from '../../shared/store/cartStore';
import { formatPrice, getImageUrl } from '../../shared/lib/utils';
import { X, Trash2, Plus, Minus, ShoppingCart, ArrowRight, AlertTriangle } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
    clearCart,
    getSubtotal,
    getShipping,
    getTax,
    getTotal,
    getItemCount,
  } = useCartStore();

  const [confirmClear, setConfirmClear] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const subtotal = getSubtotal();
  const shipping = getShipping();
  const tax = getTax();
  const total = getTotal();
  const itemCount = getItemCount();

  const handleProceedToCheckout = () => {
    closeDrawer();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy-900/60 backdrop-blur-sm transition-opacity"
        onClick={closeDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md md:max-w-md sm:max-w-full bg-surface shadow-2xl flex flex-col h-full z-10">
          {/* Header */}
          <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-navy-900" />
              <h2 className="text-lg font-bold text-navy-900">
                Your Cart ({itemCount})
              </h2>
            </div>

            <div className="flex items-center gap-3">
              {items.length > 0 && (
                <>
                  {confirmClear ? (
                    <div className="flex items-center gap-2 bg-red-50 px-2 py-1 rounded border border-red-200">
                      <span className="text-xs text-red-600 font-semibold">Clear?</span>
                      <button
                        type="button"
                        onClick={() => {
                          clearCart();
                          setConfirmClear(false);
                        }}
                        className="text-xs font-bold text-red-600 hover:underline"
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmClear(false)}
                        className="text-xs text-neutral-500 hover:underline"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmClear(true)}
                      className="text-xs font-medium text-text-secondary hover:text-red-600 transition-colors"
                    >
                      Clear All
                    </button>
                  )}
                </>
              )}

              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close cart drawer"
                className="p-1 rounded-full text-text-secondary hover:text-text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Free Shipping Progress Alert */}
          {items.length > 0 && (
            <div className="bg-navy-900 text-white px-6 py-2.5 text-xs flex items-center justify-between">
              {subtotal >= 50 ? (
                <span className="font-semibold text-gold-500">🎉 You qualify for Free Shipping!</span>
              ) : (
                <span>
                  Add <strong className="text-gold-500">{formatPrice(50 - subtotal)}</strong> more for Free Shipping
                </span>
              )}
            </div>
          )}

          {/* Items List / Empty State */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-4">
                  <ShoppingCart className="w-10 h-10 stroke-[1.5]" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-1">
                  Your cart is empty
                </h3>
                <p className="text-sm text-text-secondary mb-6 max-w-xs">
                  Discover trending artisan creations, tech accessories, and unique collections.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    closeDrawer();
                    navigate('/marketplace');
                  }}
                  className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold px-6 py-2.5 rounded-[8px] transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {items.map((item) => {
                  const unitPrice = Number(item.product.salePrice ?? item.product.basePrice);
                  const img = getImageUrl(item.product.images?.[0]?.url);

                  return (
                    <div key={item.id} className="py-4 flex gap-4 items-center">
                      <img
                        src={img}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-lg object-contain bg-neutral-50 p-1 border border-border flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${item.product.slug || item.product.id}`}
                          onClick={closeDrawer}
                          className="text-sm font-semibold text-text-primary line-clamp-1 hover:text-blue-600"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-xs text-text-secondary mt-0.5 font-medium">
                          {formatPrice(unitPrice)}
                        </p>

                        {/* Stepper + Remove */}
                        <div className="flex items-center justify-between mt-2.5">
                          <div className="inline-flex items-center border border-border rounded-[6px] overflow-hidden bg-neutral-50">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 text-text-secondary hover:bg-neutral-200 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2.5 py-0.5 text-xs font-bold text-text-primary min-w-[24px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 text-text-secondary hover:bg-neutral-200 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-text-secondary hover:text-red-600 p-1.5 rounded transition-colors tap-target"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Totals (Only populated when cart has items) */}
          {items.length > 0 && (
            <div className="border-t border-border p-6 bg-neutral-50 space-y-3 pb-safe">
              <div className="space-y-1.5 text-sm text-text-secondary">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-text-primary">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-text-primary">
                    {shipping === 0 ? (
                      <span className="text-green-600 font-bold">Free</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-semibold text-text-primary">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-text-primary pt-2 border-t border-border">
                  <span>Total</span>
                  <span className="text-lg text-navy-900">{formatPrice(total)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full bg-gold-500 hover:bg-gold-600 active:bg-gold-600 text-navy-900 font-bold py-3 px-4 rounded-[8px] flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={closeDrawer}
                  className="text-xs text-text-secondary hover:text-text-primary hover:underline"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
