import { TytoBaseResponse } from '@tyto/manifest'

/**
 * Use https://app.quicktype.io/
 */

export interface PostParameters {
  teamID: number
  uploadKey?: string
}
export interface PostResponse extends TytoBaseResponse {
  profileImageID: number
}

export interface PutParameters {
  assetID: number
  imgMap?: string
}
export interface PutResponse extends TytoBaseResponse {
  recordsAffected: number
}

export interface DeleteParameters {
  activeStatus: string
  assetID: number
}
export interface DeleteResponse extends TytoBaseResponse {
  recordsAffected: number
}
