import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { getAuth, clearAuth } from '../services/api'

export default function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { theme, setTheme, themes } = useTheme()
  const [showThemes, setShowThemes] = useState(false)
  const auth = getAuth()
  const isAdmin = auth?.role === 'admin'

  const links = [
    { to: '/', label: 'Home' },
    { to: '/janmashtami', label: 'Janmashtami' },
    { to: '/iyf', label: 'IYF' },
    { to: '/design-system', label: 'Design System' },
    { to: '/imyf', label: 'IMYF' },
    ...(isAdmin ? [{ to: '/dashboard', label: 'Dashboard' }] : []),
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
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
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
        <div className="flex items-center gap-4 md:gap-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm transition hidden md:block ${
                pathname === link.to
                  ? 'font-semibold'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
              style={pathname === link.to ? { color: 'var(--theme-accent)' } : undefined}
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <div className="relative">
              <button
                onClick={() => setShowThemes(!showThemes)}
                aria-label="Choose theme"
                className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer flex items-center justify-center relative"
                style={{ background: themes[theme]?.swatch }}
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
                </div>
              )}
            </div>
          )}
          <button
            onClick={handleAuthAction}
            className="text-white text-sm font-semibold px-5 py-2 rounded-full transition shadow-md cursor-pointer hover:opacity-90"
            style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}
          >
            {auth ? (isAdmin ? 'Logout' : 'Logout') : 'Login / Sign Up'}
          </button>
        </div>
      </div>
    </nav>
  )
}
