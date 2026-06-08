import { Endpoints } from '@tyto/client'

export const UPLOAD_KEY_PARTIAL = '213rf983br694ewf'
export const UPLOAD_KEY = `${UPLOAD_KEY_PARTIAL}-dsfafr43vre-fewwrt43fre3wt43-gf-rewwt43t-43fsww`

export const uploadPost = (): Endpoints.Tyto.Upload.Post.Response => {
  return {
    uploadFiles: [
      {
        Name: 'File Name',
        fieldName: '...',
        fileUploadKey: UPLOAD_KEY,
        folderPath: '\\\\endor\\folder\\path\\',
        length: 12368719,
        md5: 'shajdkhsjla/dfsafdsa==',
        mimeType: 'plain/text',
        originalFileName: 'Original File Name',
        sessionUploadKey: '213124432-43242-43214321fdsf',
        sizeBytes: 12368719,
        uploadTimeSeconds: 0,
      },
    ],
    uploadKey: UPLOAD_KEY_PARTIAL,
  }
}
