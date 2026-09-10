import React from 'react';
import { useUiStore } from '../store/uiStore';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '../lib/utils';

export const ToastNotificationContainer: React.FC = () => {
  const { toasts, removeToast } = useUiStore();

  if (toasts.length === 0) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-status-success shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-status-danger shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-status-warning shrink-0" />,
    info: <Info className="w-5 h-5 text-status-info shrink-0" />,
  };

  const borders = {
    success: 'border-l-4 border-l-status-success',
    error: 'border-l-4 border-l-status-danger',
    warning: 'border-l-4 border-l-status-warning',
    info: 'border-l-4 border-l-status-info',
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'pointer-events-auto bg-white rounded-card p-4 shadow-xl border border-neutral-100 flex items-start gap-3 transition-all animate-in slide-in-from-bottom-5 duration-200',
            borders[toast.type]
          )}
        >
          {icons[toast.type]}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-neutral-900">{toast.title}</h4>
            {toast.message && (
              <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">{toast.message}</p>
            )}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-neutral-400 hover:text-neutral-700 p-0.5 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
