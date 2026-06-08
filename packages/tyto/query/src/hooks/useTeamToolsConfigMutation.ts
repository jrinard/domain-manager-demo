import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTytoClient, TeamToolsConfig } from '@tyto/client'
import { omit, get } from 'lodash'
import { useQueryKeys } from './useQueryKeys'

interface UseMutationProps {
  cacheKey?: string
  onSuccess: (responseData: unknown) => void
  onError?: (error: unknown) => void
}

function useTeamToolsConfigMutation({
  cacheKey,
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()
  const queryClient = useQueryClient()
  const queryKeyFns = useQueryKeys()

  return useMutation({
    mutationKey: [tytoClient.TeamTools.Config?.endpoint, cacheKey],
    mutationFn: async (
      props: Parameters<typeof TeamToolsConfig.prototype.put>[0],
    ) => {
      return await tytoClient.TeamTools.Config?.put(props)
    },
    onSettled(data, error, variables) {
      if (!error && data && get(data, 'error.msg') === 'initialized') {
        //* Invalidate Team query cache to refresh the teamToolsConfig
        const teamRoot = variables?.teamRoot
        if (teamRoot) {
          void queryClient.invalidateQueries({
            queryKey: queryKeyFns.team(teamRoot),
          })
        }

        onSuccess(omit(data, 'error', 'links', 'session'))
      } else if (error) {
        onError?.(error)
      } else {
        onError?.(get(data, 'error.msg'))
      }
    },
  })
}

export { useTeamToolsConfigMutation }
export default useTeamToolsConfigMutation
