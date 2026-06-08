import { TytoBaseResponse } from '@tyto/manifest'

interface MembershipItem {
  isPreferredTeam: boolean
  isTeamLeader: boolean
  memberTitle: string
  teamID: number
}

// TODO: This is not complete
interface PeopleBrowsePerson {
  domainID: number
  email: string
  familiarName: string
  familyName: string
  firstActivity: string
  givenName: string
  jobTitle: string
  logonName: string
  memberships: MembershipItem[]
  outsideID: string
  outsideTerminateDate: string
  outsideType: string
  personID: number
  primaryElementID: number
  profileImageID: number
  roleID: number
  termsOfService: string
}

/**
 * Use https://app.quicktype.io/
 */
export interface GetParameters {
  no_arguments_available_for_this_endpoint?: 'this is a pointless argument' // * This does not take any endpoints
}

/**
 * Use https://app.quicktype.io/
 */
export interface GetResponse extends TytoBaseResponse {
  people: PeopleBrowsePerson[]
}
