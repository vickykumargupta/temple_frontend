import { useState, useRef } from 'react'
import { registerDevotee, getAuth } from '../services/api'
import { sanitizeAndAutofillEmail } from '../utils/emailSanitizer'
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
  const auth = getAuth()
  const email = auth?.role === 'admin' ? '' : (auth?.email || '')
  const [form, setForm] = useState({ ...initialForm, email })
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState(null)
  const [toast, setToast] = useState(null)

  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const phoneRef = useRef(null)
  const familyMembersRef = useRef(null)
  const addressRef = useRef(null)
  const specialRequirementsRef = useRef(null)

  function handleChange(e) {
    const { name, value } = e.target
    let next = value
    if (name === 'fullName') next = value.replace(/[^a-zA-Z\s]/g, '')
    if (name === 'phone') next = value.replace(/[^0-9]/g, '').slice(0, 10)
    if (name === 'familyMembers') {
      let numVal = value.replace(/[^0-9]/g, '').slice(0, 2)
      if (numVal !== '' && Number(numVal) > 15) {
        numVal = '15'
      }
      next = numVal
    }
    setForm((prev) => ({ ...prev, [name]: next }))
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  function validate() {
    if (!form.fullName.trim()) return { field: 'fullName', message: 'Full name is required' }
    if (!form.email.trim()) return { field: 'email', message: 'Email is required' }
    if (!emailRe.test(form.email)) return { field: 'email', message: 'Please enter a valid email address' }
    if (!form.phone) return { field: 'phone', message: 'Phone number is required' }
    if (form.phone.length !== 10) return { field: 'phone', message: 'Phone number must be exactly 10 digits' }
    if (!/^[6-9]/.test(form.phone)) return { field: 'phone', message: 'Phone number must start with 6-9' }
    const fam = Number(form.familyMembers)
    if (!form.familyMembers || fam < 1 || fam > 15) return { field: 'familyMembers', message: 'Number of family members must be between 1 and 15' }
    return null
  }

  async function handleSubmit(e) {
    if (e) e.preventDefault()
    const validationError = validate()
    if (validationError) {
      setMessage({ type: 'error', text: validationError.message })
      setToast({ type: 'error', text: validationError.message })
      setTimeout(() => setToast(null), 6000)
      
      // Focus the invalid field!
      if (validationError.field === 'fullName') nameRef.current?.focus()
      else if (validationError.field === 'email') emailRef.current?.focus()
      else if (validationError.field === 'phone') phoneRef.current?.focus()
      else if (validationError.field === 'familyMembers') familyMembersRef.current?.focus()
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

  const inputClass = 'w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 transition bg-white'
  const labelClass = 'block text-sm font-semibold text-gray-700 mb-1'
  const inputStyle = { '--tw-ring-color': 'var(--theme-cta-from)', '--tw-border-opacity': 1, borderColor: 'var(--theme-cta-from)' }

  return (
    <div className="max-w-3xl mx-auto text-left bg-white/70 backdrop-blur-md border border-white/40 rounded-3xl shadow-2xl p-8 md:p-12">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
        Devotee Registration
      </h2>

      <Toast type={toast?.type} message={toast?.text} program="Janmashtami" onClose={() => setToast(null)} />

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

      <form onSubmit={handleSubmit} autoComplete="off" className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="fullName" className={labelClass}>Full Name *</label>
            <input
              ref={nameRef}
              id="fullName"
              name="fullName"
              type="text"
              required
              value={form.fullName}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  emailRef.current?.focus()
                }
              }}
              className={inputClass}
              style={inputStyle}
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>Email *</label>
            <input
              ref={emailRef}
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  const val = e.target.value
                  const nextEmail = sanitizeAndAutofillEmail(val)
                  setForm((prev) => ({ ...prev, email: nextEmail }))
                  phoneRef.current?.focus()
                }
              }}
              onBlur={(e) => {
                const val = e.target.value
                const nextEmail = sanitizeAndAutofillEmail(val)
                setForm((prev) => ({ ...prev, email: nextEmail }))
              }}
              className={inputClass}
              style={inputStyle}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>Phone *</label>
            <input
              ref={phoneRef}
              id="phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              maxLength="10"
              pattern="[6-9][0-9]{9}"
              title="10-digit mobile number starting with 6-9"
              required
              value={form.phone}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  familyMembersRef.current?.focus()
                }
              }}
              className={inputClass}
              style={inputStyle}
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label htmlFor="familyMembers" className={labelClass}>Number of Family Members *</label>
            <input
              ref={familyMembersRef}
              id="familyMembers"
              name="familyMembers"
              type="text"
              inputMode="numeric"
              min="1"
              max="50"
              required
              value={form.familyMembers}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  addressRef.current?.focus()
                }
              }}
              className={inputClass}
              style={inputStyle}
              placeholder="family members"
            />
          </div>
        </div>

        <div>
          <label htmlFor="address" className={labelClass}>Address</label>
          <textarea
            ref={addressRef}
            id="address"
            name="address"
            rows="2"
            value={form.address}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                specialRequirementsRef.current?.focus()
              }
            }}
            className={inputClass}
            style={inputStyle}
            placeholder="Enter your address"
          />
        </div>

        <div>
          <label htmlFor="specialRequirements" className={labelClass}>Special Requirements</label>
          <textarea
            ref={specialRequirementsRef}
            id="specialRequirements"
            name="specialRequirements"
            rows="2"
            value={form.specialRequirements}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleSubmit(e)
              }
            }}
            className={inputClass}
            style={inputStyle}
            placeholder="Any specific requirements (dietary, accessibility, etc.)"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full text-white font-bold py-3 px-6 rounded-xl hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed text-lg cursor-pointer"
          style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))', '--tw-ring-color': 'var(--theme-cta-from)' }}
        >
          {submitting ? 'Submitting...' : 'Register for Janmashtami'}
        </button>
      </form>
    </div>
  )
}

export default RegistrationForm
