import { useState } from 'react'
import { registerVolunteer } from '../../services/api'

const inputBase = 'w-full px-4 py-2.5 rounded-xl border transition bg-white focus:outline-none text-sm'
const inputStyle = { '--tw-ring-color': 'var(--theme-cta-from)', borderColor: 'var(--theme-cta-from)' }

const AREAS = [
  'Darshan Assistance',
  'Prasadam Distribution',
  'Decoration',
  'Crowd Management',
  'Kirtan / Cultural',
  'Anywhere needed',
]

const TIME_SLOTS = ['Full Day', 'Morning', 'Afternoon', 'Evening']

export default function VolunteerForm() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    preferredArea: '',
    timeSlot: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  function handleChange(e) {
    const { name, value } = e.target
    let next = value
    if (name === 'fullName') next = value.replace(/[^a-zA-Z\s]/g, '')
    if (name === 'phone') next = value.replace(/[^0-9]/g, '').slice(0, 10)
    if (name === 'age') next = value.replace(/[^0-9]/g, '').slice(0, 3)
    setForm((prev) => ({ ...prev, [name]: next }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    setSuccess(null)
    try {
      const data = await registerVolunteer({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        age: form.age ? Number(form.age) : undefined,
        gender: form.gender || undefined,
        preferredArea: form.preferredArea || undefined,
        timeSlot: form.timeSlot || undefined,
        message: form.message || undefined,
      })
      setSuccess(data.message || 'Thank you for volunteering!')
      setForm({ fullName: '', email: '', phone: '', age: '', gender: '', preferredArea: '', timeSlot: '', message: '' })
    } catch (err) {
      setError(err.message || 'Failed to submit')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto text-left bg-white/70 backdrop-blur-md border border-white/40 rounded-3xl shadow-2xl p-8 md:p-12">
      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl text-sm font-medium bg-red-100 text-red-800 border border-red-200">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 px-4 py-3 rounded-xl text-sm font-medium bg-green-100 text-green-800 border border-green-200">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate autoComplete="off" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
          <input name="fullName" type="text" value={form.fullName} onChange={handleChange} className={inputBase} style={inputStyle} placeholder="Your full name" required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone *</label>
          <input name="phone" type="tel" value={form.phone} onChange={handleChange} className={inputBase} style={inputStyle} placeholder="e.g. 9876543210" required />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} className={inputBase} style={inputStyle} placeholder="you@example.com" required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Age</label>
          <input name="age" type="text" inputMode="numeric" min="12" max="90" value={form.age} onChange={handleChange} className={inputBase} style={inputStyle} placeholder="e.g. 25" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Gender</label>
          <div className="relative">
            <select name="gender" value={form.gender} onChange={handleChange} className={`${inputBase} appearance-none pr-[45px] cursor-pointer`} style={inputStyle}>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-[17px]">
              <svg className="w-[18px] h-[18px] text-gray-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Preferred Service Area</label>
          <div className="relative">
            <select name="preferredArea" value={form.preferredArea} onChange={handleChange} className={`${inputBase} appearance-none pr-[45px] cursor-pointer`} style={inputStyle}>
              <option value="">Select</option>
              {AREAS.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-[17px]">
              <svg className="w-[18px] h-[18px] text-gray-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Availability</label>
          <div className="relative">
            <select name="timeSlot" value={form.timeSlot} onChange={handleChange} className={`${inputBase} appearance-none pr-[45px] cursor-pointer`} style={inputStyle}>
              <option value="">Select</option>
              {TIME_SLOTS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-[17px]">
              <svg className="w-[18px] h-[18px] text-gray-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message (optional)</label>
          <textarea name="message" rows="3" value={form.message} onChange={handleChange} className={`${inputBase} resize-none`} style={inputStyle} placeholder="Anything you'd like us to know"></textarea>
        </div>
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full text-white font-bold py-3 px-6 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed text-base cursor-pointer hover:opacity-90"
            style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}
          >
            {submitting ? 'Submitting...' : ' Volunteer for Janmashtami 🙏'}
          </button>
        </div>
      </form>
    </div>
  )
}