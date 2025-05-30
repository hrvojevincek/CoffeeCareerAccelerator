import { createContext, useContext, type ReactNode } from 'react';

import { NotificationContainer } from '../components/ui/NotificationContainer';
import { useNotification } from '../hooks/useNotification';

// Create context
const NotificationContext = createContext<ReturnType<typeof useNotification> | null>(null);

// Provider component
export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const notification = useNotification();

  return (
    <NotificationContext.Provider value={notification}>
      {children}
      <NotificationContainer
        notifications={notification.notifications}
        onRemove={notification.removeNotification}
      />
    </NotificationContext.Provider>
  );
};

// Hook to use notifications
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
