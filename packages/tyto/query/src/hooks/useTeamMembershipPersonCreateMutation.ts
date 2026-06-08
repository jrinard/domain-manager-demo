import { useMutation } from '@tanstack/react-query'
import { useTytoClient, TeamMembershipPerson } from '@tyto/client'
import { omit, get } from 'lodash'

interface UseMutationProps {
  cacheKey?: string
  onSuccess: (
    responseData: Omit<
      Awaited<ReturnType<typeof TeamMembershipPerson.prototype.post>>,
      'session' | 'links' | 'error'
    > | null,
  ) => void
  onError?: (error: unknown) => void
}

function useTeamMembershipPersonCreateMutation<TypeOverrides>({
  cacheKey,
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.TeamMembershipPerson.endpoint, cacheKey],
    mutationFn: async (
      props: Parameters<typeof TeamMembershipPerson.prototype.post>[0] &
        TypeOverrides & { isTeamLeader?: boolean },
    ) => {
      return await tytoClient.TeamMembershipPerson.post(props)
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
    retry: (failureCount, error) => {
      return false
    },
  })
}

export { useTeamMembershipPersonCreateMutation }
export default useTeamMembershipPersonCreateMutation
