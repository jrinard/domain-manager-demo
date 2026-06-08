import { useMutation } from '@tanstack/react-query'
import { useTytoClient, PersonAbsence } from '@tyto/client'
import { omit, get } from 'lodash'

interface UseMutationProps {
  cacheKey?: string
  onSuccess: (
    responseData: Omit<
      Awaited<ReturnType<typeof PersonAbsence.prototype.put>>,
      'session' | 'links' | 'error'
    > | null
  ) => void
  onError?: (error: unknown) => void
}

function usePersonAbsenceUpdateMutation<TypeOverrides>({
  cacheKey,
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.PersonAbsence.endpoint, cacheKey],
    mutationFn: async (
      props: Parameters<typeof PersonAbsence.prototype.put>[0] & TypeOverrides
    ) => {
      return await tytoClient.PersonAbsence.put(props)
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

export { usePersonAbsenceUpdateMutation }
export default usePersonAbsenceUpdateMutation
