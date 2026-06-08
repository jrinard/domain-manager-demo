import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { getCall, postCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

const endpoint = TYTO_ENDPOINT_PATHS.SEARCH_LESSON

export class SearchLesson extends Resource {
  get(
    params: Endpoints.Tyto.Search.Lesson.Get.Parameters,
    callOpts?: CallOpts
  ) {
    return getCall<Endpoints.Tyto.Search.Lesson.Get.Response>(
      this.axiosInstance,
      endpoint,
      { ...params },
      callOpts
    )
  }
  post(
    params: Endpoints.Tyto.Search.Lesson.Post.Parameters,
    callOpts?: CallOpts
  ) {
    return postCall<Endpoints.Tyto.Search.Lesson.Post.Response>(
      this.axiosInstance,
      endpoint,
      { ...params },
      callOpts
    )
  }
}
