import { useMutation } from '@tanstack/react-query'
import { useTytoClient, PersonCustomTab } from '@tyto/client'
import { omit, get } from 'lodash'

interface UseMutationProps {
  cacheKey?: string
  onSuccess: (
    responseData: Omit<
      Awaited<ReturnType<typeof PersonCustomTab.prototype.post>>,
      'session' | 'links' | 'error'
    > | null
  ) => void
  onError?: (error: unknown) => void
}

function usePersonCustomTabCreateMutation<TypeOverrides>({
  cacheKey,
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.PersonCustomTab.endpoint, cacheKey],
    mutationFn: async (
      props: Parameters<typeof PersonCustomTab.prototype.post>[0] &
        TypeOverrides
    ) => {
      return await tytoClient.PersonCustomTab.post(props)
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

export { usePersonCustomTabCreateMutation }
export default usePersonCustomTabCreateMutation
