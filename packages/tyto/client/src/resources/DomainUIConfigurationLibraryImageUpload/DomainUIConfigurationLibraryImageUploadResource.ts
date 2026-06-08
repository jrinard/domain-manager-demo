import { Resource } from '../../utils/helpers'
import {
  PostParameters,
  PostResponse,
} from './DomainUIConfigurationLibraryImageUploadTypes'

export class DomainUIConfigurationLibraryImageUpload extends Resource {
  override endpoint = '/domain/ui/configuration/library/imageUpload'

  post(data: PostParameters): Promise<PostResponse> {
    return this.create<PostResponse>(data)
  }
}
