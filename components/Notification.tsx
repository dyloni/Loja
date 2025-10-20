import React, { useEffect } from 'react';
import { CheckIcon, XMarkIcon } from './Icons';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto-dismiss after 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-600' : 'bg-red-500';
  const icon = type === 'success' ? <CheckIcon className="w-6 h-6" /> : null;

  return (
    <div className={`fixed top-20 right-4 z-50 flex items-center gap-3 p-4 rounded-lg text-white shadow-lg ${bgColor} animate-fade-in-down`}>
      {icon}
      <p className="font-semibold">{message}</p>
      <button onClick={onClose} className="p-1 -mr-2 rounded-full hover:bg-white/20">
        <XMarkIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Notification;