// src/components/Notification.js

import { useState, useEffect } from 'react';

export default function Notification ({ type, message, onDismiss, duration = 5000 }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onDismiss();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  if (!isVisible) return null;

  const bgColor = type === 'error' ? 'bg-red-500' : 'bg-green-500';

  return (
    <div
      className={`fixed bottom-4 right-4 px-6 py-3 ${bgColor} rounded-lg text-white shadow-lg`}
    >
      <p>{message}</p>
      <button
        onClick={() => {
          setIsVisible(false);
          onDismiss();
        }}
        className="absolute right-1 top-1 text-white hover:text-gray-200"
      >
        ×
      </button>
    </div>
  );
};
