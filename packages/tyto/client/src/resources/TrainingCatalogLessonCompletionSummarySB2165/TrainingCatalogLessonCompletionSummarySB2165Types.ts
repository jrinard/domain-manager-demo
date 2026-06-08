import { TytoBaseResponse } from '@tyto/manifest'

interface LessonStatusSummary {
  itemType: string
  count_ocCOMPLETE: number
  count_ocINCOMPLETE: number
  count_ocNOTSTARTED: number
}

interface TrainingCatalogBlockSummary {
  catalog_seq: number
  rootMainTitle: string
  rootBlockID: number
  lessonTypeStatusSummary: LessonStatusSummary[]
}

/**
 * Use https://app.quicktype.io/
 */
export interface GetParameters {
  teamID: number
  catalogID: number
  afterDate?: string
  beforeDate?: string
  isCascade?: boolean
}

/**
 * Use https://app.quicktype.io/
 */
export interface GetResponse extends TytoBaseResponse {
  TrainingCatalogLessonCompletionSummary_SB2165: TrainingCatalogBlockSummary[]
  teamName: string
}
