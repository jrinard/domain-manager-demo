import type { Data } from '@spacedock/manifest'
import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { getCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

const endpoint =
  TYTO_ENDPOINT_PATHS.CATALOGCURRICULUMPUBLICATION_SEARCHLESSONCONTENT

export class SearchLessonContent extends Resource {
  get(
    params: Endpoints.Tyto.CatalogCurriculumPublication.SearchLessonContent.GetParameters,
    callOpts?: CallOpts
  ) {
    return getCall<{
      searchCatalogLessonContent: unknown[]
      searchID: number
      histID: number
      session: Data.SessionData
    }>(this.axiosInstance, endpoint, params || {}, {
      circumventChangePasswordCheck: true,
      ...(callOpts || {}),
    })
  }
}
