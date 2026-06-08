import { useMutation } from '@tanstack/react-query'
import { useTytoClient, Person } from '@tyto/client'
import { omit, get } from 'lodash'

interface UseMutationProps {
  onSuccess: (
    responseData: Omit<
      Awaited<ReturnType<typeof Person.prototype.post>>,
      'session' | 'links' | 'error'
    > | null
  ) => void
  onError?: (error: unknown) => void
}
function usePersonCreateMutation<TypeOverrides>({
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.Person.endpoint],
    mutationFn: async (
      props: Parameters<typeof Person.prototype.post>[0] & TypeOverrides
    ) => {
      return await tytoClient.Person.post(props)
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

export { usePersonCreateMutation }
export default usePersonCreateMutation
