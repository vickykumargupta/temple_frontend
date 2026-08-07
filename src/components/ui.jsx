export function ImageCard({ src, fallbackSrc, title, subtitle }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      <div className="aspect-[4/5] bg-gray-200">
        <img
          src={src}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
          onError={(e) => {
            if (e.target.src !== fallbackSrc) {
              e.target.src = fallbackSrc
            }
          }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-gray-200">{subtitle}</p>
      </div>
    </div>
  )
}

export function InfoCard({ icon, title, desc }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  )
}
