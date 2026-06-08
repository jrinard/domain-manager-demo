import { Resource } from '../../utils/helpers'
import {
  GetParameters,
  GetResponse,
  PutParameters,
  PutResponse,
} from './PersonAccountTypes'

export class PersonAccount extends Resource {
  override endpoint = '/PersonAccount'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }

  put(data: PutParameters): Promise<PutResponse> {
    return this.update<PutResponse>(data)
  }
}
