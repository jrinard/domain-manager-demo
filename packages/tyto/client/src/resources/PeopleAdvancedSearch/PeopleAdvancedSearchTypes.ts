import { TytoBaseResponse } from '@tyto/manifest'
import {
  AdvancedPerson,
  AdvancedPersonTeamMembership,
  TeamMembership,
  Distance,
  Badge,
  Trait,
  ItemTrait,
} from './types/PeopleAdvancedSearchType'
import type { FunctionName, OperationName } from '../../constants/security-role'

export interface GetParameters {
  functionName?: FunctionName
  operation?: OperationName
  radius?: number
  postalCode?: string
  city?: string
  stateProvince?: string
  country?: string
  longitude?: number
  latitude?: number
  badgeIDs?: string
  teamIDs?: string
  teamPath?: string
  direct?: boolean
  generalName?: string
  outsideTypes?: string
  traitIDs?: string
  activeStatus?: string
  top?: number
  excludeTerminateBefore?: string
  excludeTerminateAfter?: string
  preparedGroupID?: number
  roleIDs?: string
  browseAddress?: boolean
  domainID?: number
}

/**
 * https://app.quicktype.io/
 */
export interface GetResponse extends TytoBaseResponse {
  mdTimeSpan: string
  ret: {
    people: AdvancedPerson[]
    memberships: AdvancedPersonTeamMembership[]
    sessionUserTeams: TeamMembership[]
    geographicDistances: Distance[]
    elementBadges: Badge[]
    itemTraits: ItemTrait[]
    traits: Trait[]
  }
}
// Yes these are the same as indicated by the api explorer
export interface PostParameters {
  functionName?: FunctionName
  operation?: OperationName
  radius?: number
  postalCode?: string
  city?: string
  stateProvince?: string
  country?: string
  longitude?: number
  latitude?: number
  badgeIDs?: string
  teamIDs?: string
  teamPath?: string
  direct?: boolean
  generalName?: string
  outsideTypes?: string
  traitIDs?: string
  activeStatus?: string
  top?: number
  excludeTerminateBefore?: string
  excludeTerminateAfter?: string
  preparedGroupID?: number
  roleIDs?: string
  browseAddress?: boolean
  domainID?: number
}

export interface PostResponse extends TytoBaseResponse {
  mdTimeSpan: string
  ret: {
    people: AdvancedPerson[]
    memberships: AdvancedPersonTeamMembership[]
    sessionUserTeams: TeamMembership[]
    geographicDistances: Distance[]
    elementBadges: Badge[]
    itemTraits: ItemTrait[]
    traits: Trait[]
  }
}
