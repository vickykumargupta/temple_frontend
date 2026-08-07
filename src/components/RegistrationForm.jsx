import { useState } from 'react'
import { registerDevotee, getAuth } from '../services/api'
import Toast from './Toast'

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  familyMembers: 1,
  specialRequirements: '',
}

function RegistrationForm() {
  const email = getAuth()?.email || ''
  const [form, setForm] = useState({ ...initialForm, email })
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState(null)
  const [toast, setToast] = useState(null)

  function handleChange(e) {
    const { name, value } = e.target
    let next = value
    if (name === 'phone') next = value.replace(/[^0-9]/g, '').slice(0, 10)
    if (name === 'familyMembers') next = value.replace(/[^0-9]/g, '').slice(0, 2)
    setForm((prev) => ({ ...prev, [name]: next }))
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  function validate() {
    if (!form.fullName.trim()) return 'Full name is required'
    if (!form.phone) return 'Phone number is required'
    if (form.phone.length !== 10) return 'Phone number must be exactly 10 digits'
    if (!/^[6-9]/.test(form.phone)) return 'Phone number must start with 6-9'
    if (!form.email.trim()) return 'Email is required'
    if (!emailRe.test(form.email)) return 'Please enter a valid email address'
    const fam = Number(form.familyMembers)
    if (!form.familyMembers || fam < 1 || fam > 50) return 'Number of family members must be between 1 and 50'
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const validationError = validate()
    if (validationError) {
      setMessage({ type: 'error', text: validationError })
      setToast({ type: 'error', text: validationError })
      setTimeout(() => setToast(null), 6000)
      return
    }
    setSubmitting(true)
    setMessage(null)
    try {
      const payload = {
        ...form,
        familyMembers: form.familyMembers === '' ? undefined : Number(form.familyMembers),
      }
      const data = await registerDevotee(payload)
      setToast({ type: 'success', text: data.message || 'Registration successful!' })
      setMessage(null)
      setForm(initialForm)
      setTimeout(() => setToast(null), 4000)
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Something went wrong. Please try again.' })
      setToast({ type: 'error', text: err.message || 'Something went wrong. Please try again.' })
      setTimeout(() => setToast(null), 6000)
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition bg-white'
  const labelClass = 'block text-sm font-semibold text-gray-700 mb-1'
  const inputStyle = { '--tw-ring-color': 'var(--theme-cta-from)', '--tw-border-opacity': 1, borderColor: 'var(--theme-cta-from)' }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
        Devotee Registration
      </h2>

      <Toast type={toast?.type} message={toast?.text} onClose={() => setToast(null)} />

      {message && (
        <div
          className={`mb-6 px-4 py-3 rounded-lg text-center font-medium ${
            message.type === 'success'
              ? 'bg-green-100 text-green-800 border border-green-200'
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="fullName" className={labelClass}>Full Name *</label>
            <input id="fullName" name="fullName" type="text" required value={form.fullName} onChange={handleChange} className={inputClass} style={inputStyle} placeholder="Enter your full name" />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>Email *</label>
            <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className={inputClass} style={inputStyle} placeholder="Enter your email" />
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>Phone *</label>
            <input id="phone" name="phone" type="tel" inputMode="numeric" maxLength="10" pattern="[6-9][0-9]{9}" title="10-digit mobile number starting with 6-9" required value={form.phone} onChange={handleChange} className={inputClass} style={inputStyle} placeholder="Enter your phone number" />
          </div>
          <div>
            <label htmlFor="familyMembers" className={labelClass}>Number of Family Members *</label>
            <input id="familyMembers" name="familyMembers" type="number" inputMode="numeric" min="1" max="50" required value={form.familyMembers} onChange={handleChange} className={inputClass} style={inputStyle} />
          </div>
        </div>

        <div>
          <label htmlFor="address" className={labelClass}>Address</label>
          <textarea id="address" name="address" rows="2" value={form.address} onChange={handleChange} className={inputClass} style={inputStyle} placeholder="Enter your address" />
        </div>

        <div>
          <label htmlFor="specialRequirements" className={labelClass}>Special Requirements</label>
          <textarea id="specialRequirements" name="specialRequirements" rows="2" value={form.specialRequirements} onChange={handleChange} className={inputClass} style={inputStyle} placeholder="Any specific requirements (dietary, accessibility, etc.)" />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed text-lg cursor-pointer"
          style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))', '--tw-ring-color': 'var(--theme-cta-from)' }}
        >
          {submitting ? 'Submitting...' : 'Register for Janmashtami'}
        </button>
      </form>
    </div>
  )
}

export default RegistrationForm
