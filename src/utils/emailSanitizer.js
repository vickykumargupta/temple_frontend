export function sanitizeAndAutofillEmail(val) {
  const trimmed = val.trim()
  if (!trimmed) return trimmed

  if (!trimmed.includes('@')) {
    return `${trimmed}@gmail.com`
  }

  const parts = trimmed.split('@')
  const local = parts[0]
  let domain = parts[1] ? parts[1].toLowerCase().trim() : ''

  if (!domain) {
    return `${local}@gmail.com`
  }

  const dotIdx = domain.indexOf('.')
  let provider = dotIdx !== -1 ? domain.substring(0, dotIdx) : domain
  let tld = dotIdx !== -1 ? domain.substring(dotIdx + 1) : ''

  const gmailProviderTypos = ['gmail', 'gmil', 'gamil', 'gml', 'gmile', 'gimail', 'gmal', 'gmaill']
  const hotmailProviderTypos = ['hotmail', 'hotm', 'htmail', 'hotma']
  const yahooProviderTypos = ['yahoo', 'yhoo', 'yaho', 'yah']
  const outlookProviderTypos = ['outlook', 'outl', 'otlook']

  if (gmailProviderTypos.includes(provider)) {
    provider = 'gmail'
  } else if (hotmailProviderTypos.includes(provider)) {
    provider = 'hotmail'
  } else if (yahooProviderTypos.includes(provider)) {
    provider = 'yahoo'
  } else if (outlookProviderTypos.includes(provider)) {
    provider = 'outlook'
  }

  if (!tld) {
    tld = 'com'
  }

  return `${local}@${provider}.${tld}`
}
