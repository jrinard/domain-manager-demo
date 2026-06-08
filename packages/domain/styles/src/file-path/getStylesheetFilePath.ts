import { getDomainFolderPath } from '@domain/configs'

export function getLegacyStylesheetFilePath(domainID: number) {
  return `${getDomainFolderPath(domainID)}/domain.v3.css` as const
}

export function getStylesheetFilePath(domainID: number) {
  return `${getDomainFolderPath(domainID)}/domain.v4.css` as const
}
