import { Resource } from '../../utils/helpers'
import {
  PostParameters,
  PostResponse,
} from './EnrollmentCurriculumCompleteJobTypes'

export class EnrollmentCurriculumCompleteJob extends Resource {
  override endpoint = '/enrollment/CurriculumCompleteJob'

  post(data: PostParameters): Promise<PostResponse> {
    return this.create<PostResponse>(data)
  }
}
