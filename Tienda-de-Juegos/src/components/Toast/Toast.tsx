import React from 'react'
import { X, CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react'
import { useToastStore, ToastType } from '../../store/toastStore'

const Toast: React.FC = () => {
  const { toasts, removeToast } = useToastStore()

  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      default:
        return <Info className="w-5 h-5 text-blue-500" />
    }
  }

  const getBgColor = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-500'
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-red-500'
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500'
      default:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
    }
  }

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center space-x-3 p-4 rounded-lg border ${getBgColor(toast.type)} shadow-lg min-w-[300px] animate-slide-up`}
        >
          {getIcon(toast.type)}
          <p className="flex-1 text-gray-900 dark:text-white text-sm">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Toast

