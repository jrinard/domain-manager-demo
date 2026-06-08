import { ApplyAxios } from '../utils/helpers'

import { IdentityAuthorizationLogin } from './Identity.Authorization.Login'

export class Identity extends ApplyAxios {
  Authorization?: IdentityAuthorization

  protected override _applySubRoutes(): void {
    this.Authorization = new IdentityAuthorization(this.axiosInstance)
  }
}

export class IdentityAuthorization extends ApplyAxios {
  Login?: IdentityAuthorizationLogin

  protected override _applySubRoutes(): void {
    this.Login = new IdentityAuthorizationLogin(this.axiosInstance)
  }
}
