import { TytoBaseResponse } from '@tyto/manifest'

interface CurriculumItem {
  activeStatus: 'ocENABLED' | 'ocDISABLED'
  curriculumID: number
  name: string
  statusSummary: StatusSummaryItem[]
  type: 'ocBLOCK' | 'ocDEVPLAN'
}

interface StatusSummaryItem {
  completeStatus:
    | 'ocCOMPLETE'
    | 'ocINCOMPLETE'
    | 'ocNOTATTEMPTED'
    | 'ocNOTSTARTED'
  hoursElapsedFromAdd?: number
  participantCount: number
}

interface GraphData {
  label: string
  points: GraphPoint[]
}

interface GraphPoint {
  dy: number
  mth: number
  x: number
  yr: number
}

interface RecentMemberCompletion {
  completeStatus: 'ocCOMPLETE' | 'ocINCOMPLETE'
  curriculumID: number
  curriculumName: string
  curriculumType: 'ocBLOCK' | 'ocDEVPLAN'
  memberID: number
  memberName: string
  memberType: 'ocPERSON' | 'ocTEAM'
  registeredDate: string
  statusDate: string
  taskID: number
}

/**
 * Use https://app.quicktype.io/
 */
export interface GetParameters {
  curriculumIDs: number[]
  teamPath: string
  memberIDs?: string
  beginDateEnrolled?: string
  outsideType?: string
}

/**
 * Use https://app.quicktype.io/
 */
export interface GetResponse extends TytoBaseResponse {
  results: {
    curriculum: CurriculumItem[]
    graphs: GraphData[]
    recentMemberCompletions: RecentMemberCompletion[]
  }
}
