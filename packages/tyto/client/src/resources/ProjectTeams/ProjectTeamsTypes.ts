import type { Data, TytoData } from '@spacedock/manifest'
import type { TytoBaseResponse } from '@tyto/manifest'

export type ProjectHealthStatus =
  | 'ocSTATUSCOMPLETE'
  | 'ocVACANT'
  | 'ocSTATUSVACANT'
  | 'ocSTATUSINACTIVE'
  | 'ocSTATUSGREEN'
  | 'ocSTATUSRED'

export interface TeamProjectMembership {
  noticeID: number
  actionType: ProjectHealthStatus
  taskID: number
  taskStatus: keyof typeof TytoData.TaskStatus
  level: number
  iPath: string
  parentID: number
  isAbove: boolean
  isBelow: boolean
  isDirect: boolean
  isLeader: boolean
  isCascade: boolean
  isCascadeInherited: boolean
  parentNamePath: string
  profileImage: Data.Asset
  teamDesc: string
  teamType: 'ocPROJECT'
  teamID: number
  profileImageID: number
  name: string
  ocType: 'ocTEAM'
  domainID: number
  subDomainParentNamePath: string
  activeStatus: 'ocENABLED' | 'ocDISABLED'
}

export type GetParameters = Record<string, never>

export interface GetResponse extends TytoBaseResponse {
  projectTeams: TeamProjectMembership[]
}
