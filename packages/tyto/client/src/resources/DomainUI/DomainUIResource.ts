import { Resource } from '../../utils/helpers'
import {
  GetParameters,
  GetResponse,
  PutParameters,
  PutResponse,
} from './DomainUITypes'

export class DomainUI extends Resource {
  override endpoint = '/Domain/UI'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }

  put(data: PutParameters): Promise<PutResponse> {
    return this.update<PutResponse>(data)
  }
}
