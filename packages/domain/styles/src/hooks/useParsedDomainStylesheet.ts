import { useMemo } from 'react'
import { useDomainStylesheet } from './useDomainStylesheet'
import { parseStylesheet } from '../format/css'
import { resolveRaw } from '../engine/resolve'
import defaultCss from '../constants/default.css?inline'

export function useParsedDomainStylesheet(domainID: number) {
  const query = useDomainStylesheet(domainID)

  const { parsed, resolved } = useMemo(() => {
    // Always have a parsed default
    const parsedDefault = parseStylesheet(defaultCss)
    // Parse source (remote or default)
    const sourceCss = query.data ?? defaultCss
    const parsedSource = (() => {
      try {
        return parseStylesheet(sourceCss)
      } catch (error) {
        console.error('Error parsing domain stylesheet', error)
        return parsedDefault
      }
    })()

    // Resolve defaults first (to use as fallback)
    const defaultLight = resolveRaw(parsedDefault.light, {} as any).values
    const defaultDark = resolveRaw(parsedDefault.dark, {} as any).values

    // Resolve source using defaults as fallback; guard against cycles
    let light = defaultLight
    let dark = defaultDark
    try {
      light = resolveRaw(parsedSource.light, defaultLight).values
      dark = resolveRaw(parsedSource.dark, defaultDark).values
    } catch {
      // On cycle or resolution error, fall back to defaults
      light = defaultLight
      dark = defaultDark
    }

    return { parsed: parsedSource, resolved: { light, dark } }
  }, [query.data])

  return {
    ...query,
    parsed,
    resolved,
    isMissingDomainStylesheet: !query.data,
  }
}
