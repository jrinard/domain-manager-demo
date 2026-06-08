import { getDomainFolderPath } from '../domain-folder/getDomainFolderPath'

import {
  TRYYB_START_CONFIG_FILE_NAME,
  TRYYB_PREVIEW_START_CONFIG_FILE_NAME,
} from './constant'

export function getTryybStartConfigPath(domainID: number) {
  return `${getDomainFolderPath(domainID)}/start/${TRYYB_START_CONFIG_FILE_NAME}` as const
}

export function getTryybPreviewStartConfigPath(domainID: number) {
  return `${getDomainFolderPath(domainID)}/start/${TRYYB_PREVIEW_START_CONFIG_FILE_NAME}` as const
}
