import { useMemo } from 'react'
import type { Team } from '../types'

export function useTopLevelTeams(teams: Team[]) {
  return useMemo(() => {
    return teamsWithSmallestLevelValue(teams)
  }, [teams])
}

function teamsWithSmallestLevelValue(teams: Team[]): Team[] {
  // * "Lowest Level" is confusingly synonymous with "Highest Point in the Tree", since "level" == "depth".
  let lowestLevel = 100_000
  const teamsByLevel: Record<number, Team[]> = {}

  for (const team of teams) {
    const level = team.level

    // * With Tyto, `team.level` could be thought of as synonymous with "depth".
    // * The higher the number, the further down the tree the team is.
    // * Root Domain in the whole system is `551` which has a level of `1`
    if (level > lowestLevel || level < 1) {
      continue
    }

    lowestLevel = level

    if (!teamsByLevel[level]) {
      teamsByLevel[level] = []
    }

    teamsByLevel[level].push(team)
  }

  return teamsByLevel[lowestLevel] ?? []
}

export default useTopLevelTeams
