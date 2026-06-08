import { useMutation } from '@tanstack/react-query'
import { useTytoClient, DomainUIImage } from '@tyto/client'
import { omit, get } from 'lodash'

interface UseMutationProps {
  cacheKey?: string
  onSuccess: (
    responseData: Omit<
      Awaited<ReturnType<typeof DomainUIImage.prototype.delete>>,
      'session' | 'links' | 'error'
    > | null,
  ) => void
  onError?: (error: unknown) => void
}

function useDomainUIImageDeleteMutation<TypeOverrides>({
  cacheKey,
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.DomainUIImage.endpoint, cacheKey],
    mutationFn: async (
      props: Parameters<typeof DomainUIImage.prototype.delete>[0] &
        TypeOverrides,
    ) => {
      return await tytoClient.DomainUIImage.delete(props)
    },
    onSettled(data, error) {
      if (
        !error &&
        data &&
        (!data.error || ['initialized', ''].includes(get(data, 'error.msg')))
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

export { useDomainUIImageDeleteMutation }
export default useDomainUIImageDeleteMutation
