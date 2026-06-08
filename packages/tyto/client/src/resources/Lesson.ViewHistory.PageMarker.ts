import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { getCall, postCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

const endpoint = TYTO_ENDPOINT_PATHS.LESSON_VIEWHISTORY_PAGEMARKER

export class LessonViewHistoryPageMarker extends Resource {
  get(
    params: Endpoints.Tyto.Lesson.ViewHistory.PageMarker.GetParameters,
    callOpts?: CallOpts
  ) {
    return getCall<Endpoints.Tyto.Lesson.ViewHistory.PageMarker.Get.Response>(
      this.axiosInstance,
      endpoint,
      params || {},
      callOpts
    )
  }
  post(
    params: Endpoints.Tyto.Lesson.ViewHistory.PageMarker.PostParameters,
    callOpts?: CallOpts
  ) {
    return postCall<Endpoints.Tyto.Lesson.ViewHistory.PageMarker.Post.Response>(
      this.axiosInstance,
      endpoint,
      params || {},
      callOpts
    )
  }
}
