import { useMutation } from '@tanstack/react-query'
import { useTytoClient, TeamCustomTab } from '@tyto/client'
import { omit, get } from 'lodash'

interface UseMutationProps {
  cacheKey?: string
  onSuccess: (
    responseData: Omit<
      Awaited<ReturnType<typeof TeamCustomTab.prototype.delete>>,
      'session' | 'links' | 'error'
    > | null
  ) => void
  onError?: (error: unknown) => void
}

function useTeamCustomTabDeleteMutation<TypeOverrides>({
  cacheKey,
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.TeamCustomTab.endpoint, cacheKey],
    mutationFn: async (
      props: Parameters<typeof TeamCustomTab.prototype.delete>[0] &
        TypeOverrides
    ) => {
      return await tytoClient.TeamCustomTab.delete(props)
    },
    onSettled(data, error) {
      if (!error && data && get(data, 'error.msg') === 'initialized') {
        onSuccess(omit(data, 'error', 'links', 'session') || null)
      } else if (error) {
        onError?.(error)
      } else {
        onError?.(get(data, 'error.msg'))
      }
    },
  })
}

export { useTeamCustomTabDeleteMutation }
export default useTeamCustomTabDeleteMutation
