import { DOMAINS_FOLDER_PATH } from '../domain-folder/constants'

export const CVENT_EVENTS_FILE_NAME = 'events.json'

export function getCVENTFolderPath(
  domainID?: number,
): `${typeof DOMAINS_FOLDER_PATH}/${number}/start/cvent` {
  return `${DOMAINS_FOLDER_PATH}/${domainID ?? 2823418}/start/cvent`
}
