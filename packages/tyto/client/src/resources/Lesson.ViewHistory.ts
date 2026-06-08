import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { postCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

import { LessonViewHistoryPageMarker } from './Lesson.ViewHistory.PageMarker'

export class LessonViewHistory extends Resource {
  PageMarker!: LessonViewHistoryPageMarker
  override endpoint = TYTO_ENDPOINT_PATHS.LESSON_VIEWHISTORY
  protected override addResources(): void {
    this.PageMarker = new LessonViewHistoryPageMarker(this.axiosInstance)
  }

  post(
    params: Endpoints.Tyto.Lesson.ViewHistory.PostParameters,
    callOpts?: CallOpts
  ) {
    return postCall(this.axiosInstance, this.endpoint, params || {}, callOpts)
  }
}
