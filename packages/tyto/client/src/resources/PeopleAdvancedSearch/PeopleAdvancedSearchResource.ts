import { Resource } from '../../utils/helpers'
import {
  PostParameters,
  PostResponse,
  GetParameters,
  GetResponse,
} from './PeopleAdvancedSearchTypes'

export class PeopleAdvancedSearch extends Resource {
  override endpoint = '/People/AdvancedSearch'

  post(data: PostParameters): Promise<PostResponse> {
    return this.create<PostResponse>(data)
  }

  get(params: GetParameters): Promise<GetResponse> {
    return this.read<GetResponse>(params)
  }
}
