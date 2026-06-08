import { useQueryClient } from '@tyto/query'
import { useTeamQuery, useQueryKeys } from '@tyto/query'
import { useParamNumber } from '@spacedock/use-param-number'

export function useTeamFromURL() {
  const teamID = useParamNumber('teamID')
  const teamQuery = useTeamQuery({ teamID: teamID ?? 0, isEnabled: !!teamID })

  return teamQuery
}

type TeamResp = NonNullable<ReturnType<typeof useTeamQuery>['data']>
type TeamData = TeamResp['team']

export function useMutateTeamData(teamID: number) {
  const queryKey = useQueryKeys()
  const queryClient = useQueryClient()

  return {
    setCacheData: (callback: (team: TeamData) => TeamData) => {
      const key = queryKey.team(teamID)
      const currentCacheData = queryClient.getQueryData<TeamResp>(key)

      if (!currentCacheData?.team) return

      const mutatedCacheData = callback(currentCacheData.team)

      queryClient.setQueryData(key, {
        ...currentCacheData,
        team: mutatedCacheData,
      })
    },
  }
}

export default useTeamFromURL
