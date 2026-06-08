import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient, PlatformReviewTask } from '@tyto/client'

export interface UsePlatformReviewTaskQueryProps {
  id: number
  disabled?: boolean
}

type ResponseProps = Awaited<
  ReturnType<typeof PlatformReviewTask.prototype.get>
>

type UseUsePlatformReviewTaskQueryQueryResult = UseQueryResult<
  ResponseProps,
  Error
> & {
  queryKey: QueryKey
  invalidate: () => Promise<void>
}

export const usePlatformReviewTaskQuery = ({
  id,
  disabled,
}: UsePlatformReviewTaskQueryProps): UseUsePlatformReviewTaskQueryQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()
  const queryKey: QueryKey = [tytoClient.PlatformReviewTask.endpoint, { id }]

  return {
    ...useQuery<ResponseProps, Error>({
      enabled: !disabled,
      queryKey,
      queryFn: () => tytoClient.PlatformReviewTask.get({ taskID: id }),
    }),
    queryKey,
    invalidate: async () => {
      await queryClient.invalidateQueries({
        queryKey,
      })
    },
  }
}

export default usePlatformReviewTaskQuery
