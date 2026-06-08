import { useMutation } from '@tanstack/react-query'
import { useTytoClient, PersonAccount } from '@tyto/client'
import { omit, get } from 'lodash'

interface UseMutationProps {
  cacheKey?: string
  onSuccess: (
    responseData: Omit<
      Awaited<ReturnType<typeof PersonAccount.prototype.put>>,
      'session' | 'links' | 'error'
    > | null,
  ) => void
  onError?: (error: unknown) => void
}

function usePersonAccountUpdateMutation<TypeOverrides>({
  cacheKey,
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.PersonAccount.endpoint, cacheKey],
    mutationFn: async (
      props: Parameters<typeof PersonAccount.prototype.put>[0] & TypeOverrides,
    ) => {
      return await tytoClient.PersonAccount.put(props)
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

export { usePersonAccountUpdateMutation }
export default usePersonAccountUpdateMutation
