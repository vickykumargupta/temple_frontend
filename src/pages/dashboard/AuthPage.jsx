import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  loginAdmin,
  loginDevotee,
  signupAdmin,
  signupDevotee,
  setAuth,
} from '../../services/api'

const inputBase =
  'w-full py-4 pl-12 pr-5 rounded-xl border transition bg-white focus:outline-none text-base'

const inputStyle = {
  '--tw-ring-color': 'var(--theme-cta-from)',
  borderColor: 'var(--theme-cta-from)',
}

function Field({ icon, label, error, className = '', children }) {
  return (
    <div className={className}>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        <span
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          aria-hidden="true"
        >
          {icon}
        </span>
        {children}
      </div>
      {error && <p className="mt-1 text-xs font-medium text-red-500">{error}</p>}
    </div>
  )
}

export default function AuthPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [role, setRole] = useState('user')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    address: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  function switchMode(m) {
    setMode(m)
    setError(null)
    setMessage(null)
  }

  function switchRole(r) {
    setRole(r)
    setError(null)
    setMessage(null)
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    setMessage(null)
    try {
      if (mode === 'signup' && form.password !== form.confirmPassword) {
        throw new Error('Passwords do not match')
      }
      if (form.password.length < 6) {
        throw new Error('Password must be at least 6 characters')
      }
      if (mode === 'signup' && !form.fullName.trim()) {
        throw new Error('Please enter your full name')
      }
      if (mode === 'signup' && !form.phone.trim()) {
        throw new Error('Please enter your phone number')
      }

      const isAdmin = role === 'admin'
      let data

      if (mode === 'login') {
        data = isAdmin
          ? await loginAdmin(form.email, form.password)
          : await loginDevotee(form.email, form.password)
      } else {
        const payload = {
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          password: form.password,
        }
        data = isAdmin ? await signupAdmin(payload) : await signupDevotee(payload)
      }

      if (mode === 'signup' && isAdmin && data.pending) {
        setMode('login')
        setForm((prev) => ({ ...prev, password: '', confirmPassword: '' }))
        setError(null)
        setMessage(data.message || 'Your admin account has been submitted for approval.')
        return
      }

      setAuth({
        token: data.token,
        role: data.admin?.role || data.devotee?.role || role,
        email: data.admin?.email || data.devotee?.email,
        isSuperAdmin: data.admin?.isSuperAdmin || false,
      })
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const pwToggle = (onClick) => (
    <button
      type="button"
      onClick={onClick}
      tabIndex={-1}
      aria-label="Toggle password visibility"
      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition cursor-pointer"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {showPassword ? (
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

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-7xl grid md:grid-cols-2 min-h-[900px] rounded-3xl overflow-hidden shadow-2xl">
        <div
          className="hidden md:flex flex-col justify-between p-14 lg:p-20 text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, var(--theme-from), var(--theme-via), var(--theme-to))' }}
        >
          <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full opacity-20 blur-2xl" style={{ background: 'var(--theme-accent)' }}></div>
          <div className="absolute -bottom-20 -left-10 w-80 h-80 rounded-full opacity-15 blur-2xl" style={{ background: 'var(--theme-cta-to)' }}></div>

          <div className="relative">
            <div className="flex items-center gap-3 mb-12">
              <img src="/images/iskcon-logo.svg" alt="ISKCON logo" className="w-16 h-16" />
              <div>
                <p className="font-bold text-2xl leading-tight">ISKCON KR Puram</p>
                <p className="text-base" style={{ color: 'var(--theme-text-soft)' }}>Bangalore</p>
              </div>
            </div>
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Welcome to
              <br />
              Krishna Consciousness
            </h2>
            <p className="text-lg mb-10 max-w-md" style={{ color: 'var(--theme-text-soft)' }}>
              {mode === 'login'
                ? 'Sign in to access your dashboard, registrations and community updates.'
                : 'Create an account to register for events, join the forums and stay connected.'}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {['🙏 Janmashtami', '🎓 IYF', '🙏 BhaktiVriksha', '📿 Bhakti'].map((tag) => (
                <span
                  key={tag}
                  className="text-base px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <p className="relative text-base opacity-80">Hare Krishna Hare Krishna, Krishna Krishna Hare Hare</p>
        </div>

        <div
          className="p-10 md:p-14 lg:p-16 flex flex-col"
          style={{ background: 'linear-gradient(to bottom, var(--theme-soft-from), var(--theme-soft-to))' }}
        >
          <div className="flex items-center gap-2 mb-6 md:hidden">
            <img src="/images/iskcon-logo.svg" alt="ISKCON logo" className="w-9 h-9" />
            <p className="font-bold text-gray-800">ISKCON KR Puram</p>
          </div>

          <h1 className="text-4xl font-bold text-gray-800">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="text-lg text-gray-500 mb-8">
            {mode === 'login'
              ? 'Enter your details to sign in'
              : 'Join the ISKCON KR Puram community'}
          </p>

          <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-white/70 mb-7">
            {['login', 'signup'].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => switchMode(m)}
                className={`py-3.5 rounded-xl text-lg font-semibold transition cursor-pointer ${
                  mode === m ? 'text-white shadow' : 'text-gray-500 hover:text-gray-700'
                }`}
                style={mode === m ? { background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' } : undefined}
              >
                {m === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {mode === 'signup' && (
            <div className="flex items-center gap-3 mb-6">
              <span className="text-lg text-gray-500">Registering as</span>
              {['user', 'admin'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => switchRole(r)}
                  className={`px-6 py-2.5 rounded-full text-lg font-semibold border transition cursor-pointer ${
                    role === r
                      ? 'text-white border-transparent'
                      : 'text-gray-600 border-gray-300 bg-white hover:border-gray-400'
                  }`}
                  style={role === r ? { background: 'var(--theme-cta-from)' } : undefined}
                >
                  {r === 'user' ? 'User' : 'Admin'}
                </button>
              ))}
            </div>
          )}

          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl text-sm font-medium bg-red-100 text-red-800 border border-red-200 animate-fade-in">
              {error}
            </div>
          )}

          {message && (
            <div className="mb-5 px-4 py-3 rounded-xl text-sm font-medium bg-green-100 text-green-800 border border-green-200 animate-fade-in">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {mode === 'signup' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field icon={<span className="text-base">👤</span>} label="Full Name">
                  <input
                    name="fullName"
                    type="text"
                    value={form.fullName}
                    onChange={handleChange}
                    className={inputBase}
                    style={inputStyle}
                    placeholder="Enter your full name"
                  />
                </Field>

                <Field icon={<span className="text-base">📞</span>} label="Phone">
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className={inputBase}
                    style={inputStyle}
                    placeholder="Enter your phone number"
                  />
                </Field>

                <Field icon={<span className="text-base">✉️</span>} label="Email">
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className={inputBase}
                    style={inputStyle}
                    placeholder="you@example.com"
                  />
                </Field>

                <Field icon={<span className="text-base">🔒</span>} label="Password">
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange}
                    className={inputBase}
                    style={inputStyle}
                    placeholder="At least 6 characters"
                  />
                  {pwToggle(() => setShowPassword((v) => !v))}
                </Field>

                <Field icon={<span className="text-base">🔐</span>} label="Confirm Password" className="sm:col-span-2">
                  <input
                    name="confirmPassword"
                    type={showConfirm ? 'text' : 'password'}
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className={inputBase}
                    style={inputStyle}
                    placeholder="Re-enter your password"
                  />
                  {pwToggle(() => setShowConfirm((v) => !v))}
                </Field>

                {role === 'user' && (
                  <Field icon={<span className="text-base">📍</span>} label="Address" className="sm:col-span-2">
                    <input
                      name="address"
                      type="text"
                      value={form.address}
                      onChange={handleChange}
                      className={inputBase}
                      style={inputStyle}
                      placeholder="Enter your address"
                    />
                  </Field>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field icon={<span className="text-base">✉️</span>} label="Email">
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className={inputBase}
                    style={inputStyle}
                    placeholder="you@example.com"
                  />
                </Field>

                <Field icon={<span className="text-base">🔒</span>} label="Password">
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange}
                    className={inputBase}
                    style={inputStyle}
                    placeholder="At least 6 characters"
                  />
                  {pwToggle(() => setShowPassword((v) => !v))}
                </Field>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full text-white font-bold py-4 px-6 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed text-xl cursor-pointer hover:opacity-90 hover:scale-[1.01] active:scale-[0.99]"
              style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                  Please wait...
                </span>
              ) : mode === 'login' ? (
                'Sign In'
              ) : role === 'admin' ? (
                'Create Admin Account'
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <p className="text-center text-lg text-gray-500 mt-7">
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={() => switchMode(mode === 'login' ? 'signup' : 'login')}
              className="font-semibold transition cursor-pointer"
              style={{ color: 'var(--theme-accent-text)' }}
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>

          <div className="text-center text-xs mt-4">
            <p className="text-gray-400">
              By continuing, you agree to our{' '}
              <Link to="/terms" className="font-medium text-gray-600 hover:text-[var(--theme-cta-from)] hover:underline transition-colors">Terms</Link>
              {' '}and{' '}
              <Link to="/privacy-policy" className="font-medium text-gray-600 hover:text-[var(--theme-cta-from)] hover:underline transition-colors">Privacy Policy</Link>.
            </p>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            <Link to="/" className="hover:underline">← Back to home</Link>
          </p>
        </div>
      </div>
    </div>
  )
}