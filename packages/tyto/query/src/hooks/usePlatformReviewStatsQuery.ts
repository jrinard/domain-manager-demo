import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient, PlatformReviewStats } from '@tyto/client'

export interface UsePlatformReviewStatsQueryProps {
  disabled?: boolean
  teamID?: number
}

type ResponseProps = Awaited<
  ReturnType<typeof PlatformReviewStats.prototype.get>
>

type UseUsePlatformReviewStatsQueryResult = UseQueryResult<
  ResponseProps,
  Error
> & {
  queryKey: QueryKey
  invalidate: () => Promise<void>
}

export const usePlatformReviewStatsQuery = (
  props?: UsePlatformReviewStatsQueryProps,
): UseUsePlatformReviewStatsQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()
  const queryKey: QueryKey = [tytoClient.PlatformReviewStats.endpoint]

  return {
    ...useQuery<ResponseProps, Error>({
      enabled: !props?.disabled,
      queryKey,
      queryFn: () =>
        tytoClient.PlatformReviewStats.get({ teamID: props?.teamID }),
    }),
    queryKey,
    invalidate: async () => {
      await queryClient.invalidateQueries({
        queryKey,
      })
    },
  }
}

export default usePlatformReviewStatsQuery
