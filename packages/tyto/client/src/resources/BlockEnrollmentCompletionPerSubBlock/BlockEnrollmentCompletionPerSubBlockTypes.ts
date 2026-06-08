import { DateISO8601, TytoBaseResponse } from '@tyto/manifest'
import { Block, Person } from './entities'

/**
 * Use https://app.quicktype.io/
 */
export interface GetParameters {
  teamID: number
  blockID: number
}

/**
 * Use https://app.quicktype.io/
 */
export type GetResponse = TytoBaseResponse & {
  blocks: Block[]
  persons: Person[]
  activityDateCache: DateISO8601
}
