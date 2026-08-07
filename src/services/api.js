const API_BASE = '/api'

export async function registerDevotee(data) {
  const res = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error || 'Registration failed')
  return json
}

export async function registerIyf(data) {
  const res = await fetch(`${API_BASE}/iyf/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error || 'Registration failed')
  return json
}

export async function registerImyf(data) {
  const res = await fetch(`${API_BASE}/imyf/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error || 'Registration failed')
  return json
}

export function getAuth() {
  try {
    return JSON.parse(localStorage.getItem('iskcon_auth'))
  } catch {
    return null
  }
}

export function getAdminToken() {
  const auth = getAuth()
  return auth?.role === 'admin' ? auth.token : null
}

export function getDevoteeToken() {
  const auth = getAuth()
  return auth?.role === 'devotee' ? auth.token : null
}

export function setAuth({ token, role, email }) {
  localStorage.setItem('iskcon_auth', JSON.stringify({ token, role, email }))
}

export function setAdminToken(token) {
  if (token) localStorage.setItem('iskcon_auth', JSON.stringify({ token, role: 'admin' }))
  else localStorage.removeItem('iskcon_auth')
}

export function clearAuth() {
  localStorage.removeItem('iskcon_auth')
}

export async function loginAdmin(email, password) {
  const res = await fetch(`${API_BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error || 'Login failed')
  return json
}

export async function signupAdmin(data) {
  const res = await fetch(`${API_BASE}/admin/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error || 'Sign up failed')
  return json
}

export async function loginDevotee(email, password) {
  const res = await fetch(`${API_BASE}/devotee/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error || 'Login failed')
  return json
}

export async function signupDevotee(data) {
  const res = await fetch(`${API_BASE}/devotee/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error || 'Sign up failed')
  return json
}

export async function getDashboardStats() {
  const token = getAdminToken()
  const res = await fetch(`${API_BASE}/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const json = await res.json()
  if (res.status === 401 || res.status === 403) {
    clearAuth()
    throw new Error('Authorization required. Please log in again.')
  }
  if (!res.ok) throw new Error(json.error || 'Failed to load dashboard')
  return json.stats
}

export async function getDashboardCharts() {
  const token = getAdminToken()
  const res = await fetch(`${API_BASE}/dashboard/charts`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const json = await res.json()
  if (res.status === 401 || res.status === 403) {
    clearAuth()
    throw new Error('Authorization required. Please log in again.')
  }
  if (!res.ok) throw new Error(json.error || 'Failed to load charts')
  return json.charts
}

export async function getMyDashboard() {
  const token = getDevoteeToken()
  const res = await fetch(`${API_BASE}/dashboard/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const json = await res.json()
  if (res.status === 401 || res.status === 403) {
    clearAuth()
    throw new Error('Authorization required. Please log in again.')
  }
  if (!res.ok) throw new Error(json.error || 'Failed to load dashboard')
  return json
}

export async function createDonation(data) {
  const token = getAdminToken()
  const res = await fetch(`${API_BASE}/donations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (res.status === 401 || res.status === 403) {
    clearAuth()
    throw new Error('Authorization required. Please log in again.')
  }
  if (!res.ok) throw new Error(json.error || 'Failed to record donation')
  return json
}

export async function getDonations() {
  const token = getAdminToken()
  const res = await fetch(`${API_BASE}/donations`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const json = await res.json()
  if (res.status === 401 || res.status === 403) {
    clearAuth()
    throw new Error('Authorization required. Please log in again.')
  }
  if (!res.ok) throw new Error(json.error || 'Failed to load donations')
  return json.donations
}

export async function getTheme() {
  const res = await fetch(`${API_BASE}/settings/theme`)
  const json = await res.json()
  if (!res.ok) throw new Error(json.error || 'Failed to load theme')
  return json.theme
}

export async function updateTheme(theme) {
  const token = getAdminToken()
  const res = await fetch(`${API_BASE}/settings/theme`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ theme }),
  })
  const json = await res.json()
  if (res.status === 401 || res.status === 403) {
    clearAuth()
    throw new Error('Authorization required. Please log in again.')
  }
  if (!res.ok) throw new Error(json.error || 'Failed to update theme')
  return json.theme
}

export const WS_URL = `ws${window.location.protocol === 'https:' ? 's' : ''}://${window.location.host}/ws`
