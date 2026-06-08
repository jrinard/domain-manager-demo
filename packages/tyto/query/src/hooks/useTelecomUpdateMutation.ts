import { useMutation } from '@tanstack/react-query'
import { useTytoClient, Telecom } from '@tyto/client'
import { omit, get } from 'lodash'

interface UseMutationProps {
  cacheKey?: string
  onSuccess: (
    responseData: Omit<
      Awaited<ReturnType<typeof Telecom.prototype.put>>,
      'session' | 'links' | 'error'
    > | null
  ) => void
  onError?: (error: unknown) => void
}

function useTelecomUpdateMutation<TypeOverrides>({
  cacheKey,
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.Telecom.endpoint, cacheKey],
    mutationFn: async (
      props: Parameters<typeof Telecom.prototype.put>[0] & TypeOverrides
    ) => {
      return await tytoClient.Telecom.put(props)
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

export { useTelecomUpdateMutation }
export default useTelecomUpdateMutation
