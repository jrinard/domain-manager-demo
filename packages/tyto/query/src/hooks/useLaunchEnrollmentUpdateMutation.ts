import { useMutation } from '@tanstack/react-query'
import { useTytoClient, LaunchEnrollment } from '@tyto/client'
import { omit, get } from 'lodash'

interface UseMutationProps {
  cacheKey?: string
  onSuccess: (
    responseData: Omit<
      Awaited<ReturnType<typeof LaunchEnrollment.prototype.put>>,
      'session' | 'links' | 'error'
    > | null
  ) => void
  onError?: (error: unknown) => void
}

function useLaunchEnrollmentUpdateMutation<TypeOverrides>({
  cacheKey,
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.LaunchEnrollment.endpoint, cacheKey],
    mutationFn: async (
      props: Parameters<typeof LaunchEnrollment.prototype.put>[0] &
        TypeOverrides
    ) => {
      return await tytoClient.LaunchEnrollment.put(props)
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

export { useLaunchEnrollmentUpdateMutation }
export default useLaunchEnrollmentUpdateMutation
