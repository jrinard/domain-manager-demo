import { useMemo } from 'react'

import { useTeamsByFunctionQuery, useQueryKeys } from '@tyto/query'
import { useQueryClient } from '@tyto/query'

type TBFArgs = Parameters<typeof useTeamsByFunctionQuery>[0]
export type TeamTypeFilter = 'ocTEAM' | 'ocDOMAIN' | 'ocPROJECT'

const TEAMS_BY_FUNCTION_ARGS: TBFArgs = {
  functionName: 'Team Membership',
  operation: 'ocVIEW',
  withExtendedDetails: true,
}

/**
 * Maps filter flags to API teamType when we can restrict server-side.
 * API teamType accepts a single value, so we can only use it when exactly
 * two types are excluded (leaving one type to request).
 */
function getApiTeamTypeFromFilters(
  filterOutTeams: boolean,
  filterOutDomains: boolean,
  filterOutProjects: boolean,
): TeamTypeFilter | undefined {
  if (filterOutProjects && filterOutTeams) return 'ocDOMAIN'
  if (filterOutProjects && filterOutDomains) return 'ocTEAM'
  if (filterOutTeams && filterOutDomains) return 'ocPROJECT'
  return undefined
}

export function useTeamsFiltered({
  teamType,
  filterOutTeams,
  filterOutDomains,
  filterOutProjects,
  operation,
  isEnabled = true,
}: {
  /** Restrict to a single team type at the API level (faster, smaller payload) */
  teamType?: TeamTypeFilter
  filterOutTeams?: boolean
  filterOutDomains?: boolean
  filterOutProjects?: boolean
  operation?: 'ocVIEW' | 'ocADD' | 'ocCHANGE' | 'ocDELETE'
  isEnabled?: boolean
}) {
  const apiTeamType = useMemo(() => {
    if (teamType) return teamType
    return getApiTeamTypeFromFilters(
      !!filterOutTeams,
      !!filterOutDomains,
      !!filterOutProjects,
    )
  }, [
    teamType,
    !!filterOutTeams,
    !!filterOutDomains,
    !!filterOutProjects,
  ])

  const teamsQuery = useTeamsByFunctionQuery({
    ...TEAMS_BY_FUNCTION_ARGS,
    ...(operation && { operation }),
    ...(apiTeamType && { teamType: apiTeamType }),
    isEnabled,
  })

  const teamsFiltered = useMemo(() => {
    if (apiTeamType) {
      return teamsQuery.data?.teams ?? []
    }
    return (
      teamsQuery.data?.teams?.filter((team) => {
        if (filterOutDomains && team.teamType === 'ocDOMAIN') return false
        if (filterOutTeams && team.teamType === 'ocTEAM') return false
        if (filterOutProjects && team.teamType === 'ocPROJECT') return false
        return true
      }) ?? []
    )
  }, [
    apiTeamType,
    !!filterOutTeams,
    !!filterOutDomains,
    !!filterOutProjects,
    teamsQuery.data,
  ])

  return {
    ...teamsQuery,
    isRefetching: teamsQuery.isFetching,
    refetch: teamsQuery.refetch,
    teams: teamsFiltered,
  }
}

type TeamsResp = NonNullable<ReturnType<typeof useTeamsByFunctionQuery>['data']>
type TeamsData = TeamsResp['teams']

export function useMutateTeamsByFunctionData(
  tbfParams?: Omit<TBFArgs, 'isEnabled'>,
) {
  const queryKey = useQueryKeys()
  const queryClient = useQueryClient()

  return {
    setCacheData: (callback: (teams: TeamsData) => TeamsData) => {
      const key = queryKey.teamsByFunction({
        ...TEAMS_BY_FUNCTION_ARGS,
        ...tbfParams,
      })
      const currentCacheData = queryClient.getQueryData<TeamsResp>(key)

      if (!currentCacheData?.teams) return

      const mutatedCacheData = callback(currentCacheData.teams)

      queryClient.setQueryData(key, {
        ...currentCacheData,
        teams: mutatedCacheData,
      })
    },
  }
}

export default useTeamsFiltered
