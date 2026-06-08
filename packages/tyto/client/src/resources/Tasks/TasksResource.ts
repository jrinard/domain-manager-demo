import { Resource } from '../../utils/helpers'
import {
  PostParameters,
  PostResponse,
  PutParameters,
  PutResponse,
  DeleteParameters,
  DeleteResponse,
} from './TasksTypes'

export class Tasks extends Resource {
  override endpoint = '/tasks'

  post(data: PostParameters): Promise<PostResponse> {
    return this.create<PostResponse>(data)
  }

  put(data: PutParameters): Promise<PutResponse> {
    return this.update<PutResponse>(data)
  }

  delete(params: DeleteParameters) {
    return this.remove<DeleteResponse>(params, true)
  }
}
