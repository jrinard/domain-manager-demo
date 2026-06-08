import { useMutation } from '@tanstack/react-query'
import { useTytoClient, Event } from '@tyto/client'
import { omit, get } from 'lodash'

interface UseMutationProps {
  cacheKey?: string
  onSuccess: (
    responseData: Omit<
      Awaited<ReturnType<typeof Event.prototype.delete>>,
      'session' | 'links' | 'error'
    > | null
  ) => void
  onError?: (error: unknown) => void
}

function useEventDeleteMutation({
  cacheKey,
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.Event.endpoint, cacheKey],
    mutationFn: async (props: Parameters<typeof Event.prototype.delete>[0]) => {
      return await tytoClient.Event.delete(props)
    },
    onSettled(data, error) {
      if (
        !error &&
        data &&
        (get(data, 'error.msg') === 'initialized' ||
          get(data, 'error.msg') === '')
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

export { useEventDeleteMutation }
export default useEventDeleteMutation
