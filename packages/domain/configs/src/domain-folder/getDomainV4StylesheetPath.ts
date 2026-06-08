import { getDomainFolderPath } from './getDomainFolderPath'
import { DOMAIN_V4_STYLESHEET_FILE_NAME } from './constants'

export function getDomainV4StylesheetPath(domainID: number) {
  return `${getDomainFolderPath(domainID)}/${DOMAIN_V4_STYLESHEET_FILE_NAME}` as const
}