import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './TeamBannersTypes'

export class TeamBanners extends Resource {
  override endpoint = '/team/banners'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
