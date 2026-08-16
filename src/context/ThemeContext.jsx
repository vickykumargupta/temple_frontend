import { createContext, useContext, useEffect, useState } from 'react'
import { getTheme, updateTheme, WS_URL } from '../services/api'
import { derivePalette, applyPalette, clearPalette, swatchGradient } from '../lib/colorUtils'

export const THEMES = {
  saffron: {
    label: 'Saffron',
    swatch: 'linear-gradient(90deg,#f97316,#dc2626,#eab308)',
    colors: {
      '--theme-from': '#c2410c',
      '--theme-cta-from': '#ea580c',
      '--theme-accent': '#facc15',
      '--theme-via': '#dc2626',
      '--theme-to': '#ca8a04',
      '--theme-cta-to': '#dc2626',
    },
  },
  blue: {
    label: 'Blue',
    swatch: 'linear-gradient(90deg,#2563eb,#1d4ed8,#7c3aed)',
    colors: {
      '--theme-from': '#1d4ed8',
      '--theme-cta-from': '#2563eb',
      '--theme-accent': '#facc15',
      '--theme-via': '#2563eb',
      '--theme-to': '#6d28d9',
      '--theme-cta-to': '#7c3aed',
    },
  },
  green: {
    label: 'Green',
    swatch: 'linear-gradient(90deg,#059669,#10b981,#84cc16)',
    colors: {
      '--theme-from': '#047857',
      '--theme-cta-from': '#059669',
      '--theme-accent': '#facc15',
      '--theme-via': '#059669',
      '--theme-to': '#65a30d',
      '--theme-cta-to': '#65a30d',
    },
  },
  purple: {
    label: 'Purple',
    swatch: 'linear-gradient(90deg,#7c3aed,#a855f7,#ec4899)',
    colors: {
      '--theme-from': '#6d28d9',
      '--theme-cta-from': '#9333ea',
      '--theme-accent': '#facc15',
      '--theme-via': '#9333ea',
      '--theme-to': '#db2777',
      '--theme-cta-to': '#db2777',
    },
  },
}

export const CUSTOM_THEME_KEY = 'custom'
const VALID = new Set(Object.keys(THEMES))
const DEFAULT_PRIMARY = '#2563eb'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('blue')
  const [customPrimary, setCustomPrimary] = useState(null)

  const isCustom = theme === CUSTOM_THEME_KEY

  useEffect(() => {
    getTheme()
      .then((t) => {
        if (typeof t === 'string' && VALID.has(t)) {
          setTheme(t)
        } else if (t && t.type === CUSTOM_THEME_KEY && typeof t.primary === 'string') {
          setCustomPrimary(t.primary)
          setTheme(CUSTOM_THEME_KEY)
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    if (theme === CUSTOM_THEME_KEY) {
      applyPalette(derivePalette(customPrimary || DEFAULT_PRIMARY))
    } else {
      clearPalette()
    }
  }, [theme, customPrimary])

  useEffect(() => {
    let socket = null
    let retry = 0
    let closed = false

    function connect() {
      socket = new WebSocket(WS_URL)
      socket.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data)
          if (msg.channel === 'theme') {
            if (typeof msg.theme === 'string' && VALID.has(msg.theme)) {
              setTheme(msg.theme)
            } else if (msg.theme && msg.theme.type === CUSTOM_THEME_KEY && typeof msg.theme.primary === 'string') {
              setCustomPrimary(msg.theme.primary)
              setTheme(CUSTOM_THEME_KEY)
            }
          }
        } catch {}
      }
      socket.onclose = () => {
        if (!closed) {
          retry = Math.min(retry + 1, 5)
          setTimeout(connect, 1000 * retry)
        }
      }
      socket.onerror = () => socket?.close()
    }

    connect()
    return () => {
      closed = true
      socket?.close()
    }
  }, [])

  function changeTheme(next) {
    if (typeof next === 'string' && VALID.has(next)) {
      setTheme(next)
      updateTheme(next).catch(() => {})
    } else if (next && next.type === CUSTOM_THEME_KEY && typeof next.primary === 'string') {
      setCustomPrimary(next.primary)
      setTheme(CUSTOM_THEME_KEY)
      updateTheme(next).catch(() => {})
    }
  }

  const customColors = isCustom ? derivePalette(customPrimary || DEFAULT_PRIMARY) : THEMES[theme]?.colors

  return (
    <ThemeContext.Provider value={{ theme, setTheme: changeTheme, themes: THEMES, colors: customColors, isCustom, customPrimary, swatchGradient }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}