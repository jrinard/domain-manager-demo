import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useTytoClient, Role } from '@tyto/client'

export type UseRoleReadQueryProps = Parameters<typeof Role.prototype.get>[0] & {
  isEnabled?: boolean
}

export const useRoleReadQuery = ({
  isEnabled = true,
  ...props
}: UseRoleReadQueryProps): UseQueryResult<
  Awaited<ReturnType<typeof Role.prototype.get>>,
  Error
> => {
  const tytoClient = useTytoClient()

  const params: Parameters<typeof Role.prototype.get>[0] = {
    ...props,
  }

  return useQuery<Awaited<ReturnType<typeof Role.prototype.get>>, Error>({
    enabled: isEnabled,
    queryKey: [tytoClient.Role.endpoint, params],
    queryFn: () => tytoClient.Role.get({ ...params }),
  })
}

export default useRoleReadQuery
