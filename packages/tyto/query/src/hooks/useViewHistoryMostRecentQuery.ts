import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient, ViewHistoryMostRecent } from '@tyto/client'

export interface UseViewHistoryMostRecentQueryProps {
  personID: number
  disabled?: boolean
}

type ResponseProps = Awaited<
  ReturnType<typeof ViewHistoryMostRecent.prototype.get>
>

type UseUseViewHistoryMostRecentQueryQueryResult = UseQueryResult<
  ResponseProps,
  Error
> & {
  queryKey: QueryKey
  invalidate: () => Promise<void>
}

export const useViewHistoryMostRecentQuery = ({
  disabled,
  ...props
}: UseViewHistoryMostRecentQueryProps): UseUseViewHistoryMostRecentQueryQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()
  const queryKey: QueryKey = [
    tytoClient.ViewHistoryMostRecent.endpoint,
    { ...props },
  ]

  return {
    ...useQuery<ResponseProps, Error>({
      enabled: !disabled,
      queryKey,
      queryFn: () => tytoClient.ViewHistoryMostRecent.get({ ...props }),
    }),
    queryKey,
    invalidate: async () => {
      await queryClient.invalidateQueries({
        queryKey,
      })
    },
  }
}

export default useViewHistoryMostRecentQuery
