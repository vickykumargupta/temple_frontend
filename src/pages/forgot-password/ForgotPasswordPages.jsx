import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { requestPasswordReset, verifyOtpAndReset } from '../../services/api'
import { PASSWORD_RULES, getPasswordErrors } from '../../utils/passwordValidation'

const inputBase = 'w-full py-4 pl-12 pr-5 rounded-xl border transition bg-white focus:outline-none text-base'
const inputStyle = { '--tw-ring-color': 'var(--theme-cta-from)', borderColor: 'var(--theme-cta-from)' }

function Shell({ children }) {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 md:p-10 text-center">
        <Link to="/" className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4" style={{ background: 'linear-gradient(135deg, var(--theme-from), var(--theme-via))' }}>
          <img src="/images/iskcon-logo.svg" alt="ISKCON logo" className="w-10 h-10" />
        </Link>
        {children}
      </div>
    </div>
  )
}

export function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await requestPasswordReset(email)
      navigate(`/reset-password?email=${encodeURIComponent(email)}`)
    } catch (err) {
      setError(err.message || 'Failed to send OTP')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Shell>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Forgot Password?</h1>
      <p className="text-gray-500 text-sm mb-7">
        Enter your account email and we'll send you a 6-digit OTP.
      </p>
      {error && (
        <div className="mb-5 px-4 py-3 rounded-xl text-sm font-medium bg-red-100 text-red-800 border border-red-200">{error}</div>
      )}
      <form onSubmit={handleSubmit} noValidate className="space-y-4 text-left">
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">✉️</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputBase}
            style={inputStyle}
            placeholder="you@example.com"
            required
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full text-white font-bold py-3.5 rounded-xl transition disabled:opacity-50 cursor-pointer hover:opacity-90"
          style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}
        >
          {submitting ? 'Sending...' : 'Send OTP'}
        </button>
      </form>
      <p className="text-sm text-gray-500 mt-6">
        <Link to="/login" className="font-semibold hover:underline" style={{ color: 'var(--theme-accent-text)' }}>
          ← Back to login
        </Link>
      </p>
    </Shell>
  )
}

export function ResetPasswordPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const email = params.get('email') || ''

  const [otp, setOtp] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [resending, setResending] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [error, setError] = useState(null)
  const [done, setDone] = useState(null)

  useEffect(() => {
    if (cooldown === 0) return
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [cooldown])

  function handleOtpChange(e) {
    setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (otp.length !== 6) {
      setError('Please enter the full 6-digit OTP')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    const pwErrors = getPasswordErrors(password)
    if (pwErrors.length > 0) {
      setError(`Password must contain: ${pwErrors.join(', ')}`)
      return
    }
    setSubmitting(true)
    setError(null)
    try {
      const data = await verifyOtpAndReset(email, otp, password)
      setDone(data.message || 'Password changed successfully')
    } catch (err) {
      setError(err.message || 'Failed to reset password')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleResend() {
    setResending(true)
    setError(null)
    try {
      await requestPasswordReset(email)
      setCooldown(60)
      setError(null)
    } catch (err) {
      setError(err.message || 'Failed to resend OTP')
    } finally {
      setResending(false)
    }
  }

  if (!email) {
    return (
      <Shell>
        <div className="text-4xl mb-3">😕</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Missing Email</h1>
        <p className="text-gray-500 text-sm mb-6">Start again from the forgot password page.</p>
        <button
          onClick={() => navigate('/forgot-password')}
          className="w-full text-white font-bold py-3.5 rounded-xl transition cursor-pointer hover:opacity-90"
          style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}
        >
          Go to Forgot Password
        </button>
      </Shell>
    )
  }

  if (done) {
    return (
      <Shell>
        <div className="text-4xl mb-3">✅</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Password Changed</h1>
        <p className="text-gray-500 text-sm mb-6">{done}</p>
        <button
          onClick={() => navigate('/login')}
          className="w-full text-white font-bold py-3.5 rounded-xl transition cursor-pointer hover:opacity-90"
          style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}
        >
          Go to Login
        </button>
      </Shell>
    )
  }

  return (
    <Shell>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Enter OTP</h1>
      <p className="text-gray-500 text-sm mb-6">
        We sent a 6-digit code to <strong>{email}</strong>.
        <br />
        It expires in 10 minutes.
      </p>

      {error && (
        <div className="mb-5 px-4 py-3 rounded-xl text-sm font-medium bg-red-100 text-red-800 border border-red-200 text-left">{error}</div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4 text-left">
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">🔢</span>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={otp}
            onChange={handleOtpChange}
            className={`${inputBase} text-center text-2xl tracking-[0.5em] font-bold`}
            style={inputStyle}
            placeholder="••••••"
            maxLength={6}
            required
          />
        </div>

        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${inputBase} pr-12`}
            style={inputStyle}
            placeholder="New password"
            required
          />
          <button
            type="button"
            tabIndex={-1}
            aria-label="Toggle password visibility"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm cursor-pointer"
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>

        <ul className="flex flex-wrap justify-center gap-x-3 gap-y-1">
          {PASSWORD_RULES.map((rule) => {
            const ok = rule.test(password)
            return (
              <li key={rule.key} className={`flex items-center gap-1 text-[11px] whitespace-nowrap ${ok ? 'text-green-600' : 'text-red-500'}`}>
                <span>{ok ? '✓' : '✕'}</span>
                {rule.label}
              </li>
            )
          })}
        </ul>

        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">🔐</span>
          <input
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={inputBase}
            style={inputStyle}
            placeholder="Confirm new password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full text-white font-bold py-3.5 rounded-xl transition disabled:opacity-50 cursor-pointer hover:opacity-90"
          style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}
        >
          {submitting ? 'Verifying...' : 'Verify & Change Password'}
        </button>
      </form>

      <p className="text-sm text-gray-500 mt-5">
        Didn't get the code?{' '}
        {cooldown > 0 ? (
          <span className="text-gray-400">Resend in {cooldown}s</span>
        ) : (
          <button onClick={handleResend} disabled={resending} className="font-semibold hover:underline cursor-pointer disabled:opacity-50" style={{ color: 'var(--theme-accent-text)' }}>
            {resending ? 'Resending...' : 'Resend OTP'}
          </button>
        )}
      </p>
    </Shell>
  )
}