import { useMutation } from '@tanstack/react-query'
import { useTytoClient, Enrollment } from '@tyto/client'
import { omit, get } from 'lodash'

interface UseMutationProps {
  cacheKey?: string
  onSuccess: (
    responseData: Omit<
      Awaited<ReturnType<typeof Enrollment.prototype.delete>>,
      'session' | 'links' | 'error'
    > | null
  ) => void
  onError?: (error: unknown) => void
}

function useEnrollmentDeleteMutation<TypeOverrides>({
  cacheKey,
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.Enrollment.endpoint, cacheKey],
    mutationFn: async (
      props: Parameters<typeof Enrollment.prototype.delete>[0] & TypeOverrides
    ) => {
      return await tytoClient.Enrollment.delete(props)
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

export { useEnrollmentDeleteMutation }
export default useEnrollmentDeleteMutation
