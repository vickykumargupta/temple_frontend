export default function ImyfDashboard({ count }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg"
      style={{ background: 'linear-gradient(135deg, var(--theme-soft-from), var(--theme-soft-to), var(--theme-cta-from))' }}
    >
      <div className="absolute -top-6 -left-6 w-28 h-28 rounded-full opacity-20" style={{ background: 'var(--theme-cta-to)' }}></div>
      <p className="text-4xl font-bold">{count}</p>
      <p className="mt-1 font-semibold tracking-wide uppercase text-sm" style={{ color: 'var(--theme-text-soft)' }}>
        IMYF Registrations
      </p>
      <p className="text-xs mt-3 opacity-80">Corporate professionals joined the Men & Youth Forum</p>
    </div>
  )
}