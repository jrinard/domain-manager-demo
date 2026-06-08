import { useMemo } from 'react'

import type { PeopleData, TeamMembershipsMap } from '../types'

export function usePersonMembershipsMap(
  memberships?: PeopleData['memberships'],
): TeamMembershipsMap {
  return useMemo(() => createTeamMembershipsMap(memberships), [memberships])
}

function createTeamMembershipsMap(
  memberships?: PeopleData['memberships'],
): TeamMembershipsMap {
  const teamMembershipsMap = createEmptyTeamMembershipsMap()

  if (!memberships?.length) {
    return teamMembershipsMap
  }

  memberships.forEach((membership) => {
    const { memberID: userID, teamID } = membership

    if (typeof userID !== 'number' || !teamID) return

    if (!teamMembershipsMap.userIDsByTeamID[teamID]) {
      teamMembershipsMap.userIDsByTeamID[teamID] = []
    }

    // * Add userID to list of memberships to the given teamID
    teamMembershipsMap.userIDsByTeamID[teamID].push(userID)

    if (!teamMembershipsMap.teamIDsByUserID[userID]) {
      teamMembershipsMap.teamIDsByUserID[userID] = []
    }

    // * Add teamID to list of memberships for the given userID
    teamMembershipsMap.teamIDsByUserID[userID].push(teamID)
  })

  return teamMembershipsMap
}

function createEmptyTeamMembershipsMap(): TeamMembershipsMap {
  return {
    teamIDsByUserID: {},
    userIDsByTeamID: {},
  }
}

export default usePersonMembershipsMap
