import { useMutation } from '@tanstack/react-query'
import { useTytoClient, Domainterms } from '@tyto/client'
import { omit, get } from 'lodash'

interface UseMutationProps {
  cacheKey?: string
  onSuccess: (
    responseData: Omit<
      Awaited<ReturnType<typeof Domainterms.prototype.put>>,
      'session' | 'links' | 'error'
    > | null,
  ) => void
  onError?: (error: unknown) => void
}

function useDomaintermsUpdateMutation<TypeOverrides>({
  cacheKey,
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.Domainterms.endpoint, cacheKey],
    mutationFn: async (
      props: Parameters<typeof Domainterms.prototype.put>[0] & TypeOverrides,
    ) => {
      return await tytoClient.Domainterms.put(props)
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

export { useDomaintermsUpdateMutation }
export default useDomaintermsUpdateMutation
