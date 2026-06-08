import { RELATIONS_NL, STANDARD_RELATIONS } from './constants'

export type RelType =
  | 'Alpha'
  | 'Beta'
  | 'Development'
  | 'Legacy'
  | 'Default'
  | 'Iframe'
export type IDType = 'domainID' | 'roleID' | 'userID' | 'iframeOrigin'

export function relIsStandard(rel: string) {
  if (!rel) {
    return false
  }

  return Object.values(STANDARD_RELATIONS).some(
    (standardRel) => standardRel === rel,
  )
}

export function relIsAlpha(rel: string) {
  if (!rel) {
    return false
  }

  return rel.startsWith(RELATIONS_NL.Alpha)
}

export function relIsBeta(rel: string) {
  if (!rel) {
    return false
  }

  return rel.startsWith(RELATIONS_NL.Beta)
}

export function relIsDev(rel: string) {
  if (!rel) {
    return false
  }

  return rel.startsWith(RELATIONS_NL.Development)
}

export function relIsLegacy(rel: string) {
  if (!rel) {
    return false
  }

  return rel.startsWith(RELATIONS_NL.Legacy)
}

export function relIsDefaultOverride(rel: string) {
  if (!rel) {
    return false
  }

  return rel.startsWith(RELATIONS_NL.Default)
}

export function relIsIframe(rel: string) {
  if (!rel) {
    return false
  }

  return rel.startsWith(RELATIONS_NL.Iframe)
}

function pullNumberValueFromRel(rel: string, idType: IDType): number | null {
  if (!rel) {
    return null
  }

  const value = rel.split(`?${idType}=`)[1]

  if (!value) {
    return null
  }

  const id = parseInt(value, 10)

  return Number.isNaN(id) ? null : id
}

function pullStringValueFromRel(rel: string, idType: IDType): string | null {
  if (!rel) {
    return null
  }

  const value = rel.split(`?${idType}=`)[1]

  if (!value) {
    return null
  }

  return `${value}`
}

export function pullDomainIDFromRel(rel: string) {
  return pullNumberValueFromRel(rel, 'domainID')
}

export function pullSecurityRoleIDFromRel(rel: string) {
  return pullNumberValueFromRel(rel, 'roleID')
}

export function pullUserIDFromRel(rel: string) {
  return pullNumberValueFromRel(rel, 'userID')
}

export function pullIframeSrcFromRel(rel: string) {
  return pullStringValueFromRel(rel, 'iframeOrigin')
}

/**
 * Pulls the search params from a Relation string.
 * @deprecated never actually used, just here in case we need it.
 */
export function pullRelSearchParams(rel: string) {
  if (!rel) {
    return {}
  }

  const searchParams = rel.split('?')[1] || ''

  const params = new URLSearchParams(searchParams)

  const properties: Record<string, number> = {}

  params.forEach((value, key) => {
    const parsedValue = parseInt(value, 10)
    if (Number.isNaN(parsedValue)) return

    properties[key] = parsedValue
  })

  return properties
}

export function createNLRel({
  id,
  idType,
  relType,
}: {
  id: number | string
  idType: IDType
  relType: RelType
}): string {
  const prefix = relType in RELATIONS_NL ? RELATIONS_NL[relType] : null

  if (!prefix) {
    return ''
  }

  return `${prefix}?${idType}=${id}`
}

export function createNLAlphaRel(id: number, idType: 'roleID' | 'userID') {
  return createNLRel({ id, idType, relType: 'Alpha' })
}

export function createNLBetaRel(id: number, idType: 'domainID' | 'roleID') {
  return createNLRel({ id, idType, relType: 'Beta' })
}

export function createNLDefaultRel(id: number, idType: 'domainID') {
  return createNLRel({ id, idType, relType: 'Default' })
}

export function createNLLegacyRel(id: number, idType: 'domainID' | 'roleID') {
  return createNLRel({ id, idType, relType: 'Legacy' })
}

export function createNLDevelopmentRel(
  id: number,
  idType: 'roleID' | 'userID',
) {
  return createNLRel({ id, idType, relType: 'Development' })
}

export function createNLIframeRel(id: number, idType: 'iframeOrigin') {
  return createNLRel({ id, idType, relType: 'Iframe' })
}

/**
 * Checks existing Relations for a Link and returns only the new Relations that do not exist
 */
export function createNewRelLinks({
  existingRelations,
  relType,
  idType,
  newIDs,
}: {
  existingRelations: string[]
  relType: RelType
  idType: IDType
  newIDs: (number | string)[]
}) {
  const keyedExistingRelations = new Set(existingRelations)

  const newRelLinks = newIDs.map((id) => createNLRel({ id, idType, relType }))

  return newRelLinks.filter((rel) => !keyedExistingRelations.has(rel))
}
