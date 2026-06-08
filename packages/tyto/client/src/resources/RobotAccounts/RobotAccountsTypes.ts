import { TytoBaseResponse } from '@tyto/manifest'

/**
 * Use https://app.quicktype.io/
 */
export interface GetParameters {
  experience: 'Exam_Evaluation' | 'Role_Play' | 'Assignment_Evaluation'
  domainID?: number
}

export interface RobotAccount {
  userID: number
  givenName: string
  familyName: string
  roleID: number
  nativeLanguage: string
  company: string
  jobTitle: string
  experience: 'Exam_Evaluation' | 'Role_Play' | 'Assignment_Evaluation'
  outsideType: string
  outsideID: string
  pwRedacted: string
  bio: string
  personal1: string
  personal2: string
  personal3: string
  personal4: string
  createdDate: string
  createdByID: number
  modifiedDate: string
  modifiedByID: number
  domainID: number
  domain: {
    otherName: string
    onCourseURL: string
  }
  primaryTeam: {
    teamName: string
    subDomainParentNamePath: string
  }
}

/**
 * Use https://app.quicktype.io/
 */
export interface GetResponse extends TytoBaseResponse {
  robotAccounts: RobotAccount[]
}
