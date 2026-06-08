import { Resource } from '../../utils/helpers'
import {
  GetParameters,
  GetResponse,
} from './EnrollmentCurriculumCompleteJobsTypes'

export class EnrollmentCurriculumCompleteJobs extends Resource {
  override endpoint = '/enrollment/CurriculumCompleteJobs'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
