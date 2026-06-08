import { TytoBaseResponse } from '@tyto/manifest'

/**
 * Use https://app.quicktype.io/
 */
export interface GetParameters {
  beforeDateUTC?: string
  afterDateUTC?: string
  personID: number
}

/**
 * Use https://app.quicktype.io/
 */
interface LessonViewHistorySummaryPerperson {
  viewSessionCount: number
  viewPageCount: number
  minHistDateUTC: string
  maxHistDateUTC: string
  personID: number
  givenName: string
  familyName: string
  lessonID: number
  itemType: string
  lessonName: string
  assetID: number
  assetType: string
}

export interface GetResponse extends TytoBaseResponse {
  history: LessonViewHistorySummaryPerperson[]
}
