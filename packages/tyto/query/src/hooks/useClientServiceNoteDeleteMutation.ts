import { useMutation } from '@tanstack/react-query'
import { useTytoClient, ClientServiceNote } from '@tyto/client'
import { omit, get } from 'lodash'

interface UseMutationProps {
  cacheKey?: string
  onSuccess: (
    responseData: Omit<
      Awaited<ReturnType<typeof ClientServiceNote.prototype.delete>>,
      'session' | 'links' | 'error'
    > | null,
  ) => void
  onError?: (error: unknown) => void
}

function useClientServiceNoteDeleteMutation<TypeOverrides>({
  cacheKey,
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.ClientServiceNote.endpoint, cacheKey],
    mutationFn: async (
      props: Parameters<typeof ClientServiceNote.prototype.delete>[0] &
        TypeOverrides,
    ) => {
      return await tytoClient.ClientServiceNote.delete(props)
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

export { useClientServiceNoteDeleteMutation }
export default useClientServiceNoteDeleteMutation
