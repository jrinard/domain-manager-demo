import { TytoBaseResponse } from '@tyto/manifest'
import { Data } from '@spacedock/manifest'

/**
 * Use https://app.quicktype.io/
 */
export interface GetParameters {
  name?: string
  teamPath?: string
  internalTitle?: string
}

/**
 * Use https://app.quicktype.io/
 */
export interface GetResponse extends TytoBaseResponse {
  result: Ret
}

interface Author {
  elementID: number
  elementName: string
  activeStatus: string
  elementType: string
}

interface Block {
  blockID: number
  courseIdentifier: string
  teamRoot: number
  expirationDate: string
  hasChangeAccess: boolean
  hasDeleteAccess: boolean
  isContainerUnit: boolean
  countRequisite: number
  blockLogic: 'ocANYORDER' | 'ocSEQUENTIAL'
  internalTitle: string
  name: string
  locID: number
  ocType: string
  elementID: number
  elementName: string
  elementDesc: string
  elementType: string
  elementSubType: string
  domainID: number
  outsideID: string
  createdByID: number
  createdDate: string
  primaryElementID: number
  modifiedByID: number
  modifiedDate: string
  shareChangedDate: string
  shareChangedByID: number
  createdBy: Element
  modifiedBy: Element
  libraryItemCount: number
  assets: Data.Asset[]
  library: Ret
  images: Data.LessonImage[]
  subDomainParentNamePath: string
  activeStatus: string
}

interface Ret {
  blocks: Block[]
  authors: Author[]
}
