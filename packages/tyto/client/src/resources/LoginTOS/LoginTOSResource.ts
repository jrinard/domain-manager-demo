import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './LoginTOSTypes'

export class LoginTOS extends Resource {
  override endpoint = '/Login/TOS'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
