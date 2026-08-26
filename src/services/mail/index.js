import { API_BASE, getAdminToken, clearAuth } from '../api'

export async function createInvite(data) {
  const token = getAdminToken()
  const res = await fetch(`${API_BASE}/admin-invite`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (res.status === 401 || res.status === 403) {
    clearAuth()
    throw new Error('Authorization required. Please log in again.')
  }
  if (!res.ok) throw new Error(json.error || 'Failed to send invite')
  return json
}

export async function validateInvite(token) {
  const res = await fetch(`${API_BASE}/admin-invite/${token}`)
  const json = await res.json()
  if (!res.ok) throw new Error(json.error || 'Invalid invite link')
  return json
}

export async function acceptInvite(token, data) {
  const res = await fetch(`${API_BASE}/admin-invite/${token}/accept`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error || 'Failed to submit details')
  return json
}