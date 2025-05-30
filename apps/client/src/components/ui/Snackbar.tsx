import { useEffect } from 'react';

export interface SnackbarProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export const Snackbar = ({
  message,
  type = 'info',
  isVisible,
  onClose,
  duration = 3000,
}: SnackbarProps) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white border-green-600';
      case 'error':
        return 'bg-red-500 text-white border-red-600';
      case 'warning':
        return 'bg-yellow-500 text-black border-yellow-600';
      default:
        return 'bg-blue-500 text-white border-blue-600';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      default:
        return 'ℹ';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
      <div
        className={`
        flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border
        min-w-[300px] max-w-[500px]
        ${getTypeStyles()}
      `}>
        <span className="text-lg font-bold">{getIcon()}</span>
        <span className="flex-1 text-sm font-medium">{message}</span>
        <button
          onClick={onClose}
          className="text-lg hover:opacity-70 transition-opacity"
          aria-label="Close notification">
          ×
        </button>
      </div>
    </div>
  );
};
