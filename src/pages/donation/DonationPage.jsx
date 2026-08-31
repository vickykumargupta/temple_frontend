import { useEffect, useState } from 'react'
import DonationManager from '../dashboard/donation/DonationManager'
import { getAuth, getDonationStats, getDonations, createPublicDonation } from '../../services/api'

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
  const isAdmin = getAuth()?.role === 'admin'
  const [stats, setStats] = useState(null)
  const [donations, setDonations] = useState(null)
  const [loading, setLoading] = useState(true)

  const auth = getAuth()
  const isLoggedIn = !!auth?.token
  const loggedInName = auth?.email ? auth.email.split('@')[0] : ''
  const [donorName, setDonorName] = useState(loggedInName || '')
  const [donateAmount, setDonateAmount] = useState('1008')
  const [donatePhone, setDonatePhone] = useState('')
  const [donateEmail, setDonateEmail] = useState(auth?.email || '@gmail.com')
  // QR image is fetched from backend — UPI ID never lives in frontend code
  const [qrSrc, setQrSrc] = useState('/api/donations/qr?amount=1008&note=Donation+for+Temple+Services')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [utrDigits, setUtrDigits] = useState('')

  const handleRecordDonation = async (e) => {
    e.preventDefault()
    if (!donorName.trim()) {
      alert('Please enter your name to record details.')
      return
    }
    if (!donatePhone.trim() || donatePhone.length < 10) {
      alert('Please enter a valid 10-digit mobile number.')
      return
    }
    if (utrDigits.length !== 5) {
      alert('Please enter exactly the last 5 digits of your UTR / Transaction ID.')
      return
    }
    setSubmitting(true)
    try {
      await createPublicDonation({
        donorName: donorName.trim(),
        email: donateEmail.trim() || null,
        phone: donatePhone.trim() || null,
        amount: Number(donateAmount),
        message: `UTR: ${utrDigits}`,
      })
      setSuccess(true)
      setUtrDigits('') // Reset on success
      setTimeout(() => {
        setSuccess(false)
      }, 5000)
    } catch (err) {
      alert('Failed to submit donation details: ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    // Load devotee profile fields if logged in (no UPI fetch needed — QR comes from backend)
    const authState = getAuth()
    if (authState && authState.token && authState.role === 'devotee') {
      fetch('/api/devotee/profile', {
        headers: { Authorization: `Bearer ${authState.token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.devotee) {
            if (data.devotee.fullName) setDonorName(data.devotee.fullName)
            if (data.devotee.email) setDonateEmail(data.devotee.email)
            if (data.devotee.phone) setDonatePhone(data.devotee.phone)
          }
        })
        .catch((err) => console.error('Error loading devotee profile:', err))
    } else if (authState && authState.token && authState.role === 'admin') {
      if (authState.email) {
        setDonateEmail(authState.email)
        setDonorName(authState.email.split('@')[0])
      }
    }
  }, [])

  // Update QR image URL whenever the amount changes — backend generates the actual QR PNG
  useEffect(() => {
    const amount = donateAmount || '0'
    setQrSrc(`/api/donations/qr?amount=${encodeURIComponent(amount)}&note=Donation+for+Temple+Services`)
  }, [donateAmount])

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

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          {/* Top Bar with distinct orange gradient background */}
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-6 px-8 text-center relative overflow-hidden">
            <h2 className="text-xl sm:text-2xl font-black tracking-wide">Support ISKCON KR Puram</h2>
            <p className="text-xs sm:text-sm text-amber-100 mt-1 font-medium">100% Secure & Tax-Exempt Devotional Contribution</p>
          </div>

          <div className="p-6 sm:p-8">
            <form onSubmit={handleRecordDonation} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              
              {/* Form Input Elements */}
              <div className="space-y-5">
                <h3 className="text-base sm:text-lg font-extrabold text-slate-800 border-b pb-2">Donation Details</h3>
                
                {/* Donor Name Field */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Donor Full Name</label>
                  <input
                    type="text"
                    required
                    readOnly={isLoggedIn}
                    placeholder="Enter your name"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className={`w-full px-4 py-2.5 border rounded-xl text-sm font-semibold transition ${
                      isLoggedIn
                        ? 'bg-slate-100 border-slate-200 text-slate-500 cursor-not-allowed focus:outline-none'
                        : 'bg-slate-50 border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white'
                    }`}
                  />
                </div>

                {/* Preset Amount Badges */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Select Donation Amount (INR)</label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {['501', '1008', '2001', '5001', '10001'].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setDonateAmount(preset)}
                        className={`py-2 rounded-xl text-[11px] sm:text-xs font-extrabold transition cursor-pointer border ${
                          donateAmount === preset
                            ? 'bg-amber-500 border-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        ₹{preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Amount Field */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Custom Amount (Max ₹90,000)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-extrabold text-sm">₹</span>
                    <input
                      type="number"
                      min="1"
                      max="90000"
                      placeholder="Enter amount"
                      value={donateAmount}
                      onChange={(e) => {
                        const val = e.target.value
                        if (Number(val) > 90000) {
                          setDonateAmount('90000')
                        } else {
                          setDonateAmount(val)
                        }
                      }}
                      className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-extrabold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
                    />
                  </div>
                </div>

                {/* Contact Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Mobile Number (10 digits)</label>
                    <input
                      type="tel"
                      required
                      readOnly={isLoggedIn}
                      placeholder="10-digit mobile"
                      value={donatePhone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '') // strictly digits only
                        if (val.length <= 10) {
                          setDonatePhone(val)
                        }
                      }}
                      className={`w-full px-4 py-2.5 border rounded-xl text-sm font-semibold transition ${
                        isLoggedIn
                          ? 'bg-slate-100 border-slate-200 text-slate-500 cursor-not-allowed focus:outline-none'
                          : 'bg-slate-50 border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Email ID</label>
                    <input
                      type="email"
                      readOnly={isLoggedIn}
                      placeholder="donor@example.com"
                      value={donateEmail}
                      onChange={(e) => setDonateEmail(e.target.value)}
                      onFocus={(e) => {
                        if (!isLoggedIn && e.target.value === '@gmail.com') {
                          // Place cursor at the start of the input for easy username entry
                          setTimeout(() => {
                            e.target.setSelectionRange(0, 0)
                          }, 0)
                        }
                      }}
                      onBlur={(e) => {
                        const val = e.target.value.trim()
                        if (val && !val.includes('@')) {
                          setDonateEmail(`${val}@gmail.com`)
                        } else if (!val) {
                          setDonateEmail('@gmail.com')
                        }
                      }}
                      className={`w-full px-4 py-2.5 border rounded-xl text-sm font-semibold transition ${
                        isLoggedIn
                          ? 'bg-slate-100 border-slate-200 text-slate-500 cursor-not-allowed focus:outline-none'
                          : 'bg-slate-50 border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white'
                      }`}
                    />
                  </div>
                </div>

                {/* UTR Verification Field */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">UPI Transaction Reference (Last 5 digits of UTR)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-extrabold text-sm">UTR:</span>
                    <input
                      type="text"
                      required
                      maxLength={5}
                      placeholder="e.g. 12345"
                      value={utrDigits}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '') // strictly digits only
                        setUtrDigits(val)
                      }}
                      className="w-full pl-14 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-extrabold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
                    />
                  </div>
                </div>

                {/* Submit / Record Donation Button */}
                <button
                  type="submit"
                  disabled={submitting || utrDigits.length !== 5}
                  className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-extrabold py-3 px-4 rounded-xl shadow-lg transition active:scale-98 text-xs sm:text-sm cursor-pointer flex items-center justify-center gap-1.5 mt-2"
                >
                  {submitting ? 'Recording...' : utrDigits.length !== 5 ? 'Enter 5-digit UTR to Confirm' : 'Confirm & Record Donation Details'}
                </button>

                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-3.5 text-center text-xs font-bold mt-3">
                    🎉 Thank you! Your donation details have been recorded. Hare Krishna! 🙏
                  </div>
                )}
              </div>

              {/* Dynamic QR Scanner & Deeplink Intent Button */}
              <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 flex flex-col items-center justify-center text-center">
                <span className="text-xs uppercase tracking-wider text-green-700 bg-green-100 font-extrabold px-3.5 py-1 rounded-full mb-4 shadow-sm flex items-center gap-1">
                  🛡️ Secure UPI Payment
                </span>
                
                {/* QR image served from backend — UPI ID never exposed to browser */}
                <div className="bg-white p-4 rounded-2xl shadow-md border border-slate-200/50">
                  <img
                    src={qrSrc}
                    alt="UPI Payment QR Code"
                    width={200}
                    height={200}
                    className="mx-auto rounded-lg"
                  />
                </div>
                
                <p className="text-xs font-bold text-slate-700 mt-4">
                  Selected Amount: <span className="text-sm font-black text-slate-900">₹{donateAmount || '0'}</span>
                </p>
                <p className="text-[11px] text-slate-400 mt-1">Scan with GPay, PhonePe, Paytm, or BHIM</p>

                {/* Mobile intent payment button — UPI ID resolved server-side */}
                <div className="w-full mt-4 block md:hidden">
                  <a
                    href={`/api/donations/upi-intent?amount=${encodeURIComponent(donateAmount || '0')}&note=Donation+for+Temple+Services`}
                    className="w-full bg-slate-950 hover:bg-black text-white font-extrabold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition active:scale-95 text-xs sm:text-sm"
                  >
                    🚀 Pay via UPI App (GPay/PhonePe)
                  </a>
                </div>
              </div>


            </form>
          </div>

          {/* Footer Trust Badges (3 items) */}
          <div className="bg-slate-50 border-t border-slate-100 py-5 px-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <span className="text-2xl">🛡️</span>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-800">100% Secure Payments</h4>
                  <p className="text-[10px] text-slate-500">Direct bank-to-bank safety</p>
                </div>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-3 border-t sm:border-t-0 sm:border-l border-slate-200 pt-3 sm:pt-0 sm:pl-6">
                <span className="text-2xl">❤️</span>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-800 font-bold">Trusted by 50K+ donors</h4>
                  <p className="text-[10px] text-slate-500">ISKCON Bangalore network</p>
                </div>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-3 border-t sm:border-t-0 sm:border-l border-slate-200 pt-3 sm:pt-0 sm:pl-6">
                <span className="text-2xl">🙌</span>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-800">Your contribution matters</h4>
                  <p className="text-[10px] text-slate-500">100% tax exempt charity</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* {isAdmin && (
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
        )} */}
      </div>
    </section>
  )
}