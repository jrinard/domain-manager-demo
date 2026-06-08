import { TytoBaseResponse } from '@tyto/manifest'

export interface PutParameters {
  logonName: string
  personID: number
}
export interface PutResponse extends TytoBaseResponse {
  recordsAffected: number
}
