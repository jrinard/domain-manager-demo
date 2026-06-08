export interface PlatformReviewTeam {
  noticeID: number
  actionType: string
  taskID: number
  taskStatus: string
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
  teamDesc: string
  teamType: string
  teamID: number
  profileImageID: number
  name: string
  ocType: string
  domainID: number
  subDomainParentNamePath: string
  activeStatus: string
}
