import { TytoBaseResponse } from '@tyto/manifest'

interface Return {
  libCategoryID: number
  categoryName: string
}

export interface PostParameters {
  categoryName: string
  memberID: number
  sequence?: number
  isFeatured?: boolean
  thumbnailPath?: string
  parentLibraryCategoryID?: number
  cssStyle?: string
  fileUploadKeyBGimage?: string
}

export interface PostResponse extends TytoBaseResponse {
  libraryCategory: Return
}

export interface PutParameters {
  libraryCategoryID: number
  categoryName?: string
  memberID?: number
  sequence?: number
  isFeatured?: boolean
  thumbnailPath?: string
  parentLibraryCategoryID?: number
  cssStyle?: string
  fileUploadKeyBGimage?: string
  description?: string
}
export interface PutResponse extends TytoBaseResponse {
  libraryCategory: Return
}

export interface DeleteParameters {
  libraryCategoryID: number
}
export interface DeleteResponse extends TytoBaseResponse {
  recordsAffected: number
}
