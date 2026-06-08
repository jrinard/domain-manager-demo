import { TytoBaseResponse } from '@tyto/manifest'
import { PersonAbsenceObject } from './types/PersonAbsenceType'

export interface GetParameters {
  personID: number
}
export interface GetResponse extends TytoBaseResponse {
  personAbsences: PersonAbsenceObject[]
}

export interface PutParameters {
  personID: number
  timeZoneNameGeneral: string
  message?: string
  startTimeLocal?: string
  endTimeLocal?: string
}
export interface PutResponse extends TytoBaseResponse {
  recordsAffected: number
  iCalUID: string
}
