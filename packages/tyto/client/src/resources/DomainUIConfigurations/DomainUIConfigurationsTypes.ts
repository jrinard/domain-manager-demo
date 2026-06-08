import { DomainUI } from '@spacedock/manifest'
import { TytoBaseResponse } from '@tyto/manifest'

/**
 * Use https://app.quicktype.io/
 */
export interface GetParameters {
  domainID: number
  primaryElementID?: number
  configType: 'ocTRYYBSTART' | 'ocTRYYBTOPMENU' | 'ocMASTERYSTART'
}

/**
 * Use https://app.quicktype.io/
 */
export interface GetResponse extends TytoBaseResponse {
  UIConfigurations: DomainUI.ListUIConfiguration[]
}
