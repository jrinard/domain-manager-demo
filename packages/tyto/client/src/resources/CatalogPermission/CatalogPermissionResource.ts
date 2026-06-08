import { Resource } from '../../utils/helpers'
import { PutParameters, PutResponse } from './CatalogPermissionTypes'

export class CatalogPermission extends Resource {
  override endpoint = '/CatalogPermission'

  put(data: PutParameters): Promise<PutResponse> {
    return this.update<PutResponse>(data)
  }
}
