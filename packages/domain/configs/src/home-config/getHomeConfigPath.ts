import { getDomainFolderPath } from '../domain-folder/getDomainFolderPath'

import {
  HOME_CONFIG_FILE_NAME,
  PREVIEW_HOME_CONFIG_FILE_NAME,
} from './constants'

export function getHomeConfigPath(domainID: number) {
  return `${getDomainFolderPath(domainID)}/start/${HOME_CONFIG_FILE_NAME}` as const
}

export function getPreviewHomeConfigPath(domainID: number) {
  return `${getDomainFolderPath(domainID)}/start/${PREVIEW_HOME_CONFIG_FILE_NAME}` as const
}
