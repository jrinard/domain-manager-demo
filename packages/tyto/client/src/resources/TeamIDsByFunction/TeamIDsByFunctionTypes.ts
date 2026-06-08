import { TytoBaseResponse } from '@tyto/manifest'
import type {
  FunctionName,
  FunctionScopeName,
} from '../../constants/security-role'

export interface GetParameters {
  functionName: FunctionName
  teamFunctionName?: FunctionName
  teamFunctionOperation?: FunctionScopeName
  command?: FunctionScopeName
  operation?: FunctionScopeName
  above?: boolean
  direct?: boolean
  below?: boolean
  teamType?: string
  outsideTypes?: string
  outsideType?: string
  withProfileImage?: boolean
  withExtendedDetails?: boolean
}

export interface GetResponse extends TytoBaseResponse {
  teams: number[]
}
