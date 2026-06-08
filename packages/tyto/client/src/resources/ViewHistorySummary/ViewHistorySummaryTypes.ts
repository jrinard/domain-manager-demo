import { DateISO8601, TytoBaseResponse } from '@tyto/manifest'

export interface GetParameters {
  top?: number
  beforeDate?: DateISO8601
  domainID?: number
  memberID?: number
  lessonID?: number
  assetID?: number
  assetEncoding?: string
  userIDAdminBackdoor?: number
}

export interface GetResponse extends TytoBaseResponse {
  lessonViewHistory: lessonViewHistory[]
}

export interface lessonViewHistory {
  viewCount: number
  minHistDateUTC: DateISO8601
  maxHistDateUTC: DateISO8601
  userID: number
  givenName: string
  familyName: string
  lessonID: number
}
