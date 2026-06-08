import { useMutation } from '@tanstack/react-query'
import { useTytoClient, Team } from '@tyto/client'
import { omit, get } from 'lodash'

interface UseMutationProps<TypeOverrides = unknown> {
  cacheKey?: string
  onSuccess: (
    responseData: Omit<
      Awaited<ReturnType<typeof Team.prototype.post>>,
      'session' | 'links' | 'error'
    > | null,
    variables: TypeOverrides & Parameters<typeof Team.prototype.post>[0],
  ) => void
  onError?: (
    error: unknown,
    variables: TypeOverrides & Parameters<typeof Team.prototype.post>[0],
  ) => void
}

function useTeamCreateMutation<TypeOverrides = unknown>({
  cacheKey,
  onSuccess,
  onError,
}: UseMutationProps<TypeOverrides>) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.Team.endpoint, cacheKey],
    mutationFn: async (
      props: Parameters<typeof Team.prototype.post>[0] & TypeOverrides,
    ) => {
      return await tytoClient.Team.post(props)
    },
    onSettled(data, error, variables) {
      if (!error && data && get(data, 'error.msg') === 'initialized') {
        onSuccess?.(omit(data, 'error', 'links', 'session') || null, variables)
      } else if (error) {
        onError?.(error, variables)
      } else {
        onError?.(get(data, 'error.msg'), variables)
      }
    },
  })
}

export { useTeamCreateMutation }
export default useTeamCreateMutation
