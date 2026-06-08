import { useQuery } from '@tanstack/react-query'
import { useTytoClient } from '@tyto/client'
import { SANE_REACT_QUERY_DEFAULTS } from '../constants'
import { useQueryKeys } from './useQueryKeys'

type TCType = ReturnType<typeof useTytoClient>
type EndpointMethod = TCType['Team']['get']
type GetParams = NonNullable<Parameters<EndpointMethod>[0]>
type GetResp = Awaited<ReturnType<EndpointMethod>>

export const useTeamQuery = ({
  isEnabled = true,
  ...args
}: GetParams & { isEnabled?: boolean }) => {
  const tytoClient = useTytoClient()
  const queryKeyFns = useQueryKeys()

  return useQuery<GetResp, Error>({
    ...SANE_REACT_QUERY_DEFAULTS,
    enabled: isEnabled,
    queryKey: queryKeyFns.team(args.teamID),
    queryFn: async () => {
      const resp = await tytoClient.Team.get({
        ...args,
      })

      return resp
    },
    retry: (failureCount, error: Error & { response?: { status?: number } }) => {
      if (failureCount > 2) {
        return false
      }
      return error?.response?.status !== 403
    },
  })
}

export default useTeamQuery
