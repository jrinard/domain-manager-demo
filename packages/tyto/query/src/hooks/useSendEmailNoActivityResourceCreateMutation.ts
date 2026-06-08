import { useMutation } from '@tanstack/react-query'
import { useTytoClient, SendEmailNoActivity } from '@tyto/client'
import { omit, get } from 'lodash'

interface UseMutationProps {
  cacheKey?: string
  onSuccess: (
    responseData: Omit<
      Awaited<ReturnType<typeof SendEmailNoActivity.prototype.post>>,
      'session' | 'links' | 'error'
    > | null,
  ) => void
  onError?: (error: unknown) => void
}

function useSendEmailNoActivityResourceCreateMutation<TypeOverrides>({
  cacheKey,
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.SendEmailNoActivity.endpoint, cacheKey],
    mutationFn: async (
      props: Parameters<typeof SendEmailNoActivity.prototype.post>[0] &
        TypeOverrides,
    ) => {
      try {
        const response = await tytoClient.SendEmailNoActivity.post(props)
        return response
      } catch (error) {
        console.error('Mutation function error:', error)
        throw error
      }
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

export { useSendEmailNoActivityResourceCreateMutation }
export default useSendEmailNoActivityResourceCreateMutation
