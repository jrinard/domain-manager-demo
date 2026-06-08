import { Data } from '@spacedock/manifest'
import { set } from 'lodash'

type KeyValuePaths = {
  [key: string]: unknown
}
type Scenarios =
  | 'default'
  | 'thumbnail-not-found'
  | 'thumbnail-loading'
  | 'download-restricted'
const fixtureAttachment = (
  scenario: Scenarios = 'default',
  overrides?: KeyValuePaths
): Data.Attachment => {
  const result: Data.Attachment = {
    noticeAttachmentID: 209579,
    noticeID: 6594042,
    commentID: 16976378,
    aboutID: 1971202,
    aboutType: 'ocLESSON',
    name: 'file',
    activeStatus: 'ocENABLED',
    aboutSubType: 'ocPHOTOALBUM',
    assets: [
      {
        assetID: 1971203,
        assetName: '79A1B71E-8036-4A72-9D32-F7089702BD33.jpeg',
        assetDesc: '',
        assetType: 'ocPhoto',
        orientation: 'ocVOID',
        modifiedDate: '2021-09-15T11:28:06.19',
        modifiedByID: 1963266,
        createdDate: '2021-09-15T11:28:06.19',
        createdByID: 1963266,
        createdByName: 'Felipe Negron',
        sequence: 1,
        softwareRequirements: '',
        originalMD5: 'zxpYXBk8xPMPUPDbk+L5SQ==',
        domainID: 1698652,
        encodings: [
          {
            encodingType: 'ocDEFAULT',
            mimeType: 'image/jpeg',
            modifiedDate: '2021-09-15T11:28:06.19',
            height: 339,
            width: 509,
            length: 0,
            sizeBytes: 35041,
            techNote: '',
            activeStatus: 'ocENABLED',
            pathURL: '/viewAsset/?eid=1971203&encoding=ocDEFAULT',
          },
          {
            encodingType: 'ocORIGINAL',
            mimeType: 'image/jpeg',
            modifiedDate: '2021-09-15T11:28:06.19',
            height: 339,
            width: 509,
            length: 0,
            sizeBytes: 25176,
            techNote: '',
            activeStatus: 'ocENABLED',
            pathURL: '/viewAsset/?eid=1971203&encoding=ocORIGINAL',
          },
          {
            encodingType: 'ocTHUMBNAIL',
            mimeType: 'image/jpeg',
            modifiedDate: '2021-09-15T11:28:06.19',
            height: 339,
            width: 509,
            length: 0,
            sizeBytes: 0,
            techNote: '',
            activeStatus: 'ocENABLED',
            pathURL: '/v2/domains/1698652/assets/1971202_a435v0qdcxr_th.jpg',
          },
        ],
        courseItemID: 1971202,
      },
    ],
  }
  if (scenario === 'thumbnail-not-found') {
    set(result, 'assets[0].encodings[2]', {
      encodingType: 'ocTHUMBNAIL',
      mimeType: 'image/jpeg',
      modifiedDate: '2021-09-15T11:28:06.19',
      height: 339,
      width: 509,
      length: 0,
      sizeBytes: 0,
      techNote: '',
      activeStatus: 'ocENABLED',
      pathURL: '/v2/domains/1698652/assets/1971202_a435v0qdcxr.jpg',
    })
  } else if (scenario === 'thumbnail-loading') {
    set(result, 'assets[0].encodings[2]', {
      encodingType: 'ocTHUMBNAIL',
      mimeType: 'image/jpeg',
      modifiedDate: '2021-09-15T11:28:06.19',
      height: 339,
      width: 509,
      length: 0,
      sizeBytes: 0,
      techNote: '',
      activeStatus: 'ocENABLED',
      pathURL: '/images/infinite-loading.jpg',
    })
  } else if (scenario === 'download-restricted') {
    result.assets[0].encodings = result.assets[0].encodings.filter(
      (encoding) => encoding.encodingType !== 'ocORIGINAL'
    )
  }
  if (overrides) {
    Object.keys(overrides).forEach((key) => {
      set(result, key, overrides[key])
    })
  }
  return result
}

export { fixtureAttachment }
