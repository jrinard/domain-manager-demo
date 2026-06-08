import { useMutation } from '@tanstack/react-query'
import { useTytoClient, EmailAddress } from '@tyto/client'
import { omit, get } from 'lodash'

interface UseMutationProps {
  cacheKey?: string
  onSuccess: (
    responseData: Omit<
      Awaited<ReturnType<typeof EmailAddress.prototype.post>>,
      'session' | 'links' | 'error'
    > | null
  ) => void
  onError?: (error: unknown) => void
}

function useEmailAddressCreateMutation<TypeOverrides>({
  cacheKey,
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.EmailAddress.endpoint, cacheKey],
    mutationFn: async (
      props: Parameters<typeof EmailAddress.prototype.post>[0] & TypeOverrides
    ) => {
      return await tytoClient.EmailAddress.post(props)
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

export { useEmailAddressCreateMutation }
export default useEmailAddressCreateMutation
