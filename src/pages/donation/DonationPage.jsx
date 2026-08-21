import { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode'
import DonationManager from '../dashboard/donation/DonationManager'
import { getAuth, getDonationStats, getDonations } from '../../services/api'

const statCardBase =
  'relative overflow-hidden rounded-2xl p-6 text-white shadow-lg'
const statCardGradient = 'linear-gradient(135deg, var(--theme-cta-from), var(--theme-cta-to))'

function StatCard({ label, value, sub }) {
  return (
    <div className={`${statCardBase}`} style={{ background: statCardGradient }}>
      <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-20" style={{ background: 'var(--theme-accent)' }}></div>
      <p className="text-2xl md:text-3xl font-bold">{value}</p>
      <p className="mt-1 font-semibold tracking-wide uppercase text-xs" style={{ color: 'var(--theme-text-soft)' }}>
        {label}
      </p>
      {sub && <p className="text-xs mt-2 opacity-80">{sub}</p>}
    </div>
  )
}

function DonationsTable({ donations, loading }) {
  if (loading) return <p className="py-8 text-center text-gray-500 text-sm">Loading donations...</p>
  if (!donations || donations.length === 0) return <p className="py-8 text-center text-gray-500 text-sm">No donations recorded yet.</p>

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-y border-gray-100 bg-gray-50 text-gray-500 uppercase tracking-wide text-xs">
            <th className="px-6 py-3 font-semibold whitespace-nowrap">#</th>
            <th className="px-6 py-3 font-semibold whitespace-nowrap">Donor</th>
            <th className="px-6 py-3 font-semibold whitespace-nowrap">Email</th>
            <th className="px-6 py-3 font-semibold whitespace-nowrap">Amount</th>
            <th className="px-6 py-3 font-semibold whitespace-nowrap">Message</th>
            <th className="px-6 py-3 font-semibold whitespace-nowrap">Date</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((d, i) => (
            <tr key={d.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
              <td className="px-6 py-3 text-gray-500 whitespace-nowrap">{i + 1}</td>
              <td className="px-6 py-3 text-gray-700 font-medium whitespace-nowrap">{d.donorName}</td>
              <td className="px-6 py-3 text-gray-600 whitespace-nowrap">{d.email || '—'}</td>
              <td className="px-6 py-3 text-gray-800 font-semibold whitespace-nowrap">₹{Number(d.amount).toLocaleString('en-IN')}</td>
              <td className="px-6 py-3 text-gray-500 max-w-xs truncate">{d.message || '—'}</td>
              <td className="px-6 py-3 text-gray-500 whitespace-nowrap">
                {new Date(d.createdAt).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function DonationPage() {
  const canvasRef = useRef(null)
  const isAdmin = getAuth()?.role === 'admin'
  const [stats, setStats] = useState(null)
  const [donations, setDonations] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const host = window.location.hostname
    QRCode.toCanvas(canvasRef.current, `http://${host}:3000/donation/thank-you`, {
      width: 220,
      margin: 2,
      color: { dark: '#15803d', light: '#ffffff' },
    })
  }, [])

  function loadData() {
    if (!isAdmin) return
    setLoading(true)
    Promise.all([getDonationStats(), getDonations()])
      .then(([s, d]) => {
        setStats(s)
        setDonations(d)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const formatINR = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`

  return (
    <section className="min-h-[60vh] py-16 bg-gradient-to-b from-green-50 via-white to-white">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">Support Our Services</h1>
        <div className="w-20 h-1 mx-auto mt-4 mb-8 rounded-full" style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}></div>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          Your contribution helps us serve prasadam, organize festivals, and share Krishna consciousness.
          Every donation at ISKCON KR Puram, Bangalore is deeply appreciated.
        </p>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col items-center justify-center p-6 md:p-10 md:w-1/2 border-b md:border-b-0 md:border-r border-gray-200">
              <div className="bg-green-50 rounded-2xl p-6">
                <canvas ref={canvasRef} className="rounded-xl"></canvas>
              </div>
              <p className="text-sm text-gray-500 mt-3">Scan to send donation</p>
              <p className="text-xs text-gray-400">Receive a personal thank-you message 🙏</p>
            </div>
            <div className="flex flex-col items-center justify-center p-6 md:p-10 md:w-1/2">
              <div className="text-center space-y-3">
                <p className="text-xl font-bold text-gray-800">Bank Details</p>
                <div className="text-sm text-gray-600 space-y-1.5">
                  <p><span className="font-semibold">Bank:</span> State Bank of India</p>
                  <p><span className="font-semibold">Account:</span> ISKCON KR Puram</p>
                  <p><span className="font-semibold">A/C No:</span> 1234567890123456</p>
                  <p><span className="font-semibold">IFSC:</span> SBIN0001234</p>
                  <p><span className="font-semibold">UPI:</span> iskconkrpuram@upi</p>
                </div>
                <p className="text-xs text-gray-400 pt-2">Hare Krishna. Thank you!</p>
              </div>
            </div>
          </div>
        </div>

        {isAdmin && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-5">Donation Overview</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard label="Total Collected" value={formatINR(stats?.total)} sub={`${stats?.count ?? 0} donations`} />
              <StatCard label="Today" value={formatINR(stats?.todayTotal)} sub={`${stats?.todayCount ?? 0} donations`} />
              <StatCard label="This Month" value={formatINR(stats?.monthTotal)} sub={`${stats?.monthCount ?? 0} donations`} />
              <StatCard label="Total Count" value={stats?.count ?? 0} sub="all donations" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-2">
                <DonationManager onRecorded={loadData} />
              </div>
              <div className="flex flex-col justify-center items-center rounded-2xl p-6 shadow-lg"
                style={{ background: 'linear-gradient(to bottom, var(--theme-soft-from), var(--theme-soft-to))' }}>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Average Donation</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{formatINR(stats?.count ? stats.total / stats.count : 0)}</p>
              </div>
            </div>

            <div className="rounded-2xl shadow-lg overflow-hidden bg-white">
              <div className="px-6 pt-6">
                <h3 className="text-xl font-bold text-gray-800">All Donations</h3>
                <p className="text-sm text-gray-500 mt-1">Every donation received.</p>
              </div>
              <div className="mt-4">
                <DonationsTable donations={donations} loading={loading} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}