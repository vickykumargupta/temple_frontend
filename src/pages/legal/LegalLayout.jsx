import { Link } from 'react-router-dom'

export default function LegalLayout({ title, icon, children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* HEADER SECTION */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: 'linear-gradient(135deg, var(--theme-from), var(--theme-via), var(--theme-to))' }}
      >
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-5 left-10 w-72 h-72 rounded-full blur-3xl bg-white/20"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full blur-3xl bg-white/20"></div>
        </div>
        <div className="relative max-w-5xl mx-auto px-6 py-16 md:py-20 text-center">
          <span className="text-4xl md:text-5xl mb-4 block select-none" aria-hidden="true">
            {icon || '📜'}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-2">
            {title}
          </h1>
          <div className="w-20 h-1 bg-white/40 mx-auto rounded-full mt-4"></div>
        </div>
      </section>

      {/* CONTENT BOX */}
      <main className="max-w-4xl mx-auto px-4 md:px-6 -mt-8 relative z-10">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 dark:border-gray-700">
          <div className="prose prose-blue dark:prose-invert max-w-none space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
            {children}
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-150 dark:border-gray-700 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-md"
              style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
