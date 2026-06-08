import type { Endpoints } from '../../typings'
import { postCall, CallOpts } from '../../utils/utils'
import { Resource } from '../../utils/helpers'

import { Badge, BadgePostResponse, BadgeCommandParameters } from '../ASP'

export class Badges extends Resource {
  Badge!: Badge

  static endpoint = '/mobile/badge'

  protected override addResources(): void {
    this.Badge = new Badge(this.axiosInstance)
  }

  post(
    params: BadgeCommandParameters & Endpoints.Tyto.MetaArgs,
    callOpts?: CallOpts,
  ) {
    return postCall<BadgePostResponse>(
      this.axiosInstance,
      Badges.endpoint,
      params || {},
      callOpts,
    )
  }
}
