import { TytoBaseResponse } from '@tyto/manifest'

export interface PostParameters {
  name: string
  teamRoot: number
  methodType:
    | 'ocVACANT'
    | 'ocSAML2'
    | 'ocSAML2NoSession'
    | 'ocGET'
    | 'ocPOST'
    | 'ocPOSTNoSession'
  destinationURI: string
  navigationTarget: string
  tempFileName?: string
  tempFileNameLarge?: string
  menuItemDescription?: string
  keyPhrases?: string[]
}
export interface PostResponse extends TytoBaseResponse {
  recordsAffected: number
  iconUrl: string
  iconUrlLarge: string
  traitID: number
  Exceptions: any[]
}
export interface PutParameters {
  traitID: number
  name: string
  destinationURI: string
  navigationTarget: string
  clearIcon?: boolean
  clearIconLarge?: boolean
  tempFileName?: string
  tempFileNameLarge?: string
  methodType?:
    | 'ocVACANT'
    | 'ocSAML2'
    | 'ocSAML2NoSession'
    | 'ocGET'
    | 'ocPOST'
    | 'ocPOSTNoSession'
  menuItemDescription?: string
  keyPhrases?: string[]
}
export interface PutResponse extends TytoBaseResponse {
  recordsAffected: number
  iconUrl: string
  iconUrlLarge: string
  traitID: number
  Exceptions: any[]
}

export interface DeleteParameters {
  traitID: number
}
export interface DeleteResponse extends TytoBaseResponse {
  recordsAffected: number
}
