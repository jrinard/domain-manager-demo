import { useMutation } from '@tanstack/react-query'
import { useTytoClient, Tasks } from '@tyto/client'
import { omit, get } from 'lodash'

interface UseMutationProps {
  cacheKey?: string
  onSuccess: (
    responseData: Omit<
      Awaited<ReturnType<typeof Tasks.prototype.put>>,
      'session' | 'links' | 'error'
    > | null
  ) => void
  onError?: (error: unknown) => void
}

function useEventAgendaUpdateMutation<TypeOverrides>({
  cacheKey,
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.Tasks.endpoint, 'update', cacheKey],
    mutationFn: async (
      props: Parameters<typeof Tasks.prototype.put>[0] & TypeOverrides
    ) => {
      return await tytoClient.Tasks.put(props)
    },
    onSettled(data, error) {
      if (
        !error &&
        data &&
        ['cmdPersistTask'].includes(get(data, 'error.msg'))
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

export { useEventAgendaUpdateMutation }
export default useEventAgendaUpdateMutation
