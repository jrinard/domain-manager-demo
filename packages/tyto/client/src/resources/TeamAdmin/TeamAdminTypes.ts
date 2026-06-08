import { TytoBaseResponse } from '@tyto/manifest'

import { Team, ProfileImage } from '../Team/types/TeamType'

export interface GetParameters {
  /**
   * @description Show me this team and include the admin permissions
   * @example 551
   */
  teamID: number
}
export interface GetResponse extends TytoBaseResponse {
  admin: Admin
  profileImages: ProfileImage[]
  team: Team
}

export interface Admin {
  adminDetail: AdminDetail
  permissions: Permission[]
}

export interface AdminDetail {
  detailSummary: string
  maxPersons: number
}

export interface Permission {
  functionName: string
  fieldName: string
  changeAccess: boolean
  viewAccess: boolean
  addAccess: boolean
  deleteAccess: boolean
}

export interface PutParameters {
  teamID: number
  detailSummary?: string
  maxPersons?: number
}

export interface PutResponse extends TytoBaseResponse {
  recordsAffected: number
}
