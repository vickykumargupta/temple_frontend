import { createContext, useContext, useEffect, useState } from 'react'
import { getTheme, updateTheme, WS_URL } from '../services/api'

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

const VALID = new Set(Object.keys(THEMES))

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('blue')

  useEffect(() => {
    getTheme()
      .then((t) => {
        if (VALID.has(t)) setTheme(t)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    let socket = null
    let retry = 0
    let closed = false

    function connect() {
      socket = new WebSocket(WS_URL)
      socket.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data)
          if (msg.channel === 'theme' && VALID.has(msg.theme)) {
            setTheme(msg.theme)
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
    if (!VALID.has(next)) return
    setTheme(next)
    updateTheme(next).catch(() => {})
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: changeTheme, themes: THEMES, colors: THEMES[theme]?.colors }}>
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
