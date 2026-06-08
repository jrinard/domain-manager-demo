import { ApplyAxios, Resource } from '../utils/helpers'

import { ThinSkippyIdentityAuthorization } from './ThinSkippy.Identity.Authorization'

export class ThinSkippy extends ApplyAxios {
  Identity?: ThinSkippyIdentity

  protected override _applySubRoutes(): void {
    this.Identity = new ThinSkippyIdentity(this.axiosInstance)
  }
}

export class ThinSkippyIdentity extends Resource {
  Authorization!: ThinSkippyIdentityAuthorization

  protected override addResources(): void {
    this.Authorization = new ThinSkippyIdentityAuthorization(this.axiosInstance)
  }
}
