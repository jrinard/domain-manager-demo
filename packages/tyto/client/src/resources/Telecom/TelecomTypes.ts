import { TytoBaseResponse } from '@tyto/manifest'
import { Telecom } from './types/TelecomType'

export interface GetParameters {
  elementID: number
}

export interface GetResponse extends TytoBaseResponse {
  telecom: Telecom[]
  hasAdd: boolean
}

export interface PostParameters {
  elementID: number
  label: string
  address: string
  seq?: number
}

export interface PostResponse extends TytoBaseResponse {
  recordsAffected: number
  telecomGUID: string
}

export interface PutParameters {
  telecomGUID: string
  label: string
  address: string
  seq?: number
}
export interface PutResponse extends TytoBaseResponse {
  recordsAffected: number
}
