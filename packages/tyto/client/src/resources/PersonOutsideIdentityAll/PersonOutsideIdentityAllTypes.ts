import { TytoBaseResponse } from '@tyto/manifest'

export interface OutsideIdentity {
  provider: {
    name: string
    htmlStyle: string
  }
  personID: number
  identityProviderGUID: string
  outsideID: string
  assertions: string
  assertionMD5: string
  lastLoginDateUTC: string
  createdDateUTC: string
}

/**
 * Use https://app.quicktype.io/
 */
export interface GetParameters {
  personID: number
}

/**
 * Use https://app.quicktype.io/
 */
export interface GetResponse extends TytoBaseResponse {
  outsideIdentity: OutsideIdentity[]
}
