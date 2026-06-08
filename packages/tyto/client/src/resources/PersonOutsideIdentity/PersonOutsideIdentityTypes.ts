import { TytoBaseResponse } from '@tyto/manifest'

import type { OutsideIdentity } from '../PersonOutsideIdentityAll/PersonOutsideIdentityAllTypes'
import { Session } from '@spacedock/manifest'

/**
 * Use https://app.quicktype.io/
 */
export interface GetParameters {
  identityProviderGUID: string
  outsideID: string
}

/**
 * Use https://app.quicktype.io/
 */
export interface GetResponse extends TytoBaseResponse {
  outsideIdentity: OutsideIdentity
}

export interface PostParameters {
  stateCSRF: string
}

export interface PostResponse extends TytoBaseResponse {
  newSession: Session
  outsideUserData: string
  identityProviderGUID: string
}
