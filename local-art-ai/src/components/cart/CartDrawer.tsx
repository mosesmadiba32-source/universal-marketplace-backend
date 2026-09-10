"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";

export default function CartDrawer() {
  const { items, isDrawerOpen, subtotal, closeDrawer, updateQty } = useCartStore();

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 12;

  return (
    <AnimatePresence>
      {isDrawerOpen ? (
        <>
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-900/40"
            onClick={closeDrawer}
            aria-label="Close cart drawer"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-surface shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-blue600" />
                <h2 className="text-lg font-bold text-textPrimary">Your cart</h2>
              </div>
              <button type="button" onClick={closeDrawer} className="rounded-btn border border-border p-2">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <ShoppingBag className="mb-4 h-12 w-12 text-textSecondary" />
                  <h3 className="text-lg font-semibold text-textPrimary">Your cart is empty</h3>
                  <p className="mt-2 text-sm text-textSecondary">Add a few beautiful pieces to get started.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="rounded-card border border-border bg-bgPage p-3">
                    <div className="flex gap-3">
                      <div className="h-20 w-20 overflow-hidden rounded-lg bg-slate-200">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        ) : null}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-sm font-semibold text-textPrimary">{item.name}</h3>
                            <p className="text-xs text-textSecondary">${item.price.toFixed(2)}</p>
                          </div>
                          <button
                            type="button"
                            className="text-xs font-medium text-red600"
                            onClick={() => useCartStore.getState().removeItem(item.id)}
                          >
                            Remove
                          </button>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-btn border border-border bg-white px-2 py-1">
                            <button type="button" onClick={() => updateQty(item.id, item.quantity - 1)}>
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="min-w-6 text-center text-sm font-medium">{item.quantity}</span>
                            <button type="button" onClick={() => updateQty(item.id, item.quantity + 1)}>
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <p className="text-sm font-semibold text-textPrimary">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-border bg-surface p-5">
              <div className="space-y-2 text-sm text-textSecondary">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-textPrimary">
                  <span>Total</span>
                  <span>${(subtotal + shipping).toFixed(2)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="mt-4 block rounded-btn bg-navy900 px-4 py-3 text-center text-sm font-semibold text-white"
                onClick={closeDrawer}
              >
                Proceed to checkout
              </Link>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
