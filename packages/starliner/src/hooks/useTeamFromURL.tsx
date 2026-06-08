import { useTeamQuery } from '@tyto/query'
import { useParamNumber } from '@spacedock/use-param-number'

export function useTeamFromURL() {
  const teamID = useParamNumber('teamID')
  const team = useTeamQuery({ teamID: teamID ?? 551, isEnabled: !!teamID })

  return {
    data: team.data,
    isLoading: team.isLoading,
    error: team.error,
    refetch: team.refetch,
  }
}

export default useTeamFromURL
