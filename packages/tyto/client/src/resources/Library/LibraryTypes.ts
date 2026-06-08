import { TytoBaseResponse } from '@tyto/manifest'
import { Data } from '@spacedock/manifest'

/**
 * Use https://app.quicktype.io/
 */
export interface GetParameters {
  memberID: number
  assetMode?: 'ocNONE' | 'ocTHUMBNAIL' | 'ocALL'
}

export interface Ret {
  items: Data.LibraryItem[]
  categories: Data.LibraryCategory[]
}

/**
 * Use https://app.quicktype.io/
 */
export interface GetResponse extends TytoBaseResponse {
  library: Ret
}

export interface PostParameters {
  memberID: number
  courseItemID: number
  isFeatured?: boolean
  categoryID?: number
}

export interface PostResponse extends TytoBaseResponse {
  recordsAffected: number
  libraryID: number
  libItemID: number
}

export interface DeleteParameters {
  libraryID: number
}
export interface DeleteResponse extends TytoBaseResponse {
  recordsAffected: number
}
