import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './FunctionOpsTypes'

export class FunctionOps extends Resource {
  override endpoint = '/Function/Ops'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
