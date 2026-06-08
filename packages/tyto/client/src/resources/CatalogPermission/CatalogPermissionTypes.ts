import { TytoBaseResponse } from '@tyto/manifest'

export interface PutParameters {
  catalogID: number
  memberID: number
  hasAdd?: boolean
  hasChange?: boolean
  hasDelete?: boolean
  hasShare?: boolean
  hasView?: boolean
}
export interface PutResponse extends TytoBaseResponse {
  CatalogPermission: number
}
