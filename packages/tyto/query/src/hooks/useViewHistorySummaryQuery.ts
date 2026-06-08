import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient, ViewHistorySummary } from '@tyto/client'

export interface UseViewHistorySummaryQueryProps {
  top?: number
  beforeDate?: string
  domainID?: number
  memberID?: number
  lessonID?: number
  assetID?: number
  assetEncoding?: string
  userIDAdminBackdoor?: number
}

type ResponseProps = Awaited<
  ReturnType<typeof ViewHistorySummary.prototype.get>
>

type UseViewHistorySummaryQueryResult = UseQueryResult<ResponseProps, Error> & {
  queryKey: QueryKey
  invalidate: () => Promise<void>
}

export const useViewHistorySummaryQuery = ({
  ...props
}: UseViewHistorySummaryQueryProps): UseViewHistorySummaryQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()
  const queryKey: QueryKey = [
    tytoClient.ViewHistorySummary.endpoint,
    { ...props },
  ]

  return {
    ...useQuery<ResponseProps, Error>({
      queryKey,
      queryFn: () => tytoClient.ViewHistorySummary.get({ ...props }),
    }),
    queryKey,
    invalidate: async () => {
      await queryClient.invalidateQueries({
        queryKey,
      })
    },
  }
}

export default useViewHistorySummaryQuery
