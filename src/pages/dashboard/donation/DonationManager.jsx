import { useState } from 'react'
import { createDonation } from '../../../services/api'

const inputBase =
  'w-full px-4 py-2.5 rounded-xl border transition bg-white focus:outline-none text-sm'
const inputStyle = {
  '--tw-ring-color': 'var(--theme-cta-from)',
  borderColor: 'var(--theme-cta-from)',
}

export default function DonationManager({ onRecorded }) {
  const [form, setForm] = useState({ donorName: '', email: '', amount: '', message: '' })
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
      const data = await createDonation({
        donorName: form.donorName,
        email: form.email || undefined,
        amount: Number(form.amount),
        message: form.message || undefined,
      })
      setSuccess(`Donation of ₹${Number(form.amount).toLocaleString('en-IN')} from ${form.donorName} recorded`)
      setForm({ donorName: '', email: '', amount: '', message: '' })
      onRecorded?.()
    } catch (err) {
      setError(err.message || 'Failed to record donation')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="rounded-2xl p-6 shadow-lg"
      style={{ background: 'linear-gradient(to bottom, var(--theme-soft-from), var(--theme-soft-to))' }}
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4">Record a Donation</h2>

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

      <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Donor Name</label>
          <input
            name="donorName"
            type="text"
            value={form.donorName}
            onChange={handleChange}
            className={inputBase}
            style={inputStyle}
            placeholder="Devotee name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email (optional)</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className={inputBase}
            style={inputStyle}
            placeholder="devotee@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Amount (₹)</label>
          <input
            name="amount"
            type="number"
            min="0.01"
            step="0.01"
            value={form.amount}
            onChange={handleChange}
            className={inputBase}
            style={inputStyle}
            placeholder="e.g. 500"
            required
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message (optional)</label>
          <input
            name="message"
            type="text"
            value={form.message}
            onChange={handleChange}
            className={inputBase}
            style={inputStyle}
            placeholder="Any message"
          />
        </div>
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full text-white font-bold py-2.5 px-6 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed text-sm cursor-pointer hover:opacity-90"
            style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}
          >
            {submitting ? 'Recording...' : 'Record Donation'}
          </button>
        </div>
      </form>
    </div>
  )
}
