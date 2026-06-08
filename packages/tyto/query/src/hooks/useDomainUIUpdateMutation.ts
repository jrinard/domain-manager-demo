import { useMutation } from '@tanstack/react-query'
import { useTytoClient, DomainUI } from '@tyto/client'
import { omit, get } from 'lodash'

interface UseMutationProps {
  cacheKey?: string
  onSuccess: (
    responseData: Omit<
      Awaited<ReturnType<typeof DomainUI.prototype.put>>,
      'session' | 'links' | 'error'
    > | null,
  ) => void
  onError?: (error: unknown) => void
}

function useDomainUIUpdateMutation<TypeOverrides>({
  cacheKey,
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.DomainUI.endpoint, cacheKey],
    mutationFn: async (
      props: Parameters<typeof DomainUI.prototype.put>[0] & TypeOverrides,
    ) => {
      return await tytoClient.DomainUI.put(props)
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

export { useDomainUIUpdateMutation }
export default useDomainUIUpdateMutation
