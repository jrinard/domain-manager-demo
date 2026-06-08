import type { TytoData } from '@spacedock/manifest'
import { AdvancedPerson, AdvancedPersonTeamMembership } from '@tyto/client'

type MinTeam = Pick<
  TytoData.Team,
  | 'teamID'
  | 'name'
  | 'parentID'
  | 'iPath'
  | 'level'
  | 'teamType'
  | 'ocType'
  | 'activeStatus'
  | 'outsideExpirationDate'
>

export type MinPerson = Pick<
  AdvancedPerson,
  | 'userID'
  | 'givenName'
  | 'familyName'
  | 'elementType'
  | 'elementSubType'
  | 'primaryElementID'
  | 'primaryElementName'
  | 'lastActivity'
  | 'email'
  | '_LOCAL_isDeactivated'
>
export type MinMembership = Pick<
  AdvancedPersonTeamMembership,
  'memberID' | 'teamID' | 'isTeamLeader'
>

export type Team = MinTeam
export type PeopleData = {
  people: MinPerson[]
  memberships: MinMembership[]
}

export interface TeamRelationshipsMap {
  childrenIDsByParentID: Record<number, number[]>
  parentIDByChildID: Record<number, number>
}

export interface TeamTreeShowLists {
  matchingTeamIDs: Set<number>
  pathTeamIDs: Set<number>
}

export interface TeamMembershipsMap {
  userIDsByTeamID: Record<number, number[]>
  teamIDsByUserID: Record<number, number[]>
}

export interface Membership {
  teamID: number
}
