import type { ReactNode } from "react";

export default function EmptyState({
  icon,
  title,
  subtitle,
  action,
}: {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-card border border-dashed border-border bg-white p-8 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue600/10 text-blue600">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-textPrimary">{title}</h3>
      {subtitle ? <p className="mt-2 max-w-md text-sm text-textSecondary">{subtitle}</p> : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
