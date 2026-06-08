import { DateISO8601, TytoBaseResponse } from '@tyto/manifest'

export interface GetParameters {
  personID: number
  top?: number
  lessonType?: string
  assetType?: string
}

export interface GetResponse extends TytoBaseResponse {
  history: LessonViewHistoryMostRecent[]
}

export interface LessonViewHistoryMostRecent {
  assetType: string
  lessonID: number
  lessonName: string
  lessonType: string
  maxHistDateUTC: DateISO8601
}
