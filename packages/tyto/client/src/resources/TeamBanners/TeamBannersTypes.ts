import { TytoBaseResponse } from '@tyto/manifest'

/**
 * Use https://app.quicktype.io/
 */
export interface GetParameters {
  teamID: number
  functionName?: string
  operation?: 'ocVIEW' | 'ocADD' | 'ocCHANGE' | 'ocDELETE'
}

/**
 * Use https://app.quicktype.io/
 */
export interface GetResponse extends TytoBaseResponse {
  banners: TeamBanner[]
}

export interface TeamBanner {
  isAbove: boolean
  isBelow: boolean
  isDirect: boolean
  teamID: number
  assetID: number
  height: number
  width: number
  assetPathUrl: string
  seq: number
  imageMaps: ImageMap[]
  mimeType: MIMEType
}

export interface ImageMap {
  htmlBlob: string
  eID?: number
  href?: string
  shape?: string
  target?: string
  coords?: string
}

export enum MIMEType {
  ImageJPEG = 'image/jpeg',
  ImagePNG = 'image/png',
}
