import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { getCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

import { LessonViewHistory } from './Lesson.ViewHistory'

export class Lesson extends Resource {
  ViewHistory!: LessonViewHistory
  override endpoint = TYTO_ENDPOINT_PATHS.LESSON

  protected override addResources(): void {
    this.ViewHistory = new LessonViewHistory(this.axiosInstance)
  }

  get(params: Endpoints.Tyto.Lesson.GetParameters, callOpts?: CallOpts) {
    return getCall<Endpoints.Tyto.Lesson.Get.Response>(
      this.axiosInstance,
      this.endpoint,
      params || {},
      callOpts
    )
  }
}
