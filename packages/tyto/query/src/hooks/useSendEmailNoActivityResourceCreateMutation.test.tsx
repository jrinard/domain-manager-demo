import { useMutation } from '@tanstack/react-query'
import { useTytoClient, SendEmailNoActivity } from '@tyto/client'
import { omit } from 'lodash'

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
    onSuccess: (data) => {
      onSuccess(omit(data, 'error', 'links', 'session') || null)
    },
    onError: (error) => {
      console.error('Mutation encountered an error:', error)
      onError?.(error)
    },
  })
}

export { useSendEmailNoActivityResourceCreateMutation }
export default useSendEmailNoActivityResourceCreateMutation
