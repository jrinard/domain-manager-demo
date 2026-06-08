import { Resource } from '../../utils/helpers'
import { set } from 'lodash'
import { GetParameters, GetResponse } from './CurriculumSummaryReportTypes'

export class CurriculumSummaryReport extends Resource {
  override endpoint = '/CurriculumSummaryReport'

  get(params: GetParameters) {
    // Convert array parameters to comma-separated strings like other resources do
    if (params.curriculumIDs && Array.isArray(params.curriculumIDs)) {
      set(params, 'curriculumIDs', params.curriculumIDs.join(','))
    }

    return this.request<GetResponse>({
      method: 'GET',
      url: this.getEndpointURL(params),
      params,
    })
  }
}
