import { useMutation } from '@tanstack/react-query'
import { useTytoClient, Badges } from '@tyto/client'
import { omit, get } from 'lodash'

interface BaseParams {
  domainID?: number
  activeStatus?: string
}

export interface AddBadgeParams extends BaseParams {
  command: 'addbadge'
  primaryElementID: number
  badgeName: string
  badgeDesc: string
  outsideID: string
  shareViewWithDomain?: number
}

export type BadgeCommandParameters = AddBadgeParams

interface UseBadgeCreateMutationProps {
  cacheKey?: string
  onSuccess?: (
    responseData: Omit<
      Awaited<ReturnType<typeof Badges.prototype.post>>,
      'session' | 'links' | 'error'
    > | null,
  ) => void
  onError?: (error: unknown) => void
}

function useBadgeCreateMutation({
  cacheKey,
  onSuccess,
  onError,
}: UseBadgeCreateMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.ASP.Badge.endpoint, cacheKey],
    mutationFn: async ({ params }: { params: AddBadgeParams }) => {
      return await tytoClient.ASP.Badge.post({ ...params })
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

export { useBadgeCreateMutation }
export default useBadgeCreateMutation
