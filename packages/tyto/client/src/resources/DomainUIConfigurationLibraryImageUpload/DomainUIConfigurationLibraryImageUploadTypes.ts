import { TytoBaseResponse } from '@tyto/manifest'

export interface PostParameters {
  UIconfigGUID: string
  domainID: number
  tempUploadKey?: string
  tag?: string
}

export interface PostResponse extends TytoBaseResponse {
  recordsAffected: number
  imageID: number
}
