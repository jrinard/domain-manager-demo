import { useMutation } from '@tanstack/react-query'
import { useTytoClient, ClientServiceNoteAttach } from '@tyto/client'
import { omit, get } from 'lodash'

interface UseMutationProps {
  cacheKey?: string
  onSuccess: (
    responseData: Omit<
      Awaited<ReturnType<typeof ClientServiceNoteAttach.prototype.post>>,
      'session' | 'links' | 'error'
    > | null,
  ) => void
  onError?: (error: unknown) => void
}

function useClientServiceNoteAttachCreateMutation<TypeOverrides>({
  cacheKey,
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.ClientServiceNoteAttach.endpoint, cacheKey],
    mutationFn: async (
      props: Parameters<typeof ClientServiceNoteAttach.prototype.post>[0] &
        TypeOverrides,
    ) => {
      return await tytoClient.ClientServiceNoteAttach.post(props)
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

export { useClientServiceNoteAttachCreateMutation }
export default useClientServiceNoteAttachCreateMutation
