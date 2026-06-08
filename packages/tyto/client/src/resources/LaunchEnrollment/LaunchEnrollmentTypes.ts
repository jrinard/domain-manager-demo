import { TytoBaseResponse, DateISO8601 } from '@tyto/manifest'
import { Enrollment } from './types/EnrollmentTypes'

export interface GetParameters {
  enrollmentID?: number
  curriculumID?: number
  memberID?: number
}

export interface GetResponse extends TytoBaseResponse {
  Enrollment: Enrollment[]
}

export interface PutParameters {
  enrollmentID?: number
  completeStatus?: 'ocVACANT' | 'ocNOTSTARTED' | 'ocINCOMPLETE' | 'ocCOMPLETE'
  passStatus?: 'ocPASS' | 'ocFAIL' | 'ocVACANT'
  score?: number
  bookMark?: string
  comment?: string
  mentorID?: number
  creditID?: number
  dueDate?: DateISO8601
  location?: string
  completedDate?: string
}

export interface PutResponse extends TytoBaseResponse {
  recordsAffected?: number
}
