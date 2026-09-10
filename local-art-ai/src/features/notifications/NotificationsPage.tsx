import React, { useState } from 'react';
import { useNotifications, useNotificationMutations } from './useNotifications';
import { formatDate } from '../../shared/lib/utils';
import { Button } from '../../shared/components/Button';
import { Bell, Check, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useNotifications({ page, limit: 15 });
  const { markRead, markAllRead, deleteNotification } = useNotificationMutations();

  const notifications = data?.notifications || [];
  const unreadCount = data?.unreadCount || 0;
  const totalPages = data?.pagination.totalPages ?? 1;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-neutral-900 tracking-tight">
            Notifications Center
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Realtime updates on your orders, payments, reviews, and inventory alerts
          </p>
        </div>

        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={() => markAllRead()}>
            <Check className="w-3.5 h-3.5 mr-1.5" /> Mark All as Read ({unreadCount})
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 bg-white rounded-card animate-pulse border border-neutral-200" />
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <div className="bg-white rounded-card border border-neutral-200 p-12 text-center space-y-3">
          <Bell className="w-12 h-12 text-neutral-300 mx-auto" />
          <h3 className="text-base font-bold text-neutral-900">No notifications</h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            You are all caught up! Order status changes and alerts will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`bg-white rounded-card border p-4 flex items-start justify-between gap-4 transition-all shadow-xs ${
                !n.isRead ? 'border-amber-300 bg-amber-50/30' : 'border-neutral-200'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-neutral-900">{n.title}</h4>
                  {!n.isRead && (
                    <span className="w-2 h-2 rounded-full bg-accent" title="Unread" />
                  )}
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">{n.message}</p>
                <span className="text-[10px] text-neutral-400 block pt-1">
                  {formatDate(n.createdAt)}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {!n.isRead && (
                  <button
                    onClick={() => markRead(n.id)}
                    className="p-1.5 rounded text-neutral-500 hover:text-accent hover:bg-neutral-100"
                    title="Mark as read"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(n.id)}
                  className="p-1.5 rounded text-neutral-400 hover:text-status-danger hover:bg-neutral-100"
                  title="Delete notification"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
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
