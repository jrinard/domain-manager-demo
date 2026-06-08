import { TytoBaseResponse } from '@tyto/manifest'

export interface PostParameters {
  primaryElementID?: number
  roleID?: number
  givenName?: string
  familyName?: string
  nativeLanguage?: string
  company?: string
  jobTitle?: string
  experience?: 'Exam_Evaluation' | 'Role_Play' | 'Assignment_Evaluation'
  outsideType?: string
  outsideID?: string
  password?: string
  bio?: string
  personal1?: string
  personal2?: string
  personal3?: string
  personal4?: string
  website?: string
}

export interface PostResponse extends TytoBaseResponse {
  newUserID: number
}

export interface PutParameters extends Partial<PostParameters> {
  personID: number
}
export type PutResponse = TytoBaseResponse
