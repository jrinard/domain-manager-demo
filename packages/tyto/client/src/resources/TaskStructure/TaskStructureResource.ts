import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './TaskStructureTypes'

export class TaskStructure extends Resource {
  override endpoint = '/task/structure'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
