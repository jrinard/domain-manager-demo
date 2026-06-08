import { useMutation } from '@tanstack/react-query'
import { useTytoClient, Badges } from '@tyto/client'
import { omit, get } from 'lodash'

interface BaseParams {
  domainID?: number
  activeStatus?: string
}

interface AddBadgeAssetParams extends BaseParams {
  command: 'addbadgeasset'
  tempFileName: string
  badgeID: number
  encoding?: string
}

interface UseBadgeUpdateMutationProps {
  cacheKey?: string
  onSuccess?: (
    responseData: Omit<
      Awaited<ReturnType<typeof Badges.prototype.post>>,
      'session' | 'links' | 'error'
    > | null,
  ) => void
  onError?: (error: unknown) => void
}
//* Copy of Update isolated for add asset
function useBadgeAddAssetMutation({
  cacheKey,
  onSuccess,
  onError,
}: UseBadgeUpdateMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.ASP.Badge.endpoint, cacheKey],
    mutationFn: async ({ params }: { params: AddBadgeAssetParams }) => {
      return await tytoClient.ASP.Badge.postForm({ ...params })
    },
    onSettled(data, error) {
      if (!error && data) {
        if (data.error && ['initialized', ''].includes(data.error.msg)) {
          onError?.(data.error)
        } else {
          onSuccess?.(omit(data, 'error', 'links', 'session') || null)
        }
      } else {
        onError?.(error || get(data, 'error.msg'))
      }
    },
  })
}

export { useBadgeAddAssetMutation }
export default useBadgeAddAssetMutation
