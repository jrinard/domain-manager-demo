import { Data, TytoData } from '@spacedock/manifest'

import { createEncoding } from './Encoding'

export const createAsset = (): TytoData.Asset => {
  const encodings: Data.Encoding[] = [
    createEncoding({ encodingType: 'ocDEFAULT', height: 1080, width: 1920 }),
    createEncoding({ encodingType: 'ocLARGE', height: 1080, width: 1920 }),
    createEncoding({ encodingType: 'ocORIGINAL', height: 1080, width: 1920 }),
  ]

  return {
    assetDesc: 'test desc',
    assetID: 123,
    assetName: 'test name',
    assetType: 'ocPDF',
    courseItemID: 0,
    createdByID: 123,
    createdByName: 'Test User',
    createdDate: new Date().toISOString(),
    domainID: 551,
    encodings,
    modifiedByID: 123,
    modifiedDate: new Date().toISOString(),
    orientation: 'landscape',
    originalMD5: '2574927589234758/6543==',
    sequence: 1,
    softwareRequirements: '',
  }
}
