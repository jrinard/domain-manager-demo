import { useMutation } from '@tanstack/react-query'
import { useTytoClient, TeamBanner } from '@tyto/client'
import { omit, get } from 'lodash'

interface UseMutationProps {
  cacheKey?: string
  onSuccess: (
    responseData: Omit<
      Awaited<ReturnType<typeof TeamBanner.prototype.post>>,
      'session' | 'links' | 'error'
    > | null
  ) => void
  onError?: (error: unknown) => void
}

function useTeamBannerCreateMutation<TypeOverrides>({
  cacheKey,
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.TeamBanner.endpoint, cacheKey],
    mutationFn: async (
      props: Parameters<typeof TeamBanner.prototype.post>[0] & TypeOverrides
    ) => {
      return await tytoClient.TeamBanner.post(props)
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

export { useTeamBannerCreateMutation }
export default useTeamBannerCreateMutation
