import { Resource } from '../../utils/helpers'
import {
  GetParameters,
  GetResponse,
  PostParameters,
  PostResponse,
} from './SearchKnowledgeObjectsTypes'

export class SearchKnowledgeObjects extends Resource {
  override endpoint = '/SearchKnowledgeObjects'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }

  post(data: PostParameters): Promise<PostResponse> {
    return this.create<PostResponse>(data)
  }
}
