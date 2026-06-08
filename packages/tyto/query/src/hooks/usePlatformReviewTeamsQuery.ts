import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient, PlatformReviewTeams } from '@tyto/client'

export interface UsePlatformReviewTeamsQueryProps {
  disabled?: boolean
}

type ResponseProps = Awaited<
  ReturnType<typeof PlatformReviewTeams.prototype.get>
>

export type UseUsePlatformReviewTeamsQueryQueryResult = Omit<
  UseQueryResult<ResponseProps, Error>,
  'data'
> & {
  data: undefined | ResponseProps
  queryKey: QueryKey
  invalidate: () => Promise<void>
}

export const usePlatformReviewTeamsQuery = (
  options?: UsePlatformReviewTeamsQueryProps,
): UseUsePlatformReviewTeamsQueryQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()
  const queryKey: QueryKey = [tytoClient.PlatformReviewTeams.endpoint]

  return {
    ...useQuery<ResponseProps, Error>({
      enabled: !options?.disabled,
      queryKey,
      queryFn: () => tytoClient.PlatformReviewTeams.get({}),
    }),
    queryKey,
    invalidate: async () => {
      await queryClient.invalidateQueries({
        queryKey,
      })
    },
  }
}

export default usePlatformReviewTeamsQuery
