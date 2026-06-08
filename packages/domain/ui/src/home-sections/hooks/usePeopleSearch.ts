import { useMemo } from 'react'
import { usePeopleAdvancedSearchQuery } from '@tyto/query'

export interface PersonSearchResult {
  userID: number
  userName: string
}

/**
 * Hook to search for people by name
 * Based on legacy SearchInput logic from Tryyb
 */
export function usePeopleSearch(
  searchTerm: string,
  domainID: number,
  options: {
    enabled?: boolean
    maxResults?: number
  } = {},
): PersonSearchResult[] {
  const { enabled = true, maxResults = 5 } = options

  // Create search pattern for SQL LIKE query (NOT URL encoded - the query will handle that)
  const generalName = useMemo(() => {
    if (!searchTerm || searchTerm.length <= 1 || !enabled) {
      return ''
    }
    // Convert spaces to % for wildcard matching
    // Example: "Angie Miller" -> "%Angie%Miller%"
    return `%${searchTerm.replace(/ +/g, '%')}%`
  }, [searchTerm, enabled])

  // Query people using existing hook - matches legacy Tyto.PeopleAdvancedSearch.get({ generalName, domainID })
  const peopleQuery = usePeopleAdvancedSearchQuery({
    generalName,
    domainID,
    isEnabled: enabled && generalName.length > 0 && domainID > 0,
  })

  // Map results to simplified structure
  return useMemo(() => {
    const people = peopleQuery.data?.ret?.people

    if (!people || !Array.isArray(people)) {
      return []
    }

    return people.slice(0, maxResults).map((person) => {
      // Use familiarName if available, otherwise construct from givenName + familyName
      const userName = person.familiarName
        ? person.familiarName
        : `${person.givenName} ${person.familyName}`.trim()

      return {
        userID: person.userID,
        userName,
      }
    })
  }, [peopleQuery.data, maxResults])
}
