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
    setForm((prev) => ({ ...prev, [name]: value }))
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
    <div className="max-w-3xl mx-auto text-left bg-white rounded-2xl shadow-lg p-6 md:p-8">
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
          <input name="age" type="number" min="12" max="90" value={form.age} onChange={handleChange} className={inputBase} style={inputStyle} placeholder="e.g. 25" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Gender</label>
          <select name="gender" value={form.gender} onChange={handleChange} className={`${inputBase} cursor-pointer`} style={inputStyle}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Preferred Service Area</label>
          <select name="preferredArea" value={form.preferredArea} onChange={handleChange} className={`${inputBase} cursor-pointer`} style={inputStyle}>
            <option value="">Select</option>
            {AREAS.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Availability</label>
          <select name="timeSlot" value={form.timeSlot} onChange={handleChange} className={`${inputBase} cursor-pointer`} style={inputStyle}>
            <option value="">Select</option>
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
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