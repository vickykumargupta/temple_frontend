import { useTheme } from '../../../context/ThemeContext'

export function themeColor(name) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return value || '#2563eb'
}

export function useThemeColor(name) {
  const { colors } = useTheme()
  return colors?.[name] || themeColor(name)
}
