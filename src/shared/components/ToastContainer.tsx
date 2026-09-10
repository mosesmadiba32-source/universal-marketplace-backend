import React from 'react';
import { useUiStore } from '../store/uiStore';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useUiStore();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-16 sm:bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start justify-between gap-3 p-4 rounded-[10px] shadow-2xl border text-xs animate-in fade-in slide-in-from-right-5 duration-200 bg-surface ${
            toast.type === 'error'
              ? 'border-red-200 text-red-700'
              : toast.type === 'success'
              ? 'border-green-200 text-green-800'
              : 'border-blue-200 text-blue-800'
          }`}
        >
          <div className="flex items-start gap-2.5">
            {toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            ) : toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-bold text-navy-900">{toast.title}</p>
              {toast.message && <p className="mt-0.5 text-text-secondary">{toast.message}</p>}
            </div>
          </div>

          <button
            type="button"
            onClick={() => removeToast(toast.id)}
            className="text-neutral-400 hover:text-neutral-600"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
