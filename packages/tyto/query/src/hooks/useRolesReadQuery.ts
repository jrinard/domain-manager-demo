import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useTytoClient, Roles } from '@tyto/client'

export interface UseRolesReadQueryProps {
  domainID?: number
  hasFunctionID?: number
  hasNotFunctionID?: number
  isEnabled?: boolean
}

export const useRolesReadQuery = ({
  domainID,
  hasFunctionID,
  hasNotFunctionID,
  isEnabled = true,
}: UseRolesReadQueryProps): UseQueryResult<
  Awaited<ReturnType<typeof Roles.prototype.get>>,
  Error
> => {
  const tytoClient = useTytoClient()

  const params: Parameters<typeof Roles.prototype.get>[0] = {
    domainID,
    hasFunctionID,
    hasNotFunctionID,
  }

  return useQuery<Awaited<ReturnType<typeof Roles.prototype.get>>, Error>({
    queryKey: [tytoClient.Roles.endpoint, params],
    enabled: isEnabled,
    queryFn: () => tytoClient.Roles.get({ ...params }),
  })
}

export default useRolesReadQuery
