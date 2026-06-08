import { useMutation } from '@tanstack/react-query'
import { useTytoClient, TeamAdmin } from '@tyto/client'
import { omit, get } from 'lodash'

interface UseMutationProps {
  cacheKey?: string
  onSuccess: (
    responseData: Omit<
      Awaited<ReturnType<typeof TeamAdmin.prototype.put>>,
      'session' | 'links' | 'error'
    > | null,
  ) => void
  onError?: (error: unknown) => void
}

function useTeamAdminUpdateMutation<TypeOverrides>({
  cacheKey,
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.TeamAdmin.endpoint, cacheKey],
    mutationFn: async (
      props: Parameters<typeof TeamAdmin.prototype.put>[0] & TypeOverrides,
    ) => {
      return await tytoClient.TeamAdmin.put(props)
    },
    onSettled(data, error) {
      if (
        !error &&
        data &&
        ['initialized', ''].includes(get(data, 'error.msg'))
      ) {
        onSuccess(omit(data, 'error', 'links', 'session') || null)
      } else if (error) {
        onError?.(error)
      } else {
        onError?.(get(data, 'error.msg'))
      }
    },
  })
}

export { useTeamAdminUpdateMutation }
export default useTeamAdminUpdateMutation
