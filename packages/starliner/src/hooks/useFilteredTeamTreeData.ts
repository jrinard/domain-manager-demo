import { useMemo } from 'react'
import type { Team, TeamTreeShowLists } from '../types'

export interface TeamTreeProps {
  searchTerm?: string
  teamID?: number
  teams: Team[]
}

export function useFilteredTeamTreeData({
  searchTerm = '',
  teams,
  teamID: targetTeamID,
}: TeamTreeProps): TeamTreeShowLists {
  return useMemo(() => {
    const matchingTeams = filterTeamsBySearchTerm(teams, searchTerm)

    const teamTreeShowLists = createTeamTreeShowLists()

    if (!matchingTeams.length || !searchTerm) {
      if (targetTeamID) {
        const matchingTeam = teams.find(({ teamID }) => teamID === targetTeamID)

        if (matchingTeam) {
          teamTreeShowLists.matchingTeamIDs.add(matchingTeam.teamID)

          matchingTeam.iPath.split(',').forEach((unparsedTeamID) => {
            if (!unparsedTeamID) return

            const teamID = Number(unparsedTeamID)

            if (Number.isNaN(teamID)) return

            teamTreeShowLists.pathTeamIDs.add(teamID)
          })
        }
      }

      return teamTreeShowLists
    }

    matchingTeams.forEach((team) => {
      const { iPath, teamID } = team

      teamTreeShowLists.matchingTeamIDs.add(teamID)

      // * Admittedly funky, but logically, if there is no search term then *NO* teams will be
      // * filtered out, and thus there will be 0 teams that need to show for a path to make sense
      // * since, once again, *ALL* teams will show.
      // *
      // * So.. no need to iterate over every iPath and add it to the pathTeamIDs Set
      if (!searchTerm) return

      iPath.split(',').forEach((unparsedTeamID) => {
        if (!unparsedTeamID) return

        const teamID = Number(unparsedTeamID)

        if (Number.isNaN(teamID)) return

        teamTreeShowLists.pathTeamIDs.add(teamID)
      })
    })

    return teamTreeShowLists
  }, [teams, searchTerm, targetTeamID])
}

export function createTeamTreeShowLists(): TeamTreeShowLists {
  return {
    matchingTeamIDs: new Set(),
    pathTeamIDs: new Set(),
  }
}

function filterTeamsBySearchTerm(
  teams: TeamTreeProps['teams'],
  searchTerm: string,
) {
  if (!searchTerm) {
    return teams
  }

  const lowerCaseSearchTerm = searchTerm.toLowerCase()

  return teams.filter((team) => {
    // ? NOTE: Perhaps this should be a RegExp `.test` search ?
    return `${team.name.toLowerCase()} ${team.teamID}`.includes(
      lowerCaseSearchTerm,
    )
  })
}

export default useFilteredTeamTreeData
