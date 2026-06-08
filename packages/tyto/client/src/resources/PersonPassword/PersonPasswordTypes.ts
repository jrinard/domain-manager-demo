import { TytoBaseResponse } from '@tyto/manifest'
export interface PutParameters {
  memberID: number
  password: string
  changePassword?: boolean
}
export interface PutResponse extends TytoBaseResponse {
  recordsAffected: number
}
