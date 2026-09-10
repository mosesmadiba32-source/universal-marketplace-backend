import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNotifications, useNotificationMutations } from './useNotifications';
import { formatDate } from '../../shared/lib/utils';
import { Bell, Check, Trash2, ArrowRight } from 'lucide-react';

export const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data } = useNotifications({ limit: 5 });
  const { markRead, markAllRead, deleteNotification } = useNotificationMutations();

  const notifications = data?.notifications || [];
  const unreadCount = data?.unreadCount || 0;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-card shadow-2xl border border-neutral-200 py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-4 pb-2 border-b border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                Notifications
              </h4>
              {unreadCount > 0 && (
                <span className="text-[10px] bg-accent-light text-accent font-bold px-1.5 py-0.2 rounded-full">
                  {unreadCount} New
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={() => markAllRead()}
                className="text-[11px] text-accent hover:underline font-semibold flex items-center gap-1"
              >
                <Check className="w-3 h-3" /> Mark all read
              </button>
            )}
          </div>

          <div className="max-h-72 overflow-y-auto custom-scrollbar divide-y divide-neutral-100">
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-xs text-neutral-400">
                No notifications to display
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-3.5 hover:bg-neutral-50 transition-colors flex items-start justify-between gap-2 ${
                    !n.isRead ? 'bg-amber-50/40' : ''
                  }`}
                >
                  <div className="space-y-0.5 min-w-0">
                    <h5 className="text-xs font-bold text-neutral-900 truncate">{n.title}</h5>
                    <p className="text-[11px] text-neutral-600 line-clamp-2 leading-snug">
                      {n.message}
                    </p>
                    <span className="text-[10px] text-neutral-400 block pt-0.5">
                      {formatDate(n.createdAt)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 pt-0.5">
                    {!n.isRead && (
                      <button
                        onClick={() => markRead(n.id)}
                        className="p-1 text-neutral-400 hover:text-accent"
                        title="Mark as read"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(n.id)}
                      className="p-1 text-neutral-400 hover:text-status-danger"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="px-4 pt-2 border-t border-neutral-100 text-center">
            <Link
              to="/account/notifications"
              onClick={() => setIsOpen(false)}
              className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
            >
              View All Notifications <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
