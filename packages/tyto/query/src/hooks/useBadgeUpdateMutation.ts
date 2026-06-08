import { useMutation } from '@tanstack/react-query'
import { useTytoClient, Badges } from '@tyto/client'
import { omit, get } from 'lodash'

interface BaseParams {
  domainID?: number
  activeStatus?: string
}

interface UpdateBadgeParams extends BaseParams {
  command: 'updatebadge'
  badgeID: number
  badgeName: string
  badgeDesc: string
  outsideID?: string
  shareViewWithDomain?: number
}

interface DeleteBadgeParams extends BaseParams {
  command: 'deletebadge'
  badgeID: number
}

interface AwardBadgeParams extends BaseParams {
  command: 'awardbadge'
  badgeID: number
  elementID: number
}

interface DeleteAwardedBadgeParams extends BaseParams {
  command: 'deleteawardedbadge'
  badgeID: number
  elementID: number
}

interface SetElementBadgeSequenceParams extends BaseParams {
  command: 'setelementbadgesequence'
  badgeID: number
  sequence: number
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

function useBadgeUpdateMutation({
  cacheKey,
  onSuccess,
  onError,
}: UseBadgeUpdateMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.ASP.Badge.endpoint, cacheKey],
    mutationFn: async ({
      params,
    }: {
      params:
        | UpdateBadgeParams
        | DeleteBadgeParams
        | AwardBadgeParams
        | DeleteAwardedBadgeParams
        | SetElementBadgeSequenceParams
    }) => {
      return await tytoClient.ASP.Badge.get({ ...params }) //TODO needs to be get for basic update to work
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

export { useBadgeUpdateMutation }
export default useBadgeUpdateMutation
