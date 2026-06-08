import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useTytoClient, SearchPhrase } from '@tyto/client'

export interface UseSearchPhraseRecentQueryProps {
  searchString: string
  domainID: number
  enabled?: boolean
}

/**
 * Hook to get recent search phrase suggestions
 * Returns array of search query strings based on recent searches in the domain
 */
export const useSearchPhraseRecentQuery = ({
  searchString,
  domainID,
  enabled = true,
}: UseSearchPhraseRecentQueryProps): UseQueryResult<string[], Error> => {
  const tytoClient = useTytoClient()

  return useQuery<string[], Error>({
    queryKey: ['searchPhraseRecent', { searchString, domainID }],
    enabled: enabled && searchString.length > 0 && domainID > 0,
    queryFn: async () => {
      const response = await tytoClient.Search.PhraseRecent?.get({
        searchString,
        domainID,
      })

      if (!response || !Array.isArray(response)) {
        return []
      }

      // Map SearchPhrase objects to string array
      return response.map((item: SearchPhrase) => item.searchQuery)
    },
  })
}

export default useSearchPhraseRecentQuery
