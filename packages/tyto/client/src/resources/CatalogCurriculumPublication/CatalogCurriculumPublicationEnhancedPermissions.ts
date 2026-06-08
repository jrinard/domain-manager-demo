import { Resource } from '../../utils/helpers'
import {
  GetParameters,
  GetResponse,
  PutParameters,
  PutResponse,
} from './CatalogCurriculumPublicationEnhancedPermissionsTypes'

export class CatalogCurriculumPublicationEnhancedPermissions extends Resource {
  override endpoint = '/CatalogCurriculumPublication/EnhancedPermissions'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }

  put(data: PutParameters): Promise<PutResponse> {
    return this.update<PutResponse>(data)
  }
}
