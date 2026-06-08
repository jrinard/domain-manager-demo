import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient, Badges } from '@tyto/client'

interface BaseParams {
  domainID?: number
  activeStatus?: string
}

interface GetBadgeParams extends BaseParams {
  command: 'getbadge'
  badgeID: number
}

interface ListBadgesParams extends BaseParams {
  command: 'listbadges'
  domainID?: number | undefined
  activeStatus: string
}

interface ListBadgesAwardedParams extends BaseParams {
  command: 'listbadgesawarded'
  elementIDs: number
  sort1?: string
  sort2?: string
  sort3?: string
}

interface ListElementsAwardedParams extends BaseParams {
  command: 'listelementsawarded'
  badgeID: number
}

export interface UseBadgeQueryProps {
  params:
    | ListBadgesParams
    | ListBadgesAwardedParams
    | ListElementsAwardedParams
    | GetBadgeParams
  disabled?: boolean
}

type ResponseProps = Awaited<ReturnType<typeof Badges.prototype.post>>

type UseBadgeQueryQueryResult = UseQueryResult<ResponseProps, Error> & {
  queryKey: QueryKey
  invalidate: () => Promise<void>
}

export const useBadgeQuery = ({
  params,
  disabled,
}: UseBadgeQueryProps): UseBadgeQueryQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()
  const queryKey: QueryKey = [tytoClient.ASP.Badge.endpoint, { ...params }]

  return {
    ...useQuery<ResponseProps, Error>({
      enabled: !disabled,
      queryKey,
      queryFn: () => tytoClient.ASP.Badge.get({ ...params }),
    }),
    queryKey,
    invalidate: async () => {
      await queryClient.invalidateQueries({
        queryKey,
      })
    },
  }
}

export default useBadgeQuery
