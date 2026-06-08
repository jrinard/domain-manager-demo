import { TytoBaseResponse } from '@tyto/manifest'

export interface PostParameters {
  libraryCategoryID: number
  memberID: number
  fileUploadKey: string
  imageName?: string
}

export interface PostResponse extends TytoBaseResponse {
  imageID: number
}

export interface DeleteParameters {
  imageID: number
}
export interface DeleteResponse extends TytoBaseResponse {
  recordsAffected: number
}
