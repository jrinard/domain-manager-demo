import { useMemo } from 'react'

import type { Team, TeamRelationshipsMap } from '../types'

export interface TeamTreeProps {
  teams: Team[]
}

export function useTeamRelationshipsMap(teams: Team[]) {
  return useMemo(() => createTeamRelationships(teams), [teams])
}

function createTeamRelationships(teams: Team[]): TeamRelationshipsMap {
  const teamRelationshipsMap = createEmptyTeamRelationships()

  teams.forEach((team) => {
    const { parentID, teamID: childID } = team

    if (typeof parentID !== 'number' || !childID) return

    if (!teamRelationshipsMap.childrenIDsByParentID[parentID]) {
      teamRelationshipsMap.childrenIDsByParentID[parentID] = []
    }

    // * Add childID to list of parentID's childrenIDs
    teamRelationshipsMap.childrenIDsByParentID[parentID].push(childID)

    // * Make ParentID accessible by ChildID
    teamRelationshipsMap.parentIDByChildID[childID] = parentID
  })

  return teamRelationshipsMap
}

function createEmptyTeamRelationships(): TeamRelationshipsMap {
  return {
    childrenIDsByParentID: {},
    parentIDByChildID: {},
  }
}

export default useTeamRelationshipsMap
