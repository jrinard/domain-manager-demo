import { TytoBaseResponse } from '@tyto/manifest'

export interface PostParameters {
  traitID: number
  personID?: number
  traitValue?: string
}

export interface PostResponse extends TytoBaseResponse {
  recordsAffected: number
  itemTraitID: number
}

export interface DeleteParameters {
  itemTraitID: number
}

export interface DeleteResponse extends TytoBaseResponse {
  recordsAffected: number
}
