import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useTytoClient, EventAttendeesDiscProfiles } from '@tyto/client'

export type UseEventAttendeesDiscProfilesProps = Parameters<
  typeof EventAttendeesDiscProfiles.prototype.get
>[0]

export const useEventAttendeesDiscProfiles = (
  props: UseEventAttendeesDiscProfilesProps
): UseQueryResult<
  Awaited<ReturnType<typeof EventAttendeesDiscProfiles.prototype.get>>,
  Error
> => {
  const tytoClient = useTytoClient()

  return useQuery<
    Awaited<ReturnType<typeof EventAttendeesDiscProfiles.prototype.get>>,
    Error
  >({
    queryKey: [tytoClient.EventAttendeesDiscProfiles.endpoint, props],
    queryFn: () => tytoClient.EventAttendeesDiscProfiles.get(props),
  })
}

export default useEventAttendeesDiscProfiles
