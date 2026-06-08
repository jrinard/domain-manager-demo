import { TytoBaseResponse } from '@tyto/manifest'

export interface GetParameters {
  timeZoneID?: number
  nameGeneral?: string
  filterDate?: string
}

export interface GetResponse extends TytoBaseResponse {
  timeZones: TimeZone[]
}

interface TimeZone {
  iCalRRule: string
  iCalTZID: string
  iCalTZURL: string
  modifiedDateUTC: string
  nameGeneral: string
  nameObserved: string
  observanceType: ObservanceType
  offSetFromMinutes: number
  offSetToMinutes: number
  startDate: string
  timeZoneID: number
}

enum ObservanceType {
  ocCONSTANT = 'ocCONSTANT',
  ocDAYLIGHT = 'ocDAYLIGHT',
  ocSTANDARD = 'ocSTANDARD',
}
