import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTytoClient, TeamToolsConfig } from '@tyto/client'
import { get } from 'lodash'
import { useQueryKeys } from './useQueryKeys'

interface UseMutationProps {
  cacheKey?: string
  onSuccess: (responseData: unknown) => void
  onError?: (error: unknown) => void
}

function useTeamToolsConfigDeleteMutation({
  cacheKey,
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()
  const queryClient = useQueryClient()
  const queryKeyFns = useQueryKeys()

  return useMutation({
    mutationKey: [tytoClient.TeamTools.Config?.endpoint, 'delete', cacheKey],
    mutationFn: async (
      props: Parameters<typeof TeamToolsConfig.prototype.delete>[0],
    ) => {
      return await tytoClient.TeamTools.Config?.delete(props)
    },
    onSettled(data, error, variables) {
      if (!error && data && get(data, 'error.msg') === 'initialized') {
        //* Invalidate Team query cache to refresh the teamToolsConfig (now null/undefined)
        const teamRoot = variables?.teamRoot
        if (teamRoot) {
          void queryClient.invalidateQueries({
            queryKey: queryKeyFns.team(teamRoot),
          })
        }

        onSuccess(data)
      } else if (error) {
        onError?.(error)
      } else {
        onError?.(get(data, 'error.msg'))
      }
    },
  })
}

export { useTeamToolsConfigDeleteMutation }
export default useTeamToolsConfigDeleteMutation
