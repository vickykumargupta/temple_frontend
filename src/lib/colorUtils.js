export function hexToHsl(hex) {
  let r = 0
  let g = 0
  let b = 0
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16)
    g = parseInt(hex[2] + hex[2], 16)
    b = parseInt(hex[3] + hex[3], 16)
  } else if (hex.length === 7) {
    r = parseInt(hex.slice(1, 3), 16)
    g = parseInt(hex.slice(3, 5), 16)
    b = parseInt(hex.slice(5, 7), 16)
  }
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

function hslToHex(h, s, l) {
  s /= 100
  l /= 100
  const k = (n) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n) => {
    const c = l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
    return Math.round(255 * c)
      .toString(16)
      .padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

export function withLightness(hex, lightness) {
  const { h, s } = hexToHsl(hex)
  return hslToHex(h, s, Math.min(100, Math.max(0, lightness)))
}

export function withSaturation(hex, saturation) {
  const { h, l } = hexToHsl(hex)
  return hslToHex(h, Math.min(100, Math.max(0, saturation)), l)
}

export function swatchGradient(hex) {
  const darker = withLightness(hex, Math.max(10, hexToHsl(hex).l - 22))
  const lighter = withLightness(hex, Math.min(90, hexToHsl(hex).l + 14))
  return `linear-gradient(90deg,${darker},${hex},${lighter})`
}

export function derivePalette(primary) {
  const { h, s, l } = hexToHsl(primary)
  const shade = (delta) => withLightness(primary, Math.min(100, Math.max(4, l + delta)))
  const soft = (delta) => withSaturation(primary, Math.min(100, Math.max(0, s * 0.35)))

  return {
    '--theme-from': shade(-22),
    '--theme-via': primary,
    '--theme-to': shade(-12),
    '--theme-soft-from': shade(48),
    '--theme-soft-to': shade(56),
    '--theme-accent': '#facc15',
    '--theme-accent-hover': '#fde047',
    '--theme-accent-text': shade(-34),
    '--theme-cta-from': primary,
    '--theme-cta-to': shade(-14),
    '--theme-cta-hover-from': shade(-18),
    '--theme-cta-hover-to': shade(-28),
    '--theme-text-soft': shade(48),
    '--theme-card-bg': shade(54),
    '--theme-accent-text2': shade(-40),
  }
}

export function applyPalette(palette) {
  const root = document.documentElement
  Object.entries(palette).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })
}

export function clearPalette() {
  const root = document.documentElement
  Object.keys(derivePalette('#2563eb')).forEach((key) => {
    root.style.removeProperty(key)
  })
}