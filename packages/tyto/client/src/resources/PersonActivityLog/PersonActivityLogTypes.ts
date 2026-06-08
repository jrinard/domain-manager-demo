import { TytoBaseResponse, DateISO8601 } from '@tyto/manifest'

/**
 * Use https://app.quicktype.io/
 */
export interface GetParameters {
  personID: number
}

/**
 * Use https://app.quicktype.io/
 */

export interface GetResponse extends TytoBaseResponse {
  activityLogPerson: ActivityLog[]
}

export interface ActivityLog {
  eID: number
  logDate: DateISO8601
  activityType: string
  activityDesc: string
  userID: number
  userName: string
  elementName: string
  elementType: string
  elementSubType: string
}
