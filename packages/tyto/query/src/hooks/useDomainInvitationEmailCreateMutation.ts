import { useMutation } from '@tanstack/react-query'
import { useTytoClient, DomainInvitationEmail } from '@tyto/client'
import { omit, get } from 'lodash'

interface UseMutationProps {
  cacheKey?: string
  onSuccess: (
    responseData: Omit<
      Awaited<ReturnType<typeof DomainInvitationEmail.prototype.post>>,
      'session' | 'links' | 'error'
    > | null
  ) => void
  onError?: (error: unknown) => void
}

function useDomainInvitationEmailCreateMutation<TypeOverrides>({
  cacheKey,
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.DomainInvitationEmail.endpoint, cacheKey],
    mutationFn: async (
      props: Parameters<typeof DomainInvitationEmail.prototype.post>[0] &
        TypeOverrides
    ) => {
      return await tytoClient.DomainInvitationEmail.post(props)
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

export { useDomainInvitationEmailCreateMutation }
export default useDomainInvitationEmailCreateMutation
