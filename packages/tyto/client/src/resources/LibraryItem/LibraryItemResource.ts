import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './LibraryItemTypes'

export class LibraryItem extends Resource {
  override endpoint = '/LibraryItem'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
