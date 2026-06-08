import { DOMAINS_FOLDER_PATH } from './constants'

export function getDomainFolderPath(
  domainID: number,
): `${typeof DOMAINS_FOLDER_PATH}/${number}` {
  return `${DOMAINS_FOLDER_PATH}/${domainID}`
}
