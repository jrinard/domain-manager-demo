import { TytoBaseResponse } from '@tyto/manifest'

export interface PostParameters {
  body: string
  fromName: string
  memberID: number
  replyAddress: string
  subject: string
  cascade?: boolean
  lastActivityDate?: string
  ignoreEmailPref?: boolean
}

export interface PostResponse extends TytoBaseResponse {
  emailResults: EmailContent[]
}

export interface EmailContent {
  userID: number
  email: string
  userName: string
  logonName: string
  emKey: string
  emailQueueID: number
}
