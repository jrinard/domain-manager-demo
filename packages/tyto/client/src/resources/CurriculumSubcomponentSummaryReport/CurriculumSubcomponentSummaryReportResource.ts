import { Resource } from '../../utils/helpers'
import {
  PostParameters,
  PostResponse,
  GetParameters,
  GetResponse,
} from './CurriculumSubcomponentSummaryReportTypes'

export class CurriculumSubcomponentSummaryReport extends Resource {
  override endpoint = '/CurriculumSubcomponentSummaryReport'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }

  post(data: PostParameters): Promise<PostResponse> {
    return this.create<PostResponse>(data)
  }
}
