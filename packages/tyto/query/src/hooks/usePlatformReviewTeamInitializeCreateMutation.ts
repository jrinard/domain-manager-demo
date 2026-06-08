import { useMutation } from '@tanstack/react-query'
import { useTytoClient, PlatformReviewTeamInitialize } from '@tyto/client'
import { omit, get } from 'lodash'

interface UseMutationProps {
  cacheKey?: string
  onSuccess: (
    responseData: Omit<
      Awaited<ReturnType<typeof PlatformReviewTeamInitialize.prototype.post>>,
      'session' | 'links' | 'error'
    > | null,
  ) => void
  onError?: (error: unknown) => void
}

function usePlatformReviewTeamInitializeCreateMutation<TypeOverrides>({
  cacheKey,
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.PlatformReviewTeamInitialize.endpoint, cacheKey],
    mutationFn: async (
      props: Parameters<typeof PlatformReviewTeamInitialize.prototype.post>[0] &
        TypeOverrides,
    ) => {
      return await tytoClient.PlatformReviewTeamInitialize.post(props)
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

export { usePlatformReviewTeamInitializeCreateMutation }
export default usePlatformReviewTeamInitializeCreateMutation
