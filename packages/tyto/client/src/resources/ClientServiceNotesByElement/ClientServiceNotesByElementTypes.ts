import { TytoBaseResponse } from '@tyto/manifest'

export interface GetParameters {
  elementID: number
}

export interface GetResponse extends TytoBaseResponse {
  clientServiceNotes: {
    draft: {
      clientServiceNoteID: number
      createdDate: string
      modifiedDate: string
      subjectText: string
      noteText: string
      activeStatus: 'ocDRAFT' | 'ocDISABLED'
      attachmentCount: number
      client: {
        elementID: number
        primaryElementID: number
        domainID: number
      }
      permission: {
        hasChange: true
        hasDelete: true
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
    enableds: {
      clientServiceNoteID: number
      createdDate: string
      modifiedDate: string
      noteText: string
      subjectText: string
      activeStatus: 'ocENABLED' | 'ocDISABLED'
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
    }[]
  }
  hasAdd: boolean
}
