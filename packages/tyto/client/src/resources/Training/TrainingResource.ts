import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './TrainingTypes'

import { TrainingDetail } from '../Training.Detail'
import { TrainingSummary1482 } from '../Training.Summary1482'

export class Training extends Resource {
  override endpoint = '/Training'

  Detail?: TrainingDetail
  Summary1482?: TrainingSummary1482

  protected override addResources(): void {
    this.Detail = new TrainingDetail(this.axiosInstance)
    this.Summary1482 = new TrainingSummary1482(this.axiosInstance)
  }

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
