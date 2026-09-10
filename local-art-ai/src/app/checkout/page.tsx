"use client";

import { useState } from "react";

const steps = ["Shipping", "Payment", "Review", "Confirmation"];

export default function CheckoutPage() {
  const [step, setStep] = useState(0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-textPrimary">Checkout</h1>

      <div className="mt-6 flex flex-wrap gap-3">
        {steps.map((item, index) => (
          <button
            key={item}
            type="button"
            onClick={() => setStep(index)}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              step === index ? "bg-navy900 text-white" : "border border-border bg-surface text-textSecondary"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-card border border-border bg-surface p-6 shadow-sm">
          <h2 className="text-xl font-semibold">{steps[step]}</h2>
          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-textPrimary">Full name</label>
              <input className="w-full rounded-btn border border-border bg-bgPage px-3 py-2.5 focus:ring-blue600" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-textPrimary">Address</label>
              <input className="w-full rounded-btn border border-border bg-bgPage px-3 py-2.5 focus:ring-blue600" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-textPrimary">City</label>
                <input className="w-full rounded-btn border border-border bg-bgPage px-3 py-2.5 focus:ring-blue600" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-textPrimary">Postal code</label>
                <input className="w-full rounded-btn border border-border bg-bgPage px-3 py-2.5 focus:ring-blue600" />
              </div>
            </div>
          </div>
        </div>

        <aside className="rounded-card border border-border bg-surface p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-textPrimary">Order summary</h3>
          <div className="mt-4 space-y-3 text-sm text-textSecondary">
            <div className="flex justify-between">
              <span>Abstract Canvas</span>
              <span>$120.00</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-bold text-textPrimary">
              <span>Total</span>
              <span>$120.00</span>
            </div>
          </div>

          <button className="mt-6 w-full rounded-btn bg-navy900 px-4 py-3 text-sm font-semibold text-white">
            Continue
          </button>
        </aside>
      </div>
    </div>
  );
}
