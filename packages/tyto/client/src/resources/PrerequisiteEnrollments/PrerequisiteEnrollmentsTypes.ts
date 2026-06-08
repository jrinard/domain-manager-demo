import { TytoBaseResponse } from '@tyto/manifest'
import { BlockLogic, PrerequisiteEnrollment } from './entities'

/**
 * Use https://app.quicktype.io/
 */
export interface GetParameters {
  blockID: number
  memberID?: number
  showSubRequisites?: boolean
}

/**
 * Use https://app.quicktype.io/
 */
export type GetResponse = TytoBaseResponse & {
  prerequisiteEnrollments: PrerequisiteEnrollment[]
  blockLogic: BlockLogic
}
