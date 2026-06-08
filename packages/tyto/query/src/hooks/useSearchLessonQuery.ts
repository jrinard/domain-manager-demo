import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useTytoClient } from '@tyto/client'
import type { Endpoints } from '@tyto/client'

export interface UseSearchLessonQueryProps {
  searchString: string
  enabled?: boolean
  filterRank?: number
  elementTypes?: string
  top?: number
}

type SearchLessonResponse = Endpoints.Tyto.Search.Lesson.Get.Response

/**
 * Hook to search for knowledge objects (lessons)
 * Based on the legacy /api/search/lesson endpoint
 */
export const useSearchLessonQuery = ({
  searchString,
  enabled = true,
  filterRank = 0,
  elementTypes = 'ocLESSON',
  top = 20,
}: UseSearchLessonQueryProps): UseQueryResult<SearchLessonResponse, Error> => {
  const tytoClient = useTytoClient()

  return useQuery<SearchLessonResponse, Error>({
    queryKey: ['searchLesson', { searchString, filterRank, elementTypes, top }],
    enabled: enabled && searchString.length > 0,
    queryFn: async () => {
      const response = await tytoClient.Search.Lessons?.get({
        searchString,
        filterRank,
        elementTypes,
        top,
        // Default scoring factors from legacy code
        assetNameExactFactor: 10000,
        keywordExactFactor: 8000,
        lessonNameExactFactor: 10000,
        lessonNameFreetextFactor: 10,
        lessonNameContainsFactor: 20,
        lessonDescContainsFactor: 10,
        lessonDescFreetextFactor: 10,
        contentContainsFactor: 50,
        contentFreetextFactor: 10,
        halfLifeDaysFactor: 1095,
        hitPercentFactor: 10,
        location: 'ocALL',
      })

      return response!
    },
  })
}

export default useSearchLessonQuery
