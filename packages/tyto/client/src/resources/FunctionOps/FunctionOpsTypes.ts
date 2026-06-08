import { TytoBaseResponse } from '@tyto/manifest'
import { FunctionName, FunctionScopeName } from '../../constants/security-role'

/**
 * Use https://app.quicktype.io/
 */
export interface GetParameters {
  functionName: FunctionName
  operation: FunctionScopeName
}

/**
 * Use https://app.quicktype.io/
 */
export interface GetResponse extends TytoBaseResponse {
  hasScope: boolean
}
