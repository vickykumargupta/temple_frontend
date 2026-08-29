import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { CUSTOM_THEME_KEY } from '../context/ThemeContext'
import { getAuth, clearAuth } from '../services/api'

export default function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { theme, setTheme, themes, isCustom, customPrimary, swatchGradient } = useTheme()
  const [showThemes, setShowThemes] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const themesRef = useRef(null)
  const profileRef = useRef(null)

  useEffect(() => {
    setMenuOpen(false)
    setProfileOpen(false)
  }, [pathname])

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false)
      }
    }
    if (profileOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [profileOpen])

  useEffect(() => {
    function handleClickOutside(e) {
      if (themesRef.current && !themesRef.current.contains(e.target)) {
        setShowThemes(false)
      }
    }
    function handleKey(e) {
      if (e.key === 'Escape') setShowThemes(false)
    }
    if (showThemes) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKey)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKey)
    }
  }, [showThemes])
  const auth = getAuth()
  const isAdmin = auth?.role === 'admin'

  const links = [
    { to: '/', label: 'Home' },
    { to: '/janmashtami', label: 'Janmashtami' },
    { to: '/iyf', label: 'IYF' },
    // { to: '/design-system', label: 'Design System' },
    { to: '/bhakti-viksha', label: 'BhaktiVriksha' },
    ...(auth?.role === 'admin' ? [{ to: '/dashboard', label: 'Dashboard' }] : []),
    ...(auth?.isSuperAdmin ? [{ to: '/dashboard/approvals', label: 'Approvals' }] : []),
  ]

  function handleAuthAction() {
    if (auth) {
      clearAuth()
      navigate('/')
    } else {
      navigate('/login')
    }
  }

  return (
    <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-[100rem] mx-auto px-2 md:px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/images/iskcon-logo.svg"
            alt="ISKCON logo"
            className="w-10 h-10"
          />
          <div>
            <p className="text-sm font-bold text-gray-800 dark:text-white leading-tight">ISKCON KR Puram</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Bangalore</p>
          </div>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3 md:gap-6">
          {links.map((link) => {
            const active = pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm hidden md:block px-3.5 py-1.5 rounded-full transition ${
                  active
                    ? 'text-white font-semibold shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                style={active ? { background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' } : undefined}
              >
                {link.label}
              </Link>
            )
          })}
          {isAdmin && (
            <div className="relative hidden md:block" ref={themesRef}>
              <button
                onClick={() => setShowThemes(!showThemes)}
                aria-label="Choose theme"
                className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer flex items-center justify-center relative"
                style={{ background: isCustom ? swatchGradient(customPrimary) : themes[theme]?.swatch }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 drop-shadow"
                >
                  <path d="M12 22a10 10 0 1 1 10-10c0 1.7-1.3 3-3 3h-2.5a2 2 0 0 0-1.5 3.3c.4.5.4 1.1.2 1.7-.3.6-.9 1-1.6 1H12Z" />
                  <circle cx="7.5" cy="11" r="1.2" fill="white" stroke="none" />
                  <circle cx="10.5" cy="7" r="1.2" fill="white" stroke="none" />
                  <circle cx="15" cy="7.5" r="1.2" fill="white" stroke="none" />
                  <circle cx="17" cy="11" r="1.2" fill="white" stroke="none" />
                </svg>
              </button>
              {showThemes && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-2 animate-fade-in">
                  <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">Color Theme</p>
                  {Object.entries(themes).map(([key, t]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setTheme(key)
                        setShowThemes(false)
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition cursor-pointer ${
                        theme === key ? 'bg-gray-100 dark:bg-gray-700 font-semibold' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span className="w-9 h-9 rounded-full border border-black/5 flex items-center justify-center" style={{ background: t.swatch }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 3a4 4 0 0 0 0 8 3 3 0 0 1 0 6" />
                          <circle cx="18" cy="8" r="1" fill="white" stroke="none" />
                          <circle cx="6" cy="15" r="1" fill="white" stroke="none" />
                        </svg>
                      </span>
                      <span className="text-gray-700 dark:text-gray-200">{t.label}</span>
                      {theme === key && <span className="ml-auto text-xs">✓</span>}
                    </button>
                  ))}
                  <div className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition cursor-pointer ${isCustom ? 'bg-gray-100 dark:bg-gray-700 font-semibold' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                    <label
                      className="w-9 h-9 rounded-full border border-black/5 flex items-center justify-center cursor-pointer relative overflow-hidden"
                      style={{ background: customPrimary ? swatchGradient(customPrimary) : undefined }}
                    >
                      <input
                        type="color"
                        value={customPrimary || '#2563eb'}
                        onChange={(e) => {
                          setTheme({ type: CUSTOM_THEME_KEY, primary: e.target.value })
                        }}
                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                        aria-label="Custom theme color"
                      />
                    </label>
                    <span className="text-gray-700 dark:text-gray-200">Custom</span>
                    <span className="ml-auto text-xs text-gray-400">pick a color</span>
                  </div>
                </div>
              )}
            </div>
          )}
          <Link
            to="/donate"
            className="hidden md:inline-block text-white text-sm font-semibold px-5 py-2 rounded-full transition shadow-md cursor-pointer hover:opacity-90"
            style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}
          >
            Donate
          </Link>
          {auth ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                aria-label="User menu"
                className="flex items-center gap-2 pl-1 pr-1 sm:pr-2.5 py-1 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer"
              >
                <span
                  className="w-8 h-8 rounded-full text-white text-[11px] font-extrabold flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, var(--theme-cta-from), var(--theme-cta-to))' }}
                >
                  {(auth.fullName || auth.email || '?')
                    .split(' ').filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('')}
                </span>
                <span className="hidden lg:block text-xs font-semibold text-gray-700 dark:text-gray-200 max-w-[7rem] truncate">
                  {(auth.fullName || '').split(' ')[0]}
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="hidden lg:block text-gray-400">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-fade-in z-50">
                  <div className="px-4 py-3.5 border-b border-gray-100 dark:border-gray-700">
                    <p className="font-bold text-sm text-gray-800 dark:text-white truncate">{auth.fullName || 'Welcome'}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{auth.email}</p>
                    <span className="inline-block mt-1.5 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full text-white"
                      style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}>
                      {auth.isSuperAdmin ? 'Super Admin' : auth.role === 'admin' ? 'Admin' : 'Devotee'}
                    </span>
                  </div>
                  <div className="p-1.5">
                    <Link to="/profile" onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      My Profile
                    </Link>
                    {auth?.role === 'admin' && (
                      <Link to="/dashboard" onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                        My Dashboard
                      </Link>
                    )}
                    <button onClick={() => { handleAuthAction() }}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-red-600 hover:bg-red-50 transition cursor-pointer">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleAuthAction}
              className="text-white text-xs sm:text-sm font-semibold px-3.5 sm:px-5 py-2 rounded-full transition shadow-md cursor-pointer hover:opacity-90 whitespace-nowrap"
              style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}
            >
              Login
            </button>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shadow-lg animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`transition ${
                  pathname === link.to
                    ? 'inline-block w-fit px-6 py-2.5 mt-1 rounded-full text-white font-bold text-sm shadow-lg'
                    : 'block px-4 py-3 rounded-xl text-base text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                style={pathname === link.to ? { background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' } : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/donate"
              className="block mt-2 text-center text-white text-sm font-bold px-4 py-3 rounded-xl transition cursor-pointer hover:opacity-90"
              style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}
              onClick={() => setMenuOpen(false)}
            >
              🙏 Donate
            </Link>
            {isAdmin && (
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 mt-2">
                <p className="px-4 pt-2 pb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">Theme</p>
                <div className="flex flex-wrap gap-2 px-4 pb-1">
                  {Object.entries(themes).map(([key, t]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setTheme(key)
                        setMenuOpen(false)
                      }}
                      aria-label={t.label}
                      className={`w-9 h-9 rounded-full border-2 transition cursor-pointer ${theme === key && !isCustom ? 'ring-2 ring-offset-2 ring-gray-400 border-transparent' : 'border-black/5'}`}
                      style={{ background: t.swatch }}
                    />
                  ))}
                  <label
                    className={`w-9 h-9 rounded-full border-2 cursor-pointer relative overflow-hidden ${isCustom ? 'ring-2 ring-offset-2 ring-gray-400 border-transparent' : 'border-black/5'}`}
                    style={{ background: customPrimary ? swatchGradient(customPrimary) : '#e5e7eb' }}
                  >
                    <input
                      type="color"
                      value={customPrimary || '#2563eb'}
                      onChange={(e) => setTheme({ type: CUSTOM_THEME_KEY, primary: e.target.value })}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                      aria-label="Custom theme color"
                    />
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
