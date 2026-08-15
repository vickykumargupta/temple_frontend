function StatusCard({ title, subtitle, registered, details, accent }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg"
      style={{ background: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}
    >
      <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-20" style={{ background: 'var(--theme-accent)' }}></div>
      {registered ? (
        <>
          <p className="text-4xl">✓</p>
          <p className="mt-1 font-semibold tracking-wide uppercase text-sm" style={{ color: 'var(--theme-text-soft)' }}>
            {title}
          </p>
          <p className="text-xs mt-3 opacity-90">You are registered{details ? ` — ${details}` : ''}</p>
        </>
      ) : (
        <>
          <p className="text-4xl">—</p>
          <p className="mt-1 font-semibold tracking-wide uppercase text-sm" style={{ color: 'var(--theme-text-soft)' }}>
            {title}
          </p>
          <p className="text-xs mt-3 opacity-80">{subtitle}</p>
        </>
      )}
    </div>
  )
}

export default function DevoteeDashboard({ data }) {
  const { my, stats } = data
  const janmashtamiReg = my?.janmashtami
  const iyfReg = my?.iyf?.[0]
  const bhaktiVikshaReg = my?.bhaktiViksha?.[0]

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatusCard
          title="Janmashtami"
          subtitle="Register for the Janmashtami celebration"
          registered={Boolean(janmashtamiReg)}
          details={janmashtamiReg ? janmashtamiReg.familyMembers + ' member(s)' : null}
          accent={{ from: 'var(--theme-from)', to: 'var(--theme-via)' }}
        />
        <StatusCard
          title="IYF"
          subtitle="Register for the ISKCON Youth Forum"
          registered={Boolean(iyfReg)}
          details={iyfReg ? iyfReg.college || 'youth member' : null}
          accent={{ from: 'var(--theme-cta-from)', to: 'var(--theme-cta-to)' }}
        />
        <StatusCard
          title="BhaktiVriksha"
          subtitle="Register for families & senior devotees"
          registered={Boolean(bhaktiVikshaReg)}
          details={bhaktiVikshaReg ? bhaktiVikshaReg.spouseName || 'family member' : null}
          accent={{ from: 'var(--theme-soft-from)', to: 'var(--theme-cta-from)' }}
        />
      </div>

      <div className="mt-8">
        <p className="text-lg font-semibold mb-4" style={{ color: 'var(--theme-text-soft)' }}>Site Overview</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div
            className="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg"
            style={{ background: 'linear-gradient(135deg, var(--theme-from), var(--theme-via))' }}
          >
            <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full opacity-20" style={{ background: 'var(--theme-accent)' }}></div>
            <p className="text-4xl font-bold">{stats.janmashtami}</p>
            <p className="mt-1 font-semibold tracking-wide uppercase text-sm" style={{ color: 'var(--theme-text-soft)' }}>Janmashtami</p>
          </div>
          <div
            className="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg"
            style={{ background: 'linear-gradient(135deg, var(--theme-cta-from), var(--theme-cta-to))' }}
          >
            <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full opacity-20" style={{ background: 'var(--theme-accent)' }}></div>
            <p className="text-4xl font-bold">{stats.iyf}</p>
            <p className="mt-1 font-semibold tracking-wide uppercase text-sm" style={{ color: 'var(--theme-text-soft)' }}>IYF</p>
          </div>
          <div
            className="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg"
            style={{ background: 'linear-gradient(135deg, var(--theme-soft-from), var(--theme-cta-from))' }}
          >
            <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full opacity-20" style={{ background: 'var(--theme-cta-to)' }}></div>
            <p className="text-4xl font-bold">{stats.bhaktiViksha}</p>
            <p className="mt-1 font-semibold tracking-wide uppercase text-sm" style={{ color: 'var(--theme-text-soft)' }}>BhaktiVriksha</p>
          </div>
          <div
            className="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg"
            style={{ background: 'linear-gradient(135deg, var(--theme-soft-from), var(--theme-soft-to), var(--theme-cta-from))' }}
          >
            <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-20" style={{ background: 'var(--theme-accent)' }}></div>
            <p className="text-4xl font-bold">₹{Number(stats.donationTotal || 0).toLocaleString('en-IN')}</p>
            <p className="mt-1 font-semibold tracking-wide uppercase text-sm" style={{ color: 'var(--theme-text-soft)' }}>Donations</p>
          </div>
        </div>
      </div>
    </>
  )
}
