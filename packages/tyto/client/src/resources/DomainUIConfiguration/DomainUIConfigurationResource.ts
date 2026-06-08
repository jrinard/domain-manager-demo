import { Resource } from '../../utils/helpers'
import {
  PostParameters,
  PostResponse,
  GetParameters,
  GetResponse,
  PutParameters,
  PutResponse,
} from './DomainUIConfigurationTypes'

export class DomainUIConfiguration extends Resource {
  override endpoint = '/domain/ui/configuration'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }

  post(data: PostParameters): Promise<PostResponse> {
    return this.create<PostResponse>(data)
  }

  put(data: PutParameters): Promise<PutResponse> {
    return this.update<PutResponse>(data)
  }
}
