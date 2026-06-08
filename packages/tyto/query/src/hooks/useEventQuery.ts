import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient, Event } from '@tyto/client'

export interface UseEventQueryProps {
  eventID: number
  disabled?: boolean
}

type RequestProps = Awaited<ReturnType<typeof Event.prototype.get>>

type UseEventQueryResult = UseQueryResult<RequestProps, Error> & {
  queryKey: QueryKey
  invalidate: () => Promise<void>
}

export const useEventQuery = ({
  disabled,
  ...props
}: UseEventQueryProps): UseEventQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()
  const queryKey: QueryKey = [tytoClient.Event.endpoint, { ...props }]
  return {
    ...useQuery<Awaited<ReturnType<typeof Event.prototype.get>>, Error>({
      enabled: !disabled,
      queryKey,
      queryFn: async () => {
        return await tytoClient.Event.get({ ...props })
      },
    }),
    queryKey,
    invalidate: async () => {
      await queryClient.invalidateQueries({
        queryKey,
      })
    },
  }
}

export default useEventQuery
