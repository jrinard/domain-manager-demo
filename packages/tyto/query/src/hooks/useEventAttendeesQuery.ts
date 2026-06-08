import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient, EventAttendees } from '@tyto/client'

export interface UseEventAttendeesQueryProps {
  eventID: number
  disabled?: boolean
}

type RequestProps = Awaited<ReturnType<typeof EventAttendees.prototype.get>>
type UseEventAttendeesQueryResult = UseQueryResult<RequestProps, Error> & {
  queryKey: QueryKey
  invalidate: () => Promise<void>
}

export const useEventAttendeesQuery = ({
  disabled,
  ...props
}: UseEventAttendeesQueryProps): UseEventAttendeesQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()
  const queryKey: QueryKey = [tytoClient.EventAttendees.endpoint, { ...props }]

  return {
    ...useQuery<RequestProps, Error>({
      enabled: !disabled,
      queryFn: () => tytoClient.EventAttendees.get({ ...props }),
      queryKey,
    }),
    queryKey,
    invalidate: async () => {
      await queryClient.invalidateQueries({
        queryKey,
      })
    },
  }
}

export default useEventAttendeesQuery
