import { TytoBaseResponse } from '@tyto/manifest'
export interface PutParameters {
  childTeamID: number
  newTeamID: number
  parentTeamID: number
}
export interface PutResponse extends TytoBaseResponse {
  recordsAffected: number
}
