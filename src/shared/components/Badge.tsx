import React from 'react';
import { cn } from '../lib/utils';
import { OrderStatus, ProductStatus, ReviewStatus } from '../types/api';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'outline' | 'primary' | 'accent';
  status?: OrderStatus | ProductStatus | ReviewStatus | string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant,
  status,
  size = 'md',
  children,
  ...props
}) => {
  let resolvedVariant = variant || 'default';

  if (status) {
    switch (status) {
      case 'PAID':
      case 'ACTIVE':
      case 'APPROVED':
      case 'DELIVERED':
      case 'SUCCESS':
        resolvedVariant = 'success';
        break;
      case 'PENDING':
      case 'PROCESSING':
      case 'DRAFT':
        resolvedVariant = 'warning';
        break;
      case 'SHIPPED':
        resolvedVariant = 'info';
        break;
      case 'OUT_OF_STOCK':
      case 'CANCELLED':
      case 'REFUNDED':
      case 'REJECTED':
      case 'FAILED':
      case 'ARCHIVED':
        resolvedVariant = 'danger';
        break;
      default:
        resolvedVariant = 'default';
    }
  }

  const variants = {
    default: 'bg-neutral-100 text-neutral-800 border-neutral-200',
    primary: 'bg-primary text-white border-transparent',
    accent: 'bg-accent-light text-accent border-accent/20',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    info: 'bg-sky-50 text-sky-700 border-sky-200',
    outline: 'bg-transparent text-neutral-700 border-neutral-300',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider',
    md: 'px-2.5 py-1 text-xs font-semibold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full border',
        variants[resolvedVariant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children || status}
    </span>
  );
};
