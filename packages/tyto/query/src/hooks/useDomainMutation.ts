import { useMutation } from '@tanstack/react-query'
import { Domain, useTytoClient } from '@tyto/client'
import type { Endpoints } from '@tyto/client'
import { get, omit } from 'lodash'

type DomainArgs = Endpoints.Tyto.Domain.Post.Parameters

function useDomainMutation<TypeOverrides>({
  onSuccess,
  onError,
}: {
  onSuccess: (
    responseData: Omit<
      Awaited<ReturnType<typeof Domain.prototype.post>>,
      'session' | 'links' | 'error'
    > | null,
  ) => void
  onError?: (error: unknown) => void
}) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.Domain.endpoint],
    mutationFn: async (props: DomainArgs & TypeOverrides) => {
      return await tytoClient.Domain.post(props)
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

export { useDomainMutation }
export default useDomainMutation
