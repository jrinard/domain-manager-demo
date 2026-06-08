import { useMutation } from '@tanstack/react-query'
import { useTytoClient, DomainUIConfiguration } from '@tyto/client'
import { omit, get } from 'lodash'

interface UseMutationProps {
  cacheKey?: string | Record<string, unknown>
  onSuccess: (
    responseData: Omit<
      Awaited<ReturnType<typeof DomainUIConfiguration.prototype.post>>,
      'session' | 'links' | 'error'
    > | null,
  ) => void
  onError?: (error: unknown) => void
}

function useDomainUIConfigurationCreateMutation<TypeOverrides>({
  cacheKey,
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.DomainUIConfiguration.endpoint, cacheKey],
    mutationFn: async (
      props: Parameters<typeof DomainUIConfiguration.prototype.post>[0] &
        TypeOverrides,
    ) => {
      return await tytoClient.DomainUIConfiguration.post(props)
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

export { useDomainUIConfigurationCreateMutation }
export default useDomainUIConfigurationCreateMutation
