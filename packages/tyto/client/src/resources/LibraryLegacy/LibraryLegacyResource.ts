import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './LibraryLegacyTypes'

export class LibraryLegacy extends Resource {
  override endpoint = '/Library/legacy'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
