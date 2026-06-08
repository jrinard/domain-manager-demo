import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './CatalogNewsTypes'

export class CatalogNews extends Resource {
  override endpoint = '/CatalogNews'

  get(params: GetParameters) {
    return this.read<GetResponse>({
      ...params,
      primaryElementIDs: params.primaryElementIDs?.join(','),
    })
  }
}
