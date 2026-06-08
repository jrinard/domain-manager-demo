import { Resource } from '../../utils/helpers'
import {
  DeleteParameters,
  DeleteResponse,
  GetParameters,
  GetResponse,
  PostParameters,
  PostResponse,
  PutParameters,
  PutResponse,
} from './EventTypes'

export class Event extends Resource {
  override endpoint = '/event'

  get(params: GetParameters): Promise<GetResponse> {
    return this.read<GetResponse>(params)
  }

  put(params: PutParameters): Promise<PutResponse> {
    return this.update<PutResponse>(params)
  }

  post(params: PostParameters): Promise<PostResponse> {
    if (params.prepareAction === undefined) {
      params.prepareAction = true
    }
    if (params.prepareAgenda === undefined) {
      params.prepareAgenda = true
    }
    return this.create<PostResponse>(params)
  }

  delete(params: DeleteParameters): Promise<DeleteResponse> {
    return this.remove<DeleteResponse>(params, true)
  }
}
