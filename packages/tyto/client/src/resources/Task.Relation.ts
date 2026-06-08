import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { deleteCall, postCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

export class TaskRelation extends Resource {
  override endpoint = TYTO_ENDPOINT_PATHS.TASKRELATION

  post(
    params: Endpoints.Tyto.Task.Relation.Post.Parameters,
    callOpts?: CallOpts
  ) {
    return postCall<Endpoints.Tyto.Task.Relation.Post.Response>(
      this.axiosInstance,
      this.endpoint,
      params,
      callOpts
    )
  }

  delete(
    params: Endpoints.Tyto.Task.Relation.Delete.Parameters,
    callOpts?: CallOpts
  ) {
    return deleteCall<Endpoints.Tyto.Task.Relation.Delete.Response>(
      this.axiosInstance,
      this.endpoint,
      params,
      {
        paramsAsData: true,
        ...(callOpts ?? {}),
      }
    )
  }
}
