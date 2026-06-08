/** Fallback when domain Color Scheme is not loaded yet (matches `#App` resolved theme). */
export function previewThemeFromSiteShell(): 'light' | 'dark' {
  if (typeof document === 'undefined') return 'light'
  const app = document.getElementById('App')
  return app?.dataset.sitetheme === 'dark' ? 'dark' : 'light'
}

/**
 * Domain General → Color Scheme: comma list; first value is the domain default
 * (same as `colorSchemes.split(',')` in tryyb `applyDomainProperties`).
 */
export function previewThemeFromDomainColorSchemes(
  colorSchemes: string | undefined,
): 'light' | 'dark' {
  if (colorSchemes == null || colorSchemes === '') {
    return previewThemeFromSiteShell()
  }
  const first = colorSchemes
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)[0]
    ?.toLowerCase()
  if (first === 'light') return 'light'
  if (first === 'dark') return 'dark'
  return previewThemeFromSiteShell()
}
