/**
 * @interfaces/domain-manager
 *
 * Native domain manager interface for tryyb.
 * Provides domain configuration, theme editing, menu building, and layout editing.
 */

// Main route export
export { DomainManagerRoutes } from './routes'

// Re-export hooks that may be useful externally
export { useDomainFromURL } from './data/hooks/useDomainFromURL'
export { useDomainProperties } from './data/hooks/useDomainProperties'
export { useHomeConfig } from './data/hooks/useHomeConfig'
export { useTeamFromURL } from './data/hooks/useTeamFromURL'
export { useTeamsFiltered } from './data/hooks/useTeamsFiltered'
