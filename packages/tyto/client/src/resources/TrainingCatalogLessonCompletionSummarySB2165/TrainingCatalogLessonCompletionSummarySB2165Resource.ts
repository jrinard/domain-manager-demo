import { Resource } from '../../utils/helpers'
import {
  GetParameters,
  GetResponse,
} from './TrainingCatalogLessonCompletionSummarySB2165Types'

export class TrainingCatalogLessonCompletionSummarySB2165 extends Resource {
  override endpoint = '/TrainingCatalogLessonCompletionSummary_SB2165'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
