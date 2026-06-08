import { Resource } from '../../utils/helpers'
import { TytoBaseResponse } from '@tyto/manifest'

export interface GetParameters {
  assetMode?: 'ocALL' | 'ocLESSON' | 'ocLIBCAT'
  top?: number
}

export interface LibraryTeamFeaturedItem {
  aboutName: string
  aboutType: 'ocLESSON' | 'ocLIBCAT'
  memberID: number
  teamPathIDs: string
  subDomainTeamPathName: string
  aboutID: number
  lib_modifiedDate: string
  parentCatID: number
  thumbnailPath?: string
  categoryPathNames: string
  // Assets array - encodings are directly on each asset object (not nested in item)
  assets?: Array<{
    assetID?: number
    assetName?: string
    assetType?: string
    assetDesc?: string
    orientation?: string
    modifiedDate?: string
    modifiedByID?: number
    createdDate?: string
    createdByID?: number
    createdByName?: string
    sequence?: number
    softwareRequirements?: string
    originalMD5?: string
    domainID?: number
    courseItemID?: number
    languageTag?: string
    encodings?: Array<{
      encodingType: string
      pathURL: string
      mimeType?: string
      height?: number
      width?: number
      length?: number
      sizeBytes?: number
      techNote?: string
      activeStatus?: string
      modifiedDate?: string
    }>
  }>
  thumbOverimage?: {
    height: number
    imageID: number
    imageName: string
    imageSubType: 'ocLibCatIcon'
    pathURL: string
    width: number
  }
}

export interface GetResponse extends TytoBaseResponse {
  libraryTeamFeatured: LibraryTeamFeaturedItem[]
}

export class LibraryTeamFeatured extends Resource {
  override endpoint = 'Library/Team/Featured'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
