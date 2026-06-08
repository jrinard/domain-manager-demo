import { TytoBaseResponse } from '@tyto/manifest'
import { Email } from './types/EmailType'

export interface GetParameters {
  top?: number
  personID?: number
}

export interface GetResponse extends TytoBaseResponse {
  emails: Email[]
}
