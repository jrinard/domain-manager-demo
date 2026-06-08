import { TytoBaseResponse } from '@tyto/manifest'

export interface TeamDefaultEnrollment {
  curriculum: {
    name: string
    elementType: 'ocBLOCK'
    description: string
    expirationDate: string
    curriculumID: number
  }
  teamDefaultEnrollmentID: number
  teamrootID: number
  createdByID: number
  createdDate: string
  isCascade: boolean
  roleIDOption: number
  onlyNewMembers: boolean
  personOutsideType: ''
  team: {
    name: string
    description: string
    subType: 'ocTEAM'
    subDomainParentNamePath: string
    iPath: string
  }
  createdBy: {
    elementName: string
    activeStatus: 'ocENABLED' | 'ocDISABLED' | 'ocVACANT'
    elementType: 'ocPERSON'
    elementSubType: 'ocITEM'
  }
  permission: {
    hasChange: boolean
    hasDelete: boolean
    hasView: boolean
  }
  role?: {
    name: string
    roleID: number
  }
}

/**
 * Use https://app.quicktype.io/
 */
export interface GetParameters {
  teamID: number
}

/**
 * Use https://app.quicktype.io/
 */
export interface GetResponse extends TytoBaseResponse {
  defaultEnrollments: TeamDefaultEnrollment[]
}
