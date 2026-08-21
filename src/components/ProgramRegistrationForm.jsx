import { useState } from 'react'
import Toast from './Toast'

function ProgramRegistrationForm({ title, program, registerFn, fields, intro }) {
  const initialForm = Object.fromEntries(fields.map((f) => [f.name, f.defaultValue ?? '']))
  const emptyForm = Object.fromEntries(fields.map((f) => [f.name, '']))
  const [form, setForm] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState(null)
  const [toast, setToast] = useState(null)

  function handleChange(e) {
    const { name, value } = e.target
    const field = fields.find((f) => f.name === name)
    let next = value
    if (field?.type === 'tel') next = value.replace(/[^0-9]/g, '').slice(0, 10)
    if (field?.type === 'number') next = value.replace(/[^0-9]/g, '').slice(0, 3)
    setForm((prev) => ({ ...prev, [name]: next }))
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  function validate() {
    for (const field of fields) {
      const value = form[field.name]
      if (field.required && (!value || !value.trim())) {
        return `${field.label} is required`
      }
      if (value && field.type === 'email' && !emailRe.test(value)) {
        return 'Please enter a valid email address'
      }
      if (value && field.type === 'tel') {
        if (value.length !== 10) return 'Phone number must be exactly 10 digits'
        if (!/^[6-9]/.test(value)) return 'Phone number must start with 6-9'
      }
      if (value && field.type === 'number') {
        const n = Number(value)
        if (!value || value === '0') return `${field.label} must be a valid number`
        if (n < 1 || n > 150) return `${field.label} must be a valid number`
      }
    }
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
      const payload = {}
      for (const field of fields) {
        const value = form[field.name]
        if (value === '' || value == null) continue
        payload[field.name] = field.type === 'number' ? Number(value) : value
      }
      const data = await registerFn(payload)
      setToast({ type: 'success', text: data.message || `${program} registration successful!` })
      setMessage(null)
      setForm(emptyForm)
      setTimeout(() => setToast(null), 4000)
    } catch (err) {
      setToast({ type: 'error', text: err.message || 'Something went wrong. Please try again.' })
      setMessage({ type: 'error', text: err.message || 'Something went wrong. Please try again.' })
      setTimeout(() => setToast(null), 6000)
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition bg-white'
  const labelClass = 'block text-sm font-semibold text-gray-700 mb-1'

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
        {title}
      </h2>
      {intro && <p className="text-sm text-gray-500 text-center mb-6">{intro}</p>}

      <Toast type={toast?.type} message={toast?.text} program={program} onClose={() => setToast(null)} />

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
          {fields.map((field) => (
            <div key={field.name} className={field.fullWidth ? 'md:col-span-2' : ''}>
              <label htmlFor={field.name} className={labelClass}>
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              {field.type === 'select' ? (
                <select
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  value={form[field.name]}
                  onChange={handleChange}
                  className={`${inputClass} cursor-pointer`}
                  style={{ '--tw-ring-color': 'var(--theme-cta-from)', borderColor: 'var(--theme-cta-from)' }}
                >
                  <option value="">{field.placeholder || `Select ${field.label}`}</option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  rows="2"
                  value={form[field.name]}
                  onChange={handleChange}
                  className={inputClass}
                  style={{ '--tw-ring-color': 'var(--theme-cta-from)', '--tw-border-opacity': 1, borderColor: 'var(--theme-cta-from)' }}
                  placeholder={field.placeholder}
                />
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type || 'text'}
                  required={field.required}
                  min={field.type === 'number' ? 1 : undefined}
                  inputMode={field.type === 'tel' || field.type === 'number' ? 'numeric' : undefined}
                  maxLength={field.type === 'tel' ? 10 : undefined}
                  pattern={field.type === 'tel' ? '[6-9][0-9]{9}' : undefined}
                  title={field.type === 'tel' ? '10-digit mobile number starting with 6-9' : undefined}
                  value={form[field.name]}
                  onChange={handleChange}
                  className={inputClass}
                  style={{ '--tw-ring-color': 'var(--theme-cta-from)', borderColor: 'var(--theme-cta-from)' }}
                  placeholder={field.placeholder}
                />
              )}
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full text-white font-bold py-3 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed text-lg cursor-pointer"
          style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}
        >
          {submitting ? 'Submitting...' : `Register for ${program}`}
        </button>
      </form>
    </div>
  )
}

export default ProgramRegistrationForm
