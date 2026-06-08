import { TytoBaseResponse } from '@tyto/manifest'
import type { DomainUI } from '@spacedock/manifest'

/**
 * Use https://app.quicktype.io/
 */
export type GetParameters =
  | {
      domainID: number
    }
  | {
      loginDomainID: string
    }
  | {
      oncourseURL: string
    }

/**
 * Use https://app.quicktype.io/
 */
export interface GetResponse extends TytoBaseResponse {
  domainUI: DomainUI.DomainUI
}

/**
 * PUT Types
 */

interface UIKeyValueRecord {
  uiKey: string
  uiValue: string
}

interface DomainUIImage {
  imageName: string
  tempUploadKey: string
}

interface DomainUIImageResponse {
  request: unknown
  imageID: number
  originalPath: string
  originalUNC: string
  originalFolderPath: string
  imageName: string
}

export interface PutParameters {
  domainID: number
  uiKeyValues: UIKeyValueRecord[]
  uiImages?: DomainUIImage[]
}
export interface PutResponse extends TytoBaseResponse {
  uiImages?: DomainUIImageResponse[]
  recordsAffected: number
}
