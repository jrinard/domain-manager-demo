import { useMutation } from '@tanstack/react-query'
import { useTytoClient, TeamMembershipPerson } from '@tyto/client'
import { omit, get } from 'lodash'

interface UseMutationProps {
  cacheKey?: string
  onSuccess: (
    responseData: Omit<
      Awaited<ReturnType<typeof TeamMembershipPerson.prototype.put>>,
      'session' | 'links' | 'error'
    > | null
  ) => void
  onError?: (error: unknown) => void
}

function useTeamMembershipPersonUpdateMutation<TypeOverrides>({
  cacheKey,
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.TeamMembershipPerson.endpoint, cacheKey],
    mutationFn: async (
      props: Parameters<typeof TeamMembershipPerson.prototype.put>[0] &
        TypeOverrides
    ) => {
      return await tytoClient.TeamMembershipPerson.put(props)
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

export { useTeamMembershipPersonUpdateMutation }
export default useTeamMembershipPersonUpdateMutation
