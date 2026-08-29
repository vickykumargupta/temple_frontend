import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { validateInvite, acceptInvite } from '../../services/mail'
import { clearAuth } from '../../services/api'
import { PASSWORD_RULES, getPasswordErrors } from '../../utils/passwordValidation'

const inputBase =
  'w-full py-4 pl-12 pr-12 rounded-xl border transition bg-white focus:outline-none text-base'

const inputStyle = {
  '--tw-ring-color': 'var(--theme-cta-from)',
  borderColor: 'var(--theme-cta-from)',
}

function Field({ icon, label, className = '', children }) {
  return (
    <div className={className}>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true">
          {icon}
        </span>
        {children}
      </div>
    </div>
  )
}

function pwToggle(show, onClick) {
  return (
    <button
      type="button"
      onClick={onClick}
      tabIndex={-1}
      aria-label="Toggle password visibility"
      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition cursor-pointer"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {show ? (
          <>
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
            <line x1="1" y1="1" x2="23" y2="23" />
          </>
        ) : (
          <>
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </>
        )}
      </svg>
    </button>
  )
}

export default function AcceptInvitePage() {
  const [params] = useSearchParams()
  const token = params.get('token') || ''

  const [invite, setInvite] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({ fullName: '', email: '', phone: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(null)
  const [submitError, setSubmitError] = useState(null)

  useEffect(() => {
    // Clear any active session to prevent showing other accounts' details during setup
    clearAuth()
    
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
    const pwErrors = getPasswordErrors(form.password || '')
    if (pwErrors.length > 0) {
      setSubmitError(`Password must contain: ${pwErrors.join(', ')}`)
      return
    }
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
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500 text-lg">Validating your invite...</p>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-7xl grid md:grid-cols-2 md:min-h-[780px] rounded-3xl overflow-hidden shadow-2xl">
        <div
          className="hidden md:flex flex-col justify-between p-14 lg:p-20 text-white relative overflow-hidden"
        >
          <img
            src="/images/prabhupada.jpg"
            alt="Srila Prabhupada"
            className="absolute inset-0 w-full h-full object-cover object-top"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.25) 100%)' }}
          ></div>

          <div className="absolute top-10 left-10 lg:top-16 lg:left-16 z-20">
            <div className="p-2 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 shadow-lg">
              <img src="/images/iskcon-logo.svg" alt="ISKCON logo" className="w-12 h-12" />
            </div>
          </div>

          <div className="relative z-10 my-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
              His Divine Grace A.C. Bhaktivedanta Swami Prabhupada
            </p>
          </div>

          <p className="relative z-10 text-base italic text-white/85 drop-shadow">
            Hare Krishna Hare Krishna, Krishna Krishna Hare Hare
            <br />
            Hare Rama Hare Rama, Rama Rama Hare Hare 🙏
          </p>
        </div>

        <div
          className="p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col justify-center"
          style={{ background: 'linear-gradient(to bottom, var(--theme-soft-from), var(--theme-soft-to))' }}
        >
          <div className="flex items-center gap-2 mb-6 md:hidden">
            <img src="/images/iskcon-logo.svg" alt="ISKCON logo" className="w-9 h-9" />
            <p className="font-bold text-gray-800">ISKCON KR Puram</p>
          </div>

          {error ? (
            <>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Invite Unavailable</h1>
              <p className="text-lg text-gray-500 mb-8">{error}</p>
              <p className="text-sm text-gray-400">Please ask a super-admin to send you a fresh invite.</p>
            </>
          ) : success ? (
            <>
              <div className="text-5xl mb-4">🙏</div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Thank You!</h1>
              <p className="text-lg text-gray-500 mb-4">{success}</p>
              <p className="text-sm text-gray-400">
                You can close this page now. You will be able to log in once a super-admin approves your account.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold text-gray-800">Complete your Admin Setup</h1>
              <p className="text-lg text-gray-500 mb-6">
                Confirm your details and create a password
              </p>

              {invite && (
                <div className="mb-6 px-4 py-3 rounded-xl text-sm bg-white/70 border text-gray-700">
                  Invited: <strong>{invite.fullName}</strong> ({invite.email})
                </div>
              )}

              {submitError && (
                <div className="mb-5 px-4 py-3 rounded-xl text-sm font-medium bg-red-100 text-red-800 border border-red-200 animate-fade-in">
                  {submitError}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field icon={<span className="text-base">👤</span>} label="Full Name">
                    <input name="fullName" type="text" value={form.fullName} onChange={handleChange} className={inputBase} style={inputStyle} placeholder="Enter your full name" required />
                  </Field>

                  <Field icon={<span className="text-base">📞</span>} label="Phone">
                    <input name="phone" type="tel" value={form.phone || ''} onChange={handleChange} className={inputBase} style={inputStyle} placeholder="Enter phone number" />
                  </Field>

                  <Field icon={<span className="text-base">✉️</span>} label="Email" className="sm:col-span-2">
                    <input name="email" type="email" value={form.email} onChange={handleChange} className={`${inputBase} pr-5 bg-gray-50 text-gray-500`} style={inputStyle} readOnly required />
                  </Field>

                  <Field icon={<span className="text-base">📍</span>} label="City">
                    <input name="city" type="text" value={form.city || ''} onChange={handleChange} className={inputBase} style={inputStyle} placeholder="e.g. Bangalore" />
                  </Field>

                  <Field icon={<span className="text-base">🏠</span>} label="Address (optional)">
                    <input name="address" type="text" value={form.address || ''} onChange={handleChange} className={inputBase} style={inputStyle} placeholder="Street, area" />
                  </Field>

                  <Field icon={<span className="text-base">🔒</span>} label="Password" className="sm:col-span-2">
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={form.password || ''}
                      onChange={handleChange}
                      className={inputBase}
                      style={inputStyle}
                      placeholder="Min 8 chars incl. A-Z, a-z, 0-9 & symbol"
                      minLength={8}
                      required
                    />
                    {pwToggle(showPassword, () => setShowPassword((v) => !v))}
                  </Field>
                </div>

                <ul className="flex flex-nowrap items-center gap-x-3 overflow-x-auto pb-1">
                  {PASSWORD_RULES.map((rule) => {
                    const ok = rule.test(form.password || '')
                    return (
                      <li key={rule.key} className={`flex items-center gap-1 text-xs whitespace-nowrap ${ok ? 'text-green-600' : 'text-red-500'}`}>
                        <span>{ok ? '✓' : '✕'}</span>
                        {rule.label}
                      </li>
                    )
                  })}
                </ul>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full text-white text-lg font-bold py-4 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:opacity-90"
                  style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}
                >
                  {submitting ? 'Submitting...' : 'Submit for Approval'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
