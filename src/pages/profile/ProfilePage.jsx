import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, getMyProfile, updateMyProfile, changeMyPassword } from '../../services/api'
import { PASSWORD_RULES, getPasswordErrors } from '../../utils/passwordValidation'

const inputBase = 'w-full px-4 py-2.5 rounded-xl border transition bg-white focus:outline-none text-sm'
const inputStyle = { '--tw-ring-color': 'var(--theme-cta-from)', borderColor: 'var(--theme-cta-from)' }

function initials(name) {
  return (name || '?')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')
}

export default function ProfilePage() {
  const navigate = useNavigate()
  const auth = getAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({})
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [pwOpen, setPwOpen] = useState(false)
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [showPw, setShowPw] = useState(false)
  const [pwSaving, setPwSaving] = useState(false)
  const [pwError, setPwError] = useState(null)
  const [pwSuccess, setPwSuccess] = useState(null)
  const [fieldErrors, setFieldErrors] = useState({})

  useEffect(() => {
    if (!auth) {
      navigate('/login', { replace: true })
      return
    }
    getMyProfile()
      .then((data) => {
        setProfile(data.profile)
        setForm({
          phone: data.profile.phone || '',
          address: data.profile.address || '',
          city: data.profile.city || '',
          state: data.profile.state || '',
          pincode: data.profile.pincode || '',
        })
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function validateField(name, value) {
    if (name === 'phone') {
      if (!value.trim()) return 'Phone is required'
      if (!/^[6-9]\d{0,9}$/.test(value.trim())) return 'Phone must start with 6-9 and contain only digits'
      if (value.trim().length < 10) return 'Phone must be 10 digits'
      return null
    }
    if (name === 'pincode') {
      if (!value.trim()) return 'Pincode is required'
      if (!/^\d{0,6}$/.test(value.trim())) return 'Pincode must contain only digits'
      if (value.trim().length < 6) return 'Pincode must be 6 digits'
      return null
    }
    return null
  }

  function handleChange(e) {
    const { name, value } = e.target
    let filtered = value
    if (name === 'pincode') filtered = value.replace(/\D/g, '').slice(0, 6)
    if (name === 'phone') filtered = value.replace(/\D/g, '').slice(0, 10)
    setForm((prev) => ({ ...prev, [name]: filtered }))
    const err = validateField(name, filtered)
    setFieldErrors((prev) => ({ ...prev, [name]: err }))
  }

  function validateProfile() {
    const errs = {}
    if (!form.phone?.trim()) errs.phone = 'Phone is required'
    else if (!/^[6-9]\d{9}$/.test(form.phone.trim())) errs.phone = 'Enter a valid 10-digit phone number starting with 6-9'
    if (!form.address?.trim()) errs.address = 'Address is required'
    else if (form.address.trim().length > 500) errs.address = 'Address must be under 500 characters'
    if (!form.city?.trim()) errs.city = 'City is required'
    else if (form.city.trim().length > 100) errs.city = 'City must be under 100 characters'
    if (!form.state?.trim()) errs.state = 'State is required'
    else if (form.state.trim().length > 100) errs.state = 'State must be under 100 characters'
    if (!form.pincode?.trim()) errs.pincode = 'Pincode is required'
    else if (!/^\d{6}$/.test(form.pincode.trim())) errs.pincode = 'Enter a valid 6-digit pincode'
    return errs
  }

  async function handleSave(e) {
    e.preventDefault()
    const errs = validateProfile()
    setFieldErrors(errs)
    if (Object.keys(errs).length > 0) return
    setSaving(true)
    setError(null)
    setSuccess(null)
    try {
      const data = await updateMyProfile(form)
      setProfile(data.profile)
      setEditing(false)
      setSuccess('Profile updated successfully')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  function handlePwChange(e) {
    const { name, value } = e.target
    setPwForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handlePwSubmit(e) {
    e.preventDefault()
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      setPwError('New passwords do not match')
      return
    }
    const errs = getPasswordErrors(pwForm.newPassword)
    if (errs.length > 0) {
      setPwError(`Password must contain: ${errs.join(', ')}`)
      return
    }
    setPwSaving(true)
    setPwError(null)
    try {
      const data = await changeMyPassword(pwForm.currentPassword, pwForm.newPassword)
      setPwSuccess(data.message || 'Password changed successfully')
      setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setTimeout(() => {
        setPwSuccess(null)
        setPwOpen(false)
      }, 2500)
    } catch (err) {
      setPwError(err.message)
    } finally {
      setPwSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <p className="text-red-600 font-semibold">{error || 'Profile not found'}</p>
      </div>
    )
  }

  const roleBadge =
    profile.role === 'admin'
      ? profile.isSuperAdmin
        ? 'Super Admin'
        : 'Admin'
      : 'Devotee'

  return (
    <div className="py-12 min-h-[70vh]">
      <div className="max-w-2xl mx-auto px-4 md:px-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div
            className="px-6 md:px-8 py-8 text-white relative"
            style={{ background: 'linear-gradient(135deg, var(--theme-from), var(--theme-via), var(--theme-to))' }}
          >
            <div className="flex items-center gap-4">
              <span className="w-16 h-16 rounded-full bg-white/25 backdrop-blur-sm border border-white/40 flex items-center justify-center text-xl font-extrabold">
                {initials(profile.fullName)}
              </span>
              <div>
                <h1 className="text-xl md:text-2xl font-bold">{profile.fullName}</h1>
                <p className="text-sm opacity-90">{profile.email}</p>
                <span className="inline-block mt-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/25 border border-white/30">
                  {roleBadge}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {error && <p className="mb-4 px-4 py-3 rounded-xl text-sm bg-red-100 text-red-800">{error}</p>}
            {success && <p className="mb-4 px-4 py-3 rounded-xl text-sm bg-green-100 text-green-800">{success}</p>}

            {!editing ? (
              <>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                  <div>
                    <dt className="text-gray-400 font-semibold uppercase text-[11px] tracking-wider">Phone</dt>
                    <dd className="text-gray-800 font-medium mt-0.5">{profile.phone || '—'}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400 font-semibold uppercase text-[11px] tracking-wider">Address</dt>
                    <dd className="text-gray-800 font-medium mt-0.5">{profile.address || '—'}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400 font-semibold uppercase text-[11px] tracking-wider">City</dt>
                    <dd className="text-gray-800 font-medium mt-0.5">{profile.city || '—'}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400 font-semibold uppercase text-[11px] tracking-wider">State</dt>
                    <dd className="text-gray-800 font-medium mt-0.5">{profile.state || '—'}</dd>
                  </div>
                  {profile.role === 'devotee' && (
                    <div>
                      <dt className="text-gray-400 font-semibold uppercase text-[11px] tracking-wider">Family Members</dt>
                      <dd className="text-gray-800 font-medium mt-0.5">{profile.familyMembers ?? '—'}</dd>
                    </div>
                  )}
                </dl>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => setEditing(true)}
                    className="text-white font-bold py-3 rounded-xl transition cursor-pointer hover:opacity-90"
                    style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={() => { setPwOpen((v) => !v); setPwError(null); setPwSuccess(null) }}
                    className="font-bold py-3 rounded-xl transition cursor-pointer border hover:bg-gray-50"
                    style={{ borderColor: 'var(--theme-cta-from)', color: 'var(--theme-accent-text)' }}
                  >
                    {pwOpen ? 'Hide Change Password' : 'Change Password'}
                  </button>
                </div>

                {pwOpen && (
                  <form onSubmit={handlePwSubmit} noValidate className="mt-6 p-5 rounded-2xl border border-gray-100 bg-gray-50 space-y-4">
                    <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider">Change Password</h3>

                    {pwError && <p className="px-4 py-2.5 rounded-xl text-sm bg-red-100 text-red-800">{pwError}</p>}
                    {pwSuccess && <p className="px-4 py-2.5 rounded-xl text-sm bg-green-100 text-green-800">{pwSuccess}</p>}

                    <div className="relative">
                      <input
                        name="currentPassword"
                        type={showPw ? 'text' : 'password'}
                        value={pwForm.currentPassword}
                        onChange={handlePwChange}
                        className={inputBase}
                        style={inputStyle}
                        placeholder="Current password"
                        required
                      />
                    </div>
                    <div className="relative">
                      <input
                        name="newPassword"
                        type={showPw ? 'text' : 'password'}
                        value={pwForm.newPassword}
                        onChange={handlePwChange}
                        className={`${inputBase} pr-12`}
                        style={inputStyle}
                        placeholder="New password"
                        required
                      />
                      <button type="button" tabIndex={-1} onClick={() => setShowPw((v) => !v)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm cursor-pointer" aria-label="Toggle visibility">
                        {showPw ? '🙈' : '👁️'}
                      </button>
                    </div>
                    <ul className="flex flex-wrap gap-x-3 gap-y-1">
                      {PASSWORD_RULES.map((rule) => {
                        const ok = rule.test(pwForm.newPassword)
                        return (
                          <li key={rule.key} className={`flex items-center gap-1 text-[11px] whitespace-nowrap ${ok ? 'text-green-600' : 'text-red-500'}`}>
                            <span>{ok ? '✓' : '✕'}</span>{rule.label}
                          </li>
                        )
                      })}
                    </ul>
                    <div>
                      <input
                        name="confirmPassword"
                        type={showPw ? 'text' : 'password'}
                        value={pwForm.confirmPassword}
                        onChange={handlePwChange}
                        className={inputBase}
                        style={inputStyle}
                        placeholder="Confirm new password"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={pwSaving}
                      className="w-full text-white font-bold py-3 rounded-xl transition disabled:opacity-50 cursor-pointer hover:opacity-90"
                      style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}
                    >
                      {pwSaving ? 'Changing...' : 'Change Password'}
                    </button>
                  </form>
                )}
              </>
            ) : (
              <form onSubmit={handleSave} noValidate className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone <span className="text-red-500">*</span></label>
                  <input name="phone" type="tel" inputMode="numeric" pattern="[0-9]*" value={form.phone} onChange={handleChange} maxLength={10} required className={`${inputBase} ${fieldErrors.phone ? 'border-red-500 focus:outline-none ring-2 ring-red-300' : ''}`} style={fieldErrors.phone ? {} : inputStyle} />
                  {fieldErrors.phone && <p className="mt-1 text-xs text-red-600">{fieldErrors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">City <span className="text-red-500">*</span></label>
                  <input name="city" type="text" value={form.city} onChange={handleChange} maxLength={100} required className={`${inputBase} ${fieldErrors.city ? 'border-red-500 focus:outline-none ring-2 ring-red-300' : ''}`} style={fieldErrors.city ? {} : inputStyle} />
                  {fieldErrors.city && <p className="mt-1 text-xs text-red-600">{fieldErrors.city}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Address <span className="text-red-500">*</span></label>
                  <input name="address" type="text" value={form.address} onChange={handleChange} maxLength={500} required className={`${inputBase} ${fieldErrors.address ? 'border-red-500 focus:outline-none ring-2 ring-red-300' : ''}`} style={fieldErrors.address ? {} : inputStyle} />
                  {fieldErrors.address && <p className="mt-1 text-xs text-red-600">{fieldErrors.address}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">State <span className="text-red-500">*</span></label>
                  <input name="state" type="text" value={form.state} onChange={handleChange} maxLength={100} required className={`${inputBase} ${fieldErrors.state ? 'border-red-500 focus:outline-none ring-2 ring-red-300' : ''}`} style={fieldErrors.state ? {} : inputStyle} />
                  {fieldErrors.state && <p className="mt-1 text-xs text-red-600">{fieldErrors.state}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Pincode <span className="text-red-500">*</span></label>
                  <input name="pincode" type="tel" inputMode="numeric" pattern="[0-9]*" value={form.pincode} onChange={handleChange} maxLength={6} required className={`${inputBase} ${fieldErrors.pincode ? 'border-red-500 focus:outline-none ring-2 ring-red-300' : ''}`} style={fieldErrors.pincode ? {} : inputStyle} />
                  {fieldErrors.pincode && <p className="mt-1 text-xs text-red-600">{fieldErrors.pincode}</p>}
                </div>
                <div className="sm:col-span-2 flex gap-3">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 text-white font-bold py-3 rounded-xl transition disabled:opacity-50 cursor-pointer hover:opacity-90"
                    style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="px-6 py-3 rounded-xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}