function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function WelcomeBanner({ name, isAdmin }) {
  const date = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div
      className="relative overflow-hidden rounded-3xl p-8 md:p-10 text-white shadow-xl mb-8"
      style={{ background: 'linear-gradient(135deg, var(--theme-from), var(--theme-via), var(--theme-to))' }}
    >
      <div className="absolute -top-20 -right-10 w-72 h-72 rounded-full opacity-20 blur-2xl" style={{ background: 'var(--theme-accent)' }}></div>
      <div className="absolute -bottom-24 -left-10 w-80 h-80 rounded-full opacity-15 blur-2xl" style={{ background: 'var(--theme-cta-to)' }}></div>
      <div className="absolute top-6 right-8 text-5xl opacity-20 select-none" aria-hidden="true">🙏</div>

      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--theme-text-soft)' }}>
          {date}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold mt-2 leading-tight">
          {greeting()}
          {name ? `, ${name.split(' ')[0]}` : ''}!
        </h1>
        <p className="mt-2 max-w-xl text-sm md:text-base" style={{ color: 'var(--theme-text-soft)' }}>
          {isAdmin
            ? 'Hare Krishna! Here is the live overview of registrations and donations across all ISKCON KR Puram programs.'
            : 'Hare Krishna! Welcome back to ISKCON KR Puram. Here is your registration status and community overview.'}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="text-xs px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">Hare Krishna 🙏</span>
          <span className="text-xs px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">ISKCON KR Puram</span>
          <span className="text-xs px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">Bangalore</span>
        </div>
      </div>
    </div>
  )
}
