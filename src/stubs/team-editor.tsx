import React from 'react'

/** Stub for portfolio demo — DomainHeader imports are tree-shaken when demo flag hides create flows. */
export function NewDomainDialog() {
  return null
}

export function getTeamTreeSearchArgs() {
  return { operation: 'ocVIEW' as const, functionName: 'Team Membership' }
}

export function useInvalidSearchQuery() {
  return { invalidateQuery: () => undefined }
}
