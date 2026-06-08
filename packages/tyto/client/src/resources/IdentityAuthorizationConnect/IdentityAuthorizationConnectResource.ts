import { Resource } from '../../utils/helpers'
import {
  PostParameters,
  PostResponse,
} from './IdentityAuthorizationConnectTypes'

export class IdentityAuthorizationConnect extends Resource {
  override endpoint = '/Identity/Authorization/connect'

  post(
    data: PostParameters,
    opts?: Parameters<typeof this.create>[2],
  ): Promise<PostResponse> {
    return this.create<PostResponse>(data, null, opts)
  }
}
