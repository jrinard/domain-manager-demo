const INJECTED_ID = 'domain-stylesheet-injected'

export function applyStylesheetFromText(cssText: string): HTMLStyleElement {
  removeInjectedStylesheet()
  const style = document.createElement('style')
  style.id = INJECTED_ID
  style.type = 'text/css'
  style.appendChild(document.createTextNode(cssText))
  document.head.appendChild(style)
  return style
}

export function applyStylesheetFromUrl(url: string): HTMLLinkElement {
  removeInjectedStylesheet()
  const link = document.createElement('link')
  link.id = INJECTED_ID
  link.rel = 'stylesheet'
  link.href = url
  document.head.appendChild(link)
  return link
}

export function removeInjectedStylesheet(): void {
  const el = document.getElementById(INJECTED_ID)
  if (!el) return
  el.parentElement?.removeChild(el)
}
