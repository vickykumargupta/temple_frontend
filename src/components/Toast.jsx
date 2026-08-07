export default function Toast({ type, message, onClose }) {
  if (!message) return null
  return (
    <div className="fixed top-6 right-6 z-50 max-w-sm w-full animate-[toast-in_0.3s_ease-out]">
      <div
        className={`flex items-start gap-3 rounded-xl shadow-2xl px-4 py-3 border ${
          type === 'success'
            ? 'bg-white border-green-200'
            : 'bg-white border-red-200'
        }`}
      >
        <span className="text-xl">{type === 'success' ? '✅' : '⚠️'}</span>
        <p
          className={`flex-1 text-sm font-medium ${
            type === 'success' ? 'text-green-800' : 'text-red-800'
          }`}
        >
          {message}
        </p>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-lg leading-none cursor-pointer"
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  )
}
