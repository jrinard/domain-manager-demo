import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { Resource } from '../utils/helpers'

import { TaskMember } from './Task.Member'
import { TaskNotice } from './Task.Notice'
import { TaskRelation } from './Task.Relation'
import { TaskStructure } from './TaskStructure'
import { TaskVerificationRequest } from './Task.VerificationRequest'

import { CallOpts, getCall } from '../utils/utils'

export class Task extends Resource {
  override endpoint = TYTO_ENDPOINT_PATHS.TASK

  Member!: TaskMember
  Notice!: TaskNotice
  Relation!: TaskRelation
  Structure!: TaskStructure
  VerificationRequest!: TaskVerificationRequest

  protected override addResources(): void {
    this.Member = new TaskMember(this.axiosInstance)
    this.Notice = new TaskNotice(this.axiosInstance)
    this.Relation = new TaskRelation(this.axiosInstance)
    this.Structure = new TaskStructure(this.axiosInstance)
    this.VerificationRequest = new TaskVerificationRequest(this.axiosInstance)
  }

  get(params: Endpoints.Tyto.Task.Get.Parameters, callOpts?: CallOpts) {
    return getCall<Endpoints.Tyto.Task.Get.Response>(
      this.axiosInstance,
      this.endpoint,
      params,
      callOpts
    )
  }
}
