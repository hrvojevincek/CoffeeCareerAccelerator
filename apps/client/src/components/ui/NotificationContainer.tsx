import { Snackbar } from './Snackbar';
import { useNotification, type Notification } from '../../hooks/useNotification';

interface NotificationContainerProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
}

export const NotificationContainer = ({ notifications, onRemove }: NotificationContainerProps) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map(notification => (
        <Snackbar
          key={notification.id}
          message={notification.message}
          type={notification.type}
          isVisible={true}
          onClose={() => onRemove(notification.id)}
          duration={0} // We handle duration in the hook
        />
      ))}
    </div>
  );
};
