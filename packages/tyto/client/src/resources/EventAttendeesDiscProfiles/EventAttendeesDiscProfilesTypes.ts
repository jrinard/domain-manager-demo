import { TytoBaseResponse } from '@tyto/manifest'
export interface GetParameters {
  activeStatus?: 'ocENABLED'
  eventID: number
}
export interface GetResponse extends TytoBaseResponse {
  discProfiles: DiscProfiles
}

export interface DiscProfiles {
  profiles: Profile[]
  teams: Team[]
}

export interface Profile {
  personName: string
  memberships: Membership[]
  teamRoot: number
  nameStyleDisplay: string
  discID: number
  d1: number
  i1: number
  s1: number
  c1: number
  d2: number
  i2: number
  s2: number
  c2: number
  d3: number
  i3: number
  s3: number
  c3: number
  nameStyle3: string
  testDate: Date
  resultID_clientSide: number
  yearBorn?: number
  peopleKeysAccountID: number
  personID: number
  lessonID: number
  communicationTips: string
  discPersonActiveStatus: string
  useClientSideApi: boolean
}

export interface Membership {
  teamID: number
}

export interface Team {
  teamID: number
  teamName: string
  domainID: number
  iPath: string
  subDomainParentNamePath: string
  parentID: number
  lvl: number
  sn: number
  memberCount: number
  rootMemberCount: number
}
