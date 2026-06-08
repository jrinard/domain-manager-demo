import { DomainUI } from '@spacedock/manifest'
import { TytoBaseResponse } from '@tyto/manifest'

/**
 * Use https://app.quicktype.io/
 */
export interface GetParameters {
  UIconfigGUID?: string
}

/**
 * Use https://app.quicktype.io/
 */
export interface GetResponse extends TytoBaseResponse {
  UIConfiguration: DomainUI.UIConfig
}

export interface PostParameters {
  mimeType: 'application/json'
  domainID: number
  configType: DomainUI.UIConfigType
  UIconfigGUID?: string
  lastModifiedOfstDate?: string
  configName?: string
  configDescription?: string
  mainBody?: string
  UIschema?: string
  mainBodyIsValid?: boolean
  UIschemaValidatorAgent?: string
  authorNote?: string
  attachments: DomainUI.UIConfigurationRequestAttachment[]
}

export interface PostResponse extends TytoBaseResponse {
  recordsAffected: number
  configName: string
  UIconfigGUID: string
  lastModifiedOfstDate: string
}

export interface PutParameters {
  UIconfigGUID: string
  activeStatus?: 'ocENABLED' | 'ocDISABLED' | 'ocDRAFTABANDON' // ! Intentionally omitting `ocDRAFT` because you cannot change an active status [back] to `ocDRAFT` from something else
  authorNote?: string
}
export interface PutResponse extends TytoBaseResponse {
  recordsAffected: number
}
