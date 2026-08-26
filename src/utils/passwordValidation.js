export const PASSWORD_RULES = [
  { key: 'length', label: '8+ chars', test: (v) => (v || '').length >= 8 },
  { key: 'uppercase', label: 'Uppercase', test: (v) => /[A-Z]/.test(v || '') },
  { key: 'lowercase', label: 'Lowercase', test: (v) => /[a-z]/.test(v || '') },
  { key: 'number', label: 'Number', test: (v) => /\d/.test(v || '') },
  { key: 'symbol', label: 'Symbol', test: (v) => /[^A-Za-z0-9]/.test(v || '') },
]

export function getPasswordErrors(value) {
  return PASSWORD_RULES.filter((rule) => !rule.test(value)).map((rule) => rule.label)
}

export function isStrongPassword(value) {
  return getPasswordErrors(value).length === 0
}
