export interface Email {
  emailQueueID: number
  dateCreated: string
  toAddress: string
  toName: string
  toUserID: number
  replyTo: string
  replyToName: string
  fromAddress: string
  fromName: string
  fromUserID: number
  dateLastAttempted: string
  dateSent: string
  attemptCounter: number
  lastError: string
  hostServerIP: string
  contentType: string
  subject: string
  body: string
  aboutID: number
  aboutIDType: string
  bodyPlainTextView: string
  queueStatus: string
  hostName: string
  emailKey: string
  viewDate: string
}
