import { TytoBaseResponse } from '@tyto/manifest'

export interface DeleteParameters {
  imageID: number
}

export interface DeleteResponse extends TytoBaseResponse {
  recordsAffected: number
}
