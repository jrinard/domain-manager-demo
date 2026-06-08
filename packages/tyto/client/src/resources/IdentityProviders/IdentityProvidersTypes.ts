import { TytoBaseResponse } from '@tyto/manifest'

export interface IdentityProvider {
  identityProviderGUID: string
  name: string
  protocol: string
  developerEmail: string
  htmlStyle: string
  onCourseURL: string
  entityID: string
  isAuthorizationProvider: boolean
}

/**
 * Use https://app.quicktype.io/
 */
export interface GetParameters {
  loginDomainID?: string
  onCourseURL?: string
  activeStatus?: 'ocENABLED' | 'ocDISABLED'
  isAuthorizationProvider?: boolean
}

/**
 * Use https://app.quicktype.io/
 */
export interface GetResponse extends TytoBaseResponse {
  identityProviders: IdentityProvider[]
}
