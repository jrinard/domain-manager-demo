import { Data, TytoData } from '@spacedock/manifest'

export const createEncoding = (
  fakeData?: Partial<Data.Encoding>
): Data.Encoding => {
  return {
    activeStatus: 'ocENABLED',
    encodingType: fakeData?.encodingType ?? getRandomEncType(),
    height: fakeData?.height ?? 0,
    width: fakeData?.width ?? 0,
    length: 372891,
    mimeType: 'image/png',
    modifiedDate: new Date().toISOString(),
    pathURL: '/v2/domains/DOMAIN-ID/assets/fake-file-name.png',
    sizeBytes: 372891,
    techNote: '',
    ...fakeData,
  }
}

function getRandomEncType(): keyof typeof TytoData.EncodingType {
  const number = Math.round(Math.random() * 10)

  switch (number) {
    case 1:
      return 'ocLARGE'
    case 2:
      return 'ocMEDIUM'
    case 3:
      return 'ocORIGINAL'
    case 4:
      return 'ocSMALL'
    case 5:
      return 'ocTHUMBNAIL'
    case 6:
      return 'ocPDFIMAGES/imgtmp'
    case 7:
      return 'ocPDFIMAGES/thumbtmp'
    case 8:
      return 'ocPDFJSON/jspage'
    case 9:
      return 'ocPDFJSON/jspageimg'
    case 10:
      return 'ocPDFJSON/jsthumb'
    case 0:
    default:
      return 'ocDEFAULT'
  }
}
