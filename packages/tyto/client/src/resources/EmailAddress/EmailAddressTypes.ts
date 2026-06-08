import { TytoBaseResponse } from '@tyto/manifest'
import { EmailAddress } from './types/EmailAddressTypes'

export interface GetParameters {
  emailID?: number
  address?: string
  aboutID?: number
  aboutType?: string
  activeStatus?: string
}

export interface GetResponse extends TytoBaseResponse {
  emailAddresses: EmailAddress[]
}

export interface PostParameters {
  aboutID: number
  aboutType: string
  address: string
  replaceAll?: boolean
}

export interface PostResponse extends TytoBaseResponse {
  emailID: number
  recordsAffected: number
}

export interface PutParameters {
  emailID: number
  address: string
}

export interface PutResponse extends TytoBaseResponse {
  recordsAffected: number
}

export interface DeleteParameters {
  emailID: number
}

export interface DeleteResponse extends TytoBaseResponse {
  recordsAffected: number
}
