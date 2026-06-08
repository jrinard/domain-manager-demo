import { TytoBaseResponse } from '@tyto/manifest'

export interface GetParameters {
  domainID: number
}

export interface GetResponse extends TytoBaseResponse {
  termsOfService: string
}
