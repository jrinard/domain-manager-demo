import { Resource } from '../utils/helpers'

import { LoginAuthenticate } from './LoginAuthenticate'
import { LoginAuthenticate4 } from './Login.Authenticate4'
import { LoginRecover } from './Login.Recover'
import { LoginResetPassword } from './Login.ResetPassword'

export class Login extends Resource {
  /**
   * **Sets `Cookies`**
   * - Requires unique Email/Password combinatrion OR a domain identifier
   * @returns A Single Session Object
   */
  Authenticate!: LoginAuthenticate
  /**
   * **Does NOT set `Cookies`**
   * @returns an Array of Sessions for any/all Account matching the Email/Password combination
   */
  Authenticate4!: LoginAuthenticate4
  Recover!: LoginRecover
  ResetPassword!: LoginResetPassword

  protected override addResources(): void {
    this.Authenticate = new LoginAuthenticate(this.axiosInstance)
    this.Authenticate4 = new LoginAuthenticate4(this.axiosInstance)
    this.Recover = new LoginRecover(this.axiosInstance)
    this.ResetPassword = new LoginResetPassword(this.axiosInstance)
  }
}
