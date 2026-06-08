import { TytoBaseResponse } from '@tyto/manifest'

export interface PutParameters {
  blockID: number
  enrollmentID: number
  memberID: number
}

export interface PutResponse extends TytoBaseResponse {
  recordsAffected?: number
}
