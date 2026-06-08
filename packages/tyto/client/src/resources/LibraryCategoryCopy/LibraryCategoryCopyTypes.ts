import { TytoBaseResponse } from '@tyto/manifest'

interface Return {
  libraryCategoryID: number
}

export interface PostParameters {
  sourceLibraryCategoryID: number
  sourceMemberID: number
  destParentLibraryCategoryID: number
  destMemberID: number
}

export interface PostResponse extends TytoBaseResponse {
  result: Return
}
