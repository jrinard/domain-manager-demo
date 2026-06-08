import { TytoBaseResponse } from '@tyto/manifest'
import { Member, TaskElement, TaskRelation } from './types/TaskTypes'

/**
 * Use https://app.quicktype.io/
 */
export interface GetParameters {
  taskID: number
}

/**
 * Use https://app.quicktype.io/
 */
export interface GetResponse extends TytoBaseResponse {
  task: {
    tasks: TaskElement[]
    taskRelations: TaskRelation[]
    members: Member[]
    delegateParticipationRoles: never[]
  }
}
