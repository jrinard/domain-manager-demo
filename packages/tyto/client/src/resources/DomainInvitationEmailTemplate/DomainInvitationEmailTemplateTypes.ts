import { TytoBaseResponse } from '@tyto/manifest'

/**
 * Use https://app.quicktype.io/
 */
export interface GetParameters {
  domainID: number
}

/**
 * Use https://app.quicktype.io/
 */
export interface GetResponse extends TytoBaseResponse {
  template: {
    autoMailURI: string
    contactEmail: string
    contactName: string
    contactPhone: string
    domainID: number
    inviteMessage: string
    inviteSubject: string
    isSingleSignOn: boolean
    loginDomainID: string
    loginNameLabel: string
    onCourseURL: string
    otherName: string
  }
}
