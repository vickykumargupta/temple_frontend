export default function Toast({ type, message, program, onClose }) {
  if (!message) return null

  // Define unique related images/icons for each program
  const programConfig = {
    Janmashtami: {
      image: 'https://images.pexels.com/photos/37616375/pexels-photo-37616375.jpeg?auto=compress&cs=tinysrgb&w=200',
      icon: '🙏',
    },
    IYF: {
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=200&auto=format&fit=crop',
      icon: '🎓',
    },
    BhaktiVriksha: {
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=200&auto=format&fit=crop',
      icon: '👨‍👩‍👧‍👦',
    },
  }

  const config = programConfig[program] || {
    image: null,
    icon: type === 'success' ? '✅' : '⚠️',
  }

  return (
    <div className="fixed top-6 right-6 z-50 animate-[toast-in_0.3s_ease-out]">
      <div
        className={`flex flex-col items-center text-center rounded-2xl shadow-2xl p-6 border bg-white relative w-80 min-h-[14rem] justify-center ${
          type === 'success' ? 'border-gray-150' : 'border-red-150'
        }`}
      >
        {/* Close Button in top right */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg leading-none cursor-pointer transition-colors"
          aria-label="Close"
        >
          ×
        </button>

        {/* Unique related image or large icon */}
        {type === 'success' && config.image ? (
          <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-white shadow-md ring-2 ring-emerald-500">
            <img
              src={config.image}
              alt={program || 'success'}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-3xl mb-4 bg-gray-50 border border-gray-100 shadow-sm">
            {config.icon}
          </div>
        )}

        {/* Program Label if success */}
        {type === 'success' && program && (
          <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
            {program}
          </span>
        )}

        {/* Message Text below */}
        <p
          className={`text-sm font-semibold leading-relaxed px-2 ${
            type === 'success' ? 'text-gray-800' : 'text-red-700'
          }`}
        >
          {message}
        </p>
      </div>
    </div>
  )
}
