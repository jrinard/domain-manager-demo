import { useMutation } from '@tanstack/react-query'
import { useTytoClient, EventAttendee } from '@tyto/client'
import { omit, get } from 'lodash'

interface UseMutationProps {
  cacheKey?: string
  onSuccess: (
    responseData: Omit<
      Awaited<ReturnType<typeof EventAttendee.prototype.put>>,
      'session' | 'links' | 'error'
    > | null,
  ) => void
  onError?: (error: unknown) => void
}

function useEventAttendeeUpdateMutation<TypeOverrides>({
  cacheKey,
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.EventAttendee.endpoint, cacheKey],
    mutationFn: async (
      props: Parameters<typeof EventAttendee.prototype.put>[0] & TypeOverrides,
    ) => {
      return await tytoClient.EventAttendee.put(props)
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

export { useEventAttendeeUpdateMutation }
export default useEventAttendeeUpdateMutation
