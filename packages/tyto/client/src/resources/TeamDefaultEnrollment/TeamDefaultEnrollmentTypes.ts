import { TytoBaseResponse } from '@tyto/manifest'

/**
 * Use https://app.quicktype.io/
 */
export interface DeleteParameters {
  teamDefaultEnrollmentID: number
}

/**
 * Use https://app.quicktype.io/
 */
export interface DeleteResponse extends TytoBaseResponse {
  recordsAffected: number
}
