import { useMutation } from '@tanstack/react-query'
import { useTytoClient, CustomTab } from '@tyto/client'
import { omit, get } from 'lodash'

interface UseMutationProps {
  cacheKey?: string
  onSuccess: (
    responseData: Omit<
      Awaited<ReturnType<typeof CustomTab.prototype.delete>>,
      'session' | 'links' | 'error'
    > | null
  ) => void
  onError?: (error: unknown) => void
}

function useCustomTabDeleteMutation<TypeOverrides>({
  cacheKey,
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.CustomTab.endpoint, cacheKey],
    mutationFn: async (
      props: Parameters<typeof CustomTab.prototype.delete>[0] & TypeOverrides
    ) => {
      return await tytoClient.CustomTab.delete(props)
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

export { useCustomTabDeleteMutation }
export default useCustomTabDeleteMutation
