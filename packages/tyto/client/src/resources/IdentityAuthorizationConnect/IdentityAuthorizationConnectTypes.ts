import { TytoBaseResponse } from '@tyto/manifest'

export interface PostParameters {
  identityProviderGUID: string
  callbackURI: string
}

// * This Endpint does not return a body, but properties as a Header.
export type PostResponse = TytoBaseResponse
