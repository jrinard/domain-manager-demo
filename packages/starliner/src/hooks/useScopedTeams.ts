import { useMemo } from 'react'

import { Team } from '../types'

export function useScopedTeams(
  teams: Team[],
  teamsByID: _.Dictionary<Team>,
  focusTeamIDs?: number[],
) {
  const scopedTeams = useMemo(() => {
    if (!focusTeamIDs?.length) {
      return teams
    }

    // * [1] - Find the matching team(s)
    const focusedTeams = focusTeamIDs
      .map((teamID) => teamsByID[teamID])
      .filter(Boolean)

    // * [2] - Get their `iPaths` (so we can include their parent Teams up the Tree) and include their TeamID
    const focusedTeamsData = focusedTeams.map((team) => ({
      iPath: `${team.iPath}${team.teamID},`,
      level: team.level,
      teamID: team.teamID,
    }))

    // * [3] - Iterate over `Teams` and keep all Teams whose:
    // * ----> (A) iPath starts with a focused Team's iPath
    // * ----> (B) teamID is found in one of the iPaths
    const scopedTeams = teams.filter((team) => {
      return focusedTeamsData.some((focusedTeamData) => {
        // * (A)
        if (
          focusedTeamData.teamID === team.teamID ||
          team.iPath.startsWith(focusedTeamData.iPath)
        ) {
          return true
        }

        // * (B) If this team is same or lower level, it implicitly could not be a direct parent of this focused Team.
        return (
          focusedTeamData.level > team.level &&
          focusedTeamData.iPath.includes(`,${team.teamID},`)
        )
      })
    })

    return scopedTeams
  }, [teams, focusTeamIDs])

  return scopedTeams
}
