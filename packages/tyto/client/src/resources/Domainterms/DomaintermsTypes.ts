import { TytoBaseResponse } from '@tyto/manifest'

export interface PutParameters {
  domainID: number
  termsOfService?: string
}
export interface PutResponse extends TytoBaseResponse {
  policy: policy
}

interface policy {
  PolicyID: number
  domainID: number
  language: string
  PolicyText: string
  createdUser: number
  createdDate: string
  modifiedUser: number
  modifiedDate: string
}
