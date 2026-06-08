import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { Resource } from '../utils/helpers'

import { CallOpts, deleteCall, postCall, putCall } from '../utils/utils'

export class TaskMember extends Resource {
  override endpoint = TYTO_ENDPOINT_PATHS.TASK_MEMBER

  delete(
    params: Endpoints.Tyto.Task.Member.Delete.Parameters,
    callOpts?: CallOpts
  ) {
    return deleteCall<Endpoints.Tyto.Task.Member.Delete.Response>(
      this.axiosInstance,
      this.endpoint,
      { ...params },
      {
        paramsAsData: true,
        ...(callOpts ?? {}),
      }
    )
  }

  post(
    params: Endpoints.Tyto.Task.Member.Post.Parameters,
    callOpts?: CallOpts
  ) {
    return postCall<Endpoints.Tyto.Task.Member.Post.Response>(
      this.axiosInstance,
      this.endpoint,
      { ...params },
      callOpts
    )
  }

  put(params: Endpoints.Tyto.Task.Member.Put.Parameters, callOpts?: CallOpts) {
    return putCall<Endpoints.Tyto.Task.Member.Put.Response>(
      this.axiosInstance,
      this.endpoint,
      { ...params },
      callOpts
    )
  }
}
