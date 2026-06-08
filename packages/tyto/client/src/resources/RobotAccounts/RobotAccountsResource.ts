import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './RobotAccountsTypes'

export class RobotAccounts extends Resource {
  override endpoint = '/robot/accounts'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
