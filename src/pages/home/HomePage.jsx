export default function HomePage() {
  return (
    <>
      <section
        className="relative overflow-hidden text-white"
        style={{ background: 'linear-gradient(135deg, var(--theme-from), var(--theme-via), var(--theme-to))' }}
      >
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-5 left-10 w-72 h-72 rounded-full blur-3xl" style={{ background: 'var(--theme-accent)' }}></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full blur-3xl" style={{ background: 'var(--theme-cta-to)' }}></div>
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32 text-center">
          <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
            <p className="font-semibold tracking-widest uppercase text-sm" style={{ color: 'var(--theme-accent)' }}>
              Hare Krishna Hare Krishna
            </p>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            ISKCON KR Puram
            <span className="block text-3xl md:text-4xl mt-3" style={{ color: 'var(--theme-accent)' }}>
              Bangalore
            </span>
          </h1>
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto" style={{ color: 'var(--theme-text-soft)' }}>
            Welcome to our temple website. Explore Janmashtami celebrations,
            the Youth Forum (IYF) and the Men & Youth Forum (IMYF).
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/janmashtami"
              className="font-bold text-lg px-8 py-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(90deg, var(--theme-accent), var(--theme-accent-hover))', color: 'var(--theme-accent-text)' }}
            >
              Janmashtami 2026
            </a>
            <a
              href="/iyf"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold text-lg px-8 py-4 rounded-full border border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              IYF — Youth Forum
            </a>
            <a
              href="/imyf"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold text-lg px-8 py-4 rounded-full border border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              IMYF — Men & Youth
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
