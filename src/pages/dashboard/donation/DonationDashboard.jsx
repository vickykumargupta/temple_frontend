export default function DonationDashboard({ count, total }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg"
      style={{ background: 'linear-gradient(135deg, var(--theme-accent), var(--theme-cta-from))' }}
    >
      <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full opacity-20" style={{ background: 'var(--theme-accent-text)' }}></div>
      <p className="text-4xl font-bold">₹{Number(total || 0).toLocaleString('en-IN')}</p>
      <p className="mt-1 font-semibold tracking-wide uppercase text-sm" style={{ color: 'var(--theme-text-soft)' }}>
        Donations Collected
      </p>
      <p className="text-xs mt-3 opacity-80">{count} donation{count === 1 ? '' : 's'} received</p>
    </div>
  )
}
