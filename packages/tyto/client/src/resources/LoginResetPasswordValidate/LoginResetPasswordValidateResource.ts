import { Resource } from '../../utils/helpers'
import { GetResponse } from './LoginResetPasswordValidateTypes'

export class LoginResetPasswordValidate extends Resource {
  override endpoint = '/Login/ResetPassword/validate'

  get() {
    return this.read<GetResponse>({})
  }
}
