import { Resource } from '../../utils/helpers'
import {
  GetParameters,
  GetResponse,
  PostParameters,
  PostResponse,
  PutParameters,
  PutResponse,
  DeleteParameters,
  DeleteResponse,
} from './TeamTypes'
import { TYTO_ENDPOINT_PATHS } from '../../constants'

export class Team extends Resource {
  override endpoint = TYTO_ENDPOINT_PATHS.TEAM

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }

  post(params: PostParameters) {
    return this.create<PostResponse>(params)
  }

  put(params: PutParameters) {
    return this.update<PutResponse>(params)
  }

  delete(params: DeleteParameters): Promise<DeleteResponse> {
    return this.remove<DeleteResponse>(params, true)
  }
}
