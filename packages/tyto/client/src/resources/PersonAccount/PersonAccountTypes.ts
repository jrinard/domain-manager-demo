import { TytoBaseResponse } from '@tyto/manifest'

export interface GetParameters {
  personID: number
}

export interface GetResponse extends TytoBaseResponse {
  accounts: AccountDetail[]
}

export interface AccountDetail {
  userID: number
  isOwner: number
  givenName: string
  familyName: string
  familiarName: string
  activeStatus: string
  onCourseURL: string
  otherName: string
  outsideTerminateDate: string
  outsideType: string
  subDomainParentNamePath: string
  teamName: string
  teamRoot: number
}

export interface PutParameters {
  ownerUserID: number
  personID: number
}

export interface PutResponse extends TytoBaseResponse {
  recordsAffected: number
}
