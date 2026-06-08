import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useTytoClient, CustomTabs } from '@tyto/client'

export interface UseCustomTabsReadQueryProps {
  domainID: number
  activeStatus?: string
  isEnabled?: boolean
}

export const useCustomTabsReadQuery = ({
  domainID,
  activeStatus,
  isEnabled = true,
}: UseCustomTabsReadQueryProps): UseQueryResult<
  Awaited<ReturnType<typeof CustomTabs.prototype.get>>,
  Error
> => {
  const tytoClient = useTytoClient()

  const params: Parameters<typeof CustomTabs.prototype.get>[0] = {
    domainID,
    activeStatus,
  }

  return useQuery<Awaited<ReturnType<typeof CustomTabs.prototype.get>>, Error>({
    enabled: isEnabled,
    queryKey: [tytoClient.CustomTabs.endpoint, params],
    queryFn: () => tytoClient.CustomTabs.get({ ...params }),
  })
}

export default useCustomTabsReadQuery
