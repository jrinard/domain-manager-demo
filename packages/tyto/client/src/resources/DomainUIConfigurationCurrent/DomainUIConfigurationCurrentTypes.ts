import { DomainUI } from '@spacedock/manifest'
import { TytoBaseResponse } from '@tyto/manifest'

/**
 * Use https://app.quicktype.io/
 */
export interface GetParameters {
  configType: 'ocTRYYBSTART' | 'ocTRYYBTOPMENU' | 'ocMASTERYSTART'
  isDraftMode?: boolean
  domainID?: number
}

/**
 * Use https://app.quicktype.io/
 */
export interface GetResponse extends TytoBaseResponse {
  UIConfigurationCurrent: DomainUI.UIConfig
}
