import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './TrainingDetailTypes'

export class TrainingDetail extends Resource {
  override endpoint = '/Training/Detail'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
