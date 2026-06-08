import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useTytoClient, TeamCustomTabs } from '@tyto/client'

export interface UseTeamCustomTabsReadQueryProps {
  teamID: number
  aboutID?: number
  isCascade?: boolean
  isEnabled?: boolean
}

export const useTeamCustomTabsReadQuery = ({
  teamID,
  aboutID,
  isCascade,
  isEnabled = true,
}: UseTeamCustomTabsReadQueryProps): UseQueryResult<
  Awaited<ReturnType<typeof TeamCustomTabs.prototype.get>>,
  Error
> => {
  const tytoClient = useTytoClient()

  const params: Parameters<typeof TeamCustomTabs.prototype.get>[0] = {
    teamID,
    aboutID,
    isCascade,
  }

  return useQuery<
    Awaited<ReturnType<typeof TeamCustomTabs.prototype.get>>,
    Error
  >({
    enabled: isEnabled,
    queryKey: [tytoClient.TeamCustomTabs.endpoint, params],
    queryFn: () => tytoClient.TeamCustomTabs.get({ ...params }),
  })
}

export default useTeamCustomTabsReadQuery
