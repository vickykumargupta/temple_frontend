import { useEffect, useMemo, useState, useRef } from 'react'
import { getAllAdmins, approveAdmin, rejectAdmin } from '../../services/api'
import { sanitizeAndAutofillEmail } from '../../utils/emailSanitizer'
import { createInvite } from '../../services/mail'

function StatusBadge({ status }) {
  const styles = {
    pending: 'bg-yellow-100 text-yellow-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  }
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[status] || 'bg-gray-100 text-gray-600'}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

function AdminTable({ title, admins, onApprove, onReject, busy, emptyText, showActions }) {
  return (
    <div className="rounded-2xl shadow-lg overflow-hidden bg-white mb-8">
      <div className="px-6 pt-6">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      </div>
      <div className="mt-4">
        {admins.length === 0 ? (
          <p className="px-6 py-8 text-center text-gray-500 text-sm">{emptyText}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-y border-gray-100 bg-gray-50 text-gray-500 uppercase tracking-wide text-xs">
                  <th className="px-6 py-3 font-semibold whitespace-nowrap">#</th>
                  <th className="px-6 py-3 font-semibold whitespace-nowrap">Name</th>
                  <th className="px-6 py-3 font-semibold whitespace-nowrap">Email</th>
                  <th className="px-6 py-3 font-semibold whitespace-nowrap">Phone</th>
                  <th className="px-6 py-3 font-semibold whitespace-nowrap">Role</th>
                  <th className="px-6 py-3 font-semibold whitespace-nowrap">Status</th>
                  <th className="px-6 py-3 font-semibold whitespace-nowrap">Requested On</th>
                  {showActions && <th className="px-6 py-3 font-semibold whitespace-nowrap text-right">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {admins.map((admin, i) => (
                  <tr key={admin.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="px-6 py-3 text-gray-500 whitespace-nowrap">{i + 1}</td>
                    <td className="px-6 py-3 text-gray-700 whitespace-nowrap">
                      {admin.fullName}
                      {admin.isSuperAdmin && (
                        <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold text-white" style={{ background: 'var(--theme-cta-from)' }}>
                          Super
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-gray-700 whitespace-nowrap">{admin.email}</td>
                    <td className="px-6 py-3 text-gray-700 whitespace-nowrap">{admin.phone || '—'}</td>
                    <td className="px-6 py-3 text-gray-700 whitespace-nowrap">{admin.role || 'admin'}</td>
                    <td className="px-6 py-3 whitespace-nowrap"><StatusBadge status={admin.status} /></td>
                    <td className="px-6 py-3 text-gray-700 whitespace-nowrap">{formatDate(admin.createdAt)}</td>
                    {showActions && (
                      <td className="px-6 py-3 text-right whitespace-nowrap">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => onApprove(admin.id)}
                            disabled={busy === admin.id}
                            className="px-4 py-1.5 rounded-lg text-sm font-semibold text-white transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:opacity-90"
                            style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => onReject(admin.id)}
                            disabled={busy === admin.id}
                            className="px-4 py-1.5 rounded-lg text-sm font-semibold bg-red-100 text-red-700 hover:bg-red-200 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

function formatDate(value) {
  return new Date(value).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function InviteModal({ onClose, onSent }) {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const phoneRef = useRef(null)

  async function handleSubmit(e) {
    if (e) e.preventDefault()
    setError(null)

    if (!form.fullName.trim()) {
      setError('Please enter the full name.')
      nameRef.current?.focus()
      return
    }

    if (form.phone && form.phone.length !== 10) {
      setError('Phone number must be exactly 10 digits.')
      phoneRef.current?.focus()
      return
    }

    if (!form.email.includes('@')) {
      setError('Email must contain "@" character (e.g. @gmail.com).')
      emailRef.current?.focus()
      return
    }

    setSubmitting(true)
    try {
      const data = await createInvite(form)
      onSent(data)
    } catch (err) {
      setError(err.message || 'Failed to send invite')
      setSubmitting(false)
    }
  }

  const inputBase =
    'w-full px-4 py-2.5 rounded-xl border transition bg-white focus:outline-none text-sm'
  const inputStyle = {
    '--tw-ring-color': 'var(--theme-cta-from)',
    borderColor: 'var(--theme-cta-from)',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Invite an Admin</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none cursor-pointer">&times;</button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
            <input
              ref={nameRef}
              name="fullName"
              type="text"
              value={form.fullName}
              onChange={(e) => {
                const val = e.target.value.replace(/[0-9]/g, '')
                setForm((prev) => ({ ...prev, fullName: val }))
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  emailRef.current?.focus()
                }
              }}
              className={inputBase}
              style={inputStyle}
              placeholder="Devotee name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
            <input
              ref={emailRef}
              name="email"
              type="email"
              value={form.email}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, email: e.target.value }))
              }}
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
              className={inputBase}
              style={inputStyle}
              placeholder="devotee@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
            <input
              ref={phoneRef}
              name="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '')
                if (val.length <= 10) {
                  setForm((prev) => ({ ...prev, phone: val }))
                }
              }}
              className={inputBase}
              style={inputStyle}
              placeholder="e.g. 9876543210"
            />
          </div>

          {error && (
            <div className="px-4 py-3 rounded-xl text-sm font-medium bg-red-100 text-red-800 border border-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full text-white font-bold py-2.5 px-6 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed text-sm cursor-pointer hover:opacity-90"
            style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}
          >
            {submitting ? 'Sending Invite...' : 'Send Invite'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function AdminApprovalsPage() {
  const [admins, setAdmins] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(null)
  const [activeTab, setActiveTab] = useState('pending')
  const [showInvite, setShowInvite] = useState(false)
  const [inviteMsg, setInviteMsg] = useState(null)

  function load() {
    setLoading(true)
    setError(null)
    getAllAdmins()
      .then(setAdmins)
      .catch((err) => setError(err.message || 'Failed to load admins'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  async function handleAction(id, action) {
    setBusy(id)
    setError(null)
    try {
      if (action === 'approve') await approveAdmin(id)
      else await rejectAdmin(id)
      setAdmins((prev) => prev.map((a) => (a.id === id ? { ...a, status: action === 'approve' ? 'approved' : 'rejected' } : a)))
    } catch (err) {
      setError(err.message || 'Action failed')
    } finally {
      setBusy(null)
    }
  }

  const pending = useMemo(() => (admins || []).filter((a) => a.status === 'pending'), [admins])
  const approved = useMemo(() => (admins || []).filter((a) => a.status === 'approved'), [admins])
  const rejected = useMemo(() => (admins || []).filter((a) => a.status === 'rejected'), [admins])

  const tabs = [
    { key: 'pending', label: 'Pending', count: pending.length },
    { key: 'approved', label: 'Approved', count: approved.length },
    { key: 'rejected', label: 'Rejected', count: rejected.length },
    { key: 'all', label: 'All Admins', count: (admins || []).length },
  ]

  const tabAdmins = {
    pending,
    approved,
    rejected,
    all: admins || [],
  }

  return (
    <div className="py-12">
      <div className="max-w-[100rem] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <h1 className="text-2xl font-bold text-gray-800">Admin Approvals</h1>
          <button
            onClick={() => setShowInvite(true)}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition cursor-pointer hover:opacity-90"
            style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}
          >
            + Invite Admin
          </button>
        </div>

        {inviteMsg && (
          <div className="mb-4 px-4 py-3 rounded-xl text-sm font-medium bg-green-100 text-green-800 border border-green-200">
            {inviteMsg}
          </div>
        )}

        {loading && <p className="py-16 text-center text-gray-500 text-sm">Loading admins...</p>}
        {error && <p className="py-16 text-center text-red-600 text-sm font-medium">{error}</p>}
        {!loading && !error && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.key
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className="px-4 py-2 rounded-lg text-sm font-semibold transition cursor-pointer"
                    style={
                      isActive
                        ? { background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))', color: '#fff' }
                        : { background: 'var(--theme-surface)', color: 'var(--theme-text)', border: '1px solid var(--theme-border)' }
                    }
                  >
                    {tab.label} ({tab.count})
                  </button>
                )
              })}
            </div>
            <AdminTable
              title={`${tabs.find((t) => t.key === activeTab)?.label} Admins`}
              admins={tabAdmins[activeTab]}
              onApprove={(id) => handleAction(id, 'approve')}
              onReject={(id) => handleAction(id, 'reject')}
              busy={busy}
              emptyText={`No ${activeTab} admins.`}
              showActions={activeTab === 'pending'}
            />
          </>
        )}
      </div>
      {showInvite && (
        <InviteModal
          onClose={() => {
            setShowInvite(false)
            setInviteMsg(null)
          }}
          onSent={(data) => {
            setShowInvite(false)
            setInviteMsg(data.message || 'Invite sent successfully')
          }}
        />
      )}
    </div>
  )
}