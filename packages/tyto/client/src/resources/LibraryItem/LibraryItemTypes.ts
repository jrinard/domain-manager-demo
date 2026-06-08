import { TytoBaseResponse } from '@tyto/manifest'
import { Data } from '@spacedock/manifest'

/**
 * Use https://app.quicktype.io/
 */
export interface GetParameters {
  libraryID?: number
  memberID?: number
  libraryCategoryID?: number
  courseItemID?: number
}

/**
 * Use https://app.quicktype.io/
 */
export interface GetResponse extends TytoBaseResponse {
  libraryItems: Omit<Data.LibraryItem, 'lesson'>[]
}
