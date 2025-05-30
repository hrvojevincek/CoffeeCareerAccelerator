import { useState, useCallback } from 'react';

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export const useNotification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = useCallback(
    (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info', duration = 3000) => {
      const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);

      const notification: Notification = {
        id,
        message,
        type,
        duration,
      };

      setNotifications(prev => [...prev, notification]);

      // Auto-remove after duration
      if (duration > 0) {
        setTimeout(() => {
          removeNotification(id);
        }, duration);
      }

      return id;
    },
    []
  );

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Convenience methods
  const showSuccess = useCallback(
    (message: string, duration?: number) => {
      return showNotification(message, 'success', duration);
    },
    [showNotification]
  );

  const showError = useCallback(
    (message: string, duration?: number) => {
      return showNotification(message, 'error', duration);
    },
    [showNotification]
  );

  const showWarning = useCallback(
    (message: string, duration?: number) => {
      return showNotification(message, 'warning', duration);
    },
    [showNotification]
  );

  const showInfo = useCallback(
    (message: string, duration?: number) => {
      return showNotification(message, 'info', duration);
    },
    [showNotification]
  );

  return {
    notifications,
    showNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    removeNotification,
    clearAllNotifications,
  };
};
