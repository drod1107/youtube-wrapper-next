// src/components/Notification.js

import { useState, useEffect } from 'react'

const Notification = ({ type, message, onDismiss, duration = 5000 }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onDismiss()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onDismiss])

  if (!isVisible) return null

  const bgColor = type === 'error' ? 'bg-red-500' : 'bg-green-500'

  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg`}>
      <p>{message}</p>
      <button 
        onClick={() => {
          setIsVisible(false)
          onDismiss()
        }}
        className="absolute top-1 right-1 text-white hover:text-gray-200"
      >
        ×
      </button>
    </div>
  )
}

export default Notification