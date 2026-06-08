import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useTytoClient, PersonCustomTabs } from '@tyto/client'

export interface UsePersonCustomTabsReadQueryProps {
  personID: number
  isEnabled?: boolean
}

export const usePersonCustomTabsReadQuery = ({
  personID,
  isEnabled,
}: UsePersonCustomTabsReadQueryProps): UseQueryResult<
  Awaited<ReturnType<typeof PersonCustomTabs.prototype.get>>,
  Error
> => {
  const tytoClient = useTytoClient()

  const params: Parameters<typeof PersonCustomTabs.prototype.get>[0] = {
    personID,
  }

  return useQuery<
    Awaited<ReturnType<typeof PersonCustomTabs.prototype.get>>,
    Error
  >({
    queryKey: [tytoClient.PersonCustomTabs.endpoint, params],
    queryFn: () => tytoClient.PersonCustomTabs.get({ ...params }),
    enabled: isEnabled,
  })
}

export default usePersonCustomTabsReadQuery
