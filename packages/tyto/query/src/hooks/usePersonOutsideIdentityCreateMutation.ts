import { useMutation } from '@tanstack/react-query'
import { useTytoClient, PersonOutsideIdentity } from '@tyto/client'
import { omit, get } from 'lodash'

interface UseMutationProps {
  cacheKey?: string
  onSuccess: (
    responseData: Omit<
      Awaited<ReturnType<typeof PersonOutsideIdentity.prototype.post>>,
      'session' | 'links' | 'error'
    > | null,
  ) => void
  onError?: (error: unknown) => void
}

function usePersonOutsideIdentityCreateMutation<TypeOverrides>({
  cacheKey,
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.PersonOutsideIdentity.endpoint, cacheKey],
    mutationFn: async (
      props: Parameters<typeof PersonOutsideIdentity.prototype.post>[0] &
        TypeOverrides,
    ) => {
      return await tytoClient.PersonOutsideIdentity.post(props)
    },
    onSettled(data, error) {
      if (!error && data) {
        onSuccess(omit(data, 'error', 'links', 'session') || null)
      } else if (error) {
        onError?.(error)
      } else {
        onError?.(get(data, 'error.msg'))
      }
    },
  })
}

export { usePersonOutsideIdentityCreateMutation }
export default usePersonOutsideIdentityCreateMutation
