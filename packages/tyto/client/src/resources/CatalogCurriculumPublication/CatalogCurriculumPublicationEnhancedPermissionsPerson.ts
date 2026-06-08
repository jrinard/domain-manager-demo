import { Resource } from '../../utils/helpers'
import {
  GetParameters,
  GetResponse,
} from './CatalogCurriculumPublicationEnhancedPermissionsPersonTypes'

export class CatalogCurriculumPublicationEnhancedPermissionsPerson extends Resource {
  override endpoint = '/CatalogCurriculumPublication/EnhancedPermissions/Person'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
