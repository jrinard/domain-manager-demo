import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient, SearchKnowledgeObjects } from '@tyto/client'

export interface UseSearchKnowledgeObjectsQueryProps {
  domainID?: number
  elementTypes?: string
  searchString: string
  cacheTimeOutMinutes?: number
  top?: number
  filterRank?: number
  filterDateStart?: string
  lessonItemTypes?: string
  elementSubTypes?: string
  getImages?: boolean
  disabled?: boolean
}

type ResponseProps = Awaited<
  ReturnType<typeof SearchKnowledgeObjects.prototype.get>
>

type UseSearchKnowledgeObjectsQueryResult = UseQueryResult<
  ResponseProps,
  Error
> & {
  queryKey: QueryKey
  invalidate: () => Promise<void>
}

export const useSearchKnowledgeObjectsQuery = ({
  searchString,
  domainID,
  elementTypes,
  cacheTimeOutMinutes,
  top,
  filterRank,
  filterDateStart,
  lessonItemTypes,
  elementSubTypes,
  getImages,
  disabled,
}: UseSearchKnowledgeObjectsQueryProps): UseSearchKnowledgeObjectsQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()

  // Include all props in params to be used in the query
  const params = {
    searchString,
    domainID,
    elementTypes,
    cacheTimeOutMinutes,
    top,
    filterRank,
    filterDateStart,
    lessonItemTypes,
    elementSubTypes,
    getImages,
  }

  const queryKey: QueryKey = [
    tytoClient.SearchKnowledgeObjects.endpoint,
    params,
  ]

  const queryResult = useQuery<ResponseProps, Error>({
    enabled: !disabled,
    queryKey,
    queryFn: () => tytoClient.SearchKnowledgeObjects.get(params),
  })

  return {
    ...queryResult,
    queryKey,
    invalidate: async () => {
      await queryClient.invalidateQueries({ queryKey })
    },
  }
}

export default useSearchKnowledgeObjectsQuery
