import { useMutation } from '@tanstack/react-query'
import { useTytoClient, CatalogPermission } from '@tyto/client'
import { omit, get } from 'lodash'

interface UseMutationProps {
  cacheKey?: string
  onSuccess: (
    responseData: Omit<
      Awaited<ReturnType<typeof CatalogPermission.prototype.put>>,
      'session' | 'links' | 'error'
    > | null,
  ) => void
  onError?: (error: unknown) => void
}

function useCatalogPermissionUpdateMutation<TypeOverrides>({
  cacheKey,
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.CatalogPermission.endpoint, cacheKey],
    mutationFn: async (
      props: Parameters<typeof CatalogPermission.prototype.put>[0] &
        TypeOverrides,
    ) => {
      return await tytoClient.CatalogPermission.put(props)
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

export { useCatalogPermissionUpdateMutation }
export default useCatalogPermissionUpdateMutation
