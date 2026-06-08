import type { Team } from '../types'

export function getTeamIDsUnderTargetTeamIDs({
  targetTeamIDs,
  teams,
  includeTargetTeams = true,
}: {
  targetTeamIDs?: number[]
  teams: Team[]
  includeTargetTeams?: boolean
}) {
  if (!teams?.length) {
    return []
  } else if (!targetTeamIDs?.length) {
    return []
  }

  // * We should include target Teams as a match
  const teamIDsUnderneath = includeTargetTeams ? [...targetTeamIDs] : []

  // * NOTE: Kinda hacky, but saves the unecessary call to `.join("|")` for every single team in the `.forEach(...)`, below.
  const teamIDsRegExpPartialString = targetTeamIDs.join('|')

  teams.forEach((team) => {
    if (teamIPathIncludesTeamID(team.iPath, teamIDsRegExpPartialString)) {
      teamIDsUnderneath.push(team.teamID)
    }
  })

  return teamIDsUnderneath
}

function teamIPathIncludesTeamID(iPath: string, teamIDs: number[] | string) {
  if (!iPath || !teamIDs?.length) {
    return false
  }

  const result = iPath.match(
    new RegExp(
      `,(${typeof teamIDs === 'string' ? teamIDs : teamIDs.join('|')}),`,
      'gi',
    ),
  )

  return !!result && !!result.length
}
