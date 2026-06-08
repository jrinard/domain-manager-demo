import { useMutation } from '@tanstack/react-query'
import { useTytoClient, PersonCustomTab } from '@tyto/client'
import { omit, get } from 'lodash'

interface UseMutationProps {
  cacheKey?: string
  onSuccess: (
    responseData: Omit<
      Awaited<ReturnType<typeof PersonCustomTab.prototype.delete>>,
      'session' | 'links' | 'error'
    > | null
  ) => void
  onError?: (error: unknown) => void
}

function usePersonCustomTabDeleteMutation<TypeOverrides>({
  cacheKey,
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.PersonCustomTab.endpoint, cacheKey],
    mutationFn: async (
      props: Parameters<typeof PersonCustomTab.prototype.delete>[0] &
        TypeOverrides
    ) => {
      return await tytoClient.PersonCustomTab.delete(props)
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

export { usePersonCustomTabDeleteMutation }
export default usePersonCustomTabDeleteMutation
