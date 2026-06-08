import { TytoBaseResponse } from '@tyto/manifest'

export interface Attachment {
  activeStatus: string
  assetPath: string
  clientServiceNoteAttachID: number
  clientServiceNoteID: number
  createdBy: { memberID: number }
  createdDate: string
  domainID: number
  md5: string
  mimeType: string
  modifiedBy: { memberID: number }
  modifiedDate: string
  originalFileName: string
  pathTemplate: string
  sizeBytes: number
  uploadBinaryKey: string
  urlPath: string
}

export interface GetParameters {
  clientServiceNoteID: number
}
export interface GetResponse extends TytoBaseResponse {
  clientServiceNote: {
    attachments: Attachment[]
    clientServiceNoteID: number
    createdDate: string
    modifiedDate: string
    subjectText: string
    noteText: string
    activeStatus: 'ocENABLED' | 'ocDRAFT' | 'ocDISABLED'
    attachmentCount: number
    client: {
      elementID: number
      primaryElementID: number
      domainID: number
    }
    permission: {
      hasChange: boolean
      hasDelete: boolean
    }
    createdBy: {
      memberName: string
      memberID: number
    }
    modifiedBy: {
      memberName: string
      memberID: number
    }
  }
}

export interface PostParameters {
  elementID: number
  isDraft?: boolean
  noteText?: string
  subjectText?: string
}
export interface PostResponse extends TytoBaseResponse {
  recordsAffected?: number
}

export interface DeleteParameters {
  clientServiceNoteID: number
}
export interface DeleteResponse extends TytoBaseResponse {
  recordsAffected: number
}
