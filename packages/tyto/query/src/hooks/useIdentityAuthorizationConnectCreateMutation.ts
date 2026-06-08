import { useMutation } from '@tanstack/react-query'
import { useTytoClient, IdentityAuthorizationConnect } from '@tyto/client'
import { omit, get } from 'lodash'

interface UseMutationProps {
  cacheKey?: string
  onSuccess: (
    responseData: Omit<
      Awaited<ReturnType<typeof IdentityAuthorizationConnect.prototype.post>>,
      'session' | 'links' | 'error'
    > | null,
  ) => void
  onError?: (error: unknown) => void
}

function useIdentityAuthorizationConnectCreateMutation<TypeOverrides>({
  cacheKey,
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [
      tytoClient.IdentityAuthorizationConnect.endpoint,
      { cacheKey },
    ],
    mutationFn: async (
      props: Parameters<typeof IdentityAuthorizationConnect.prototype.post>[0] &
        TypeOverrides,
    ) => {
      return await tytoClient.IdentityAuthorizationConnect.post(props, {
        maxRedirects: 0,
      })
    },
    onSettled(data, error) {
      // * eslint-disable-next-line no-console
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

export { useIdentityAuthorizationConnectCreateMutation }
export default useIdentityAuthorizationConnectCreateMutation
