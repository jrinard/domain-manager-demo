import { TytoBaseResponse } from '@tyto/manifest'

import type { FunctionName, OperationName } from '../../constants/security-role'

/**
 * Use https://app.quicktype.io/
 */
export interface GetParameters {
  functionName: FunctionName
  operation: OperationName
  securityHashfunctionName: FunctionName
  securityHashoperation: OperationName
  top?: number
  teamID?: number
  isCascade?: boolean
}

/**
 * Use https://app.quicktype.io/
 */
export interface GetResponse extends TytoBaseResponse {
  cmdTimeSpan: string
  people: {
    domainName: string
    outsideTerminateDate: string
    personID: number
    personName: string
    primaryElementName: string
    securityHash: string
    thumbnailPath: string
  }[]
}
