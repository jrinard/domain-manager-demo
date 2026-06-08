import { TytoBaseResponse } from '@tyto/manifest'
import { Role } from './types/RoleTypes'

export interface GetParameters {
  domainID?: number
  hasFunctionID?: number
  hasNotFunctionID?: number
}

/**
 * Use https://app.quicktype.io/
 */
export interface GetResponse extends TytoBaseResponse {
  roles: Role[]
}
