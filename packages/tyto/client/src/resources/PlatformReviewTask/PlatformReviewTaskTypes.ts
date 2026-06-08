import { TytoBaseResponse } from '@tyto/manifest'
import { TaskEntity } from './entities/TaskEntity'

/**
 * Use https://app.quicktype.io/
 */
export interface GetParameters {
  taskID: number
}

/**
 * Use https://app.quicktype.io/
 */
export type GetResponse = TytoBaseResponse & {
  task: TaskEntity
}
