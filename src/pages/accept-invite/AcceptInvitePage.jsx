import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { validateInvite, acceptInvite } from '../../services/api'

const inputBase = 'w-full px-4 py-2.5 rounded-xl border transition bg-white focus:outline-none text-sm'
const inputStyle = { '--tw-ring-color': 'var(--theme-cta-from)', borderColor: 'var(--theme-cta-from)' }

export default function AcceptInvitePage() {
  const [params] = useSearchParams()
  const token = params.get('token') || ''

  const [invite, setInvite] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({ fullName: '', email: '', phone: '' })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(null)
  const [submitError, setSubmitError] = useState(null)

  useEffect(() => {
    if (!token) {
      setError('Missing invite token. Use the link from your email.')
      setLoading(false)
      return
    }
    validateInvite(token)
      .then((data) => {
        setInvite(data)
        setForm({ fullName: data.fullName || '', email: data.email || '', phone: data.phone || '' })
      })
      .catch((err) => setError(err.message || 'Invalid invite link'))
      .finally(() => setLoading(false))
  }, [token])

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError(null)
    try {
      const data = await acceptInvite(token, form)
      setSuccess(data.message || 'Your details have been submitted for approval.')
    } catch (err) {
      setSubmitError(err.message || 'Failed to submit details')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <section className="min-h-[60vh] py-16 flex items-center justify-center">
        <p className="text-gray-500">Validating invite link...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="min-h-[60vh] py-16 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="text-4xl mb-4">😕</div>
          <h1 className="text-xl font-bold text-gray-800 mb-2">Invite Unavailable</h1>
          <p className="text-gray-500">{error}</p>
        </div>
      </section>
    )
  }

  if (success) {
    return (
      <section className="min-h-[60vh] py-16 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="text-4xl mb-4">🙏</div>
          <h1 className="text-xl font-bold text-gray-800 mb-2">Thank You!</h1>
          <p className="text-gray-500">{success}</p>
          <p className="text-sm text-gray-400 mt-4">You can now close this page. You will be able to log in once a super-admin approves your account.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-[60vh] py-16 bg-gradient-to-b from-amber-50 via-white to-white">
      <div className="max-w-lg mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Admin Invitation</h1>
          <div className="w-20 h-1 mx-auto mt-4 rounded-full" style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}></div>
          <p className="text-gray-600 mt-4">
            You have been invited to join the <strong>ISKCON KR Puram</strong> admin team.
            Please confirm your details and set a password. Your account will be active once approved.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {invite && (
            <div className="mb-6 px-4 py-3 rounded-xl text-sm bg-amber-50 text-amber-800 border border-amber-200">
              Invite for: <strong>{invite.fullName}</strong> ({invite.email})
            </div>
          )}

          {submitError && (
            <div className="mb-4 px-4 py-3 rounded-xl text-sm font-medium bg-red-100 text-red-800 border border-red-200">
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
              <input name="fullName" type="text" value={form.fullName} onChange={handleChange} className={inputBase} style={inputStyle} required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} className={inputBase} style={inputStyle} readOnly required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
              <input name="phone" type="tel" value={form.phone} onChange={handleChange} className={inputBase} style={inputStyle} placeholder="e.g. 9876543210" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Designation (optional)</label>
              <input name="designation" type="text" value={form.designation || ''} onChange={handleChange} className={inputBase} style={inputStyle} placeholder="e.g. Treasurer" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Department (optional)</label>
              <input name="department" type="text" value={form.department || ''} onChange={handleChange} className={inputBase} style={inputStyle} placeholder="e.g. Accounts" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">City</label>
              <input name="city" type="text" value={form.city || ''} onChange={handleChange} className={inputBase} style={inputStyle} placeholder="e.g. Bangalore" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Address (optional)</label>
              <input name="address" type="text" value={form.address || ''} onChange={handleChange} className={inputBase} style={inputStyle} placeholder="Street, area" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <input name="password" type="password" value={form.password || ''} onChange={handleChange} className={inputBase} style={inputStyle} placeholder="Minimum 6 characters" minLength={6} required />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full text-white font-bold py-2.5 px-6 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed text-sm cursor-pointer hover:opacity-90"
              style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}
            >
              {submitting ? 'Submitting...' : 'Submit for Approval'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}