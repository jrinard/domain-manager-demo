import { Resource } from '../../utils/helpers'
import {
  PostParameters,
  PostResponse,
  GetParameters,
  GetResponse,
} from './PersonOutsideIdentityTypes'

export class PersonOutsideIdentity extends Resource {
  override endpoint = '/PersonOutsideIdentity'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }

  post(data: PostParameters): Promise<PostResponse> {
    return this.create<PostResponse>(data)
  }
}
