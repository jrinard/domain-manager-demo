import { Resource } from '../../utils/helpers'
import {
  PostParameters,
  PostResponse,
  GetParameters,
  GetResponse,
  PutParameters,
  PutResponse,
} from './TelecomTypes'

export class Telecom extends Resource {
  override endpoint = '/Telecom'

  get(params: GetParameters): Promise<GetResponse> {
    return this.read<GetResponse>(params)
  }

  post(data: PostParameters): Promise<PostResponse> {
    return this.create<PostResponse>(data)
  }

  put(data: PutParameters): Promise<PutResponse> {
    return this.update<PutResponse>(data)
  }
}
