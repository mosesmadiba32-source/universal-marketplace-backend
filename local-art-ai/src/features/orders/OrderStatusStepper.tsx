import React from 'react';
import { OrderStatus } from '../../shared/types/api';
import { CheckCircle2, Clock, Package, Truck, CheckCheck, XCircle, RefreshCw } from 'lucide-react';

export interface OrderStatusStepperProps {
  status: OrderStatus;
}

export const OrderStatusStepper: React.FC<OrderStatusStepperProps> = ({ status }) => {
  // Ordered standard linear progression
  const standardSteps: Array<{ key: OrderStatus; label: string; icon: React.ReactNode }> = [
    { key: 'PENDING', label: 'Pending Payment', icon: <Clock className="w-4 h-4" /> },
    { key: 'PAID', label: 'Payment Confirmed', icon: <CheckCircle2 className="w-4 h-4" /> },
    { key: 'PROCESSING', label: 'Processing', icon: <Package className="w-4 h-4" /> },
    { key: 'SHIPPED', label: 'Dispatched / In Transit', icon: <Truck className="w-4 h-4" /> },
    { key: 'DELIVERED', label: 'Delivered', icon: <CheckCheck className="w-4 h-4" /> },
  ];

  // Special terminal states
  if (status === 'CANCELLED') {
    return (
      <div className="p-4 bg-rose-50 border border-rose-200 rounded-card flex items-center gap-3 text-rose-800">
        <XCircle className="w-6 h-6 text-status-danger shrink-0" />
        <div>
          <h4 className="text-sm font-bold">Order Cancelled</h4>
          <p className="text-xs text-rose-700">This order has been cancelled and stock returned.</p>
        </div>
      </div>
    );
  }

  if (status === 'REFUNDED') {
    return (
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-card flex items-center gap-3 text-amber-800">
        <RefreshCw className="w-6 h-6 text-status-warning shrink-0" />
        <div>
          <h4 className="text-sm font-bold">Order Refunded</h4>
          <p className="text-xs text-amber-700">Funds have been refunded to the original payment method.</p>
        </div>
      </div>
    );
  }

  const currentIndex = standardSteps.findIndex((s) => s.key === status);
  const activeIndex = currentIndex === -1 ? 0 : currentIndex;

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-neutral-200 w-full z-0" />
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-accent transition-all duration-500 z-0"
          style={{ width: `${(activeIndex / (standardSteps.length - 1)) * 100}%` }}
        />

        {standardSteps.map((step, idx) => {
          const isCompleted = idx < activeIndex;
          const isCurrent = idx === activeIndex;

          return (
            <div key={step.key} className="relative z-10 flex flex-col items-center group">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isCompleted
                    ? 'bg-accent text-white shadow-xs'
                    : isCurrent
                    ? 'bg-primary text-white ring-4 ring-primary/20 shadow-md'
                    : 'bg-white border-2 border-neutral-300 text-neutral-400'
                }`}
              >
                {step.icon}
              </div>
              <span
                className={`text-[11px] font-semibold mt-2 text-center max-w-[80px] hidden sm:block ${
                  isCurrent ? 'text-primary font-bold' : isCompleted ? 'text-neutral-800' : 'text-neutral-400'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile Label for Current Status */}
      <div className="mt-3 text-center sm:hidden">
        <span className="text-xs font-bold text-primary">
          Current State: {standardSteps[activeIndex]?.label || status}
        </span>
      </div>
    </div>
  );
};
