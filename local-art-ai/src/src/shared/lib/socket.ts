import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '../store/authStore';
import { useUiStore } from '../store/uiStore';
import { queryClient } from './queryClient';

let socket: Socket | null = null;

export function initializeSocket(): Socket | null {
  const token = useAuthStore.getState().accessToken;

  if (!token) {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
    return null;
  }

  if (socket?.connected) {
    return socket;
  }

  const socketUrl = import.meta.env.VITE_SOCKET_URL || window.location.origin;

  socket = io(socketUrl, {
    auth: { token },
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 2000,
  });

  socket.on('connect', () => {
    // Connected to realtime server
  });

  socket.on('disconnect', () => {
    // Disconnected
  });

  // Realtime events
  socket.on('notification.created', (notification) => {
    queryClient.invalidateQueries({ queryKey: ['notifications'] });
    useUiStore.getState().addToast({
      type: 'info',
      title: notification.title || 'New Notification',
      message: notification.message,
    });
  });

  socket.on('order.updated', (order) => {
    queryClient.invalidateQueries({ queryKey: ['orders'] });
    useUiStore.getState().addToast({
      type: 'info',
      title: 'Order Updated',
      message: `Order #${order.orderNumber} status is now ${order.status}`,
    });
  });

  socket.on('payment.completed', (payment) => {
    queryClient.invalidateQueries({ queryKey: ['orders'] });
    queryClient.invalidateQueries({ queryKey: ['payments'] });
    useUiStore.getState().addToast({
      type: 'success',
      title: 'Payment Confirmed',
      message: `Payment status: ${payment.status}`,
    });
  });

  socket.on('review.approved', (review) => {
    queryClient.invalidateQueries({ queryKey: ['reviews'] });
    useUiStore.getState().addToast({
      type: 'success',
      title: 'Review Approved',
      message: 'Your product review is now public.',
    });
  });

  // NOTE: 'inventory.low' is not yet emitted by the backend.
  // Re-enable this listener when the inventory service adds:
  //   emitEvent("inventory.low", { productId, stock })
  // socket.on('inventory.low', (payload) => {
  //   queryClient.invalidateQueries({ queryKey: ['admin-inventory'] });
  //   const user = useAuthStore.getState().user;
  //   if (user?.role === 'ADMIN') {
  //     useUiStore.getState().addToast({
  //       type: 'warning',
  //       title: 'Low Stock Alert',
  //       message: `Product stock remaining: ${payload.stock} units`,
  //     });
  //   }
  // });

  return socket;
}

export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

export function getSocket(): Socket | null {
  return socket;
}
