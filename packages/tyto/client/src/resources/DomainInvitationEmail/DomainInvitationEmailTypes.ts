import { TytoBaseResponse } from '@tyto/manifest'

export interface PostParameters {
  memberID: number
  subject: string
  body: string
  fromName: string
  replyAddress: string
  cascade?: boolean
  sendOnlyHaveNotLoggedIn?: boolean
  useNewHttpLink?: boolean
}

export interface PostResponse extends TytoBaseResponse {
  recordsAffected: number
}
