import { useMutation } from '@tanstack/react-query'
import { useTytoClient, PersonPassword } from '@tyto/client'
import { omit, get } from 'lodash'

interface UseMutationProps {
  cacheKey?: string
  onSuccess: (
    responseData: Omit<
      Awaited<ReturnType<typeof PersonPassword.prototype.put>>,
      'session' | 'links' | 'error'
    > | null
  ) => void
  onError?: (error: unknown) => void
}

function usePersonPasswordUpdateMutation<TypeOverrides>({
  cacheKey,
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.PersonPassword.endpoint, cacheKey],
    mutationFn: async (
      props: Parameters<typeof PersonPassword.prototype.put>[0] & TypeOverrides
    ) => {
      return await tytoClient.PersonPassword.put(props)
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

export { usePersonPasswordUpdateMutation }
export default usePersonPasswordUpdateMutation
