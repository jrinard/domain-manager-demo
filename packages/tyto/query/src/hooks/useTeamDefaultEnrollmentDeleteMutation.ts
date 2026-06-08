import { useMutation } from '@tanstack/react-query'
import { useTytoClient, TeamDefaultEnrollment } from '@tyto/client'
import { omit, get } from 'lodash'

interface UseMutationProps {
  cacheKey?: string
  onSuccess: (
    responseData: Omit<
      Awaited<ReturnType<typeof TeamDefaultEnrollment.prototype.delete>>,
      'session' | 'links' | 'error'
    > | null,
  ) => void
  onError?: (error: unknown) => void
}

function useTeamDefaultEnrollmentDeleteMutation<TypeOverrides>({
  cacheKey,
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.TeamDefaultEnrollment.endpoint, cacheKey],
    mutationFn: async (
      props: Parameters<typeof TeamDefaultEnrollment.prototype.delete>[0] &
        TypeOverrides,
    ) => {
      return await tytoClient.TeamDefaultEnrollment.delete(props)
    },
    onSettled(data, error) {
      if (
        !error &&
        data &&
        ['initialized', 'success', ''].includes(get(data, 'error.msg'))
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

export { useTeamDefaultEnrollmentDeleteMutation }
export default useTeamDefaultEnrollmentDeleteMutation
