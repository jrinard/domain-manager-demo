import { getDomainFolderPath } from '../domain-folder/getDomainFolderPath'

import { TRYYB_TOP_MENU_CONFIG_FILE_NAME } from './constants'

export function getTryybTopMenuPath(domainID: number) {
  return `${getDomainFolderPath(domainID)}/start/${TRYYB_TOP_MENU_CONFIG_FILE_NAME}` as const
}
