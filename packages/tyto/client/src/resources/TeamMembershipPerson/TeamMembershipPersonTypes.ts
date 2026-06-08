import { TytoBaseResponse } from '@tyto/manifest'

export interface PostParameters {
  teamID: number
  memberID: number
  suppressTaskInvite?: boolean
  suppressEnrollment?: boolean
  memberTitle?: string
  teamBoardEmailPreference?:
    | 'ocVACANT'
    | 'ocDISABLED'
    | 'ocDIGESTDAY'
    | 'ocINSTANT'
  isTeamLeader?: boolean
}

export interface PostResponse extends TytoBaseResponse {
  recordsAffected: number
}

export interface PutParameters {
  memberID: number
  teamID: number
  memberTitle?: string
  newTeamID?: number
  teamBoardEMailPreference?:
    | 'ocVACANT'
    | 'ocDISABLED'
    | 'ocDIGESTDAY'
    | 'ocINSTANT'
  isTeamLeader?: boolean
  isCascade?: boolean
}
export interface PutResponse extends TytoBaseResponse {
  recordsAffected: number
}

export interface DeleteParameters {
  memberID: number
  teamID: number
}
export interface DeleteResponse extends TytoBaseResponse {
  recordsAffected: number
}
