import { useMutation } from '@tanstack/react-query'
import { useTytoClient, CustomTab } from '@tyto/client'
import { omit, get } from 'lodash'

interface UseMutationProps {
  cacheKey?: string
  onSuccess: (
    responseData: Omit<
      Awaited<ReturnType<typeof CustomTab.prototype.put>>,
      'session' | 'links' | 'error'
    > | null,
  ) => void
  onError?: (error: unknown) => void
}

function useCustomTabUpdateMutation<TypeOverrides>({
  cacheKey,
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.CustomTab.endpoint, cacheKey],
    mutationFn: async (
      props: Parameters<typeof CustomTab.prototype.put>[0] & TypeOverrides,
    ) => {
      return await tytoClient.CustomTab.put(props)
    },
    onSettled(data, error) {
      if (!error && data && get(data, 'error.sts') === 0) {
        onSuccess(omit(data, 'error', 'links', 'session') || null)
      } else if (error) {
        onError?.(error)
      } else {
        onError?.(get(data, 'error.msg'))
      }
    },
  })
}

export { useCustomTabUpdateMutation }
export default useCustomTabUpdateMutation
