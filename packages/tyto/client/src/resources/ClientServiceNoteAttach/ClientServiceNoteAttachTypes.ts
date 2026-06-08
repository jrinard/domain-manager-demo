import { TytoBaseResponse } from '@tyto/manifest'

export interface PostParameters {
  clientServiceNoteID: number
  uploadBinaryKey: string
}

export interface PostResponse extends TytoBaseResponse {
  clientServiceNoteAttachID: number
}
export interface DeleteParameters {
  clientServiceNoteAttachID: number
}
export interface DeleteResponse extends TytoBaseResponse {
  recordsAffected: number
}
