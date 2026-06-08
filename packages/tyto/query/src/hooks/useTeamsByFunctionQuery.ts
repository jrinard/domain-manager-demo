import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { TeamsByFunction, useTytoClient } from '@tyto/client'

import { useQueryKeys } from './useQueryKeys'

export type UseTeamsByFunctionQueryProps = Parameters<
  typeof TeamsByFunction.prototype.get
>[0] & {
  isEnabled?: boolean
}

export const useTeamsByFunctionQuery = ({
  isEnabled = true,
  operation = 'ocVIEW',
  ...props
}: UseTeamsByFunctionQueryProps): UseQueryResult<
  Awaited<ReturnType<typeof TeamsByFunction.prototype.get>>,
  Error
> => {
  const tytoClient = useTytoClient()
  const queryKey = useQueryKeys()
  return useQuery<
    Awaited<ReturnType<typeof TeamsByFunction.prototype.get>>,
    Error
  >({
    enabled: isEnabled,
    queryKey: queryKey.teamsByFunction({
      operation,
      ...props,
    }),
    queryFn: () =>
      tytoClient.TeamsByFunction.get({
        operation,
        ...props,
      }),
  })
}

export default useTeamsByFunctionQuery
