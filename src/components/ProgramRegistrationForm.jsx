import { useState, useRef } from 'react'
import { sanitizeAndAutofillEmail } from '../utils/emailSanitizer'
import Toast from './Toast'

function ProgramRegistrationForm({ title, program, registerFn, fields, intro }) {
  const initialForm = Object.fromEntries(fields.map((f) => [f.name, f.defaultValue ?? '']))
  const emptyForm = Object.fromEntries(fields.map((f) => [f.name, '']))
  const [form, setForm] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState(null)
  const [toast, setToast] = useState(null)

  const inputRefs = useRef({})

  function handleChange(e) {
    const { name, value } = e.target
    const field = fields.find((f) => f.name === name)
    let next = value
    const letterOnlyFields = ['fullName', 'spouseName', 'occupation', 'interests', 'college', 'course']
    if (letterOnlyFields.includes(name)) {
      next = value.replace(/[^a-zA-Z\s]/g, '')
    }
    if (name === 'familyMembers') {
      let numVal = value.replace(/[^0-9]/g, '').slice(0, 2)
      if (numVal !== '' && Number(numVal) > 15) {
        numVal = '15'
      }
      next = numVal
    } else if (name === 'age') {
      let numVal = value.replace(/[^0-9]/g, '').slice(0, 3)
      if (numVal !== '' && Number(numVal) > 108) {
        numVal = '108'
      }
      next = numVal
    } else {
      if (field?.type === 'tel') next = value.replace(/[^0-9]/g, '').slice(0, 10)
      if (field?.type === 'number') next = value.replace(/[^0-9]/g, '').slice(0, 3)
    }
    setForm((prev) => ({ ...prev, [name]: next }))
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  function validate() {
    for (const field of fields) {
      const value = form[field.name]
      if (field.required && (!value || !value.trim())) {
        return { field: field.name, message: `${field.label} is required` }
      }
      if (value && field.type === 'email' && !emailRe.test(value)) {
        return { field: field.name, message: 'Please enter a valid email address' }
      }
      if (value && field.type === 'tel') {
        if (value.length !== 10) return { field: field.name, message: 'Phone number must be exactly 10 digits' }
        if (!/^[6-9]/.test(value)) return { field: field.name, message: 'Phone number must start with 6-9' }
      }
      if (value && field.type === 'number') {
        const n = Number(value)
        const maxVal = field.name === 'familyMembers' ? 15 : (field.name === 'age' ? 108 : 150)
        if (!value || value === '0') return { field: field.name, message: `${field.label} must be a valid number` }
        if (n < 1 || n > maxVal) return { field: field.name, message: `${field.label} must be between 1 and ${maxVal}` }
      }
    }
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
      inputRefs.current[validationError.field]?.focus()
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

  const inputClass = 'w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 transition bg-white'
  const labelClass = 'block text-sm font-semibold text-gray-700 mb-1'

  const handleKeyDown = (e, index, field) => {
    if (e.key === 'Enter') {
      e.preventDefault()

      if (field.type === 'email') {
        const val = e.target.value
        const nextEmail = sanitizeAndAutofillEmail(val)
        setForm((prev) => ({ ...prev, [field.name]: nextEmail }))
      }

      const nextField = fields[index + 1]
      if (nextField) {
        inputRefs.current[nextField.name]?.focus()
      } else {
        handleSubmit(e)
      }
    }
  }

  const handleEmailBlur = (e, fieldName) => {
    const val = e.target.value
    const nextEmail = sanitizeAndAutofillEmail(val)
    setForm((prev) => ({ ...prev, [fieldName]: nextEmail }))
  }

  return (
    <div className="max-w-3xl mx-auto text-left bg-white/70 backdrop-blur-md border border-white/40 rounded-3xl shadow-2xl p-8 md:p-12">
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
          {fields.map((field, idx) => (
            <div key={field.name} className={field.fullWidth ? 'md:col-span-2' : ''}>
              <label htmlFor={field.name} className={labelClass}>
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              {field.type === 'select' ? (
                <div className="relative">
                  <select
                    ref={(el) => (inputRefs.current[field.name] = el)}
                    id={field.name}
                    name={field.name}
                    required={field.required}
                    value={form[field.name]}
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e, idx, field)}
                    className={`${inputClass} appearance-none pr-[45px] cursor-pointer`}
                    style={{ '--tw-ring-color': 'var(--theme-cta-from)', borderColor: 'var(--theme-cta-from)' }}
                  >
                    <option value="">{field.placeholder || `Select ${field.label}`}</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-[17px]">
                    <svg
                      className="w-[18px] h-[18px] text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              ) : field.type === 'textarea' ? (
                <textarea
                  ref={(el) => (inputRefs.current[field.name] = el)}
                  id={field.name}
                  name={field.name}
                  rows="2"
                  value={form[field.name]}
                  onChange={handleChange}
                  onKeyDown={(e) => handleKeyDown(e, idx, field)}
                  className={inputClass}
                  style={{ '--tw-ring-color': 'var(--theme-cta-from)', '--tw-border-opacity': 1, borderColor: 'var(--theme-cta-from)' }}
                  placeholder={field.placeholder}
                />
              ) : (
                <input
                  ref={(el) => (inputRefs.current[field.name] = el)}
                  id={field.name}
                  name={field.name}
                  type={field.type === 'number' ? 'text' : (field.type || 'text')}
                  required={field.required}
                  min={field.type === 'number' ? 1 : undefined}
                  inputMode={field.type === 'tel' || field.type === 'number' ? 'numeric' : undefined}
                  maxLength={
                    field.type === 'tel'
                      ? 10
                      : field.name === 'familyMembers'
                      ? 2
                      : field.type === 'number'
                      ? 3
                      : undefined
                  }
                  pattern={field.type === 'tel' ? '[6-9][0-9]{9}' : undefined}
                  title={field.type === 'tel' ? '10-digit mobile number starting with 6-9' : undefined}
                  value={form[field.name]}
                  onChange={handleChange}
                  onKeyDown={(e) => handleKeyDown(e, idx, field)}
                  onBlur={(e) => {
                    if (field.type === 'email') {
                      handleEmailBlur(e, field.name)
                    }
                  }}
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
          className="w-full text-white font-bold py-3 px-6 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed text-lg cursor-pointer"
          style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}
        >
          {submitting ? 'Submitting...' : `Register for ${program}`}
        </button>
      </form>
    </div>
  )
}

export default ProgramRegistrationForm
