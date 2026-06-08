import { TytoBaseResponse } from '@tyto/manifest'

/**
 * Use https://app.quicktype.io/
 */
export interface DeleteParameters {
  blockID: number
  memberID: number
  skipCreditLedger?: boolean
}

/**
 * Use https://app.quicktype.io/
 */
export interface DeleteResponse extends TytoBaseResponse {
  registrationCount: number
  recordsAffected: number
}
