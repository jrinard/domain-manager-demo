import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './LanguagesTypes'

export class Languages extends Resource {
  override endpoint = '/localization/languages'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
